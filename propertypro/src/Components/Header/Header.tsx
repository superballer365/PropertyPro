import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";

export default function Header() {
  return (
    <Navbar bg="secondary" expand="lg">
      <Navbar.Brand as={Link} to="/" className="text-light font-weight-bold">
        Property Pro
      </Navbar.Brand>

      <HeaderDropdown />
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
