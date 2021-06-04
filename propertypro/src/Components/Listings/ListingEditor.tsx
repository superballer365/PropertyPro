import React from "react";
import { ListingContext } from "../../Contexts/ListingContext";
import { Listing } from "../../Models/Session";

export default function ListingEditor({ listing }: IProps) {
  const { setSelectedListing } = React.useContext(ListingContext);

  return (
    <div onClick={() => setSelectedListing(undefined)}>{listing.name}</div>
  );
}

interface IProps {
  listing: Listing;
}
