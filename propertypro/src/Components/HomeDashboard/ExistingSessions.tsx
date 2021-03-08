import React from "react";
import { listSessions } from "../../graphql/queries";
import SessionData, { mapListSessions } from "../../Models/Session";
import callGraphQL from "../../graphql/callGraphQL";
import { ListSessionsQuery } from "../../API";

export default function ExistingSessions() {
  const [loadingSessions, setLoadingSessions] = React.useState(false);
  const [existingSessions, setExistingSessions] = React.useState<SessionData[]>(
    []
  );

  React.useEffect(() => {
    let isStale = false;

    setLoadingSessions(true);
    callGraphQL<ListSessionsQuery>(listSessions)
      .then((result) => {
        const sessions = mapListSessions(result);
        !isStale && setExistingSessions(sessions);
      })
      .catch((err) => console.error("Error getting sessions", err))
      .finally(() => !isStale && setLoadingSessions(false));

    return () => {
      isStale = true;
    };
  }, []);

  if (loadingSessions) return <div>Loading sessions...</div>;
  else if (existingSessions.length > 0)
    return <div>You have some sessions</div>;
  else return <div>No existing sessions</div>;
}
