import "./ErrorModal.css";

function ErrorModal({ onClose, error }) {
  return (
    <div className="modal-container">
      <div className="modal">
        
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Error!</h2>
        </div>

        <p>{error}</p>
      </div>
    </div>
  );
}

export default ErrorModal;
