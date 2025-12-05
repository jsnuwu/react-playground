import { createContext, useState, useEffect } from "react";
import defaultPlayers from "./players";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(defaultPlayers);

  useEffect(() => {
    fetch("http://localhost:3000/players")
      .then((res) => res.json())
      .then((data) => {
        const merged = data.map((p) => {
          const defaultPlayer = defaultPlayers.find((dp) => dp.name === p.name);
          return {
            ...defaultPlayer,
            ...p,
            avatar: defaultPlayer?.avatar || null,
          };
        });

        setPlayerData(merged);
      })
      .catch(() => console.log("Backend nicht erreichbar, nutze Default"));
  }, []);

  /*  useEffect(() => {
    fetch("http://localhost:3000/players")
      .then(res => res.json())
      .then(data => {

        const merged = data.map(p => {
          const defaultPlayer = defaultPlayers.find(dp => dp.id === p.id);
          return { ...p, avatar: defaultPlayer?.avatar || null };
        });
        setPlayerData(merged);
      })
      .catch(() => console.log("Backend nicht erreichbar, nutze Default"));
  }, []); */

  return (
    <PlayerContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </PlayerContext.Provider>
  );
};
