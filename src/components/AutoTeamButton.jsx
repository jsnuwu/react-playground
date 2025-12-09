import React, { useContext, useState } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import tryExtractJson from "../data/tryExtractJson";
import "../styles/AutoTeamButton.css";

const AutoTeamButton = ({ redTeam, setRedTeam, blueTeam, setBlueTeam }) => {
  const { playerData } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(""); // Neuer State

  const computeScore = (p) => {
    const kills = Number(p.kills) || 0;
    const deaths = Number(p.deaths) || 1;
    const assists = Number(p.assists) || 0;
    const winRate = Number(p.winRate) || 0;
    const kda = (kills + assists) / deaths;
    return kda * (1 + winRate / 100);
  };

  const localBalancer = (players) => {
    const pts = players.map((p) => ({ ...p, score: computeScore(p) }));
    pts.sort((a, b) => b.score - a.score);

    const red = [];
    const blue = [];
    let sR = 0,
      sB = 0;

    for (const p of pts) {
      if (sR <= sB && red.length < 5) {
        red.push(p.name);
        sR += p.score;
      } else {
        blue.push(p.name);
        sB += p.score;
      }
    }

    return { red, blue };
  };

  const handleAutoTeams = async () => {
    setLoading(true);
    try {
      const pool = playerData
        .map((p) => p.name)
        .filter(
          (name) =>
            !Object.values(redTeam).includes(name) &&
            !Object.values(blueTeam).includes(name)
        );

      if (pool.length < 10) {
        alert("Mindestens 10 Spieler nötig!");
        return;
      }

      const selected = pool.map((n) => playerData.find((p) => p.name === n));
      const minimal = selected.map((p) => ({
        name: p.name,
        kills: p.kills ?? 0,
        deaths: p.deaths ?? 1,
        assists: p.assists ?? 0,
        winRate: p.winRate ?? 0,
      }));


      const prompt = `
Du bist ein professioneller League-of-Legends Teamplaner.

Deine Aufgabe:
- Sortiere die Spieler nach Stärke (KDA + WinRate).
- Bilde dann immer die zwei ähnlichsten Spieler zu einem 1v1 Pairing:
  - Paar 1 → Top Lane (stärkste 2)
  - Paar 2 → Jungle
  - Paar 3 → Mid
  - Paar 4 → ADC
  - Paar 5 → Support

Die Teams sollen so entstehen:
- Von jedem Paar bekommt ein Spieler Team RED und der andere Team BLUE.
- Stärkeverteilung pro Position soll möglichst gleich sein, damit die Lanes fair sind.

Gib die Antwort **ausschließlich** im folgenden JSON Format zurück:

{
  "red": ["TopName","JungleName","MidName","ADCName","SupportName"],
  "blue": ["TopName","JungleName","MidName","ADCName","SupportName"]
}

Spieler: ${JSON.stringify(minimal)}
`;

      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      const data = await res.json();
      const parsed = tryExtractJson(data.reply);

      if (!parsed || !parsed.red || !parsed.blue) {
        console.warn("⚠ KI Antwort unbrauchbar → Fallback aktiv");
        const fb = localBalancer(selected);
        setRedTeam({
          Top: fb.red[0],
          Jungle: fb.red[1],
          Mid: fb.red[2],
          ADC: fb.red[3],
          Support: fb.red[4],
        });
        setBlueTeam({
          Top: fb.blue[0],
          Jungle: fb.blue[1],
          Mid: fb.blue[2],
          ADC: fb.blue[3],
          Support: fb.blue[4],
        });
        return;
      }

      setRedTeam({
        Top: parsed.red[0],
        Jungle: parsed.red[1],
        Mid: parsed.red[2],
        ADC: parsed.red[3],
        Support: parsed.red[4],
      });
      setBlueTeam({
        Top: parsed.blue[0],
        Jungle: parsed.blue[1],
        Mid: parsed.blue[2],
        ADC: parsed.blue[3],
        Support: parsed.blue[4],
      });
    } catch (err) {
      console.error("Auto-Team Fehler:", err);
      alert("Fehler. Backend prüfen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auto-team-container">
      <textarea
        placeholder="Hier KI-Prompt eingeben..."
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        className="prompt-input"
      />
    <button className="btn" onClick={handleAutoTeams} disabled={loading}>
      
      <svg
        height="24"
        width="24"
        fill="#FFFFFF"
        viewBox="0 0 24 24"
        data-name="Layer 1"
        id="Layer_1"
        class="sparkle"
      >
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
      </svg>

      <span class="text">
        {loading ? "Thinking..." : "Generate"}
      </span>
    </button>
    </div>
  );
};

export default AutoTeamButton;
