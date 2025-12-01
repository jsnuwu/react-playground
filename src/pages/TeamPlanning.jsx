import React, { useState } from "react";
import "../styles/TeamPlanning.css";
import LoLMap from "../components/LolMap";
import "../styles/LolMap.css";

const initialPlayers = [
  "Jason",
  "David",
  "Jenny",
  "Dennis",
  "Felix P",
  "Mechu",
  "Felix S",
  "Mohammed",
  "Nils",
  "Adrian",
  "Kristof",
];

const lanes = ["Top", "Jungle", "Mid", "ADC", "Support"];

const LoLTeamPlanner = () => {
  const [pool, setPool] = useState(initialPlayers);
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

  const onDragStart = (player, fromTeam, lane = null) => {
    setDragged({ player, fromTeam, lane });
  };

  const onDrop = (team, lane) => {
    if (!dragged) return;
    const { player, fromTeam, lane: fromLane } = dragged;

    let newPool = [...pool];
    let newRed = { ...redTeam };
    let newBlue = { ...blueTeam };

    if (fromTeam === "pool") newPool = newPool.filter((p) => p !== player);
    else if (fromTeam === "red") newRed[fromLane] = null;
    else if (fromTeam === "blue") newBlue[fromLane] = null;

    if (team === "red" && newRed[lane] && !newPool.includes(newRed[lane])) {
      newPool.push(newRed[lane]);
    }
    if (team === "blue" && newBlue[lane] && !newPool.includes(newBlue[lane])) {
      newPool.push(newBlue[lane]);
    }

    if (team === "red") newRed[lane] = player;
    if (team === "blue") newBlue[lane] = player;

    setPool(newPool);
    setRedTeam(newRed);
    setBlueTeam(newBlue);
    setDragged(null);
  };

  const returnToPool = (team, lane) => {
    const player = team === "red" ? redTeam[lane] : blueTeam[lane];
    if (!player) return;
    if (team === "red") setRedTeam({ ...redTeam, [lane]: null });
    if (team === "blue") setBlueTeam({ ...blueTeam, [lane]: null });
    setPool([...pool, player]);
  };

  const renderTeamLane = (teamName, teamState, teamKey) => (
    <div className={`team-column ${teamKey}`}>
      <h3>{teamName}</h3>
      <div className="map-grid">
        {lanes.map((lane) => (
          <div
            key={lane}
            className="lane-box"
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
              <span className="lane-placeholder">Drop here</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lol-planner-container">
      <div className='test'>
      {/* Pool */}
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

      {/* Teams */}
      <div className="teams-area">
        {renderTeamLane("Blue Team", blueTeam, "blue")}
        {renderTeamLane("Red Team", redTeam, "red")}
      </div>
      </div>
      <LoLMap
        redTeam={redTeam}
        blueTeam={blueTeam}
        onDropPlayer={(lane, team) => {
          if (!dragged) return;
          const { player, fromTeam, fromLane } = dragged;

          let newPool = [...pool];
          let newRed = { ...redTeam };
          let newBlue = { ...blueTeam };

          if (fromTeam === "pool")
            newPool = newPool.filter((p) => p !== player);
          else if (fromTeam === "red") newRed[fromLane] = null;
          else if (fromTeam === "blue") newBlue[fromLane] = null;

          if (team === "red" && newRed[lane] && !newPool.includes(newRed[lane]))
            newPool.push(newRed[lane]);
          if (
            team === "blue" &&
            newBlue[lane] &&
            !newPool.includes(newBlue[lane])
          )
            newPool.push(newBlue[lane]);

          if (team === "red") newRed[lane] = player;
          if (team === "blue") newBlue[lane] = player;

          setPool(newPool);
          setRedTeam(newRed);
          setBlueTeam(newBlue);
          setDragged(null);
        }}
      />
    </div>
  );
};

export default LoLTeamPlanner;
