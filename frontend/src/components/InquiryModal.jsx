import React, { useState, useEffect } from 'react';

const InquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    onClose(); // Close the modal after submission
  };

  // Effect to manage body scroll when modal is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling on the body
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    // Outer container for the fixed modal (no overflow-y-auto here)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurry Overlay Background (Covers entire screen) */}
      <div className="absolute inset-0 bg-primary bg-opacity-70 backdrop-filter backdrop-blur-xl animate-fade-in">
        {/* Animated gradient for depth, ensures bg scrolls with page if body overflow is not hidden */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, #031020, #102F50, #031020)',
          backgroundSize: '200% 100%',
          animation: 'background-pan 40s linear infinite alternate',
        }}></div>
      </div>

      {/* Modal Content - Smaller, White, Simple Design */}
      <div className="relative z-10 w-full max-w-sm mx-auto bg-surface rounded-xl shadow-2xl border border-border animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none z-20"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-6 text-text-primary">
          <h3 className="text-xl font-bold text-primary mb-1 text-center">
            Send an Inquiry
          </h3>
          <p className="text-center text-text-secondary text-sm mb-6">
            Quickly connect with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3"> {/* Even tighter spacing */}
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-3xl bg-background text-text-primary placeholder:text-text-secondary text-sm
                           focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-200 ease-in-out shadow-sm"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-3xl bg-background text-text-primary placeholder:text-text-secondary text-sm
                           focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-200 ease-in-out shadow-sm"
                placeholder="Email Address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-3xl bg-background text-text-primary placeholder:text-text-secondary text-sm
                           focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-200 ease-in-out shadow-sm"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">Your Inquiry</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="3" 
                className="w-full px-3 py-2 border border-border rounded-3xl bg-background text-text-primary placeholder:text-text-secondary text-sm
                           focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-200 ease-in-out shadow-sm resize-none" 
                placeholder="Your Inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-medium py-2 px-4 rounded-3xl shadow-md hover:bg-opacity-90 transition duration-200 ease-in-out transform hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface text-base"
            >
              Send Inquiry
            </button>
          </form>

          {/* Contact details are now more subtle and less prominent */}
          <div className="mt-4 text-center text-text-secondary text-xs">
            <p className="mt-1">
              <a href="mailto:info@yourcompany.com" className="text-secondary hover:underline mr-2">email@company.com</a>
              <a href="tel:+1234567890" className="text-secondary hover:underline">+1 (234) 567-8900</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;