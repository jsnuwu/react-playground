import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/EditPlayerComponent.css";

const EditButton = ({ onEdit, playerName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    onEdit();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="edit-button-wrapper" onClick={handleEditClick}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
            fill="#ffffff3b"
          />
        </svg>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div className="edit-modal-overlay" onClick={handleCancel}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
              <p>
                Edit player <strong>{playerName}</strong>?
              </p>
              <div className="edit-modal-buttons">

                <button className="cancel" onClick={handleCancel}>
                  No
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default EditButton;
