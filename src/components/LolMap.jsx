import React from "react";
import "../styles/LolMap.css";

const lanes = ["Top", "Jungle", "Mid", "ADC", "Support"];

const SummonersRiftMap = ({ redTeam, blueTeam, onDrop, onDragStart }) => {
  return (
    <div className="map-container">
        {/*   <img
    src="/path/to/summoners-rift.png"
    alt="Summoner's Rift"
    className="map-bg"
  /> */}
      <svg viewBox="0 0 800 800" className="map-svg">
        {/* Bases */}
        <rect x="650" y="50" width="100" height="100" fill="#ff4d4d" />
        <rect x="50" y="650" width="100" height="100" fill="#4da6ff" />

        {/* Towers */}
        <circle cx="650" cy="150" r="15" fill="#ff4d4d" />
        <circle cx="150" cy="650" r="15" fill="#4da6ff" />

        {/* Lanes placeholders */}
        {lanes.map((lane, index) => {
          const positions = {
            Top: { x: 150, y: 100 },
            Jungle: { x: 400, y: 400 },
            Mid: { x: 400, y: 200 },
            ADC: { x: 650, y: 650 },
            Support: { x: 650, y: 730 },
          };
          const pos = positions[lane];

          return (
            <g
              key={lane}
              className="lane-slot"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(lane)}
            >
              {/* Slot visual */}
              <circle cx={pos.x} cy={pos.y} r={25} fill="rgba(0,0,0,0.2)" />
              {/* Player if assigned */}
              {redTeam[lane] && (
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ff4d4d"
                  draggable
                  onDragStart={() => onDragStart(redTeam[lane], "red", lane)}
                >
                  {redTeam[lane]}
                </text>
              )}
              {blueTeam[lane] && (
                <text
                  x={pos.x}
                  y={pos.y + 30}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#4da6ff"
                  draggable
                  onDragStart={() => onDragStart(blueTeam[lane], "blue", lane)}
                >
                  {blueTeam[lane]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SummonersRiftMap;
