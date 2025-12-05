import React, { useState, useContext } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import defaultAvatar from "../assets/profilePictures/default.jpg";
import "../styles/AddNewPlayer.css";
import Notification from "../components/Notification";

const AddNewPlayer = () => {
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const [notification, setNotification] = useState(null);

  const [form, setForm] = useState({
    name: "",
    kills: 0,
    deaths: 0,
    assists: 0,
    wins: 0,
    looses: 0,
    roundsPlayed: 0,
    avatar: "",
    profileLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["avatar", "profileLink", "name"].includes(name)
        ? value
        : Number(value),
    });
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addPlayer = async () => {
    if (!form.name) return showNotification("Name is required!", "error");

    const newPlayer = {
      name: form.name,
      kills: form.kills,
      deaths: form.deaths,
      assists: form.assists,
      wins: form.wins,
      looses: form.looses,
      roundsPlayed: form.roundsPlayed,
      avatar: form.avatar || null,
      profileLink: form.profileLink || "#",
    };

    try {
const res = await fetch(
  "https://react-playground-backend-l7lj.onrender.com/players",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPlayer),
  }
);

      const createdPlayer = await res.json();

      setPlayerData([
        ...playerData,
        {
          ...createdPlayer,
          avatar: newPlayer.avatar || defaultAvatar,
          profileLink: newPlayer.profileLink || "#",
        },
      ]);
      setForm({
        name: "",
        kills: 0,
        deaths: 0,
        assists: 0,
        wins: 0,
        looses: 0,
        roundsPlayed: 0,
        avatar: "",
        profileLink: "",
      });
      showNotification("Player added successfully!", "success");
    } catch (err) {
      showNotification("Error adding player! Check the backend.", "error");
    }
  };

  return (
    <div className="add-player-container">
      <h2>Add New Player</h2>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="add-player-form">
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-row two-columns">
          <div>
            <label>Kills</label>
            <input
              type="number"
              name="kills"
              value={form.kills}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Deaths</label>
            <input
              type="number"
              name="deaths"
              value={form.deaths}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row two-columns">
          <div>
            <label>Assists</label>
            <input
              type="number"
              name="assists"
              value={form.assists}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Wins</label>
            <input
              type="number"
              name="wins"
              value={form.wins}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row two-columns">
          <div>
            <label>Losses</label>
            <input
              type="number"
              name="looses"
              value={form.looses}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Rounds Played</label>
            <input
              type="number"
              name="roundsPlayed"
              value={form.roundsPlayed}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <label>Avatar URL (optional)</label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Profile Link (optional)</label>
          <input
            type="text"
            name="profileLink"
            value={form.profileLink}
            onChange={handleChange}
          />
        </div>

        <div className="svg-button-wrapper" onClick={addPlayer}>
          <svg height="60" width="190" xmlns="http://www.w3.org/2000/svg">
            <rect className="svg-shape" height="60" width="190"></rect>
          </svg>
          <div className="svg-text">Add Player</div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPlayer;
