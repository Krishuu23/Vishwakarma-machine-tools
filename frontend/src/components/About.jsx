import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90, 
        damping: 9,
        duration: 0.5
      },
    },
  };

  const imageBlockVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 80, damping: 8, duration: 0.6 } },
    hover: { 
      scale: 1.01,
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 200, damping: 15 } 
    }
  };

  const textBlockVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const textBlockRightVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section 
      ref={ref}
      id="about" 
      className="relative py-12 md:py-20 bg-background overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* PROFESSIONAL BACKGROUND ELEMENT */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-5" // Reduced opacity to be subtle
        style={{ 
          backgroundImage: `url('/path/to/your/abstract-geometric-bg.svg')`, // Replace with your actual SVG/image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) // Slight parallax for depth
        }}
      ></motion.div>

      {/* Existing Background elements with parallax & rotation - further subtle */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-br from-primary-light/2 to-transparent transform -skew-y-1 origin-top-left" // Reduced opacity
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]), opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.08, 0]) }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 w-full h-1/4 bg-gradient-to-tl from-secondary/2 to-transparent transform skew-y-1 origin-bottom-right" // Reduced opacity
        style={{ y: useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]), opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.08, 0]) }}
      ></motion.div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Main Heading & Introduction */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full">
            Our Legacy
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sans leading-tight mb-2 text-primary">
            Meet the <span className="text-secondary text-shadow-glow">Visionaries</span> <br className="hidden md:inline" /> Behind Our Success.
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto text-text-primary">
            Since 1990, Vishwakarma Machine Tools has thrived under the unwavering commitment and pioneering spirit of its esteemed founders.
          </p>
        </motion.div>

        {/* Founder 1: Mr. Mahesh Panchal - Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 mb-16">
          <motion.div 
            className="w-full lg:w-1/2 relative group perspective-1000"
            variants={imageBlockVariants}
            whileHover="hover"
          >
            <div className="relative w-full h-64 sm:h-[350px] overflow-hidden rounded-xl shadow-lg 
                          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-primary/40 before:to-transparent before:opacity-70 before:transition-opacity before:duration-500
                          group-hover:before:opacity-55 
                          after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-gradient-to-t after:from-black/70 after:to-transparent">
              <img
                src="/assets/about.png"
                alt="Mr. Mahesh Panchal, Founder"
                className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-103"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center opacity-100 transition-opacity duration-300">
                <p className="text-xl font-semibold drop-shadow-lg">Mahesh Panchal</p> {/* Increased text size */}
                <p className="text-base">Visionary Founder</p> {/* Increased text size */}
              </div>
            </div>
          </motion.div>
          <motion.div className="w-full lg:w-1/2 text-center lg:text-left" variants={textBlockVariants}>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase bg-primary-light text-background rounded-full">
              Visionary Founder
            </span>
            <h3 className="text-3xl font-extrabold font-sans leading-tight mb-2 text-primary">
              Mahesh Panchal: <span className="text-secondary">The Driving Force.</span>
            </h3>
            <p className="text-base leading-relaxed text-text-primary mb-3">
              With a pioneering spirit and an unwavering dedication, Mr. Mahesh Panchal laid the foundation
              of Vishwakarma Machine Tools. His foresight transformed initial challenges into monumental achievements,
              shaping the company into a leader in the printing and packaging industry.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              His leadership has fostered a culture of continuous innovation and excellence, ensuring that
              every solution we deliver stands as a testament to quality and reliability.
            </p>
          </motion.div>
        </div>

        {/* Separator / Callout for Legacy */}
        <motion.div 
          className="my-16 text-center relative"
          variants={itemVariants}
        >
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-px bg-border z-0 hidden lg:block"></div>
          <span className="inline-block relative z-10 px-6 py-2 bg-primary-light text-background text-xl font-extrabold rounded-full shadow-lg border border-border/70">
            &mdash; Established 1990 &mdash;
          </span>
        </motion.div>

        {/* Founder 2: Ms. Juhi Panchal - Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 lg:gap-12">
          <motion.div 
            className="w-full lg:w-1/2 relative group perspective-1000"
            variants={imageBlockVariants}
            whileHover="hover"
          >
            <div className="relative w-full h-64 sm:h-[350px] overflow-hidden rounded-xl shadow-lg 
                          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-primary/40 before:to-transparent before:opacity-70 before:transition-opacity before:duration-500
                          group-hover:before:opacity-55
                          after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-gradient-to-t after:from-black/70 after:to-transparent">
              <img
                src="/assets/about2.jpg"
                alt="Ms. Juhi Panchal, Co-Founder"
                className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-103"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center opacity-100 transition-opacity duration-300">
                <p className="text-xl font-semibold drop-shadow-lg">Juhi Panchal</p> {/* Increased text size */}
                <p className="text-base">Dynamic Co-Founder</p> {/* Increased text size */}
              </div>
            </div>
          </motion.div>
          <motion.div className="w-full lg:w-1/2 text-center lg:text-right" variants={textBlockRightVariants}>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase bg-primary-light text-background rounded-full">
              Dynamic Co-Founder
            </span>
            <h3 className="text-3xl font-extrabold font-sans leading-tight mb-2 text-primary">
              Juhi Panchal: <span className="text-secondary">The Force of Precision.</span>
            </h3>
            <p className="text-base leading-relaxed text-text-primary mb-3">
              Ms. Juhi Panchal brings a dynamic vision and meticulous approach to Vishwakarma Machine Tools.
              Her dedication to operational excellence and client satisfaction has been instrumental in
              refining our processes and expanding our capabilities across various sectors.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              She inspires a culture of resilience and innovation, ensuring that the company consistently
              delivers exceptional projects with unmatched quality and efficiency.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;