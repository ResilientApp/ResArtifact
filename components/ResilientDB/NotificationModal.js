import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NotificationModal = ({ show, title, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="bg-blueGray-700 text-white flex flex-col items-center justify-center absolute w-auto h-auto">
      <Modal.Header closeButton className="text-md uppercase font-bold px-2 py-2">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-2 py-2 text-sm text-white">
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer className="px-2 px-2 bg-white text-blueGray-400 rounded">
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;