import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AutoCompleteSuggestion, SearchType } from "../../API/Google Places";
import AddressSearchBar from "../AddressSearchBar/AddressSearchBar";
import {
  BoundingBox,
  geocodeByPlaceId,
} from "../../API/Google Places/Geocoding";
import { useCreateSession } from "../../Utils/Hooks";

export default function NewSessionDialog({ onClose }: IProps) {
  const createSessionMutation = useCreateSession();

  const [formData, setFormData] =
    React.useState<CreateSessionFormData>(DEFAULT_FORM_DATA);
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      await createSessionMutation.mutateAsync({
        name: formData.name!,
        searchCity: formData.searchCity!,
        searchBounds: formData.searchBounds!,
      });
      onClose();
    }
  }

  async function handleCitySelect(city: AutoCompleteSuggestion) {
    try {
      const cityGeocodingInfo = await geocodeByPlaceId(city.id);
      console.log(cityGeocodingInfo);
      setFormData((prev) => ({
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
        <Modal.Title>New Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="sessionForm.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="session name"
              value={formData.name ?? ""}
              onChange={(event: any) =>
                setFormData((prev) => ({
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
              onSelect={handleCitySelect}
              isInvalid={!!formDataErrors.searchCityError}
              searchType={SearchType.City}
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
