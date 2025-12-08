import React from "react";
import players from "../data/players";
import defaultAvatar from "../assets/profilePictures/default.jpg";
import "/src/styles/LolMap.css";
import topIcon from "../assets/laneIcons/topIcon.png";
import jglIcon from "../assets/laneIcons/jglIcon.png";
import midIcon from "../assets/laneIcons/midIcon.png";
import adcIcon from "../assets/laneIcons/adcIcon.png";
import supIcon from "../assets/laneIcons/supIcon.png";

const lanes = ["Top", "Jungle", "Mid", "ADC", "Support", "Bot"];
const laneIcons = {
  Top: topIcon,
  Jungle: jglIcon,
  Mid: midIcon,
  ADC: adcIcon,
  Support: supIcon,
};

const SummonersRiftMap = ({ redTeam, blueTeam, onDrop, onDragStart, playerData }) => {
  const scale = 1;
  const baseSize = 100 * scale;

  const avatarMap = Object.fromEntries(
    playerData.map((p) => [p.name, p.avatar || defaultAvatar])
  );

  const positions = {
    Bases: {
      red: { x: 700, y: 98 },
      blue: { x: 100, y: 702 },
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
    Slots: Object.fromEntries(
      Object.entries(positions.Slots).map(([lane, pos]) => [
        lane,
        { x: pos.x * scale, y: pos.y * scale },
      ])
    ),
  };

  const redOffset = {
    Top: { x: + 130 * scale, y: - 30 * scale },
    Jungle: { x: +95 * scale, y: -80 * scale },
    Mid: { x: +50 * scale, y: -50 * scale },
    ADC: { x: +90 * scale, y: -60 * scale },
    Support: { x: +41 * scale, y: -220 * scale },
  };

  const blueOffset = {
    Top: { x: 10 * scale, y: + 80 * scale },
    Jungle: { x: -30 * scale, y: +50 * scale },
    Mid: { x: -45 * scale, y: 50 * scale },
    ADC: { x: -30 * scale, y: +60 * scale },
    Support: { x: -160 * scale, y: -20 * scale },
  };

  return (
    <div className="map-container">
      <svg viewBox={`0 0 ${800 * scale} ${800 * scale}`} className="map-svg">
        <defs>
          <filter
            id="white-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="white" />
          </filter>
        </defs>

        <image
          href={topIcon}
          x={scaledPositions.Slots.Top.x - 0}
          y={scaledPositions.Slots.Top.y - 35}
          width={80}
          height={80}
          opacity="0.25"
        />
        <image
          href={jglIcon}
          x={scaledPositions.Slots.Jungle.x - 15}
          y={scaledPositions.Slots.Jungle.y - 50}
          width={80}
          height={80}
          opacity="0.25"
        />
        <image
          href={midIcon}
          x={scaledPositions.Slots.Mid.x + 10}
          y={scaledPositions.Slots.Mid.y + 10}
          width={100}
          height={100}
          opacity="0.25"
        />
        <image
          href={supIcon}
          x={scaledPositions.Slots.Support.x - 100}
          y={scaledPositions.Slots.Support.y - 165}
          width={80}
          height={80}
          opacity="0.25"
        />
        <image
          href={adcIcon}
          x={scaledPositions.Slots.ADC.x - -25}
          y={scaledPositions.Slots.ADC.y - 0}
          width={80}
          height={80}
          opacity="0.25"
        />

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

          const renderPlayer = (team, isRed) => {
            const player = team[lane];
            if (!player) return null;

            const offset = isRed ? redOffset[lane] : blueOffset[lane];
            const color = isRed ? "#ff4d4d" : "#4da6ff";

            return (
              <g
                draggable="true"
                onDragStart={() =>
                  onDragStart(player, isRed ? "red" : "blue", lane)
                }
                style={{ cursor: "grab" }}
              >
                {/* Avatar */}
                <image
                  href={avatarMap[player]}
                  x={pos.x + offset.x - 20}
                  y={pos.y + offset.y - 20}
                  width={40}
                  height={40}
                  clipPath="circle(50%)"
                />

                {/* Name */}
                <text
                  x={pos.x + offset.x}
                  y={pos.y + offset.y + 35}
                  textAnchor="middle"
                  fill={color}
                  fontSize="14"
                  fontWeight="600"
                  style={{ userSelect: "none" }}
                >
                  {player}
                </text>
              </g>
            );
          };

          return (
            <g
              key={lane}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(lane)}
            >
              {renderPlayer(redTeam, true)}
              {renderPlayer(blueTeam, false)}
            </g>
          );
        })}
      </svg>
      {/* Lane Background Icons */}
      {lanes.map((lane) => {
        const pos = scaledPositions.Slots[lane];
        if (!pos) return null;

        return (
          <image
            key={`lane-icon-${lane}`}
            href={laneIcons[lane]}
            x={pos.x - 35}
            y={pos.y - 35}
            width={70}
            height={70}
            opacity="0.25"
            style={{ pointerEvents: "none" }} // NICHT draggebar
          />
        );
      })}
    </div>
  );
};

export default SummonersRiftMap;
