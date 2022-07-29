import { useState, useRef } from "react";
import MainForm from "../form/MainForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import * as googleService from "../../service/GoogleService";
import * as excelUtils from "../../service/ExcelUtils";
import LoadingSpinner from "../ui/LoadingSpinner";
import "./Box.css";

function Box() {
  const queryInputRef = useRef();
  const numberOfResultsInputRef = useRef();
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(undefined);

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

        await excelUtils.createExcel(googleResultList, queryInput);

        setShowForm(false);
      } catch(error) {
        console.error(error);
        setErrorText("Could not fetch searches");
      }
      setIsLoading(false);

    } else if (queryInput.length < 1) {
      setErrorText("To fetch searches you need to add a query");
   
    } else if (numberOfResultsInput < 1 || numberOfResultsInput > 99) {
      setErrorText("Please enter a search number between 1 and 99");
    }
  };

  const onDownloadHandler = () => {}; //TODO: make manual download feature?

  const onCloseModal = () => {
    setErrorText(undefined);
  };

  const onNewFileHandler = () => {
    setShowForm(true);
  };

  return (
    <div className="box">
      <h3> GoogleLinks </h3>

      {errorText && <Modal text={errorText} onClose={onCloseModal} type='Error' />}

      {!isLoading && showForm && (
        <>
          <p>
            Create an excel sheet by entering a query and the number of entries
            you need in the excel sheet
          </p>

          <MainForm
            queryRef={queryInputRef}
            numberOfResultsRef={numberOfResultsInputRef}
            onSubmit={onSubmitHandler}
          />
        </>
      )}

      {isLoading && <LoadingSpinner />}

      {!isLoading && !showForm && (
        <>
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
        </>
      )}
    </div>
  );
}

export default Box;
