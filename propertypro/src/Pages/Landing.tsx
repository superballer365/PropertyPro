import React from "react";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function Landing() {
  const { signIn } = React.useContext(AuthorizationContext);

  return (
    <div>
      <h2>Welcome to PropertyPro!</h2>
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}