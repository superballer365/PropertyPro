import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SessionContext } from "../../Contexts/SessionContext";
import SessionData from "../../Models/Session";

export default function EditSessionDialog({ session, onClose }: IProps) {
  const { updateSession, markDirty } = React.useContext(SessionContext);
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
      const updated = await updateSession({
        id: session!.id, // this feels bad, but will be cleaned up once id is frontend-generated, since it will be on the editableSessionData object
        name: editableSessionData.name!,
        searchCity: editableSessionData.searchCity!,
        searchBounds: editableSessionData.searchBounds!,
      });
      if (updated) markDirty();
      else console.log("Failed to update session!"); // should throw toast here in the future
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
