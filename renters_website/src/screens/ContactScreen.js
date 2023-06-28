import React, { useState } from 'react';
import '../style/contact.css';

const ContactPage = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic for sending the email here
    console.log('Email sent:', subject, body);
    // Reset form inputs
    setSubject('');
    setBody('');
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <div className="contact-form">
        <div className="contact-info">
          <p>Phone Number: <span className="phone-number">123-456-7890</span></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={handleBodyChange}
              required
            ></textarea>
          </div>
          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
