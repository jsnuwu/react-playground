import React, { useState, useEffect } from "react";
import "../styles/RankingCard.css";
import { fetchPlayersFromGitHub, savePlayersToGitHub } from "../api/githubService";
import defaultPlayers from "../data/players";

const RankingCard = () => {
  const [ranking, setRanking] = useState([]);
  const [fileSha, setFileSha] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const processPlayers = (players) => {
    return players
      .map((player) => {
        const [kills, deaths, assists] = [
          player.kills,
          player.deaths,
          player.assists,
        ];
        const games = player.wins + player.looses;
        const kdaRatio = (kills + assists) / Math.max(1, deaths);
        const winrate = (player.wins / Math.max(1, games)) * 100;

        return {
          ...player,
          kda: [kills, deaths, assists],
          kdaRatio,
          winrate,
          games,
        };
      })
      .sort((a, b) => {
        if (b.kdaRatio !== a.kdaRatio) return b.kdaRatio - a.kdaRatio;
        return b.winrate - a.winrate;
      });
  };

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      try {
        const { players, sha } = await fetchPlayersFromGitHub();
        if (players && players.length > 0) {
          setRanking(processPlayers(players));
          setFileSha(sha);
          localStorage.setItem("rankingData", JSON.stringify(players));
        } else {
          setRanking(processPlayers(defaultPlayers));
        }
      } catch {
        setRanking(processPlayers(defaultPlayers));
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  useEffect(() => {
    if (ranking.length > 0) {
      localStorage.setItem("rankingData", JSON.stringify(ranking));
    }
  }, [ranking]);

  const handleKDAChange = (index, value) => {
    const newKDA = [...editingPlayer.kda];
    newKDA[index] = Number(value);
    setEditingPlayer({ ...editingPlayer, kda: newKDA });
  };

  const saveKDA = async () => {
    const updated = ranking.map((p) =>
      p.name === editingPlayer.nameBeforeEdit
        ? (() => {
            const [kills, deaths, assists] = editingPlayer.kda;
            const games = editingPlayer.wins + editingPlayer.looses;
            const kdaRatio = (kills + assists) / Math.max(1, deaths);
            const winrate = (editingPlayer.wins / Math.max(1, games)) * 100;

            return {
              ...editingPlayer,
              kdaRatio,
              winrate,
              games,
            };
          })()
        : p
    );

    const sortedUpdated = updated.sort((a, b) => {
      if (b.kdaRatio !== a.kdaRatio) return b.kdaRatio - a.kdaRatio;
      return b.winrate - a.winrate;
    });

    setRanking(sortedUpdated);

    if (fileSha) {
      try {
        const result = await savePlayersToGitHub(sortedUpdated, fileSha);
        if (result && result.content && result.content.sha) {
          setFileSha(result.content.sha);
        }
      } catch (err) {
        console.error("Fehler beim Speichern zu GitHub:", err);
      }
    }

    setEditingPlayer(null);
  };

  if (loading) return <div>Lädt Spieler...</div>;

  return (
    <div className="ranking-card">
      <ol>
        {ranking.slice(0, 5).map((player, index) => (
          <li
            key={player.name}
            className={`rank-item rank-${index + 1}`}
            onClick={() =>
              setEditingPlayer({ ...player, nameBeforeEdit: player.name })
            }
          >
            <span className="player-name">
              {index + 1}. {player.name}
            </span>
            <div className="player-details">
              <div>
                {player.kda?.[0]} / {player.kda?.[1]} / {player.kda?.[2]}
              </div>
              <div>KDA-Ratio: {player.kdaRatio?.toFixed(2)}</div>
              <div>
                {player.wins}W / {player.looses}L
              </div>
              <div>Winrate: {player.winrate?.toFixed(1)}%</div>
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
              Name:
              <input
                type="text"
                value={editingPlayer.name}
                onChange={(e) =>
                  setEditingPlayer({ ...editingPlayer, name: e.target.value })
                }
              />
            </label>

            <label>
              Wins:
              <input
                type="number"
                value={editingPlayer.wins}
                onChange={(e) =>
                  setEditingPlayer({
                    ...editingPlayer,
                    wins: Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Losses:
              <input
                type="number"
                value={editingPlayer.looses}
                onChange={(e) =>
                  setEditingPlayer({
                    ...editingPlayer,
                    looses: Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Kills:
              <input
                type="number"
                value={editingPlayer.kda?.[0]}
                onChange={(e) => handleKDAChange(0, e.target.value)}
              />
            </label>

            <label>
              Deaths:
              <input
                type="number"
                value={editingPlayer.kda?.[1]}
                onChange={(e) => handleKDAChange(1, e.target.value)}
              />
            </label>

            <label>
              Assists:
              <input
                type="number"
                value={editingPlayer.kda?.[2]}
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
