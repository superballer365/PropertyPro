import React from "react";
import { Listing } from "../Models/Session";

interface ListingContextState {
  selectedListing: Listing | undefined;
  hoveredListingIds: string[];
  setSelectedListing: (listing: Listing | undefined) => void;
  addHoveredListingId: (id: string) => void;
  removeHoveredListingId: (id: string) => void;
}

const DEFAULT_LISTING_CONTEXT_STATE: ListingContextState = {
  selectedListing: undefined,
  hoveredListingIds: [],
  setSelectedListing: () => {},
  addHoveredListingId: () => {},
  removeHoveredListingId: () => {},
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
  const [hoveredListingIds, setHoveredListingIds] = React.useState<string[]>(
    []
  );

  const addHoveredListingId = React.useCallback((id: string) => {
    setHoveredListingIds((prev) => prev.concat(id));
  }, []);

  const removeHoveredListingId = React.useCallback((id: string) => {
    setHoveredListingIds((prev) =>
      prev.filter((existingId) => existingId !== id)
    );
  }, []);

  return (
    <ListingContext.Provider
      value={{
        selectedListing,
        hoveredListingIds,
        setSelectedListing,
        addHoveredListingId,
        removeHoveredListingId,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}
