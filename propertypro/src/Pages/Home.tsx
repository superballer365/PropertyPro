import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
import NavDropdown from "react-bootstrap/esm/NavDropdown";

export default function Home() {
  const { user, signOut } = React.useContext(AuthorizationContext);

  return (
    <Container className="p-3" fluid>
      <h2>Hello {user?.signInUserSession?.idToken?.payload?.email}</h2>
      <Button variant="primary" onClick={() => signOut()}>
        Sign out
      </Button>
    </Container>
  );
}
