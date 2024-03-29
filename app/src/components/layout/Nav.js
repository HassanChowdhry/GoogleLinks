import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import "./Nav.css";

function Nav({ buttonName, buttonPath }) {
  return (
    <div className="navbar">
      <h3>GoogleLinks</h3>

      <Link className="link" to={buttonPath}>
        <Button className="button">{buttonName}</Button>
      </Link>
    </div>
  );
}

export default Nav;
