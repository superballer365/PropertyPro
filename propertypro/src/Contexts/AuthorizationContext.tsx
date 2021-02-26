import React from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";

interface IAuthorizationContextState {
  user?: any;
  loadingUser: boolean;
  signIn: () => void;
  signOut: () => void;
}

const defaultState: IAuthorizationContextState = {
  user: undefined,
  loadingUser: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthorizationContext = React.createContext<IAuthorizationContextState>(
  defaultState
);

export default function AuthorizationContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [user, setUser] = React.useState<any>();
  const [loadingUser, setLoadingUser] = React.useState(false);

  React.useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setLoadingUser(true);
          setUser(data);
          break;
        case "signOut":
          setUser(undefined);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => console.log("Not signed in"))
      .finally(() => setLoadingUser(false));
  }, []);

  const handleSignIn = React.useCallback(() => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  }, []);

  const handleSignOut = React.useCallback(() => {
    Auth.signOut();
  }, []);

  const contextState: IAuthorizationContextState = React.useMemo(
    () => ({
      user,
      loadingUser,
      signIn: handleSignIn,
      signOut: handleSignOut,
    }),
    [user, loadingUser, handleSignIn, handleSignOut]
  );

  return (
    <AuthorizationContext.Provider value={contextState}>
      {children}
    </AuthorizationContext.Provider>
  );
}
