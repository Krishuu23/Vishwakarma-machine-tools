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
    // In a real application, you would send this data to an API
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface rounded-3xl shadow-xl overflow-hidden md:flex md:flex-row-reverse md:items-stretch group">
        {/* Background "blob" or abstract shape for visual interest */}
        <div className="absolute inset-0 bg-primary-light opacity-5 animate-pulse-slow pointer-events-none rounded-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary opacity-5 rounded-full filter blur-3xl animate-float-slow group-hover:scale-110 transition-transform duration-500 ease-in-out"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary opacity-5 rounded-full filter blur-3xl animate-float-fast group-hover:scale-105 transition-transform duration-500 ease-in-out"></div>

        {/* Decorative right section for larger screens */}
        <div className="hidden md:flex md:w-1/3 bg-primary p-6 lg:p-8 text-surface flex-col justify-between relative overflow-hidden rounded-r-3xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-10 animate-background-pan"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 leading-tight animate-fade-in-delay-100">
              Let's Connect
            </h2>
            <p className="text-primary-light text-lg animate-fade-in-delay-200">
              We're eager to hear from you. Send us a message and we'll be in touch!
            </p>
          </div>
          <div className="relative z-10 mt-auto text-sm text-primary-light opacity-80 animate-fade-in-delay-400">
            <p>&copy; 2023 Your Company</p>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 lg:p-10 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 animate-fade-in-up">
            Enquire Now
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out text-text-primary bg-surface-light placeholder:text-text-secondary/60
                           shadow-sm hover:border-primary-light"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out text-text-primary bg-surface-light placeholder:text-text-secondary/60
                           shadow-sm hover:border-primary-light"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out text-text-primary bg-surface-light placeholder:text-text-secondary/60
                           shadow-sm hover:border-primary-light"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-300 ease-in-out text-text-primary bg-surface-light placeholder:text-text-secondary/60
                           shadow-sm hover:border-primary-light resize-y"
                placeholder="Tell us more about what you need..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-101 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;