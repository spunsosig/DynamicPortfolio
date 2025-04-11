
import React, { useState } from 'react';

const Contact = () => {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      console.log('Success:', data);

      setName('');
      setEmail('');
      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error while submitting form:', error);
      alert('Failed to submit the form. Please try again later.');
    }
  };

  return (
    <section id="contacts" className="flex items-center justify-center min-h-screen px-4 py-12 text-white">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Feel free to reach out</h1>

        <form onSubmit={handleSubmit} className="bg-[#1a2028] p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-left font-semibold text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#111827] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-left font-semibold text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#111827] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-left font-semibold text-gray-200">Message</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 bg-[#111827] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-md font-semibold text-white tracking-wide"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-purple-400 font-mono text-lg">
          <a href="mailto:upperfloor@2003.gmail.com" className="underline hover:text-purple-300">upperfloor@2003.gmail.com</a>
          <div className="flex justify-center gap-6 mt-4 text-white text-sm font-mono">
            <a href="#">Messenger</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;



