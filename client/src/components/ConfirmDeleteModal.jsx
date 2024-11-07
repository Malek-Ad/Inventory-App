import React from "react";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure you want to delete this item?</h3>
        <button className="confirm-button" onClick={onConfirm}>Yes, Delete</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
