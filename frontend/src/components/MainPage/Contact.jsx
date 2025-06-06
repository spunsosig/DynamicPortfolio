import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader } from 'lucide-react';
import { z } from "zod";
import axios from "axios";
import api from '../../utils/api';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}
// Validation with Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const scheduleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  date: z.string().refine((date) => {
    const selected = new Date(date);
    const today = new Date();
    return selected >= today;
  }, "Date must be in the future"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string(),
});

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const inputStyle =
  "w-full p-3 mb-6 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400";

  const buttonStyle = `w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3 ${
    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
  }`;

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const validatedData = contactSchema.safeParse(contactForm);
        if (!validatedData.success) {
            toast.error(validatedData.error.errors[0].message);
            return;
        }

        const response = await api.post('/api/contact', validatedData.data);
        toast.success("Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
        setMessage({ type: "success", text: response.data.message });
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Failed to send message";
        toast.error(errorMsg);
        setMessage({ type: "error", text: errorMsg });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const validatedData = scheduleSchema.safeParse(scheduleForm);
        
        if (!validatedData.success) {
            toast.error(validatedData.error.errors[0].message);
            return;
        }

        const response = await axios.post(
            `${API_URL}/api/schedule`,
            validatedData.data
        );

        toast.success("Interview scheduled successfully! Check your email for confirmation.");
        setScheduleForm({
            name: "",
            email: "",
            date: "",
            time: "",
            notes: ""
        });
        setMessage({ type: "success", text: response.data.message });
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Failed to schedule interview";
        toast.error(errorMsg);
        setMessage({ type: "error", text: errorMsg });
    } finally {
        setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour++) {
        // Store time in MySQL format (HH:mm:ss)
        const timeValue = `${hour.toString().padStart(2, '0')}:00:00`;
        slots.push({
            value: timeValue,
            label: new Date(`2000-01-01T${timeValue}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            })
        });
    }
    return slots;
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Left Panel */}
        <div className="text-white flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4">Let's Talk</h2>
          <p className="mb-4 text-gray-300">
            Reach out or book an interview with me. I would love to hear from you!
          </p>

          <div className="space-y-3 text-lg font-mono text-purple-400">
            <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="hover:underline">
              {import.meta.env.VITE_CONTACT_EMAIL}
            </a>
            <div className="flex gap-4 text-sm text-white">
              <a href={import.meta.env.VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={import.meta.env.VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>

          {/* Interview Scheduler */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Book an Interview</h3>
            <button
              onClick={() => setShowScheduler((prev) => !prev)}
              className={buttonStyle}
            >
              {showScheduler ? "Hide Scheduler" : "Schedule Now"}
            </button>

            {showScheduler && (
              <form
                onSubmit={handleScheduleSubmit}
                className="mt-6 space-y-4 contact-form p-6 rounded-2xl shadow-lg"
              >
                <input
                  type="text"
                  name="name"
                  value={scheduleForm.name}
                  onChange={handleScheduleChange}
                  placeholder="Name"
                  className={inputStyle}
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  value={scheduleForm.email}
                  onChange={handleScheduleChange}
                  placeholder="Email"
                  className={inputStyle}
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="date"
                  name="date"
                  value={scheduleForm.date}
                  onChange={handleScheduleChange}
                  className={`${inputStyle} [&::-webkit-calendar-picker-indicator]:invert`}
                  required
                  disabled={isSubmitting}
                />
                <select
                  name="time"
                  value={scheduleForm.time}
                  onChange={handleScheduleChange}
                  className={inputStyle}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select time</option>
                  {generateTimeSlots().map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                <textarea
                  name="notes"
                  value={scheduleForm.notes}
                  onChange={handleScheduleChange}
                  placeholder="Additional Notes (optional)"
                  rows="3"
                  className={inputStyle}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className={buttonStyle}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader className="animate-spin mr-2" size={16} />
                      Scheduling...
                    </span>
                  ) : (
                    "Submit Booking"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <form
           onSubmit={handleContactSubmit}
           className="contact-form"
        >
          <h2 className="text-3xl text-white font-bold mb-6">Send a Message</h2>
          {message.text && (
            <div
              className={`mb-4 p-3 rounded ${
                message.type === "success"
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}
          <input
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleContactChange}
            placeholder="Name"
            className={inputStyle}
            required
            disabled={isSubmitting}
          />
          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleContactChange}
            placeholder="Email"
            className={inputStyle}
            required
            disabled={isSubmitting}
          />
          <textarea
            name="message"
            value={contactForm.message}
            onChange={handleContactChange}
            placeholder="Message"
            rows="5"
            className={inputStyle}
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={buttonStyle + " text-white"}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" size={16} />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
