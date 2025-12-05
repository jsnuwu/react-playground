import React, { useRef, useContext } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import Headline from "../pages/Headline";
import "../styles/StatPage.css";
import defaultAvatar from "../assets/profilePictures/default.jpg";

import crown from "../assets/effects/crown.png";
import place2 from "../assets/effects/place2.png";
import place3 from "../assets/effects/place3.png";

import test1 from "../assets/effects/test1.gif";
import test2 from "../assets/effects/test2.gif";
import test3 from "../assets/effects/test3.gif";

const StatPage = () => {
  const { playerData } = useContext(PlayerContext);
  const containerRef = useRef(null);

  const maxKDA = Math.max(
    ...playerData.map((p) => (p.kills + p.assists) / Math.max(1, p.deaths))
  );
  const maxGames = Math.max(...playerData.map((p) => p.wins + p.looses));

  const processedPlayers = playerData.map((player) => {
    const [kills, deaths, assists] = [
      player.kills,
      player.deaths,
      player.assists,
    ];
    const games = player.wins + player.looses;
    const kdaRatio = (kills + assists) / Math.max(1, deaths);
    const winrate = (player.wins / games) * 100;
    const score =
      (kdaRatio / maxKDA) * 0.2 +
      (winrate / 100) * 0.6 +
      (games / maxGames) * 0.3;

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
  const borderGifs = [test1, test2, test3];
  const avatarBorderGifs = [crown, place2, place3];
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
            className={`stat-card card-placement-${index + 1}`}
            style={
              index < borderGifs.length
                ? { "--borderGif": `url(${borderGifs[index]})` }
                : {}
            }
          >
            <div className="player-card-row">
              <div className={`player-placement placement-${index + 1}`}>
                #{index + 1}
              </div>
              <div className="player-avatar-wrapper">
                <div
                  className={`player-avatar ${
                    index === 0 ? "avatar-border-first" : index === 1
                  }`}
                  style={
                    index < avatarBorderGifs.length
                      ? { "--borderGif": `url(${avatarBorderGifs[index]})` }
                      : {}
                  }
                >
                  <img src={player.avatar || defaultAvatar} alt={player.name} />
                </div>
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
