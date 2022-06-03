import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import Button from '../UI/Button';
import Input from '../UI/Input'
import Form from './Form';
import './ContactForm.css'; 

function ContactForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const messageInputRef = useRef();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', event.target, 'YOUR_PUBLIC_KEY')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    event.target.reset();
  }
  
  return (
    <section className='section'>

      <Form onSubmit={sendEmail}>

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
       
        <Input ref={subjectInputRef} input={{
          id:"subject",
          type:"text",
          label:'subject of email'
        }} />

        <div>
          <label className='message-label' htmlFor='message'>your message</label>
          <textarea ref={messageInputRef} id='message' className='message'/>
        </div> 

        <div className='submit-div'>
          <Button onSubmit={sendEmail}>Submit</Button>
        </div>  
      </Form>
    </section>
  )
};

export default ContactForm;