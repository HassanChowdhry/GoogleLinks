import React from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

import "./Form.css";

function Form({ onSubmit, queryRef, numberOfResultsRef }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <Input
        ref={queryRef}
        label="Search Query"
        input={{
          id: "query",
          type: "text",
        }}
      />

      <Input
        ref={numberOfResultsRef}
        label="Number of Search Results"
        input={{
          id: "search-results",
          type: "number",
          min: "1",
          max: "99",
        }}
      />

      <div className="excel-button-div">
        <Button onClick={onSubmit}>Create Excel</Button>
      </div>
    </form>
  );
}

export default Form;
