import React, { useContext, useState } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import tryExtractJson from "../data/tryExtractJson";
import "../styles/AutoTeamButton.css";

const AutoTeamButton = ({ redTeam, setRedTeam, blueTeam, setBlueTeam }) => {
  const { playerData } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [teamGenerated, setTeamGenerated] = useState(false);

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

  const generateAutoTeamPrompt = () => {
    const minimal = playerData.map((p) => ({
      name: p.name,
      kills: p.kills ?? 0,
      deaths: p.deaths ?? 1,
      assists: p.assists ?? 0,
      winRate: p.winRate ?? 0,
    }));

    return `
Du bist ein professioneller League-of-Legends Teamplaner.
Sortiere Spieler nach KDA + WinRate und bilde faire Teams.
Gib die Antwort **ausschließlich** in JSON zurück:

{
  "red": ["TopName","JungleName","MidName","ADCName","SupportName"],
  "blue": ["TopName","JungleName","MidName","ADCName","SupportName"]
}

Spieler: ${JSON.stringify(minimal)}
Keine erfundenen Spieler, nur diese Daten verwenden.

`;
  };

  /* const res = await fetch("https://react-playground-backend-l7lj.onrender.com/chat", {*/

  const handleAiInteraction = async () => {
    setLoading(true);
    setAiReply("");

    try {
      const minimal = playerData.map((p) => ({
        name: p.name,
        kills: p.kills ?? 0,
        deaths: p.deaths ?? 1,
        assists: p.assists ?? 0,
        winRate: p.winRate ?? 0,
      }));

      const combinedPrompt = `
Hier sind die Spieler-Daten (nur als Referenz, verwende sie falls relevant):
${JSON.stringify(minimal)}

Nutzer fragt:
${customPrompt || "Erstelle faire Teams auf Basis der Spieler-Daten."}
`;
       const res = await fetch("https://react-playground-backend-l7lj.onrender.com/chat", {
    /*  const res = await fetch("http://localhost:3000/chat", {*/
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: combinedPrompt }],
        }),
      });

      const data = await res.json();
      const parsedJson = tryExtractJson(data.reply);

      setAiReply(data.reply || "Keine Antwort von der KI.");

      if (parsedJson?.red && parsedJson?.blue) {
        setRedTeam({
          Top: parsedJson.red[0],
          Jungle: parsedJson.red[1],
          Mid: parsedJson.red[2],
          ADC: parsedJson.red[3],
          Support: parsedJson.red[4],
        });
        setBlueTeam({
          Top: parsedJson.blue[0],
          Jungle: parsedJson.blue[1],
          Mid: parsedJson.blue[2],
          ADC: parsedJson.blue[3],
          Support: parsedJson.blue[4],
        });
        setTeamGenerated(true);
      }
    } catch (err) {
      console.error("KI Fehler:", err);
      alert("Fehler beim Chat oder Teamgenerierung");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    const defaultPrompt = `
Du bist ein professioneller League-of-Legends Teamplaner.
Sortiere Spieler nach KDA + WinRate und bilde faire Teams.
Gib die Antwort **ausschließlich** in JSON zurück:

{
  "red": ["TopName","JungleName","MidName","ADCName","SupportName"],
  "blue": ["TopName","JungleName","MidName","ADCName","SupportName"]
}

Keine erfundenen Spieler, nur diese Daten verwenden.
`;
    navigator.clipboard.writeText(defaultPrompt).then(
      () => alert("Default-Prompt kopiert!"),
      (err) => alert("Konnte Default-Prompt nicht kopieren: " + err)
    );
  };

  return (
    <div className="auto-team-container">
      <textarea
        placeholder="Hier KI-Prompt eingeben... (mit genug kontext für Team)"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        className="prompt-input"
      />

      <div className="KI-answer-container">
        <pre>{aiReply}</pre>
      </div>

      <button className="btn" onClick={handleAiInteraction} disabled={loading}>
        <svg
          height="24"
          width="24"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          data-name="Layer 1"
          id="Layer_1"
          className="sparkle"
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>
        <span className="text">{loading ? "Thinking..." : "Generate"}</span>
      </button>

      <button className="copyPrompt-btn" onClick={handleCopyPrompt}>
        Copy default Prompt
      </button>
    </div>
  );
};

export default AutoTeamButton;
