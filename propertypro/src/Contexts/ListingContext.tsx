import React from "react";
import { Listing } from "../Models/Session";

interface ListingContextState {
  selectedListing: Listing | undefined;
  setSelectedListing: (listing: Listing | undefined) => void;
}

const DEFAULT_LISTING_CONTEXT_STATE: ListingContextState = {
  selectedListing: undefined,
  setSelectedListing: () => {},
};

export const ListingContext = React.createContext(
  DEFAULT_LISTING_CONTEXT_STATE
);

export function ListingContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [selectedListing, setSelectedListing] =
    React.useState<Listing | undefined>(undefined);

  return (
    <ListingContext.Provider value={{ selectedListing, setSelectedListing }}>
      {children}
    </ListingContext.Provider>
  );
}
