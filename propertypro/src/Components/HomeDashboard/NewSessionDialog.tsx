import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function NewSessionDialog({ open, onClose }: IProps) {
  const [formData, setFormData] = React.useState<CreateSessionFormData>({
    name: "",
  });
  const [formDataErrors, setFormDataErrors] = React.useState<FormDataError>({
    nameError: undefined,
  });

  function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) handleClose();
  }

  function handleClose() {
    onClose();
    resetForm();
  }

  function resetForm() {
    setFormData({ name: "" });
    setFormDataErrors({ nameError: undefined });
  }

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="New Session Name"
              value={formData.name}
              onChange={(event: any) =>
                setFormData((prev) => ({ ...prev, name: event.target.value }))
              }
              isInvalid={!!formDataErrors.nameError}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.nameError}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface CreateSessionFormData {
  name?: string;
}

interface FormDataError {
  nameError?: string;
}

function validateFormData(formData: CreateSessionFormData): FormDataError {
  let nameError;

  if (!formData.name) {
    nameError = "Must provide name for session";
  }

  return {
    nameError,
  };
}

function hasErrors(formDataError: FormDataError) {
  let errorFound = false;

  let key: keyof typeof formDataError;
  for (key in formDataError) {
    if (!!formDataError[key]) errorFound = true;
  }

  return errorFound;
}
