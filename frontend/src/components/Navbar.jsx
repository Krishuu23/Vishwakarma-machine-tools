import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-surface/90 backdrop-blur-md shadow-lg sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex-shrink-0 w-48 h-10 transition duration-300 ease-in-out transform hover:scale-105"> {/* Adjusted logo size */}
          <img
            src="logo.png"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </a>

        {/* Navigation Links (Hidden on small screens, shown on medium and up) */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center"> {/* Reduced space-x */}
          <NavLink href="#">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#">Machines</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Blogs</NavLink>
          <NavLink href="#">Enquiry</NavLink>
        </div>

        {/* Get Quote Button (Hidden on small screens, shown on medium and up) - Hero CTA Style */}
        <div className="hidden md:flex">
          <button  className="inline-flex items-center bg-secondary text-primary px-7 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-xl transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary group">
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Button (Shown on small screens, hidden on medium and up) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-text-primary hover:text-secondary focus:outline-none
                       transition duration-300 ease-in-out transform active:scale-95"
            aria-label="Toggle mobile menu"
          >
            {/* Hamburger Icon */}
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Slightly smaller icon */}
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditionally rendered based on isMobileMenuOpen state) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block animate-fade-in-up' : 'hidden'}
                      bg-surface-light backdrop-blur-lg border-t border-border/50 py-4`}> {/* Adjusted padding */}
        <div className="px-4 pt-2 pb-3 space-y-2 sm:px-6"> {/* Adjusted padding and space-y */}
          <MobileNavLink href="#">Home</MobileNavLink>
          <MobileNavLink href="#">About</MobileNavLink>
          <MobileNavLink href="#">Machines</MobileNavLink>
          <MobileNavLink href="#">Products</MobileNavLink>
          <MobileNavLink href="#">Blogs</MobileNavLink>
          <MobileNavLink href="#">Enquiry</MobileNavLink>
          {/* Mobile "Get Quote" button also in hero style */}
          <button className="w-full bg-secondary text-surface px-8 py-3 rounded-full text-lg font-bold // Larger padding, bolder text
                           hover:bg-primary-light hover:text-white
                           transition duration-300 ease-in-out mt-4 shadow-lg
                           hover:shadow-xl hover:scale-105 transform
                           focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-75">
            Get Quote
          </button>
        </div>
      </div>
    </nav>
  );
};

// Helper component for desktop navigation links
const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="relative text-text-primary text-md font-medium transition duration-300 ease-in-out
               before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-secondary
               before:transition-all before:duration-300 before:ease-in-out
               hover:text-secondary hover:before:w-full hover:before:opacity-100 py-1" // Added vertical padding
  >
    {children}
  </a>
);

// Helper component for mobile navigation links
const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="block text-text-primary px-3 py-2.5 rounded-md text-base font-medium // Adjusted py
               hover:bg-primary-light hover:text-white
               transition duration-300 ease-in-out transform active:scale-98"
  >
    {children}
  </a>
);

export default Navbar;