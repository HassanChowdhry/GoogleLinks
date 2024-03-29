import React from "react";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Form from "./Form";
import LoadingSpinner from "../ui/LoadingSpinner";
import "./ContactForm.css";

function ContactForm() {  
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const messageInputRef = useRef();

  const [isLoading, setIsLoading] = useState();
  const [modalText, setModalText] = useState();
  const [modalType, setModalType] = useState();

  const sendEmail = async (event) => {
    event.preventDefault();
    let emailVerificationRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let name = nameInputRef.current.value.trim();
    let email = emailInputRef.current.value.trim();
    let subject = subjectInputRef.current.value.trim();
    let message = messageInputRef.current.value.trim();
    
    if (
      name.length > 0 &&
      emailVerificationRegex.test(email) &&
      subject.length > 0 &&
      message.length > 0
    ) {
      setIsLoading(true);
      try {
        await emailjs.sendForm(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          event.target,
          process.env.REACT_APP_PUBLIC_KEY
        );
        event.target.reset();
        setModalType('Thank You');
        setModalText('Your message has been sent. Thank you for contacting me!');
      } catch(error) {
        console.error(error);
        setModalType('Error');
        setModalText("Could not send message");
      }
      setIsLoading(false);

    } else if (name.length <= 0) {
      setModalType('Error');
      setModalText("Please enter your name");
    
    } else if (!emailVerificationRegex.test(email)) {
      setModalType('Error');
      setModalText("Please enter a valid email");
    
    } else if (subject.length <= 0) {
      setModalType('Error');
      setModalText("Please enter the subject of your email");
    
    } else if (message.length <= 0) {
      setModalType('Error');
      setModalText("Please enter your message to me!");
    }
  };

  const onCloseModal = () => {
    setModalText(undefined)
  } ;

  return (
    <section className="section">
      <h3>Contact Me</h3>
      {modalText && <Modal text={modalText} onClose={onCloseModal} type={modalType}/>}

      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <Form onSubmit={sendEmail}>
          <Input
            ref={nameInputRef}
            input={{
              id: "name",
              type: "text",
              label: "Name",
              name: "from_name",
            }}
          />

          <Input
            ref={emailInputRef}
            input={{
              id: "email",
              type: "email",
              label: "Email",
              name: "email",
            }}
          />

          <Input
            ref={subjectInputRef}
            input={{
              id: "subject",
              type: "text",
              label: "Subject of email",
              name: "subject",
            }}
          />

          <div>
            <label className="message-label" htmlFor="message">
              Message
            </label>
            <textarea
              ref={messageInputRef}
              id="message"
              className="message"
              name="message"
            />
          </div>

          <div className="submit-div">
            <Button onSubmit={sendEmail}>Submit</Button>
          </div>
        </Form>
      )}
    </section>
  );
}

export default ContactForm;
