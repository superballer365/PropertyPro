import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ListingContext } from "../../Contexts/ListingContext";
import { Listing } from "../../Models/Session";

export default function ListingEditor({ listing }: IProps) {
  const { setSelectedListing } = React.useContext(ListingContext);

  return (
    <Card>
      <Card.Header>
        <Button
          size="sm"
          onClick={() => setSelectedListing(undefined)}
        >{`<`}</Button>{" "}
        <span>{listing.name}</span>
      </Card.Header>
    </Card>
  );
}

interface IProps {
  listing: Listing;
}
