import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/DeleteComponent.css";

const DeleteButton = ({ onDelete, playerName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    onDelete();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="delete-button-wrapper" onClick={handleDeleteClick}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="0"
            x2="16"
            y2="16"
            stroke="#ffffff3b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="0"
            x2="0"
            y2="16"
            stroke="#ffffff3b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div  key="delete-modal" className="delete-modal-overlay" onClick={handleCancel}>
            <div
              className="delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Are you sure you want to delete <strong>{playerName}</strong>?
              </p>
              <div className="delete-modal-buttons">
                <button className="confirm" onClick={handleConfirm}>
                  Yes
                </button>
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

export default DeleteButton;
