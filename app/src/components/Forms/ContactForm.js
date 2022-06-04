import { useRef, useState } from 'react'
import emailjs from 'emailjs-com';
import Button from '../UI/Button';
import Input from '../UI/Input'
import Form from './Form';
import './ContactForm.css'; 

function ContactForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const messageInputRef = useRef();

  const sendEmail = async (event) => {
    event.preventDefault();
    let emailVerificationRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let name = nameInputRef.current.value.trim();
    let email = emailInputRef.current.value.trim(); 
    let subject = subjectInputRef.current.value.trim(); 
    let message = messageInputRef.current.value.trim();
  
    if (name.length > 0 && emailVerificationRegex.test(email) && subject.length > 0 && message.length > 0) {
      
      try {
        await emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, event.target, process.env.REACT_APP_PUBLIC_KEY)
        console.log('works')
        event.target.reset();

      } catch {
        console.log('error')
      }
    } else if (name.length <= 0) {
      // error
    } else if (!emailVerificationRegex.test(email)) {
      // error
    } else if (subject.length <= 0) {
      // error
    } else if (message.length <= 0) {
      // error
    }
  }
  
  return (
    <section className='section'>

      <Form onSubmit={sendEmail}>

        <h3>Contact Me</h3>

        <Input ref={nameInputRef} input={{
          id: "name",
          type: "text",
          label: 'your name',
          name: 'from_name'
        }} />
        
        <Input ref={emailInputRef} input={{
          id: "email",
          type: "email",
          label: 'your email',
          name: 'email'
        }} />
       
        <Input ref={subjectInputRef} input={{
          id:"subject",
          type:"text",
          label:'subject of email',
          name: 'subject'
        }} />

        <div>
          <label className='message-label' htmlFor='message'>your message</label>
          <textarea ref={messageInputRef} id='message' className='message' name='message'/>
        </div> 

        <div className='submit-div'>
          <Button onSubmit={sendEmail}>Submit</Button>
        </div>  
      </Form>
    </section>
  )
};

export default ContactForm;