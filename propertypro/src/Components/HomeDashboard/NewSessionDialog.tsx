import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SessionContext } from "../../Contexts/SessionContext";

export default function NewSessionDialog({ open, onClose }: IProps) {
  const { createSession, markDirty } = React.useContext(SessionContext);
  const [formData, setFormData] = React.useState<CreateSessionFormData>(
    DEFAULT_FORM_DATA
  );
  const [formDataErrors, setFormDataErrors] = React.useState<FormDataErrors>(
    DEFAULT_DATA_ERRORS
  );

  React.useEffect(() => {
    // reset on open
    if (open) {
      resetForm();
    }
  }, [open]);

  async function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      const created = await createSession({ name: formData.name! });
      if (created) markDirty();
      else console.log("Failed to create session!"); // should throw toast here in the future
      onClose();
    }
  }

  function resetForm() {
    setFormData(DEFAULT_FORM_DATA);
    setFormDataErrors(DEFAULT_DATA_ERRORS);
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
              value={formData.name ?? ""}
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
        <Button variant="secondary" onClick={onClose}>
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

const DEFAULT_FORM_DATA: CreateSessionFormData = {
  name: undefined,
};

interface FormDataErrors {
  nameError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
};

function validateFormData(formData: CreateSessionFormData): FormDataErrors {
  let nameError;

  if (!formData.name) {
    nameError = "Must provide name for session";
  }

  return {
    nameError,
  };
}

function hasErrors(formDataError: FormDataErrors) {
  let errorFound = false;

  let key: keyof typeof formDataError;
  for (key in formDataError) {
    if (!!formDataError[key]) errorFound = true;
  }

  return errorFound;
}
