import React, { useState, useEffect } from 'react';
import InquiryModal from './InquiryModal';

const Navbar = ({ onInquiryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scrollspy: track which section is currently in view
  useEffect(() => {
  const handleScroll = () => {
    const sections = ['#home', '#about', '#products', '#blogs', '#enquiry', '#contact'];
    let current = '#home';

    sections.forEach((id) => {
      const section = document.querySelector(id);
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        // Section is considered active if it has reached top of viewport (adjust offset if needed)
        if (sectionTop <= 80) {
          current = id;
        }
      }
    });

    setActiveSection(current);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // run once on mount to set initial active link
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // close mobile menu on click
    }
  };

  return (
    <nav className="bg-surface/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 w-48 h-10">
          <img src="logo.png" alt="logo" className="h-full w-auto object-contain brightness-110"/>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink onClick={() => scrollToSection('#home')} sectionId="#home" activeSection={activeSection}>Home</NavLink>
          <NavLink onClick={() => scrollToSection('#about')} sectionId="#about" activeSection={activeSection}>About</NavLink>
          <NavLink onClick={() => scrollToSection('#products')} sectionId="#products" activeSection={activeSection}>Products</NavLink>
          <NavLink onClick={() => scrollToSection('#blogs')} sectionId="#blogs" activeSection={activeSection}>Blogs</NavLink>
          <NavLink onClick={() => scrollToSection('#enquiry')} sectionId="#enquiry" activeSection={activeSection}>Inquiry</NavLink>
          <NavLink onClick={() => scrollToSection('#contact')} sectionId="#contact" activeSection={activeSection}>Contact</NavLink>
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
          <MobileNavLink onClick={() => scrollToSection('#home')} sectionId="#home" activeSection={activeSection}>Home</MobileNavLink>
<MobileNavLink onClick={() => scrollToSection('#about')} sectionId="#about" activeSection={activeSection}>About</MobileNavLink>
<MobileNavLink onClick={() => scrollToSection('#products')} sectionId="#products" activeSection={activeSection}>Products</MobileNavLink>
<MobileNavLink onClick={() => scrollToSection('#blogs')} sectionId="#blogs" activeSection={activeSection}>Blogs</MobileNavLink>
<MobileNavLink onClick={() => scrollToSection('#enquiry')} sectionId="#enquiry" activeSection={activeSection}>Inquiry</MobileNavLink>
<MobileNavLink onClick={() => scrollToSection('#contact')} sectionId="#contact" activeSection={activeSection}>Contact</MobileNavLink>

        </div>
      )}
    </nav>
  );
};

// Desktop NavLink with scrollspy
const NavLink = ({ children, onClick, sectionId, activeSection }) => (
  <button
    onClick={onClick}
    className={`text-text-primary font-medium transition bg-transparent border-none cursor-pointer 
  ${activeSection === sectionId ? 'text-secondary font-semibold' : ''} 
  hover:text-secondary`}

  >
    {children}
  </button>
);

// Mobile NavLink with scrollspy
const MobileNavLink = ({ children, onClick, sectionId, activeSection }) => (
  <button
    className={`block w-full text-left px-4 py-2 transition bg-transparent border-none cursor-pointer 
  ${activeSection === sectionId ? 'text-secondary font-semibold' : 'text-gray-800'} 
  hover:text-secondary`}

  >
    {children}
  </button>
);

export default Navbar;
