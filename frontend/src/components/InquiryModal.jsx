import React, { useState, useEffect } from "react";
import { sendInquiry } from "../api/userApi"; // ✅ import your API function

const InquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Updated handleSubmit to make it dynamic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to backend
      const response = await sendInquiry(formData);

      console.log("✅ Inquiry submitted:", response);

      alert("Thank you! Your inquiry was sent successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      onClose();
    } catch (error) {
      console.error("❌ Error submitting inquiry:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // manage body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary bg-opacity-70 backdrop-filter backdrop-blur-xl"></div>

      <div className="relative z-10 w-full max-w-sm mx-auto bg-surface rounded-xl shadow-2xl border border-border">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-text-secondary hover:text-text-primary"
        >
          ✕
        </button>

        <div className="p-6 text-text-primary">
          <h3 className="text-xl font-bold text-primary mb-1 text-center">
            Send an Inquiry
          </h3>
          <p className="text-center text-text-secondary text-sm mb-6">
            Quickly connect with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-border rounded-3xl"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full px-3 py-2 border border-border rounded-3xl"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-border rounded-3xl"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Your Inquiry..."
              className="w-full px-3 py-2 border border-border rounded-3xl"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-medium py-2 px-4 rounded-3xl shadow-md"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
