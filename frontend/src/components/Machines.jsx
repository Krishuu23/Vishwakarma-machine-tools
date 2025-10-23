import React from 'react';

const Machines = () => {
  const coreValues = [
    {
      title: "Quality Manufacturing",
      description: "Top-tier rewinding machines with meticulous detail and robust construction.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
    },
    {
      title: "Continuous Innovation",
      description: "Dedicated R&D drives evolution, adapting to challenges, pioneering functionalities.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636 6.364l.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
    },
    {
      title: "Performance Focus",
      description: "Engineered for optimal efficiency and reliability, ensuring outstanding operation.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      ),
    },
    {
      title: "Custom Solutions",
      description: "Beyond standard models, bespoke machinery tailored to client specifications.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section  className="relative py-10 md:py-16 bg-background overflow-hidden text-text-primary"> {/* Reduced section padding */}
      {/* Subtle, integrated background elements (keep dimensions to not consume too much space) */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-primary-light rounded-full mix-blend-multiply opacity-10 blur-3xl animate-blob-1"></div> {/* Smaller */}
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-10 blur-3xl animate-blob-2"></div> {/* Smaller */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-0 md:mb-10"> {/* Reduced margin-bottom */}
          <span className="inline-block px-2 py-0.5 mb-0 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full"> {/* Smaller badge */}
            Our Technology
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sans leading-tight mb-3 text-primary"> {/* Slightly smaller heading */}
            Precision Machines,<br className="hidden md:inline"/> <span className="text-secondary">Engineered for Excellence.</span>
          </h2>
          <p className="text-sm md:text-base font-light max-w-lg mx-auto text-text-secondary opacity-90 leading-relaxed"> {/* Smaller body text, adjusted max-width */}
            At Vishwakarma Machine Tools, we combine innovation with meticulous craftsmanship
            to deliver cutting-edge machinery for unparalleled performance and versatility.
          </p>
        </div>

        {/* Elegant Divider (keep as is, it's already concise) */}
        <div className="flex justify-center mb-0 md:mb-12"> {/* Reduced margin-bottom */}
          <div className="w-16 h-1 bg-gradient-to-r from-secondary to-primary-light rounded-full"></div> {/* Slightly shorter */}
        </div>

        {/* Core Values Grid - Concise card design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"> {/* Reduced gap */}
          {coreValues.map((value) => (
            <div
              key={value.title}
              className="group bg-surface rounded-lg p-5 shadow-sm hover:shadow-lg 
                         transform hover:-translate-y-1 transition-all duration-300 ease-in-out 
                         border border-border/50 hover:border-secondary/60
                         flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-primary-light/5 group-hover:from-secondary/5 group-hover:to-primary-light/10 transition-opacity duration-500 rounded-lg"></div>

              <div className="relative z-10 text-secondary mb-3 group-hover:scale-105 transition-transform duration-300"> {/* Reduced icon margin, less scale */}
                {value.icon}
              </div>
              <h3 className="relative z-10 text-lg font-semibold text-primary mb-1">{value.title}</h3> {/* Smaller title, reduced margin */}
              <p className="relative z-10 text-xs text-text-secondary leading-snug opacity-90">{value.description}</p> {/* Smaller description, tighter line height */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Machines;