import React, { useRef, useContext } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import Headline from "../pages/Headline";
import "../styles/StatPage.css";
import defaultAvatar from "../assets/profilePictures/default.jpg";
import blueBoarder from "../assets/effects/blueBoarder.gif";
import blueLighting from "../assets/effects/blueLighing.gif";
import lightning from "../assets/effects/lightning.gif";

const StatPage = () => {
  const { playerData } = useContext(PlayerContext);
  const containerRef = useRef(null);

  const maxKDA = Math.max(
    ...playerData.map((p) => (p.kills + p.assists) / Math.max(1, p.deaths))
  );
  const maxGames = Math.max(...playerData.map((p) => p.wins + p.looses));

  const processedPlayers = playerData.map(player => {
    const [kills, deaths, assists] = [player.kills, player.deaths, player.assists];
    const games = player.wins + player.looses;
    const kdaRatio = (kills + assists) / Math.max(1, deaths);
    const winrate = (player.wins / games) * 100;
    const score = (kdaRatio / maxKDA) * 0.4 + (winrate / 100) * 0.6 + (games / maxGames) * 0.2;

    return {
      ...player,
      kda: [kills, deaths, assists],
      kdaRatio,
      winrate,
      games,
      score,
    };
  });

  const sortedPlayers = [...processedPlayers].sort((a, b) => b.score - a.score);


  return (
    <div className="statpage-container">
      <div
        ref={containerRef}
        style={{ zIndex: 2, textAlign: "center", marginBottom: "2vh" }}
      >
        <Headline
          label="STATISTICS"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          radius={100}
          falloff="linear"
        />
      </div>
      <div className="statpage-grid">
        {sortedPlayers.map((player, index) => (
          <a
            key={index}
            href={player.profileLink}
            target="_blank"
            className={`stat-card ${
              index === 0 || index === 1 ? "stat-card-first" : ""
            }`}
            style={
              index === 0
                ? { "--borderGif": `url(${blueLighting})` }
                : index === 1
                ? { "--borderGif": `url(${lightning})` }
                : {}
            }
          >
            <div className="player-card-row">
              <div className="player-placement">#{index + 1}</div>
              <div
                className={`player-avatar ${
                  index === 0 ? "avatar-border-first" : ""
                }`}
                style={
                  index === 0 ? { "--borderGif": `url(${blueBoarder})` } : {}
                }
              >
                <img src={player.avatar || defaultAvatar} alt={player.name} />
              </div>
              <div className="player-name">
                <h3>{player.name}</h3>
              </div>
              <div className="player-kda">
                <p>
                  KDA: {player.kda[0]} / {player.kda[1]} / {player.kda[2]}
                </p>
              </div>
              <div className="player-kda-ratio">
                <p>KDA-Ratio: {player.kdaRatio.toFixed(2)}</p>
              </div>
              <div className="player-win-loose">
                <p>
                  Wins / Losses: {player.wins} / {player.looses}
                </p>
              </div>
              <div className="player-winrate">
                <p>Winrate: {player.winrate.toFixed(1)}%</p>
              </div>
              <div className="player-playedGames">
                <p>Games Played: {player.games}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StatPage;
