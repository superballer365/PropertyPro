import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AutoCompleteSuggestion } from "../../API/Google Places";
import AddressSearchBar from "../AddressSearchBar/AddressSearchBar";
import {
  BoundingBox,
  geocodeByPlaceId,
} from "../../API/Google Places/Geocoding";
import { useUpdateSession } from "../../Utils/Hooks";
import SessionData from "../../Models/Session";

export default function NewListingDialog({ onClose, session }: IProps) {
  const updateSessionMutation = useUpdateSession();

  const [formData, setFormData] =
    React.useState<CreateListingFormData>(DEFAULT_FORM_DATA);
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      await updateSessionMutation.mutateAsync({
        name: formData.name!,
        searchCity: formData.searchCity!,
        searchBounds: formData.searchBounds!,
      });
      onClose();
    }
  }

  async function handleAddressSelect(address: AutoCompleteSuggestion) {
    try {
      const addressGeocodingInfo = await geocodeByPlaceId(address.id);
      console.log(addressGeocodingInfo);
      // setFormData((prev) => ({
      //   ...prev,
      //   searchCity: city.name,
      //   // there is guaranteed to be one result
      //   searchBounds: cityGeocodingInfo[0].boundingBox,
      // }));
    } catch (err) {
      // TODO: show toast and maybe clear the search?
      console.error("Failed to load location information.");
    }
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="listingForm.Name">
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
          <Form.Group controlId="listingForm.Address">
            <Form.Label>Address</Form.Label>
            <AddressSearchBar
              onSelect={handleAddressSelect}
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
        <Button variant="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  onClose: () => void;
  session: SessionData;
}

interface CreateListingFormData {
  name?: string;
  searchCity?: string;
  searchBounds?: BoundingBox;
}

const DEFAULT_FORM_DATA: CreateListingFormData = {
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

function validateFormData(formData: CreateListingFormData): FormDataErrors {
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
