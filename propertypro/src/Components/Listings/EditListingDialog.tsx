import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { ListingContext } from "../../Contexts/ListingContext";
import { AutoCompleteSuggestion, SearchType } from "../../API/Google Places";
import AddressSearchBar from "../AddressSearchBar/AddressSearchBar";
import {
  Coordinate,
  geocodeByPlaceId,
} from "../../API/Google Places/Geocoding";
import { useUpdateSession } from "../../Utils/Hooks";
import SessionData, { Listing } from "../../Models/Session";

export default function EditListingDialog({
  onClose,
  session,
  listing,
}: IProps) {
  const { setSelectedListing } = React.useContext(ListingContext);

  const updateSessionMutation = useUpdateSession();

  const [formData, setFormData] = React.useState<EditListingFormData>({
    ...listing,
  });
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleSaveClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      const updatedListing: Listing = {
        id: listing.id,
        name: formData.name!,
        address: formData.address!,
        location: formData.location!,
        price: formData.price!,
        numberOfBedrooms: formData.numberOfBedrooms!,
        numberOfBathrooms: formData.numberOfBathrooms!,
      };
      const updatedListings = (session.listings ?? []).map((l) => {
        if (l.id === listing.id) return updatedListing;
        return l;
      });
      await updateSessionMutation.mutateAsync({
        ...session,
        listings: updatedListings,
      });
      setSelectedListing(updatedListing);
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
        <Modal.Title>Edit Listing</Modal.Title>
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
              defaultInputValue={formData.address}
              onSelect={handleAddressSelect}
              isInvalid={!!formDataErrors.addressError}
              searchType={SearchType.Address}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="listingForm.Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={formData.price ?? ""}
              onChange={(event: any) =>
                setFormData((prev) => ({
                  ...prev,
                  price: event.target.value,
                }))
              }
              isInvalid={!!formDataErrors.priceError}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.priceError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="listingForm.bedrooms">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="number"
                value={formData.numberOfBedrooms ?? ""}
                onChange={(event: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    numberOfBedrooms: event.target.value,
                  }))
                }
                isInvalid={!!formDataErrors.numberOfBedroomsError}
              />
              <Form.Control.Feedback type="invalid">
                {formDataErrors.numberOfBedroomsError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="listingForm.bathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                value={formData.numberOfBathrooms ?? ""}
                onChange={(event: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    numberOfBathrooms: event.target.value,
                  }))
                }
                isInvalid={!!formDataErrors.numberOfBathroomsError}
              />
              <Form.Control.Feedback type="invalid">
                {formDataErrors.numberOfBathroomsError}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  onClose: () => void;
  listing: Listing;
  session: SessionData;
}

interface EditListingFormData {
  name?: string;
  address?: string;
  location?: Coordinate;
  price?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
}

const DEFAULT_FORM_DATA: EditListingFormData = {
  name: undefined,
  address: undefined,
  location: undefined,
  price: undefined,
  numberOfBedrooms: undefined,
  numberOfBathrooms: undefined,
};

interface FormDataErrors {
  nameError?: string;
  addressError?: string;
  locationError?: string;
  priceError?: string;
  numberOfBedroomsError?: string;
  numberOfBathroomsError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
  addressError: undefined,
  locationError: undefined,
  priceError: undefined,
  numberOfBedroomsError: undefined,
  numberOfBathroomsError: undefined,
};

function validateFormData(formData: EditListingFormData): FormDataErrors {
  let nameError,
    addressError,
    locationError,
    priceError,
    numberOfBedroomsError,
    numberOfBathroomsError;

  if (!formData.name) {
    nameError = "Must provide name for listing";
  }
  if (!formData.address) {
    addressError = "Must enter an address";
  }
  if (!formData.location) {
    locationError = "Could not find address for location";
  }

  if (!formData.price) {
    priceError = "Must provide a price for the listing";
  }

  if (!formData.numberOfBedrooms) {
    numberOfBedroomsError = "Must provide a number of bedrooms";
  }

  if (!formData.numberOfBathrooms) {
    numberOfBathroomsError = "Must provide a number of bathrooms";
  }

  return {
    nameError,
    addressError,
    locationError,
    priceError,
    numberOfBedroomsError,
    numberOfBathroomsError,
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
