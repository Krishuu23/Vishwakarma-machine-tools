import React, { useState } from 'react';

const Enquiry = () => {
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
    alert('Thank you for your enquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div id='enquiry' className="min-h-screen bg-background text-text-primary flex items-center justify-center p-4 sm:p-6 lg:p-8"> {/* Plain background */}
      <div className="relative z-10 w-full max-w-3xl bg-surface rounded-xl shadow-2xl overflow-hidden animate-fade-in-delay-fast">
        <div className="md:flex">
          {/* Left Section - Plain Dark */}
          <div className="md:w-1/2 p-6 lg:p-8 bg-primary flex flex-col justify-center text-surface relative rounded-l-xl"> {/* No dot pattern, no overflow hidden here */}
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight text-secondary animate-fade-in-up">
                Enquire Today
              </h2>
              <p className="text-white text-base mb-6 animate-fade-in-delay-200">
                Let us know how we can assist you.
              </p>
              <div className="space-y-2 text-sm text-white animate-fade-in-delay-400">
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  <a href="mailto:info@yourcompany.com" className="hover:underline">info@yourcompany.com</a>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-4 h-4 mr-2  text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74A1 1 0 0118 16.847V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                  <a href="tel:+1234567890" className="hover:underline">+1 234 567 8900</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="md:w-1/2 p-6 lg:p-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 animate-fade-in-up">
              Send an Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface-light text-text-primary placeholder:text-text-secondary/70
                             focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out shadow-sm"
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
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface-light text-text-primary placeholder:text-text-secondary/70
                             focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out shadow-sm"
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
                  required // Phone number is now required
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface-light text-text-primary placeholder:text-text-secondary/70
                             focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out shadow-sm"
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
                  rows="4"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface-light text-text-primary placeholder:text-text-secondary/70
                             focus:ring-1 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out shadow-sm resize-y"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-white font-medium py-2.5 px-6 rounded-3xl shadow-md hover:bg-primary transition duration-300 ease-in-out transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;