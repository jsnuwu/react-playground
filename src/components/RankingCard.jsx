import React, { useState } from "react";
import "../styles/RankingCard.css";

const initialRanking = [
  { name: "Jason", score: 1200 },
  { name: "David", score: 1100 },
  { name: "Jenny", score: 1050 },
  { name: "Dennis", score: 950 },
  { name: "Felix P", score: 900 },
  { name: "Mechu", score: 850 },
  { name: "Felix S", score: 800 },
  { name: "Mohammed", score: 750 },
  { name: "Nils", score: 700 },
  { name: "Adrian", score: 650 },
  { name: "Kristof", score: 600 },
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
