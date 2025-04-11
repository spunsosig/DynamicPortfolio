import React, { useState } from 'react';

const Contact = () => {
  // State variables to hold form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'message') setMessage(value);
  };

  const validateForm = (e) => {
    e.preventDefault();
    console.log("Validating form...");

    // Validation logic
    if (!name || !email || !message) {
      alert('All fields are required!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (!validateForm(e)) return; 

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }), // data to JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // Handle the response from the server
      const data = await response.json();
      console.log('Success:', data);
      // Clear the form after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error while submitting form:', error);
      alert('Failed to submit the form. Please try again later.');
    }
  };

  return (
    <section id='contact' className='page-section h-full'>
      <h2 className="section-heading">Contact</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input className='border-1 border-white' type="text" name="name" value={name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input className='border-1 border-white' type="email" name="email" value={email} onChange={handleChange} required />
      </div>
      <div>
        <label>Message:</label>
        <textarea className='border-1 border-white'  name="message" value={message} onChange={handleChange} required />
      </div>
      <button  className='border-1 border-white bg-grey'  type="submit">Submit</button>
    </form>
    </section>
  );
};

export default Contact;