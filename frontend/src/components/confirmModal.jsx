import React from 'react';
import '../css/confirmModal.css';

const ConfirmModal = ({ message = "Are you sure?", onConfirm, onCancel }) => (
  <div className="confirm-modal">
    <div className="modal-content">
      <p>{message}</p>
      <div className="modal-buttons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;