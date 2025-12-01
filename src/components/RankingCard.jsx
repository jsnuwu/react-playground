import React, { useState } from "react";
import "../styles/RankingCard.css";

const initialRanking = [
  { name: "Jason", kda: [81, 52, 48], wins: 4, losses: 5 },
  { name: "David", kda: [78, 35, 69], wins: 7, losses: 2 },
  { name: "Jenny", kda: [30, 49, 101], wins: 4, losses: 5 },
  { name: "Dennis", kda: [64, 34, 57], wins: 6, losses: 3 },
  { name: "Felix P", kda: [67, 60, 56], wins: 4, losses: 5 },
  { name: "Mechu", kda: [4, 36, 18], wins: 2, losses: 7 },
  { name: "Felix S", kda: [12, 54, 48], wins: 3, losses: 6 },
  { name: "Mohammed", kda: [42, 42, 53], wins: 3, losses: 6 },
  { name: "Nils", kda: [38, 55, 40], wins: 2, losses: 7 },
  { name: "Adrian", kda: [14, 26, 7], wins: 5, losses: 4 },
  //{ name: "Kristof", kda: [29, 19, 25], wins: 3, losses: 2 },
].map(player => {
  const [kills, deaths, assists] = player.kda;
  const games = player.wins + player.losses;
  const kdaRatio = (kills + assists) / Math.max(1, deaths);
  const winrate = (player.wins / games) * 100;
  return { ...player, kdaRatio, winrate, games };
});

const sortedInitialRanking = [...initialRanking].sort((a, b) => {
  if (b.kdaRatio !== a.kdaRatio) return b.kdaRatio - a.kdaRatio;
  return b.winrate - a.winrate;
});

const RankingCard = () => {
  const [ranking, setRanking] = useState(sortedInitialRanking);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleKDAChange = (index, value) => {
    const newKDA = [...editingPlayer.kda];
    newKDA[index] = Number(value);
    setEditingPlayer({ ...editingPlayer, kda: newKDA });
  };

  const saveKDA = () => {
    const updated = ranking.map(p =>
      p.name === editingPlayer.name
        ? (() => {
            const [kills, deaths, assists] = editingPlayer.kda;
            const games = editingPlayer.wins + editingPlayer.losses;
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
            <span className="player-name">{index + 1}. {player.name}</span>
            <div className="player-details">
              <div>{player.kda[0]} / {player.kda[1]} / {player.kda[2]}</div>
              <div>KDA-Ratio: {player.kdaRatio.toFixed(2)}</div>
              <div>{player.wins}W / {player.losses}L</div>
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
                onChange={e => handleKDAChange(0, e.target.value)}
              />
            </label>
            <label>
              Deaths:
              <input
                type="number"
                value={editingPlayer.kda[1]}
                onChange={e => handleKDAChange(1, e.target.value)}
              />
            </label>
            <label>
              Assists:
              <input
                type="number"
                value={editingPlayer.kda[2]}
                onChange={e => handleKDAChange(2, e.target.value)}
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