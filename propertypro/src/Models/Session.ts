import { CreateSessionInput, ListSessionsQuery } from "../API";
import { GraphQLResult } from "@aws-amplify/api";

interface SessionData {
  id?: string;
  name: string;
}

export function sessionDataToCreateSessionInput(
  sessionData: SessionData
): CreateSessionInput {
  return { name: sessionData.name, id: sessionData.id };
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
        } as SessionData)
    ) ?? []
  );
}

export default SessionData;
export { mapListSessionsQuery as mapListSessions };
