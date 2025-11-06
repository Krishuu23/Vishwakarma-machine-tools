import React from 'react';

const Footer = () => {
  return (
    <footer id='contact' className="bg-primary text-surface py-8 sm:py-10 lg:py-12 relative"> {/* Reduced overall padding */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"> {/* Reduced gap */}

          {/* Company Info / Logo */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-surface mb-0">Vishwakarma</h3> {/* Smaller */}
            <p className="text-lg text-secondary mb-3">MACHINE TOOLS</p> {/* Smaller */}
            <p className="text-xs leading-relaxed text-surface/70"> {/* Smaller text, slightly less opacity */}
              Experts in Flexible Packaging, Precision Machine Manufacturing, efficient bulk production and end-to-end printing & packaging project consultancy
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-surface mb-3">Get in Touch</h4> {/* Smaller margin-bottom */}
            <ul className="space-y-2"> {/* Reduced space-y */}
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> {/* Smaller icon */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <address className="not-italic text-sm text-surface/80"> {/* Smaller text */}
                  Khasra No. 47/1/2, Behind L.G. Academy, CAT road Rau <br />
Dist Indore - 453331.(M.P.)
                </address>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> {/* Smaller icon */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.135l-2.54 1.71a11.02 11.02 0 005.581 5.581l1.71-2.54a1 1 0 011.135-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+917312856936" className="hover:text-secondary transition-colors duration-300 text-sm">Mob. 9826518262 </a> {/* Smaller text */}
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> {/* Smaller icon */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@vishwakarmamachinetools.com" className="hover:text-secondary transition-colors duration-300 text-sm">vmt_tools@yahoo.com</a> {/* Smaller text */}
              </li>
            </ul>
          </div>

          {/* Empty column */}
          <div className="md:col-span-1 hidden lg:block"></div>

        </div>

        {/* Separator */}
        <hr className="border-primary-light opacity-30 mt-8 mb-5" /> {/* Reduced margins */}

        {/* Copyright */}
        <div className="text-center text-xs text-surface/60"> {/* Smaller copyright text */}
          <p>&copy; {new Date().getFullYear()} Vishwakarma Machine Tools. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;