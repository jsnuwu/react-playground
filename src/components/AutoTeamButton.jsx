import React, { useContext, useState } from "react";
import { PlayerContext } from "../Data/PlayerContext";

const lanes = ["Top", "Jungle", "Mid", "ADC", "Support"];

function tryExtractJson(text) {

    try {
    return JSON.parse(text);
  } catch (e) {}

  const jsonBlockMatch = text.match(/```json([\s\S]*?)```/i) || text.match(/({[\s\S]*})/);
  if (jsonBlockMatch) {
    try {
      return JSON.parse(jsonBlockMatch[1]);
    } catch (e) {}
  }

  return null;
}

function computeScore(p) {

    const kills = Number(p.kills) || 0;
  const deaths = Number(p.deaths) || 1;
  const assists = Number(p.assists) || 0;
  const winRate = Number(p.winRate) || 0; 
  const kda = (kills + assists) / Math.max(1, deaths);

  return kda * (1 + winRate / 100);
}

function localBalancer(players) {

    
  const pts = players.map((p) => ({ ...p, score: computeScore(p) }));

  pts.sort((a, b) => b.score - a.score);

  const red = [];
  const blue = [];
  let sumRed = 0;
  let sumBlue = 0;


  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    if (sumRed <= sumBlue && red.length < 5) {
      red.push(p.name);
      sumRed += p.score;
    } else if (blue.length < 5) {
      blue.push(p.name);
      sumBlue += p.score;
    } else {

        if (red.length < 5) {
        red.push(p.name);
        sumRed += p.score;
      } else {
        blue.push(p.name);
        sumBlue += p.score;
      }
    }
  }


  while (red.length < 5) red.push(null);
  while (blue.length < 5) blue.push(null);

  return { red, blue };
}

const AutoTeamButton = ({ redTeam, setRedTeam, blueTeam, setBlueTeam }) => {
  const { playerData } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);

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
        alert("Weniger als 10 Spieler verfügbar!");
        setLoading(false);
        return;
      }

      const selectablePlayers = pool.map((name) =>
        playerData.find((p) => p.name === name)
      );


      const minimal = selectablePlayers.map((p) => ({
        name: p.name,
        kills: p.kills ?? 0,
        deaths: p.deaths ?? 1,
        assists: p.assists ?? 0,
        winRate: p.winRate ?? 0,
      }));

      const prompt = `
Du bist ein League-of-Legends Teamplaner. 
Verteile die folgenden 10 Spieler fair auf zwei Teams (Red, Blue) basierend auf KDA und WinRate.
Antworte **nur** mit JSON im Format:
{
  "red": ["TopName","JungleName","MidName","ADCName","SupportName"],
  "blue": ["TopName","JungleName","MidName","ADCName","SupportName"]
}
Spieler: ${JSON.stringify(minimal)}
`;

      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Chat endpoint returned non-ok:", res.status, txt);
        throw new Error("Chat endpoint error");
      }

      const data = await res.json();
      const rawReply = data.reply;

      let parsed = tryExtractJson(rawReply);

      if (!parsed || !parsed.red || !parsed.blue) {

        console.warn("KI-Antwort nicht parsebar, fallback to localBalancer");
        const { red, blue } = localBalancer(selectablePlayers);
        setRedTeam({
          Top: red[0],
          Jungle: red[1],
          Mid: red[2],
          ADC: red[3],
          Support: red[4],
        });
        setBlueTeam({
          Top: blue[0],
          Jungle: blue[1],
          Mid: blue[2],
          ADC: blue[3],
          Support: blue[4],
        });
      } else {

        const teams = parsed;

        if (!Array.isArray(teams.red) || teams.red.length !== 5) {
          throw new Error("AI returned invalid red team length");
        }
        if (!Array.isArray(teams.blue) || teams.blue.length !== 5) {
          throw new Error("AI returned invalid blue team length");
        }
        setRedTeam({
          Top: teams.red[0],
          Jungle: teams.red[1],
          Mid: teams.red[2],
          ADC: teams.red[3],
          Support: teams.red[4],
        });
        setBlueTeam({
          Top: teams.blue[0],
          Jungle: teams.blue[1],
          Mid: teams.blue[2],
          ADC: teams.blue[3],
          Support: teams.blue[4],
        });
      }
    } catch (err) {
      console.error("Fehler beim Auto-Team:", err);
      alert("Fehler beim Erstellen der Teams. Fallback wurde verwendet oder prüfe Backend-Logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="auto-team-btn" onClick={handleAutoTeams} disabled={loading}>
      {loading ? "Erstelle Teams..." : "Auto-Team erstellen"}
    </button>
  );
};

export default AutoTeamButton;
