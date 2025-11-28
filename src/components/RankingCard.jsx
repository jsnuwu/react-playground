import React, { useState } from "react";
import "../styles/RankingCard.css";

const initialRanking = [
  { name: "Jason", score: 600 },
  { name: "David", score: 600 },
  { name: "Jenny", score: 600 },
  { name: "Felix P", score: 600 },
  { name: "Mechu", score: 600 },
  { name: "Felix S", score: 600 },
  { name: "Mohammed", score: 600 },
  { name: "Nils", score: 600 },
  { name: "Adrian", score: 600 },
  { name: "Kristof", score: 600 },
  { name: "Dennis", score: -2 },
];

const RankingCard = () => {
  const [ranking] = useState(initialRanking);

  const sortedRanking = [...ranking].sort((a, b) => b.score - a.score);

  return (
    <div className="ranking-card">
      <h3>Leaderboard</h3>
      <ol>
        {sortedRanking.map((player, index) => (
          <li key={player.name} className={`rank-item rank-${index + 1}`}>
            <span className="player-name">{player.name}</span>
            <span className="player-score">{player.score} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingCard;
