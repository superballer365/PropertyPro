import { CreateSessionInput, ListSessionsQuery } from "../API";
import { GraphQLResult } from "@aws-amplify/api";
import { BoundingBox } from "../API/Google Places/Geocoding";

interface SessionData {
  id?: string;
  name: string;
  searchCity: string;
  searchBounds: BoundingBox;
}

export function sessionDataToApiSessionInput(
  sessionData: SessionData
): CreateSessionInput {
  return {
    name: sessionData.name,
    id: sessionData.id,
    searchCity: sessionData.searchCity,
    searchBounds: sessionData.searchBounds,
  };
}

function mapListSessionsQuery(
  listSessionsQuery: GraphQLResult<ListSessionsQuery>
): SessionData[] {
  return (
    listSessionsQuery.data?.listSessions?.items?.map(
      (session) =>
        ({
          id: session?.id,
          name: session?.name,
          searchCity: session?.searchCity,
          searchBounds: session?.searchBounds,
        } as SessionData)
    ) ?? []
  );
}

export default SessionData;
export { mapListSessionsQuery as mapListSessions };
