import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  // Variants for even faster, more concise entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06, // Even faster stagger
        delayChildren: 0.2, // Quicker overall entry
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 }, // Reduced vertical movement
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5, // Faster duration
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 15 }, // Reduced lift
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.4, // Faster stat entry
      },
    },
  };

  const countRef1 = useRef(null);
  const countRef2 = useRef(null);
  const countRef3 = useRef(null);

  useEffect(() => {
    const animateCount = (ref, targetValue) => {
      const start = 0;
      const duration = 1200; // Even faster count
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        let currentValue;
        if (ref === countRef3) {
          currentValue = Math.min(Math.floor(progress * (targetValue - start) + start), targetValue);
          if (ref.current) {
            ref.current.textContent = `${currentValue}%`;
          }
        } else {
          currentValue = Math.floor(progress * (targetValue - start) + start);
          if (ref.current) {
            ref.current.textContent = `${currentValue}+`;
          }
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.7 });

      if (ref.current) {
        observer.observe(ref.current);
      }
    };

    if (countRef1.current) animateCount(countRef1, 45);
    if (countRef2.current) animateCount(countRef2, 100);
    if (countRef3.current) animateCount(countRef3, 99);
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center overflow-hidden bg-primary">
      {/* Business-centric Background Image with EXTREMELY Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none animate-bg-zoom"
        style={{ backgroundImage: `url('src/assets/bg.png')`, backgroundPosition: 'center right 15%' }} // Slightly more to the right, less image dominance
      >
        {/* Deeper, wider Dark Blue Gradient Overlay, from right to left */}
        {/* Adjusted stops for broader, darker effect across the left */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/85 to-primary opacity-[0.98]"></div> {/* Increased opacity for max darkness */}
        {/* Subtle diagonal pattern overlay (optional) */}
        <div className="absolute inset-0 opacity-[0.03] bg-repeat" style={{ backgroundImage: 'linear-gradient(135deg, #0F2A4A 10%, transparent 10%, transparent 50%, #0F2A4A 50%, #0F2A4A 60%, transparent 60%, transparent 100%)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Main Content Area - Left aligned, sleek and concise */}
      <motion.div
        className="relative z-10 text-left text-surface max-w-5xl w-full ml-0 px-6 md:px-10 lg:px-16 py-14" // Reduced padding, tighter max-width
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-lg"> {/* Even tighter constraint for main text block */}
          <motion.p
            className="text-xs md:text-sm text-secondary uppercase tracking-widest mb-1.5 font-medium drop-shadow-sm" // Smaller, tighter pre-headline
            variants={itemVariants}
          >
            Engineering Excellence
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight drop-shadow-lg" // Reduced headline size
            variants={itemVariants}
          >
            <span className="block">VishwaKarma</span>
            <span className="block text-secondary">Machine Tools</span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base font-light max-w-md mb-8 opacity-90 leading-relaxed drop-shadow-sm" // Reduced paragraph size
            variants={itemVariants}
          >
            Your partner for <span className="text-secondary font-medium">precision manufacturing</span>, <span className="text-secondary font-medium">flexible packaging</span>, and <span className="text-secondary font-medium">efficient bulk production</span>.
          </motion.p>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="mb-12">
            <a
              href="#contact"
              className="inline-flex items-center bg-secondary text-primary px-7 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-xl transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary group"
            >
              Get a Free Consultation
              <svg className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
          </motion.div>
        </div>

        {/* Stats Section - Even more compact */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 mt-10 pt-6 border-t border-surface/10 max-w-3xl" // Reduced gaps, tighter max-width
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6,
              },
            },
          }}
        >
          <motion.div
            className="flex flex-col items-start p-2.5" // Reduced padding
            variants={statCardVariants}
          >
            <p className="text-3xl font-extrabold text-secondary leading-none mb-0.5" ref={countRef1}>0+</p> {/* Smaller text */}
            <p className="text-sm font-semibold text-surface">Years of Expertise</p>
            <p className="mt-0.5 text-xs text-surface opacity-60">Innovating since 1978.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-start p-2.5"
            variants={statCardVariants}
          >
            <p className="text-3xl font-extrabold text-secondary leading-none mb-0.5" ref={countRef2}>0+</p>
            <p className="text-sm font-semibold text-surface">Successful Bulk Orders</p>
            <p className="mt-0.5 text-xs text-surface opacity-60">Trusted by 100+ clients.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-start p-2.5"
            variants={statCardVariants}
          >
            <p className="text-3xl font-extrabold text-secondary leading-none mb-0.5" ref={countRef3}>0%</p>
            <p className="text-sm font-semibold text-surface">Client Satisfaction</p>
            <p className="mt-0.5 text-xs text-surface opacity-60">Dedicated to excellence.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;