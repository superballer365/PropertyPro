import React from "react";
import { useQuery } from "react-query";
import { GetSessionQuery, ListSessionsQuery } from "../../API";
import callGraphQL from "../../graphql/callGraphQL";
import { getSession, listSessions } from "../../graphql/queries";
import SessionData, {
  mapGetSession,
  mapListSessions,
} from "../../Models/Session";

export function useSessions() {
  return useQuery<SessionData[]>("sessions", async () => {
    const result = await callGraphQL<ListSessionsQuery>(listSessions);
    return mapListSessions(result);
  });
}

export function useSession(sessionId: string) {
  return useQuery<SessionData | undefined>(["session", sessionId], async () => {
    const result = await callGraphQL<GetSessionQuery>(getSession, {
      id: sessionId,
    });
    return mapGetSession(result);
  });
}
