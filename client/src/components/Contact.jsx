// TODO: Add a comment explaining how we are able to extract the key value pairs from props
//this currentPage and handlePageChange were destructed from props
import React, { useState, useEffect, useRef} from "react";
import emailjs from '@emailjs/browser';

// Here we import a helper function that will check if the email is valid
import { validateEmail } from "../utils/helpers";


function Contact() {
  const form = useRef();
  const [userName, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "userName") {
      setName(inputValue);
    }
    else if
      (inputType === "userEmail") {
      setEmail(inputValue);
    }
    else
      setMessage(inputValue)
  };


  const handleSubmitform = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // If everything goes according to plan, we want to clear out the input after a successful submission.
    if (!validateEmail(userEmail)) {
      setErrorMessage('Email is invalid')
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }

    emailjs
        .sendForm('service_tuqpslf', 'template_wrakfqa', form.current, {
          publicKey: 'DSt85W5GUcDpiyjwv',
          // from_name: userName,
          // to_name: "Khoi Phan",
          // message: message,
          // reply_to: userEmail,

        }
        )
        .then(
          (result) => {
            console.log(`${result.text} was sent sucessfully`);
            alert(`Hello ${userName},
             the email was ${result.text} to send to me`)
          },
          (error) => {
            console.log('FAILED...', error.text);
            alert('FAILED...', error.text)
          },
        );
    setErrorMessage("")
    setName("");
    setMessage("");
    setEmail("");


  }

    // When the component mounts to the VDOM, run this callback
    useEffect(() => {
    
    //displayTimeDashBoard();
    //document.title = `${displayTimeDashBoard}° Fahrenheit`;
    },[])

//


  return (

    <section id="contact">
      <div  className="contact-info">
        <div>
        
          <p>Want to get into contact?</p>
          <address className="address">
            San Jose, CA <br />
            Phone: <a href="tel:123.456.7891">123.456.7891</a>
            <br />
            Email:{" "}
            <a href="mailto://jasonphan2631@gmail.com">
              jasonphan2631@gmail.com
            </a>
          </address>
          <p>
            <strong>I'd love to hear your feedback!</strong>
          </p>
        </div>
        </div>
      {/* contact form section  */}
      <div className="contact-form">

  
 
        <h2>Want to keep in touch????</h2>
    
        
        <form className="form" ref={form}>
          {/* Name */}
          <label for="contact-name">Your Name:</label>
          <input
            value={userName}
            name="userName"
            onChange={handleInputChange}
            type="text"
            id="contact-name"
            placeholder="Your Name"
          />

          {/* Email */}
          <label for="contact-email">Your Email:</label>
          <input
            value={userEmail}
            name="userEmail"
            onChange={handleInputChange}
            type="email"
            id="contact-email"
            placeholder="Your Email"
          />

          
          <label for="contact-message">Message:</label>
          <textarea
            value={message}
            name="message"
            onChange={handleInputChange}
            type="message"
            id="contact-message"
            placeholder="Your Message"
          />


    {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
          <button type="button" onClick={handleSubmitform}>
            Submit
          </button>
        </form>
     
      </div>
    </section>

  );
};

export default Contact;
