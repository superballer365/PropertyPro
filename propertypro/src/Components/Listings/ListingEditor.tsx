import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ListingContext } from "../../Contexts/ListingContext";
import SessionData, { Listing } from "../../Models/Session";
import { useUpdateSession } from "../../Utils/Hooks";

export default function ListingEditor({ listing, session }: IProps) {
  const { setSelectedListing } = React.useContext(ListingContext);

  const updateSessionMutation = useUpdateSession();

  async function handleDeleteClick() {
    await updateSessionMutation.mutateAsync({
      ...session,
      listings: session.listings!.filter((l) => l.id !== listing.id),
    });
    setSelectedListing(undefined);
  }

  return (
    <Card>
      <Card.Header>
        <Button
          size="sm"
          onClick={() => setSelectedListing(undefined)}
        >{`<`}</Button>{" "}
        <span>{listing.name}</span>
      </Card.Header>
      <Card.Body>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

interface IProps {
  session: SessionData;
  listing: Listing;
}
