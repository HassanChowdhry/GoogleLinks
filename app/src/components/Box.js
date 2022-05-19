import { useState, Fragment } from "react";

import Form from "./Form";
import Button from "./UI/Button";
import "./Box.css";

function Box() {
  const [showForm, setShowForm] = useState(true);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setShowForm(false);
  }

  const onDownloadHandler = () => {} //? may use later on?
 
  const onNewFileHandler = () => {
    setShowForm(true);
  }

  return (
    <div className="box">
      <h3> GoogleLinks </h3>

      {showForm && (
        <Fragment>
          <p>
            Create an excel sheet by entering a query and the number of entries
            you need in the excel sheet
          </p>

          <Form onSubmit = {onSubmitHandler}/>
        </Fragment>
      )}

      {!showForm && (
      <Fragment>
        <div>
          <p>Thank you for using Google Links!</p>
          <p>
            If your excel file was not created, click the button below to
            download it manually
          </p>
          <Button onClick={onDownloadHandler}> Download File </Button>
        </div>

        <div>
          <p>
            If everything went smoothly click the button below to create a new
            excel file.
          </p>
          
          <Button onClick={onNewFileHandler}> New File </Button>
        </div>
      </Fragment>
      )}

    </div>
  );
}

export default Box;
