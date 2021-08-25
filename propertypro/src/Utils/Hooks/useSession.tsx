import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CreateSessionMutation,
  DeleteSessionMutation,
  GetSessionQuery,
  ListSessionsQuery,
  UpdateSessionMutation,
} from "../../API";
import callGraphQL from "../../graphql/callGraphQL";
import {
  createSession,
  deleteSession,
  updateSession,
} from "../../graphql/mutations";
import { getSession, listSessions } from "../../graphql/queries";
import SessionData, {
  mapGetSession,
  mapListSessions,
  mapUpdateSession,
  sessionDataToApiSessionInput,
} from "../../Models/Session";

export function useSessions() {
  return useQuery<SessionData[]>("sessions", async () => {
    const result = await callGraphQL<ListSessionsQuery>(listSessions);
    return mapListSessions(result);
  });
}

export function useSession(sessionId: string) {
  return useQuery<SessionData | undefined>(
    ["sessions", sessionId],
    async () => {
      const result = await callGraphQL<GetSessionQuery>(getSession, {
        id: sessionId,
      });
      return mapGetSession(result);
    }
  );
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation(
    async (newSession: SessionData) => {
      const createSessionInput = sessionDataToApiSessionInput(newSession);
      const response = await callGraphQL<CreateSessionMutation>(createSession, {
        input: createSessionInput,
      });
      // TODO: map the response to the created SessionData object
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sessions");
      },
    }
  );
}

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedSession: SessionData) => {
      const sessionUpdateInput = sessionDataToApiSessionInput(updatedSession);
      const response = await callGraphQL<UpdateSessionMutation>(updateSession, {
        input: sessionUpdateInput,
      });
      return mapUpdateSession(response);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("sessions");
      },
    }
  );
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation(
    async (sessionId: string) => {
      const response = await callGraphQL<DeleteSessionMutation>(deleteSession, {
        input: { id: sessionId },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sessions");
      },
    }
  );
}
