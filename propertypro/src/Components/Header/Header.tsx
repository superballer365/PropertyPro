import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <Navbar className="justify-content-between" bg="secondary" expand="lg">
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
    <div className={styles.container}>
      <Header />
      <Component {...(props as T)} />
    </div>
  );
}
