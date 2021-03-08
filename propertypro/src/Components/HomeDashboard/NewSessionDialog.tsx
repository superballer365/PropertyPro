import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function NewSessionDialog({ open, onClose }: IProps) {
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're creating a new session!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
