// src/components/BlogSectionHorizontal.jsx
import React, { useState, useEffect } from 'react';

// Dummy blog post images (replace with actual blog images later)
import blog1 from '../assets/blog1.png'; // Using webp for better performance
import blog2 from '../assets/blog2.png';
import blog3 from '../assets/blog3.png';


const dummyBlogs = [
  {
    id: 'b1',
    title: 'Sustainable Practices in Plastic Recycling',
    excerpt: 'Learn about innovative methods to minimize environmental impact and promote a circular economy in plastic production.',
    fullContent: `In the ever-evolving landscape of Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit culpa accusamus est temporibus eius et ipsam autem incidunt, molestias, eum minima! Ipsum ipsam labore doloribus illo nam saepe exercitationem rem molestias voluptas, laborum est nihil ullam, facilis officiis obcaecati delectus suscipit neque magni nesciunt deleniti veritatis, ducimus qui doloremque laboriosam. Laborum ipsam vero dignissimos quo amet harum blanditiis ipsum doloribus facere perferendis eligendi ea delectus ducimus officia animi, minus, rerum ex voluptates dolor omnis commodi iusto exercitationem ipsa quam! Natus possimus, mollitia ipsum provident enim quis quod laborum sunt aliquam, praesentium adipisci quisquam a tempora doloremque similique molestiae maiores! Numquam omnis enim modi cum ullam amet, pariatur odit quaerat, veritatis laborum sunt temporibus!industrial innovation, sustainable practices in plastic recycling have emerged as a pivotal force. The global push for a circular economy, where resources are kept in use for as long as possible, has catalyzed significant advancements in how we approach plastic waste. From advanced sorting technologies to chemical recycling breakthroughs, the industry is witnessing a transformative shift. This article delves into the cutting-edge methods that not only mitigate environmental impact but also create new economic opportunities. We explore the lifecycle assessment of recycled plastics, the challenges of mixed plastic waste, and the collaborative efforts between industry, government, and consumers to foster a truly sustainable future. The journey towards zero plastic waste is ambitious, but with continuous innovation and collective commitment, it is an achievable goal.`,
    image: blog1,
    date: 'April 10, 2024',
    author: 'Environmental Team',
    link: '#',
  },
  {
    id: 'b2',
    title: 'Precision Engineering: Machine Design Core',
    excerpt: 'An inside look at meticulous design and engineering processes for unparalleled accuracy and reliability.',
    fullContent: `Precision engineering stands as the bedrock of modern manufacturing, demanding meticulous attention to detail and an unwavering commitment to accuracy. At the core of every high-performance machine lies a design philosophy that prioritizes unparalleled reliability and functionality. This in-depth analysis uncovers the intricate processes involved in machine design, from initial conceptualization to advanced material selection and rigorous testing. We highlight the role of computational fluid dynamics (CFD), finite element analysis (FEA), and rapid prototyping in achieving microscopic tolerances and optimal performance. The pursuit of perfection in engineering not only ensures the longevity and efficiency of industrial machinery but also paves the way for innovations across diverse sectors, including aerospace, medical devices, and robotics.`,
    image: blog2,
    date: 'April 05, 2024',
    author: 'Engineering Dept.',
    link: '#',
  },
  {
    id: 'b3',
    title: 'Evolution of Advanced Packaging Materials',
    excerpt: 'From biodegradable films to smart packaging, explore the latest trends and future outlook for materials.',
    fullContent: `The packaging industry is undergoing a profound evolution, driven by consumer demands for sustainability, convenience, and enhanced product protection. This article takes a deep dive into the fascinating world of advanced packaging materials, tracing their development from conventional plastics to revolutionary biodegradable films, compostable polymers, and innovative smart packaging solutions. We examine how breakthroughs in material science are enabling packaging that extends shelf life, provides tamper-evident features, and even communicates with consumers through integrated sensors. The future of packaging is poised to be more intelligent, environmentally responsible, and adaptive to the unique requirements of various products, setting new benchmarks for efficiency and ecological stewardship.`,
    image: blog3,
    date: 'March 28, 2024',
    author: 'Packaging Solutions',
    link: '#',
  },
];

const Blogs = () => {
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    setIsBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlog(null); // Clear selected blog when closing
  };

  // Effect to manage body scroll when modal is open/closed
  useEffect(() => {
    if (isBlogModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling on the body
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isBlogModalOpen]);

  // Display only the first three blogs
  const blogsToDisplay = dummyBlogs.slice(0, 3);

  return (
    <section id="blogs" className="py-12 md:py-16 bg-background text-text-primary overflow-hidden relative">
      {/* Optional: Add subtle background elements if desired, consistent with other sections */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-secondary rounded-full mix-blend-multiply opacity-5 blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-primary-light rounded-full mix-blend-multiply opacity-5 blur-xl animate-pulse-slow animation-delay-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full animate-fade-in">
            Our Blog
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 leading-tight animate-fade-in-up">
            Latest Insights & <span className="text-secondary">Industry News</span>
          </h2>
          <p className="text-sm font-light max-w-xl mx-auto text-text-secondary opacity-90 leading-relaxed animate-fade-in-up delay-100">
            Stay informed with our expert articles on sustainable practices, precision engineering, and market trends.
          </p>
        </div>

        {/* Blog Cards - Grid Layout for three blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">
          {blogsToDisplay.map((blog, index) => (
            <div
              key={blog.id}
              className={`group bg-surface rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                          border border-border/70 hover:border-secondary overflow-hidden cursor-pointer
                          animate-fade-in-up ${index === 0 ? 'delay-200' : index === 1 ? 'delay-300' : 'delay-400'}`}
              onClick={() => openBlogModal(blog)} // Add onClick to open the modal
            >
              <div className="block"> {/* Changed from <a> to <div> as modal handles full view */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-44 object-cover object-center rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-text-secondary mb-1 uppercase font-semibold">
                      {blog.date} • {blog.author}
                    </p>
                    <h3 className="text-lg font-bold mb-2 text-text-primary group-hover:text-secondary leading-snug line-clamp-2 min-h-[2.5rem]">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 leading-snug line-clamp-3 min-h-[3.75rem]">
                      {blog.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-secondary hover:text-primary-light font-medium transition-colors duration-300 mt-3 text-sm">
                    Read More
                    <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Detail Modal JSX (merged directly into Blogs component) */}
      {isBlogModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurry Overlay Background */}
          <div className="absolute inset-0 bg-primary bg-opacity-70 backdrop-filter backdrop-blur-xl animate-fade-in">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(to right, #031020, #102F50, #031020)',
              backgroundSize: '200% 100%',
              animation: 'background-pan 40s linear infinite alternate',
            }}></div>
          </div>

          {/* Modal Content - Smaller, White, Simple Design */}
          <div className="relative z-10 w-full max-w-lg mx-auto my-8 bg-surface rounded-xl shadow-2xl border border-border animate-fade-in-up overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeBlogModal}
              className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none z-20"
              aria-label="Close blog modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="flex flex-col h-full">
              {/* Blog Image */}
              <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-t-xl">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Overlay for image title on image itself */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-light to-transparent opacity-80 flex items-end p-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {selectedBlog.title}
                    </h2>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="p-6 flex-grow overflow-y-auto custom-scrollbar text-text-primary" style={{ maxHeight: 'calc(100vh - 20rem)' }}> {/* Added max-height to ensure scrolling */}
                <p className="text-sm text-text-secondary mb-4">
                  <span className="font-semibold">{selectedBlog.date}</span> • <span className="font-medium">{selectedBlog.author}</span>
                </p>
                <p className="text-text-primary leading-relaxed text-base">
                  {/* This is dummy full content. Replace with actual full blog content in your data. */}
                  {selectedBlog.fullContent}
                </p>
              </div>
              {/* Optional: Footer or call to action */}
             
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;