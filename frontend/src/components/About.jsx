import React, { useState } from 'react';
import InquiryModal from './InquiryModal';

const About = () => {

  

  return (
    <section id="about" className="relative py-16  md:py-24 bg-background overflow-hidden">
      {/* Background Gradients/Shapes - Colors directly from theme */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary rounded-full mix-blend-multiply opacity-3 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-primary-light rounded-full mix-blend-multiply opacity-3 blur-3xl animate-float-fast animation-delay-500"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Owner's Photo & Key Stats Section (Left/Image Side) */}
          <div className="w-full lg:w-1/2 relative group perspective-1000 animate-fade-in-up">
            <div className="relative w-full h-80 sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl-lg // Updated shadow for depth
                          transition-transform duration-700 ease-in-out transform
                          group-hover:rotate-y-3 group-hover:scale-102">
              {/* Dummy image for Mr. Mahesh Panchal */}
              <img
                src="src/assets/about.png" // Placeholder image might not perfectly match, but the overlay will help
                alt="Mr. Mahesh Panchal, Owner"
                className="absolute inset-0 w-full h-full object-cover object-center
                          transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              {/* Gradient overlay using theme primary color */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6 text-background"> {/* Text color from theme */}
                <h3 className="text-3xl font-extrabold font-sans leading-tight text-shadow-lg">Mahesh Panchal</h3> {/* Applying text-shadow */}
                <p className="text-lg font-light mt-1">Visionary Founder & CEO</p>
              </div>
            </div>
            {/* Sleeker "Accent" Card for Key Stats - Using theme colors */}
            <div className="absolute -bottom-6 lg:-bottom-8 right-6 bg-surface p-4 rounded-lg shadow-xl border border-border/70 
                          transform rotate-2 group-hover:rotate-0 group-hover:scale-105
                          transition-all duration-500 ease-out">
                <p className="text-primary text-lg font-bold">Since <span className="text-secondary">1998</span></p>
                <p className="text-text-secondary text-xs mt-1">Years of Innovation</p>
            </div>
          </div>

          {/* About Text Section (Right Side) - Using theme colors */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up delay-100">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full animate-fade-in-up">
              Our Legacy
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-sans leading-tight mb-6 text-primary animate-fade-in-up delay-200">
              Forging <span className="text-secondary">Excellence</span>,<br className="hidden md:inline" /> Building Futures.
            </h2>
            <p className="text-lg font-light leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0 text-text-primary animate-fade-in delay-300">
              The story of our factory is a testament to unwavering dedication,
              deeply intertwined with the pioneering spirit of Mr. Mahesh Panchal.
              His vision transformed challenges into monumental achievements.
            </p>
            <p className="text-md font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 text-text-primary animate-fade-in delay-400">
              Under his leadership, we've cultivated a culture of innovation and mentorship,
              where skilled artisans consistently deliver exceptional projects.
              Our commitment to quality and resilience remains absolute.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;