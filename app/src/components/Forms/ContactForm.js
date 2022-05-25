import { useRef } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input'
import './ContactForm.css'; 
import Form from './Form';

function ContactForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const messageInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(messageInputRef.current.value);  
  }
  
  return (
    <section className='section'>

      <Form onSubmit={onSubmitHandler}>

        <h3>Contact Me</h3>

        <Input ref={nameInputRef} input={{
          id:"name",
          type:"text",
          label:'your name'
        }} />

        <Input ref={emailInputRef} input={{
          id:"email",
          type:"email",
          label:'your email'
        }} />

        <div>
          <label className='message-label' htmlFor='message'>your message</label>
          <textarea ref={messageInputRef} id='message' className='message'/>
        </div> 

        <div className='submit-div'>
          <Button onSubmit={onSubmitHandler}>Submit</Button>
        </div>  
      </Form>
    </section>
  )
};

export default ContactForm;