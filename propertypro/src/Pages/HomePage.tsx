import React from "react";
import Container from "react-bootstrap/Container";
import HomeDashboard from "../Components/HomeDashboard/HomeDashboard";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function HomePage() {
  return (
    <Container className="p-3" fluid>
      <HomeDashboard />
    </Container>
  );
}
