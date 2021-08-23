import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ListingContext } from "../../Contexts/ListingContext";
import SessionData, { Listing } from "../../Models/Session";
import { useUpdateSession } from "../../Utils/Hooks";
import EditListingDialog from "./EditListingDialog";
import { getAddressComponents } from "../../Utils/address";

export default function ListingViewer({ listing, session }: IProps) {
  const { setSelectedListing } = React.useContext(ListingContext);

  const [isEditing, setIsEditing] = React.useState(false);

  const updateSessionMutation = useUpdateSession();

  async function handleEditClick() {
    setIsEditing(true);
  }

  async function handleDeleteClick() {
    await updateSessionMutation.mutateAsync({
      ...session,
      listings: session.listings!.filter((l) => l.id !== listing.id),
    });
    setSelectedListing(undefined);
  }

  getAddressComponents(listing.address);

  return (
    <>
      {isEditing && (
        <EditListingDialog
          listing={listing}
          session={session}
          onClose={() => setIsEditing(false)}
        />
      )}
      <Card className="h-100">
        <Card.Header>
          <Button
            size="sm"
            onClick={() => setSelectedListing(undefined)}
          >{`<`}</Button>{" "}
          <span>{listing.name}</span>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="col-sm-5">Price:</Col>
            <Col>{"$" + listing.price}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Bedrooms:</Col>
            <Col>{listing.numberOfBedrooms}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Bathrooms:</Col>
            <Col>{listing.numberOfBathrooms}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Street:</Col>
            <Col>{getAddressComponents(listing.address).street}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">State:</Col>
            <Col>{getAddressComponents(listing.address).state}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button className="mr-1" variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

interface IProps {
  session: SessionData;
  listing: Listing;
}
