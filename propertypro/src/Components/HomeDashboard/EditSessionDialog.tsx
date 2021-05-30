import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SessionData from "../../Models/Session";
import { useUpdateSession } from "../../Utils/Hooks";

export default function EditSessionDialog({ session, onClose }: IProps) {
  const mutation = useUpdateSession();

  const [editableSessionData, setEditableSessionData] =
    React.useState<SessionData>({ ...session });
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleUpdateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(editableSessionData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      await mutation.mutateAsync({
        id: editableSessionData!.id,
        name: editableSessionData.name!,
        searchCity: editableSessionData.searchCity!,
        searchBounds: editableSessionData.searchBounds!,
      });
      onClose();
    }
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="sessionForm.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="session name"
              value={editableSessionData.name ?? ""}
              onChange={(event: any) =>
                setEditableSessionData((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
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
        <Button variant="primary" onClick={handleUpdateClick}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  session: SessionData;
  onClose: () => void;
}

interface EditSessionFormData {
  name?: string;
}

interface FormDataErrors {
  nameError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
};

function validateFormData(formData: EditSessionFormData): FormDataErrors {
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
