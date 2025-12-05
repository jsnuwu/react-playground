import React, { useState, useContext } from "react";
import { PlayerContext } from "../Data/PlayerContext";
import defaultAvatar from "../assets/profilePictures/default.jpg";
import "../styles/AddNewPlayer.css";

const AddNewPlayer = () => {
  const { playerData, setPlayerData } = useContext(PlayerContext);

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

  const addPlayer = async () => {
    if (!form.name) return alert("Name ist erforderlich!");

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
      const res = await fetch("http://localhost:3000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
      });

      const createdPlayer = await res.json();

      setPlayerData([
        ...playerData,
        { ...createdPlayer, avatar: newPlayer.avatar || defaultAvatar,  profileLink: newPlayer.profileLink || "#" },
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
      alert("Spieler hinzugefügt!");
    } catch (err) {
      console.error("Fehler beim Hinzufügen", err);
      alert("Fehler beim Hinzufügen. Backend prüfen!");
    }
  };

  return (
    <div className="add-player-container">
      <h2>Neuen Spieler erstellen</h2>
      <div className="add-player-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <div className="row">
          <input
            type="number"
            name="kills"
            placeholder="Kills"
            value={form.kills}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deaths"
            placeholder="Deaths"
            value={form.deaths}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <input
            type="number"
            name="assists"
            placeholder="Assists"
            value={form.assists}
            onChange={handleChange}
          />
          <input
            type="number"
            name="wins"
            placeholder="Wins"
            value={form.wins}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <input
            type="number"
            name="looses"
            placeholder="Losses"
            value={form.looses}
            onChange={handleChange}
          />
          <input
            type="number"
            name="roundsPlayed"
            placeholder="Runden gespielt"
            value={form.roundsPlayed}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL (optional)"
          value={form.avatar}
          onChange={handleChange}
        />
        <input
          type="text"
          name="profileLink"
          placeholder="Profil-Link (optional)"
          value={form.profileLink}
          onChange={handleChange}
        />

        <button onClick={addPlayer}>Spieler hinzufügen</button>
      </div>
    </div>
  );
};

export default AddNewPlayer;
