import React from "react";
import Button from "./UI/Button";

import "./Form.css";

function Form(props) {
  return (
    <form className="form">

      <div>
        <label htmlFor="query"> Search Query </label>
        <input type="text" id="query" />
      </div>

      <div>
        <label htmlFor="number"> Number of Search Results </label>
        <input type="number" min="1" max="99" id="number" />
      </div>

      <div className="excel-button-div">
        <Button onClick={props.onSubmit}>Create Excel</Button>
      </div>

    </form>
  );
}

export default Form;
