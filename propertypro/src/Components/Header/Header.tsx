import React, { ReactComponentElement } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

interface IHeaderProps {
  children?: Element;
}

export default function Header() {
  return (
    <Navbar bg="secondary" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Property Pro
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/">home</Nav.Link>
          <Nav.Link href="#foo">foo</Nav.Link>
          <NavDropdown id={"id"} title="Dropdown">
            <NavDropdown.Item href="#action/1">action 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/2">action 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/3">action 3</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/4">action 4</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export function withHeader<T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> {
  return (props) => (
    <>
      <Header />
      <Component {...(props as T)} />
    </>
  );
}
