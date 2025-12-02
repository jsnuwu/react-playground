import React from "react";
import players from "../data/players";
import "../styles/StatPage.css";
import defaultAvatar from "../assets/profilePictures/default.jpg";
import Headline from "../pages/Headline";
import blueBoarder from "../assets/effects/blueLighing.gif";

import { useRef } from "react";
const StatPage = () => {
  const containerRef = useRef(null);
  const processedPlayers = players.map((player) => {
    const [kills, deaths, assists] = [
      player.kills,
      player.deaths,
      player.assists,
    ];
    const games = player.wins + player.looses;
    const kdaRatio = (kills + assists) / Math.max(1, deaths);
    const winrate = (player.wins / games) * 100;
    return {
      ...player,
      kda: [kills, deaths, assists],
      kdaRatio,
      winrate,
      games,
    };
  });
  const sortedPlayers = [...processedPlayers].sort((a, b) => {
    if (b.kdaRatio !== a.kdaRatio) return b.kdaRatio - a.kdaRatio;
    return b.winrate - a.winrate;
  });
  return (
    <div className="statpage-container">
      {" "}
      <div
        ref={containerRef}
        style={{ zIndex: 2, textAlign: "center", marginBottom: "2vh" }}
      >
        {" "}
        <Headline
          label="STATISTICS"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          radius={100}
          falloff="linear"
        />{" "}
      </div>{" "}
      <div className="statpage-grid">
        {" "}
        {sortedPlayers.map((player, index) => (
          <div
            key={index}
            className={`stat-card ${index === 0 ? "stat-card-first" : ""}`}
            style={index === 0 ? { "--borderGif": `url(${blueBoarder})` } : {}}
          >
            {" "}
            <div className="player-card-row">
              {" "}
              <div className="player-placement">#{index + 1}</div>{" "}
              <div className="player-avatar">
                {" "}
                <img
                  src={player.avatar || defaultAvatar}
                  alt={player.name}
                />{" "}
              </div>{" "}
              <div className="player-name">
                {" "}
                <h3>{player.name}</h3>{" "}
              </div>{" "}
              <div className="player-kda">
                {" "}
                <p>
                  {" "}
                  KDA: {player.kda[0]} / {player.kda[1]} / {player.kda[2]}{" "}
                </p>{" "}
              </div>{" "}
              <div className="player-kda-ratio">
                {" "}
                <p>KDA-Ratio: {player.kdaRatio.toFixed(2)}</p>{" "}
              </div>{" "}
              <div className="player-win-loose">
                {" "}
                <p>
                  {" "}
                  Wins / Losses: {player.wins} / {player.looses}{" "}
                </p>{" "}
              </div>{" "}
              <div className="player-winrate">
                {" "}
                <p>Winrate: {player.winrate.toFixed(1)}%</p>{" "}
              </div>{" "}
              <div className="player-playedGames">
                {" "}
                <p>Games Played: {player.games}</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default StatPage;
