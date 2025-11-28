import React from "react";
import "/src/styles/LolMap.css";

const lanes = ["Top", "Jungle", "Mid", "ADC", "Support", "Bot"];

const SummonersRiftMap = ({ redTeam, blueTeam, onDrop, onDragStart }) => {
  const scale = 1;
  const baseSize = 100 * scale;

  // Originalkoordinaten
  const positions = {
    Bases: {
      red: { x: 700, y: 98 },
      blue: { x: 100, y: 702 },
    },
    Turrets: {
      red: [
        { x: 620, y: 25 },
        { x: 660, y: 125 },
        { x: 750, y: 160 },
      ],
      blue: [
        { x: 170, y: 770 },
        { x: 135, y: 680 },
        { x: 50, y: 650 },
      ],
    },
    Slots: {
      Top: { x: 100, y: 110 },
      Jungle: { x: 250, y: 300 },
      Mid: { x: 400, y: 400 },
      ADC: { x: 600, y: 650 },
      Support: { x: 650, y: 730 },
      Bot: { x: 700, y: 700 },
    },
  };

  // Skalierte Positionen
  const scaledPositions = {
    Bases: {
      red: {
        x: positions.Bases.red.x * scale,
        y: positions.Bases.red.y * scale,
      },
      blue: {
        x: positions.Bases.blue.x * scale,
        y: positions.Bases.blue.y * scale,
      },
    },
    Turrets: {
      red: positions.Turrets.red.map((t) => ({
        x: t.x * scale,
        y: t.y * scale,
      })),
      blue: positions.Turrets.blue.map((t) => ({
        x: t.x * scale,
        y: t.y * scale,
      })),
    },
    Slots: Object.fromEntries(
      Object.entries(positions.Slots).map(([lane, pos]) => [
        lane,
        { x: pos.x * scale, y: pos.y * scale },
      ])
    ),
  };

  // Offset für Namen
  const redOffset = {
    Top: { x: + 20 * scale, y: + 30 * scale },
    Jungle: { x: + 20 * scale, y: - 20 * scale },
    Mid: { x: + 60 * scale, y: -60 * scale },
    ADC: { x: -20 * scale, y: 80 * scale },
    Support: { x: - 220 * scale, y: 0 * scale },
    Bot: { x: -20 * scale, y: 20 * scale },
  };

  const blueOffset = {
    Top: { x: 120 * scale, y: - 30 * scale },
    Jungle: { x: + 280 * scale, y: + 260 * scale },
    Mid: { x: - 55 * scale, y: 60 * scale },
    ADC: { x: 90 * scale, y: -80 * scale },
    Support: { x: 40 * scale, y: - 80 * scale },
    Bot: { x: 60 * scale, y: -30 * scale },
  };

  return (
    <div className="map-container">
      <svg viewBox={`0 0 ${800 * scale} ${800 * scale}`} className="map-svg">
  <defs>
    <filter id="white-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="white" />
    </filter>
  </defs>

        {/* Halbkreise / Spawn Areas */}
        <path
          d={`
    M ${scaledPositions.Bases.red.x + 150} ${scaledPositions.Bases.red.y - 20}
    A ${baseSize} ${baseSize} 0 0 1 
      ${scaledPositions.Bases.red.x - 25} ${
            scaledPositions.Bases.red.y - 240 + baseSize
          }
  `}
          fill="none"
          stroke="#ff4d4d"
          strokeWidth={150}
          opacity="0.6"
        />

        <path
          d={`
    M ${scaledPositions.Bases.blue.x - 150} ${scaledPositions.Bases.blue.y + 20}
    A ${baseSize} ${baseSize} 0 0 1 
      ${scaledPositions.Bases.blue.x + 20} ${
            scaledPositions.Bases.blue.y + 100 + baseSize
          }
  `}
          fill="none"
          stroke="#4da6ff"
          strokeWidth={150}
          opacity="0.6"
        />

        {/* Turrets */}
        {scaledPositions.Turrets.red.map((t, i) => (
          <circle
            key={`red-turret-${i}`}
            cx={t.x}
            cy={t.y}
            r={22 * scale}
            fill="#ff4d4d"
          />
        ))}
        {scaledPositions.Turrets.blue.map((t, i) => (
          <circle
            key={`blue-turret-${i}`}
            cx={t.x}
            cy={t.y}
            r={22 * scale}
            fill="#4da6ff"
          />
        ))}

        {/* Lane Paths */}
        <path
          d={`M ${scaledPositions.Bases.blue.x + -50} ${
            scaledPositions.Bases.blue.y + 15
          } L ${scaledPositions.Slots.Top.x + -50} ${
            scaledPositions.Slots.Top.y + -85
          } L ${scaledPositions.Bases.red.x + 1} ${
            scaledPositions.Bases.red.y + -75
          }`}
          stroke="white"
          strokeWidth={30 * scale}
          fill="none"
          opacity="0.3"
          filter="url(#white-shadow)" 
        />
        <path
          d={`M ${scaledPositions.Bases.blue.x + -20} ${
            scaledPositions.Bases.blue.y + 40
          } L ${scaledPositions.Slots.Mid.x + 20} ${
            scaledPositions.Slots.Mid.y + -20
          } L ${scaledPositions.Bases.red.x + 20} ${
            scaledPositions.Bases.red.y + -38
          }`}
          stroke="white"
          strokeWidth={30 * scale}
          fill="none"
          opacity="0.3"
          filter="url(#white-shadow)" 

        />
        <path
          d={`M ${scaledPositions.Bases.blue.x + 0} ${
            scaledPositions.Bases.blue.y + 70
          } L ${scaledPositions.Slots.Bot.x + 50} ${
            scaledPositions.Slots.Bot.y + 69
          } L ${scaledPositions.Bases.red.x + 50} ${
            scaledPositions.Bases.red.y + -15
          }`}
          stroke="white"
          strokeWidth={30 * scale}
          fill="none"
          opacity="0.3"
          z-index="-1"
          filter="url(#white-shadow)" 
        />

        {/* Bases */}
        <rect
          x={scaledPositions.Bases.red.x - 0 * scale}
          y={scaledPositions.Bases.red.y - 115 * scale}
          width={100 * scale}
          height={100 * scale}
          fill="#ff4d4d"
          rx={10 * scale}
          z-index="1"
        />

        <rect
          x={scaledPositions.Bases.blue.x - 100 * scale}
          y={scaledPositions.Bases.blue.y - -15 * scale}
          width={100 * scale}
          height={100 * scale}
          fill="#4da6ff"
          rx={10 * scale}
        />

        {/* Champion Names */}
        {lanes.map((lane) => {
          const pos = scaledPositions.Slots[lane];
          if (!pos) return null;

          return (
            <g
              key={lane}
              className="lane-slot"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(lane)}
            >
              {redTeam[lane] && (
                <text
                  x={pos.x + redOffset[lane].x}
                  y={pos.y + redOffset[lane].y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ff4d4d"
                  fontSize={1 * scale}
                  draggable
                  onDragStart={() => onDragStart(redTeam[lane], "red", lane)}
                >
                  {redTeam[lane]}
                </text>
              )}
              {blueTeam[lane] && (
                <text
                  x={pos.x + blueOffset[lane].x}
                  y={pos.y + blueOffset[lane].y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#4da6ff"
                  fontSize={14 * scale}
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
