import { useState, Fragment, useRef } from "react";

import MainForm from "../form/MainForm";
import Button from "../ui/Button";
import ErrorModal from "../ui/ErrorModal";
import * as googleService from "../../service/GoogleService";
import * as excelUtils from "../../service/ExcelUtils";
import LoadingSpinner from "../ui/LoadingSpinner";
import "./Box.css";

function Box() {
  const queryInputRef = useRef();
  const numberOfResultsInputRef = useRef();
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let queryInput = queryInputRef.current.value.trim();
    let numberOfResultsInput = numberOfResultsInputRef.current.value;

    if (
      queryInput.length > 0 &&
      numberOfResultsInput >= 1 &&
      numberOfResultsInput <= 99
    ) {
      setIsLoading(true);
      try {
        const googleResultList = await googleService.search(queryInput, numberOfResultsInput); 
        excelUtils.createExcel(googleResultList, queryInput);
        setShowForm(false);
        
      } catch(error) {
        console.error(error);
        setError(true);
        setErrorText("Could not fetch searches");
      }
      setIsLoading(false);

    } else if (queryInput.length < 1) {
      setError(true);
      setErrorText("To fetch searches you need to add a query");
   
    } else if (numberOfResultsInput < 1 || numberOfResultsInput > 99) {
      setError(true);
      setErrorText("Please enter a search number between 1 and 99");
    }
  };

  const onDownloadHandler = () => {}; //? may use later on?

  const onCloseModal = () => {
    setError(false);
  };

  const onNewFileHandler = () => {
    setShowForm(true);
  };

  return (
    <div className="box">
      <h3> GoogleLinks </h3>

      {error && <ErrorModal error={errorText} onClose={onCloseModal} />}

      {!isLoading && showForm && (
        <Fragment>
          <p>
            Create an excel sheet by entering a query and the number of entries
            you need in the excel sheet
          </p>

          <MainForm
            queryRef={queryInputRef}
            numberOfResultsRef={numberOfResultsInputRef}
            onSubmit={onSubmitHandler}
          />
        </Fragment>
      )}

      {isLoading && <LoadingSpinner />}

      {!isLoading && !showForm && (
        <Fragment>
          <div>
            <p>Thank you for using Google Links!</p>
            <p>
              If your excel file was not created, click the button below to
              download it manually
            </p>
            <Button onClick={onDownloadHandler}>Download File</Button>
          </div>

          <div>
            <p>
              If everything went smoothly click the button below to create a new
              excel file.
            </p>

            <Button onClick={onNewFileHandler}>New File</Button>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Box;