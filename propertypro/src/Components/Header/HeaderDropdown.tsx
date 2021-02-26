import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";
import { Link } from "react-router-dom";

// TODO customize to make it look more like a proper header dropdown (maybe with a little user circle thing?)
export default function HeaderDropdown() {
  const { signOut } = React.useContext(AuthorizationContext);

  return (
    <DropdownButton
      variant="secondary"
      id="dropdown-basic-button"
      title=""
      menuAlign="right"
    >
      <Dropdown.Item as={Link} to="/Settings">
        Settings
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/About">
        About
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="sign out" onSelect={signOut}>
        Sign Out
      </Dropdown.Item>
    </DropdownButton>
  );
}
