import "../styles/RankingCard.css";
import { useContext } from "react";
import { PlayerContext } from "../Data/PlayerContext";

const RankingCard = () => {
  const { playerData, setPlayerData } = useContext(PlayerContext);

  const weightKDA = 0.2;
  const weightWinrate = 0.6;
  const weightGames = 0.3;

  const maxKDA = Math.max(
    ...playerData.map((p) => (p.kills + p.assists) / Math.max(1, p.deaths))
  );
  const maxWinrate = 100;
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
      (kdaRatio / maxKDA) * weightKDA +
      (winrate / maxWinrate) * weightWinrate +
      (games / maxGames) * weightGames;

    return {
      ...player,
      kda: [kills, deaths, assists],
      kdaRatio,
      winrate,
      games,
      score,
    };
  });

  const handleClick = () => {
    const statPageElement = document.querySelector(".statpage-container");
    if (statPageElement) {
      statPageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ranking = [...processedPlayers].sort((a, b) => b.score - a.score);

  return (
    <div className="ranking-card">
      <ol>
        {ranking.slice(0, 4).map((player, index) => (
          <li
            key={player.name}
            className={`rank-item rank-${index + 1}`}
            onClick={handleClick}
          >
            <span className="player-name">
              {index + 1}. {player.name}
            </span>
            <div className="player-details">
              <div>
                {player.kda[0]} / {player.kda[1]} / {player.kda[2]}
              </div>
              <div>KDA-Ratio: {player.kdaRatio.toFixed(2)}</div>
              <div>
                {player.wins}W / {player.looses}L
              </div>
              <div>Winrate: {player.winrate.toFixed(1)}%</div>
              <div>Games: {player.games}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingCard;
