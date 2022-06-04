import React from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Form from "./Form";

import "./MainForm.css";

function MainForm({ onSubmit, queryRef, numberOfResultsRef }) {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        ref={queryRef}
        input={{
          id: "query",
          type: "text",
          label:"Search Query"
        }}
      />

      <Input
        ref={numberOfResultsRef}
        input={{
          id: "search-results",
          type: "number",
          label:"Number of Search Results",
          min: "1",
          max: "99",
        }}
      />

      <div className="excel-button-div">
        <Button onClick={onSubmit}>Create Excel</Button>
      </div>
    </Form>
  );
}

export default MainForm;
