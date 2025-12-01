import React, { useState } from "react";
import "../styles/RankingCard.css";
import players from "../data/players";

const RankingCard = () => {

  const processedPlayers = players.map((player) => {
    const [kills, deaths, assists] = [player.kills, player.deaths, player.assists];
    const games = player.wins + player.looses;
    const kdaRatio = (kills + assists) / Math.max(1, deaths);
    const winrate = (player.wins / games) * 100;
    return { ...player, kda: [kills, deaths, assists], kdaRatio, winrate, games };
  });

  const sortedPlayers = [...processedPlayers].sort((a, b) => {
    if (b.kdaRatio !== a.kdaRatio) return b.kdaRatio - a.kdaRatio;
    return b.winrate - a.winrate;
  });

  const [ranking, setRanking] = useState(sortedPlayers);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleKDAChange = (index, value) => {
    const newKDA = [...editingPlayer.kda];
    newKDA[index] = Number(value);
    setEditingPlayer({ ...editingPlayer, kda: newKDA });
  };

  const saveKDA = () => {
    const updated = ranking.map((p) =>
      p.name === editingPlayer.name
        ? (() => {
            const [kills, deaths, assists] = editingPlayer.kda;
            const games = editingPlayer.wins + editingPlayer.looses;
            const kdaRatio = (kills + assists) / Math.max(1, deaths);
            const winrate = (editingPlayer.wins / games) * 100;
            return { ...editingPlayer, kdaRatio, winrate, games };
          })()
        : p
    );

    updated.sort((a, b) => {
      if (b.kdaRatio !== a.kdaRatio) return b.kdaRatio - a.kdaRatio;
      return b.winrate - a.winrate;
    });

    setRanking(updated);
    setEditingPlayer(null);
  };

  return (
    <div className="ranking-card">
      <ol>
        {ranking.slice(0, 5).map((player, index) => (
          <li
            key={player.name}
            className={`rank-item rank-${index + 1}`}
            onClick={() => setEditingPlayer(player)}
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

      {editingPlayer && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit {editingPlayer.name}</h4>
            <label>
              Kills:
              <input
                type="number"
                value={editingPlayer.kda[0]}
                onChange={(e) => handleKDAChange(0, e.target.value)}
              />
            </label>
            <label>
              Deaths:
              <input
                type="number"
                value={editingPlayer.kda[1]}
                onChange={(e) => handleKDAChange(1, e.target.value)}
              />
            </label>
            <label>
              Assists:
              <input
                type="number"
                value={editingPlayer.kda[2]}
                onChange={(e) => handleKDAChange(2, e.target.value)}
              />
            </label>

            <div className="modal-buttons">
              <button onClick={saveKDA}>Save</button>
              <button onClick={() => setEditingPlayer(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingCard;