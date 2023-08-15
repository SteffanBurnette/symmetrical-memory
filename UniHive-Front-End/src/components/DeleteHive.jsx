import "../styles/DeleteHive.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

function Modal({ onClose, onDelete, show, children }) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" id="modal">
      <h2>Delete</h2>
      <div className="content">{children}</div>
      <div className="actions">
        <button className="toggle-button" onClick={handleDelete}>
          Yes
        </button>
        <button className="toggle-button" onClick={onClose}>
          No
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function DeleteHive() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Item deleted!");
  };

  return (
    <div>
      <button
        className="toggle-button-main"
        id="centered-toggle-button"
        onClick={handleShowModal}
      >
        Delete Hive
      </button>
      <Modal onClose={handleCloseModal} onDelete={handleDelete} show={showModal}>
        Are you sure you want to delete the Hive?
      </Modal>
    </div>
  );
}

export default DeleteHive;
