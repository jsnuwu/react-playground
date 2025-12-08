import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/EditPlayerComponent.css";

const EditButton = ({ player, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: player.name,
    kills: player.kills,
    deaths: player.deaths,
    assists: player.assists,
    wins: player.wins,
    looses: player.looses,
    roundsPlayed: player.roundsPlayed,
  });

    useEffect(() => {
    setForm({
      name: player.name,
      kills: player.kills,
      deaths: player.deaths,
      assists: player.assists,
      wins: player.wins,
      looses: player.looses,
      roundsPlayed: player.roundsPlayed,
    });
  }, [player]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ 
    ...form, 
    [name]: e.target.type === "number" ? Number(value) : value 
  });
};

const handleSave = () => {
  onEdit({ ...form, _id: player._id });
  setShowModal(false);
};


  return (
    <>
      <div
        className="edit-button-wrapper"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 34 34">
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
            fill="#ffffff3b"
          />
        </svg>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div
            className="edit-modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Player</h3>

              <input name="name" value={form.name} onChange={handleChange} />
              <label>Kills</label>
              <input
                name="kills"
                type="number"
                value={form.kills}
                onChange={handleChange}
              />
              <label>Deaths</label>

              <input
                name="deaths"
                type="number"
                value={form.deaths}
                onChange={handleChange}
              />
              <label>Assists</label>

              <input
                name="assists"
                type="number"
                value={form.assists}
                onChange={handleChange}
              />
              <label>Wins</label>

              <input
                name="wins"
                type="number"
                value={form.wins}
                onChange={handleChange}
              />
              <label>Looses</label>

              <input
                name="looses"
                type="number"
                value={form.looses}
                onChange={handleChange}
              />
              <label>Rounds Played</label>

              <input
                name="roundsPlayed"
                type="number"
                value={form.roundsPlayed}
                onChange={handleChange}
              />
              <div className="svg-button-wrapper" onClick={handleSave}>
                <svg height="60" width="190" xmlns="http://www.w3.org/2000/svg">
                  <rect className="svg-shape" height="60" width="190"></rect>
                </svg>
                <div className="svg-text">Yes</div>
              </div>

              <div
                className="svg-button-wrapper"
                onClick={() => setShowModal(false)}
              >
                <svg height="60" width="190" xmlns="http://www.w3.org/2000/svg">
                  <rect className="svg-shape" height="60" width="190"></rect>
                </svg>
                <div className="svg-text">No</div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default EditButton;
