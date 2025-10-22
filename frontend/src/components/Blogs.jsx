// src/components/BlogSectionHorizontal.jsx
import React from 'react';

// Dummy blog post images (replace with actual blog images later)
import blog1 from '../assets/blog1.png'; // Using webp for better performance
import blog2 from '../assets/blog2.png';
import blog3 from '../assets/blog3.png';


const dummyBlogs = [
  {
    id: 'b1',
    title: 'Sustainable Practices in Plastic Recycling',
    excerpt: 'Learn about the innovative methods Curnet employs to minimize environmental impact and promote a circular economy in plastic production.',
    image: blog1,
    date: 'April 10, 2024',
    author: 'Environmental Team',
    link: '#',
  },
  {
    id: 'b2',
    title: 'Precision Engineering: The Core of Our Machine Design',
    excerpt: 'An inside look at the meticulous design and engineering processes that ensure every Curnet machine delivers unparalleled accuracy and reliability.',
    image: blog2,
    date: 'April 05, 2024',
    author: 'Engineering Dept.',
    link: '#',
  },
  {
    id: 'b3',
    title: 'The Evolution of Advanced Packaging Materials',
    excerpt: 'From biodegradable films to smart packaging, explore the latest trends and future outlook for packaging materials in various industries.',
    image: blog3,
    date: 'March 28, 2024',
    author: 'Packaging Solutions',
    link: '#',
  },
  
];

const Blogs = () => {
  return (
    <section id="blogs-horizontal" className="py-16 md:py-24 bg-surface text-text-primary overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-primary leading-tight animate-fade-in-up">
          Our Latest Insights & News
          <span className="block text-xl font-medium text-text-secondary mt-3">Stay informed with our industry expertise and innovations</span>
        </h2>

        {/* Horizontal Scroll for Blog Cards */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 md:-mx-4 lg:-mx-6 custom-scrollbar">
          {dummyBlogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`snap-center flex-shrink-0 w-80 md:w-96 lg:w-96 mx-2 md:mx-4 lg:mx-6 group bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2
                ${index === 0 ? 'animate-fade-in-delay-200' : index === 1 ? 'animate-fade-in-delay-300' : index === 2 ? 'animate-fade-in-delay-400' : index === 3 ? 'animate-fade-in-delay-500' : 'animate-fade-in-delay-600'}
              `}
            >
              <a href={blog.link} className="block">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover object-center rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6 flex flex-col justify-between h-[calc(100%-13rem)]"> {/* Adjust height for consistent card body height */}
                  <div>
                    <p className="text-xs text-text-secondary mb-2 uppercase font-semibold">
                      {blog.date} • {blog.author}
                    </p>
                    <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-secondary leading-snug line-clamp-2 min-h-[3rem]">
                      {blog.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                      {blog.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-primary hover:text-secondary font-semibold transition-colors duration-300 mt-4">
                    Read More
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-delay-700">
          <a
            href="#" // Link to an "All Blogs" page
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors duration-300"
          >
            Explore All Articles
            <svg className="ml-3 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blogs;