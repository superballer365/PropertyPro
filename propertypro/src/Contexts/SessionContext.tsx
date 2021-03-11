import React from "react";
import { ListSessionsQuery } from "../API";
import callGraphQL from "../graphql/callGraphQL";
import { listSessions } from "../graphql/queries";
import SessionData, { mapListSessions } from "../Models/Session";

interface ISessionContextState {
  sessions: SessionData[];
  loadingSessions: boolean;
  createSession: (newSession: SessionData) => Promise<boolean>;
  markDirty: () => void;
}

const defaultState: ISessionContextState = {
  sessions: [],
  loadingSessions: false,
  createSession: () => Promise.resolve(false),
  markDirty: () => {},
};

export const SessionContext = React.createContext<ISessionContextState>(
  defaultState
);

export default function SessionContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [sessions, setSessions] = React.useState<SessionData[]>([]);
  const [loadingSessions, setLoadingSessions] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(true);

  const createSessionHandler = React.useCallback(async () => {
    return await Promise.resolve(false);
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
      sessions,
      loadingSessions,
      markDirty: markDirtyHandler,
      createSession: createSessionHandler,
    }),
    [sessions, loadingSessions, markDirtyHandler, createSessionHandler]
  );

  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
}
