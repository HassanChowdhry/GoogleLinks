import React from "react";
import "./Modal.css";

function Modal({ onClose, text, type }) {
  return (
    <div className="modal-container">
      <div className="modal">
        
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>{type}</h2>
        </div>

        <p>{text}</p>
      </div>
    </div>
  );
}

export default Modal;
