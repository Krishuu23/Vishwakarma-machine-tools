import React, { useState } from 'react';
import InquiryModal from './InquiryModal';

const Navbar = ({ onInquiryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ✅ Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // close mobile menu after click
    }
  };

  return (
    <nav className="bg-surface/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 w-48 h-10">
          <img src="logo.png" alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink onClick={() => scrollToSection('#')}>Home</NavLink>
          <NavLink onClick={() => scrollToSection('#about')}>About</NavLink>
          <NavLink onClick={() => scrollToSection('#products')}>Products</NavLink>
          <NavLink onClick={() => scrollToSection('#blogs')}>Blogs</NavLink>
          <NavLink onClick={() => scrollToSection('#enquiry')}>Inquiry</NavLink>
          <NavLink onClick={() => scrollToSection('#contact')}>Contact</NavLink>
        </div>

        {/* Get Quote Button */}
        <div className="hidden md:flex">
          <button onClick={onInquiryClick} className="bg-secondary text-primary px-7 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-text-primary hover:text-secondary"
            aria-label="Toggle menu"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <MobileNavLink onClick={() => scrollToSection('#home')}>Home</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection('#about')}>About</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection('#products')}>Products</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection('#contact')}>Contact</MobileNavLink>
        </div>
        
      )}
    </nav>
  );
};

// ✅ Desktop NavLink
const NavLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-text-primary font-medium hover:text-secondary transition bg-transparent border-none cursor-pointer"
  >
    {children}
  </button>
);

// ✅ Mobile NavLink
const MobileNavLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition bg-transparent border-none cursor-pointer"
  >
    {children}
  </button>
);

export default Navbar;
