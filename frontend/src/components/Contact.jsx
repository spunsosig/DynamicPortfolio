import React, { useState } from 'react';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    alert(`Interview scheduled on ${scheduleForm.date} at ${scheduleForm.time}`);
    setScheduleForm({ name: '', email: '', date: '', time: '', notes: '' });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour++) {
      const formatted = `${hour > 12 ? hour - 12 : hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      slots.push(formatted);
    }
    return slots;
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12"> {/*bg-gradient-to-br from-black via-indigo-900 to-blue-950 */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">

        {/* LEFT PANEL */}
        <div className="text-white flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4">Let’s Talk</h2>
          <p className="mb-4 text-gray-300">
            Interested in working together or booking an interview? Drop a message or schedule a call below.
          </p>

          <div className="space-y-3 text-lg font-mono text-purple-400">
            <a href="mailto:tamal@tamalsen.dev" className="hover:underline">tamal@tamalsen.dev</a>
            <div className="flex gap-4 text-sm text-white">
              <a href="#">Messenger</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
              <a href="#">GitHub</a>
            </div>
          </div>

          {/* Book Interview Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Book an Interview</h3>
            <button
              onClick={() => setShowScheduler(prev => !prev)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
            >
              {showScheduler ? "Hide Scheduler" : "Schedule Now"}
            </button>

            {/* Scheduling Form */}
            {showScheduler && (
              <form onSubmit={handleScheduleSubmit} className="mt-6 space-y-4 bg-[#1e1e3f] p-6 rounded-2xl shadow-lg transition-all">
                <input
                  type="text"
                  name="name"
                  value={scheduleForm.name}
                  onChange={handleScheduleChange}
                  placeholder="Your Name"
                  className="w-full p-3 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={scheduleForm.email}
                  onChange={handleScheduleChange}
                  placeholder="Your Email"
                  className="w-full p-3 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={scheduleForm.date}
                  onChange={handleScheduleChange}
                  className="w-full p-3 rounded-xl bg-[#111827] border border-gray-700 text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
                <select
                  name="time"
                  value={scheduleForm.time}
                  onChange={handleScheduleChange}
                  className="w-full p-3 rounded-xl bg-[#111827] border border-gray-700 text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                >
                  <option value="">Select a time</option>
                  {generateTimeSlots().map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <textarea
                  name="notes"
                  value={scheduleForm.notes}
                  onChange={handleScheduleChange}
                  placeholder="Additional Notes (optional)"
                  rows="3"
                  className="w-full p-3 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3"
                >
                  Submit Booking
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (Contact Form) */}
        <form
          onSubmit={handleContactSubmit}
          className="bg-[#0e0e2a] text-white p-8 rounded-3xl shadow-[inset_20px_20px_60px_#0a0a1a,inset_-20px_-20px_60px_#12123a]"
        >
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
          <input
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleContactChange}
            placeholder="Your Name"
            className="w-full mb-4 p-4 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleContactChange}
            placeholder="Your Email"
            className="w-full mb-4 p-4 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <textarea
            name="message"
            value={contactForm.message}
            onChange={handleContactChange}
            placeholder="Your Message"
            rows="5"
            className="w-full mb-4 p-4 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
