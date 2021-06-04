import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AutoCompleteSuggestion, SearchType } from "../../API/Google Places";
import AddressSearchBar from "../AddressSearchBar/AddressSearchBar";
import {
  Coordinate,
  geocodeByPlaceId,
} from "../../API/Google Places/Geocoding";
import { uuid } from "uuidv4";
import { useUpdateSession } from "../../Utils/Hooks";
import SessionData, { Listing } from "../../Models/Session";

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
      console.log("creating");
      const newListing: Listing = {
        id: uuid(),
        name: formData.name!,
        address: formData.address!,
        location: formData.location!,
      };
      await updateSessionMutation.mutateAsync({
        ...session,
        listings: (session.listings ?? []).concat(newListing),
      });
      onClose();
    }
  }

  async function handleAddressSelect(address: AutoCompleteSuggestion) {
    try {
      const addressGeocodingInfo = await geocodeByPlaceId(address.id);
      // there is guaranteed to be one result
      const addressInfo = addressGeocodingInfo[0];
      console.log(addressInfo);
      setFormData((prev) => ({
        ...prev,
        address: addressInfo.name,
        location: addressInfo.location,
      }));
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
              type="listing name"
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
              isInvalid={!!formDataErrors.addressError}
              searchType={SearchType.Address}
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
  address?: string;
  location?: Coordinate;
}

const DEFAULT_FORM_DATA: CreateListingFormData = {
  name: undefined,
  address: undefined,
  location: undefined,
};

interface FormDataErrors {
  nameError?: string;
  addressError?: string;
  locationError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
  addressError: undefined,
  locationError: undefined,
};

function validateFormData(formData: CreateListingFormData): FormDataErrors {
  let nameError;
  let addressError;
  let locationError;

  if (!formData.name) {
    nameError = "Must provide name for listing";
  }
  if (!formData.address) {
    console.log("address error");
    addressError = "Must enter an address";
  }
  if (!formData.location) {
    locationError = "Could not find address for location";
  }

  return {
    nameError,
    addressError,
    locationError,
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
