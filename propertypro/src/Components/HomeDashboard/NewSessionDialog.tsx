import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import { SessionContext } from "../../Contexts/SessionContext";
import { googlePlacesAutoComplete, SearchType } from "../../API/Google Places";

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

  async function handleTestButtonClick() {
    const searchText = "Bosto";

    const result = await googlePlacesAutoComplete(searchText, SearchType.City);
    console.log(result);
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
          <Form.Group controlId="sessionForm.Name">
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
          <Form.Group controlId="sessionForm.SearchCity">
            <Form.Label>Search City</Form.Label>
            <Typeahead
              options={["hello", "goodbye"]}
              isInvalid={!!formDataErrors.searchCityError}
              onChange={(value: any) => {
                setFormData((prev) => ({
                  ...prev,
                  searchCity: value,
                }));
              }}
              multiple={false}
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
        <Button variant="primary" onClick={handleTestButtonClick}>
          Test Search
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
  searchCity?: string;
}

const DEFAULT_FORM_DATA: CreateSessionFormData = {
  name: undefined,
};

interface FormDataErrors {
  nameError?: string;
  searchCityError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
  searchCityError: undefined,
};

function validateFormData(formData: CreateSessionFormData): FormDataErrors {
  let nameError;
  let searchCityError;

  if (!formData.name) {
    nameError = "Must provide name for session";
  }
  if (!formData.searchCity) {
    console.log("search city error");
    searchCityError = "Must enter a search city";
  }

  return {
    nameError,
    searchCityError,
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
