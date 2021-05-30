import React from "react";
import {
  CreateSessionMutation,
  DeleteSessionMutation,
  ListSessionsQuery,
  UpdateSessionInput,
} from "../API";
import callGraphQL from "../graphql/callGraphQL";
import {
  createSession,
  updateSession,
  deleteSession,
} from "../graphql/mutations";
import { listSessions } from "../graphql/queries";
import SessionData, {
  mapListSessions,
  sessionDataToApiSessionInput,
} from "../Models/Session";

interface ISessionContextState {
  selectedSession?: SessionData;
  sessions: SessionData[];
  loadingSessions: boolean;
  setSelectedSession: (session: SessionData) => void;
  createSession: (newSession: SessionData) => Promise<boolean>;
  updateSession: (updatedSession: SessionData) => Promise<boolean>;
  deleteSession: (sessionId: string) => Promise<boolean>;
  markDirty: () => void;
}

const defaultState: ISessionContextState = {
  selectedSession: undefined,
  sessions: [],
  loadingSessions: false,
  setSelectedSession: () => {},
  createSession: () => Promise.resolve(false),
  updateSession: () => Promise.resolve(false),
  deleteSession: () => Promise.resolve(false),
  markDirty: () => {},
};

export const SessionContext =
  React.createContext<ISessionContextState>(defaultState);

export default function SessionContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [selectedSession, setSelectedSession] = React.useState<SessionData>();
  const [sessions, setSessions] = React.useState<SessionData[]>([]);
  const [loadingSessions, setLoadingSessions] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(true);

  const createSessionHandler = React.useCallback(
    async (newSession: SessionData) => {
      try {
        const createSessionInput = sessionDataToApiSessionInput(newSession);
        const response = await callGraphQL<CreateSessionMutation>(
          createSession,
          {
            input: createSessionInput,
          }
        );
        if (!!response.errors) {
          console.error("Failed to create session: " + response.errors);
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    []
  );

  const updateSessionHandler = React.useCallback(
    async (updatedSession: SessionData) => {
      try {
        const sessionUpdateInput = sessionDataToApiSessionInput(updatedSession);
        const response = await callGraphQL<UpdateSessionInput>(updateSession, {
          input: sessionUpdateInput,
        });
        if (!!response.errors) {
          console.error("Failed to update session: " + response.errors);
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    []
  );

  const deleteSessionHandler = React.useCallback(async (sessionId: string) => {
    try {
      const response = await callGraphQL<DeleteSessionMutation>(deleteSession, {
        input: { id: sessionId },
      });
      if (!!response.errors) {
        console.error("Failed to delete session: " + response.errors);
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const markDirtyHandler = React.useCallback(() => {
    setIsDirty(true);
  }, []);

  React.useEffect(() => {
    if (!isDirty) return;

    let isStale = false;
    setLoadingSessions(true);
    callGraphQL<ListSessionsQuery>(listSessions)
      .then((result) => {
        const sessions = mapListSessions(result);
        !isStale && setSessions(sessions);
      })
      .catch((err) => console.error("Error getting sessions", err))
      .finally(() => {
        if (!isStale) {
          setLoadingSessions(false);
          setIsDirty(false);
        }
      });

    return () => {
      isStale = true;
    };
  }, [isDirty]);

  const state = React.useMemo<ISessionContextState>(
    () => ({
      selectedSession,
      sessions,
      loadingSessions,
      setSelectedSession,
      markDirty: markDirtyHandler,
      createSession: createSessionHandler,
      updateSession: updateSessionHandler,
      deleteSession: deleteSessionHandler,
    }),
    [
      selectedSession,
      sessions,
      loadingSessions,
      markDirtyHandler,
      createSessionHandler,
      updateSessionHandler,
      deleteSessionHandler,
    ]
  );

  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
}
