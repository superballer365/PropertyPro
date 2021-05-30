import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SessionContext } from "../../Contexts/SessionContext";
import { AutoCompleteSuggestion } from "../../API/Google Places";
import AddressSearchBar from "../AddressSearchBar/AddressSearchBar";
import {
  BoundingBox,
  geocodeByPlaceId,
} from "../../API/Google Places/Geocoding";
import SessionData from "../../Models/Session";

export default function SessionDialog({
  type,
  session,
  open,
  onClose,
}: IProps) {
  const { createSession, updateSession, markDirty } =
    React.useContext(SessionContext);
  const [editableSessionData, setEditableSessionData] =
    React.useState<CreateSessionFormData>(
      session ? session : DEFAULT_FORM_DATA
    );
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(editableSessionData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      const created = await createSession({
        name: editableSessionData.name!,
        searchCity: editableSessionData.searchCity!,
        searchBounds: editableSessionData.searchBounds!,
      });
      if (created) markDirty();
      else console.log("Failed to create session!"); // should throw toast here in the future
      onClose();
    }
  }

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

  async function handleCitySelect(city: AutoCompleteSuggestion) {
    try {
      const cityGeocodingInfo = await geocodeByPlaceId(city.id);
      console.log(cityGeocodingInfo);
      setEditableSessionData((prev) => ({
        ...prev,
        searchCity: city.name,
        // there is guaranteed to be one result
        searchBounds: cityGeocodingInfo[0].boundingBox,
      }));
    } catch (err) {
      // TODO: show toast and maybe clear the search?
      console.error("Failed to load location information.");
    }
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "create" ? "New Session" : "Edit Session"}
        </Modal.Title>
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
          <Form.Group controlId="sessionForm.SearchCity">
            <Form.Label>Search City</Form.Label>
            <AddressSearchBar
              defaultInputValue={editableSessionData.searchCity}
              onSelect={handleCitySelect}
              isInvalid={!!formDataErrors.searchCityError}
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
        <Button
          variant="primary"
          onClick={type === "create" ? handleCreateClick : handleUpdateClick}
        >
          {type === "create" ? "Create" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  type: "create" | "update";
  open: boolean;
  session?: SessionData;
  onClose: () => void;
}

interface CreateSessionFormData {
  name?: string;
  searchCity?: string;
  searchBounds?: BoundingBox;
}

const DEFAULT_FORM_DATA: CreateSessionFormData = {
  name: undefined,
  searchCity: undefined,
  searchBounds: undefined,
};

interface FormDataErrors {
  nameError?: string;
  searchCityError?: string;
  searchBoundsError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
  searchCityError: undefined,
  searchBoundsError: undefined,
};

function validateFormData(formData: CreateSessionFormData): FormDataErrors {
  let nameError;
  let searchCityError;
  let searchBoundsError;

  if (!formData.name) {
    nameError = "Must provide name for session";
  }
  if (!formData.searchCity) {
    console.log("search city error");
    searchCityError = "Must enter a search city";
  }
  if (!formData.searchBounds) {
    searchBoundsError = "Search bounds must be computed";
  }

  return {
    nameError,
    searchCityError,
    searchBoundsError,
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
