import React, { useState, useContext } from "react";
import "../styles/TeamPlanning.css";
import LoLMap from "../components/LolMap";
import "../styles/LolMap.css";
import { PlayerContext } from "../Data/PlayerContext";

const lanes = ["Top", "Jungle", "Mid", "ADC", "Support"];

const LoLTeamPlanner = () => {
  const { playerData } = useContext(PlayerContext); 
  const [redTeam, setRedTeam] = useState({
    Top: null,
    Jungle: null,
    Mid: null,
    ADC: null,
    Support: null,
  });
  const [blueTeam, setBlueTeam] = useState({
    Top: null,
    Jungle: null,
    Mid: null,
    ADC: null,
    Support: null,
  });
  const [dragged, setDragged] = useState(null);

  const pool = playerData
    .map((p) => p.name)
    .filter(
      (name) =>
        !Object.values(redTeam).includes(name) &&
        !Object.values(blueTeam).includes(name)
    );

  const onDragStart = (player, fromTeam, lane = null) => {
    setDragged({ player, fromTeam, lane });
  };

  const onDrop = (team, lane) => {
    if (!dragged) return;
    const { player, fromTeam, lane: fromLane } = dragged;

    let newRed = { ...redTeam };
    let newBlue = { ...blueTeam };

    if (fromTeam === "red") newRed[fromLane] = null;
    if (fromTeam === "blue") newBlue[fromLane] = null;

    if (team === "red") newRed[lane] = player;
    if (team === "blue") newBlue[lane] = player;

    setRedTeam(newRed);
    setBlueTeam(newBlue);
    setDragged(null);
  };

  const returnToPool = (team, lane) => {
    if (team === "red") setRedTeam({ ...redTeam, [lane]: null });
    if (team === "blue") setBlueTeam({ ...blueTeam, [lane]: null });
  };

  const renderTeamLane = (teamName, teamState, teamKey) => (
    <div className={`team-column ${teamKey}`}>
      <h3>{teamName}</h3>
      <div className="map-grid">
        {lanes.map((lane) => (
          <div
            key={lane}
            className={`lane-box ${teamKey}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(teamKey, lane)}
          >
            <h4>{lane}</h4>
            {teamState[lane] ? (
              <div
                className="player-card"
                draggable
                onDragStart={() => onDragStart(teamState[lane], teamKey, lane)}
                onClick={() => returnToPool(teamKey, lane)}
              >
                {teamState[lane]}
              </div>
            ) : (
              <span className="lane-placeholder">Drop / Tap here</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lol-planner-container">
      <div className="pool-area">
        <h3>Players</h3>
        <div className="pool-list">
          {pool.map((player) => (
            <div
              key={player}
              className="player-card"
              draggable
              onDragStart={() => onDragStart(player, "pool")}
            >
              {player}
            </div>
          ))}
        </div>
      </div>

      <div className="teams-area">
        {renderTeamLane("Blue Team", blueTeam, "blue")}
        {renderTeamLane("Red Team", redTeam, "red")}
      </div>

      <LoLMap
        redTeam={redTeam}
        blueTeam={blueTeam}
        onDropPlayer={(lane, team) => onDrop(team, lane)}
        playerData={playerData}
      />
    </div>
  );
};

export default LoLTeamPlanner;
