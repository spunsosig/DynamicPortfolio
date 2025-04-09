import React, { useState } from 'react';

const Contact = () => {
  // Define state variables for form inputs
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

    // Here, you can add your validation logic (e.g., check if fields are empty)
    if (!name || !email || !message) {
      alert('All fields are required!');
      return false;
    }

    return true; // Return true if validation passes
  };

  const handleSubmit = async (e) => {
    if (!validateForm(e)) return; // Prevent sending if validation fails

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }), // Convert form data to JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json(); // Parse JSON response
      console.log('Success:', data);
      // Optionally, clear the form after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error while submitting form:', error);
      alert('Failed to submit the form. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleChange} required />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" value={message} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Contact;