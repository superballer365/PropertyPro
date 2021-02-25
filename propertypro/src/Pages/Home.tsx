import React from "react";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function Home() {
  const { user, signOut } = React.useContext(AuthorizationContext);

  return (
    <div>
      <p>Hello {user?.signInUserSession?.idToken?.payload?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}