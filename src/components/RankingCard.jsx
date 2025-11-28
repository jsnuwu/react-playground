import React, { useState } from "react";
import "../styles/RankingCard.css";

const initialRanking = [
  { name: "Jason", kda: [0, 0, 0] },
  { name: "David", kda: [0, 0, 0] },
  { name: "Jenny", kda: [0, 0, 0] },
  { name: "Felix P", kda: [0, 0, 0] },
  { name: "Mechu", kda: [0, 0, 0] },
  { name: "Felix S", kda: [0, 0, 0] },
  { name: "Mohammed", kda: [0, 0, 0] },
  { name: "Nils", kda: [0, 0, 0] },
  { name: "Adrian", kda: [0, 0, 0] },
  { name: "Kristof", kda: [0, 0, 0] },
  { name: "Dennis", kda: [0, 100, 0] },
];

const RankingCard = () => {
  const [ranking, setRanking] = useState(initialRanking);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleKDAChange = (index, value) => {
    const newKDA = [...editingPlayer.kda];
    newKDA[index] = Number(value);
    setEditingPlayer({ ...editingPlayer, kda: newKDA });
  };

  const saveKDA = () => {
    setRanking(
      ranking.map(player =>
        player.name === editingPlayer.name ? editingPlayer : player
      )
    );
    setEditingPlayer(null);
  };

  const sortedRanking = [...ranking].sort((a, b) => {
    const kdaA = (a.kda[0] + a.kda[2]) / Math.max(1, a.kda[1]);
    const kdaB = (b.kda[0] + b.kda[2]) / Math.max(1, b.kda[1]);
    return kdaB - kdaA;
  });

  return (
    <div className="ranking-card">
      <ol>
        {sortedRanking.map((player, index) => (
          <li
            key={player.name}
            className={`rank-item rank-${index + 1}`}
            onClick={() => setEditingPlayer(player)}
          >
            <span className="player-name">{player.name}</span>
            <span className="player-score">
              {player.kda.join(" / ")} KDA
            </span>
          </li>
        ))}
      </ol>

      {editingPlayer && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit {editingPlayer.name}</h4>
            <label>
              Kills:{" "}
              <input
                type="number"
                value={editingPlayer.kda[0]}
                onChange={e => handleKDAChange(0, e.target.value)}
              />
            </label>
            <label>
              Deaths:{" "}
              <input
                type="number"
                value={editingPlayer.kda[1]}
                onChange={e => handleKDAChange(1, e.target.value)}
              />
            </label>
            <label>
              Assists:{" "}
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
