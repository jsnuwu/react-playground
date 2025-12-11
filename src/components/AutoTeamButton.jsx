import React, { useContext, useState } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import tryExtractJson from "../data/tryExtractJson";
import "../styles/AutoTeamButton.css";
import Notification from "./Notification";

const AutoTeamButton = ({ redTeam, setRedTeam, blueTeam, setBlueTeam }) => {
  const { playerData } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [teamGenerated, setTeamGenerated] = useState(false);

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "error", duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), duration);
  };

  const handleAiInteraction = async () => {
    if (!customPrompt || customPrompt.trim() === "") {
      showNotification("Prompt is required", "error");
      return;
    }

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
${customPrompt}
`; /* const res = await fetch("http://localhost:3000/chat", {*/
      const res = await fetch(
        "https://react-playground-backend-l7lj.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: combinedPrompt }],
          }),
        }
      );

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

const handleCopyPrompt = async () => {
  const defaultCopyPrompt = `
Du bist ein professioneller League-of-Legends-Teamplaner.
Du kennst ausschließlich die unten aufgeführten Spieler und ihre Rollen.
Es dürfen keine anderen oder erfundenen Spieler verwendet werden.

Deine Aufgaben:

Wähle zufällig aus, welche Spieler welche Rollen (Top/Jungle/Mid/ADC/Support) übernehmen dürfen.
Die Zuordnung soll jedes Mal unterschiedlich sein.
Spieler dürfen nur Rollen bekommen, die sie tatsächlich spielen können.

Erstelle daraus zwei faire Teams (Red & Blue).

Gib das Ergebnis ausschließlich im JSON-Format aus:

{
  "red": ["TopName","JungleName","MidName","ADCName","SupportName"],
  "blue": ["TopName","JungleName","MidName","ADCName","SupportName"]
}

Verfügbare Spieler (nur diese sind erlaubt):

David → ADC / jungle / mid / top  
Jenny → support / top
Nils → ADC / support / mid
Dennis → top / jungle / ADC / support
Mohammed → mid / jungle
Adrian → top / support
Jason → mid / ADC / top
Kristof → jungle / ADC
Felix S → ADC / mid / support
Felix P → jungle / mid / ADC
Mechu → top / support
`;

  try {
    await navigator.clipboard.writeText(defaultCopyPrompt);
    showNotification("Default-Prompt kopiert!", "success");
  } catch (err) {
    console.error(err);
    showNotification("Kopieren fehlgeschlagen!", "error");
  }
};


  return (
    <div className="chat-wrapper">
    <div className="auto-team-container">
      

      <div className="KI-answer-container" placeholder="hi" >
        <pre>{aiReply}</pre>
      </div>

      <textarea
        placeholder="Hier KI-Prompt eingeben... (mit genug kontext für Team)"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        className="prompt-input"
        onKeyDown={(e) => {
          if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAiInteraction();
          }
        }}
      />
<div className="buttons-container">


      <button className="copyPrompt-btn" onClick={handleCopyPrompt}>
        Copy default Prompt
      </button>
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
          </div>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
    </div>
  );
};

export default AutoTeamButton;
