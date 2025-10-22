import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-light py-10 sm:py-12 lg:py-16 relative overflow-hidden animate-fade-in-up">
      {/* Subtle background pattern and animated blobs for visual interest */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 animate-background-pan"></div>
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary opacity-5 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute -bottom-5 -right-5 w-48 h-48 bg-surface opacity-[0.03] rounded-full blur-2xl animate-float-fast"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info / Logo */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-surface mb-4 animate-fade-in-delay-100">Vishwakarma</h3>
            <p className="text-lg text-secondary mb-2 animate-fade-in-delay-200">MACHINE TOOLS</p>
            <p className="text-sm animate-fade-in-delay-400">
              Flexible Packaging, Machine, Roto Gravure, Cylinder Manufacture & Maintenance Expert
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-surface mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300">Services</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-surface mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 9a1 1 0 000 2h1a1 1 0 100-2H5zm4-1a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <span>
                  125-126, Industrial Area, Rao, Indore <br/>
                  Madhya Pradesh 453331, India
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>Ph. 0731-2856936</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>info@vishwakarmamachinetools.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <hr className="border-border opacity-20 mt-8 mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Vishwakarma Machine Tools. All rights reserved.</p>
          <p className="mt-1">Designed with <span className="text-error">&hearts;</span> by [Your Name/Company]</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;