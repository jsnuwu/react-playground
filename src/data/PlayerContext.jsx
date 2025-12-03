import { createContext, useState } from "react";
import players from "./players";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(players);

  return (
    <PlayerContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </PlayerContext.Provider>
  );
};
