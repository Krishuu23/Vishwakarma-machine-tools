// src/components/ProductCategoriesHorizontal.jsx
import React, { useState } from 'react';

// Dummy product images (replace with actual product images later)
import machine1 from '../assets/machine1.png';
import machine2 from '../assets/machine2.png';
import packaging1 from '../assets/packaging1.png';
import packaging2 from '../assets/packaging2.png';
import plastic1 from '../assets/plastic1.png';
import plastic2 from '../assets/plastic2.png';


// Dummy data for categories and products
const categories = [
  {
    id: 'machines',
    name: 'Machines',
    products: [
      { id: 'm1', name: 'Advanced CNC Machine', image: machine1, description: 'High-precision computer numerical control machine for complex manufacturing tasks.' },
      { id: 'm2', name: 'Industrial Extruder', image: machine2, description: 'Robust machine for continuous production of plastic profiles and sheets.' },
      { id: 'm3', name: 'Automated Assembly Robot', image: 'https://via.placeholder.com/200/4C9AFF/FFFFFF?text=Robot', description: 'Robotic system for efficient and accurate product assembly.' },
      { id: 'm4', name: 'Injection Molding System', image: 'https://via.placeholder.com/200/0A2540/FFFFFF?text=Molding', description: 'Precision injection molding for high-volume plastic part production.' },
      { id: 'm5', name: 'Laser Cutting Machine', image: 'https://via.placeholder.com/200/F59E0B/FFFFFF?text=Laser', description: 'High-speed laser for precise cutting and engraving of various materials.' },
      { id: 'm6', name: '3D Industrial Printer', image: 'https://via.placeholder.com/200/22C55E/FFFFFF?text=3D+Printer', description: 'Additive manufacturing system for rapid prototyping and production.' },
    ],
  },
  {
    id: 'packaging-material',
    name: 'Packaging Material',
    products: [
      { id: 'p1', name: 'Biodegradable Film', image: packaging1, description: 'Eco-friendly film for sustainable packaging solutions.' },
      { id: 'p2', name: 'Custom Printed Boxes', image: packaging2, description: 'Tailored cardboard boxes with custom branding and designs.' },
      { id: 'p3', name: 'Protective Foam Inserts', image: 'https://via.placeholder.com/200/F59E0B/FFFFFF?text=Foam', description: 'High-density foam inserts for secure product protection during transit.' },
      { id: 'p4', name: 'Shrink Wrap Film', image: 'https://via.placeholder.com/200/22C55E/FFFFFF?text=Shrink+Wrap', description: 'Durable shrink wrap for bundling and protecting various products.' },
      { id: 'p5', name: 'Air Cushion Packaging', image: 'https://via.placeholder.com/200/EF4444/FFFFFF?text=Air+Cushion', description: 'Lightweight and effective air cushions for void fill and protection.' },
      { id: 'p6', name: 'Stretch Pallet Wrap', image: 'https://via.placeholder.com/200/6B7280/FFFFFF?text=Stretch+Wrap', description: 'Robust stretch film for securing palletized goods during shipping.' },
    ],
  },
  {
    id: 'plastic-components',
    name: 'Plastic Components',
    products: [
      { id: 'pc1', name: 'Precision Plastic Gears', image: plastic1, description: 'Durable and precise plastic gears for various mechanical applications.' },
      { id: 'pc2', name: 'Custom Molded Enclosures', image: plastic2, description: 'Ergonomic and robust custom plastic enclosures for electronics.' },
      { id: 'pc3', name: 'Plastic Fasteners', image: 'https://via.placeholder.com/200/EF4444/FFFFFF?text=Fasteners', description: 'Lightweight and corrosion-resistant plastic fasteners.' },
      { id: 'pc4', name: 'Medical Grade Tubing', image: 'https://via.placeholder.com/200/6B7280/FFFFFF?text=Tubing', description: 'Flexible and sterile tubing for medical and laboratory uses.' },
      { id: 'pc5', name: 'Automotive Interior Parts', image: 'https://via.placeholder.com/200/0A2540/FFFFFF?text=Auto+Parts', description: 'High-quality plastic components for automotive interior applications.' },
      { id: 'pc6', name: 'Consumer Product Casings', image: 'https://via.placeholder.com/200/4C9AFF/FFFFFF?text=Casings', description: 'Stylish and durable plastic casings for various consumer electronics.' },
    ],
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const activeProducts = categories.find(cat => cat.id === activeCategory)?.products || [];

  return (
    <section id="product-categories" className="py-10 md:py-12 bg-gradient-to-br from-background to-primary-light/10 text-text-primary overflow-hidden relative">
      {/* Subtle, moving background elements for dynamic feel */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-5 blur-xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary-light rounded-full mix-blend-multiply opacity-5 blur-xl animate-float-fast animation-delay-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 md:mb-8 text-primary leading-tight animate-fade-in-up">
          Explore Our <span className="text-secondary">Product Range</span>
        </h2>
        <p className="text-center text-base max-w-xl mx-auto text-text-secondary mb-8 animate-fade-in-up delay-100">
          From advanced machinery to essential components, discover the quality and innovation we bring to every solution.
        </p>

        {/* Category Tabs/Pills - Minimal & Elegant */}
        <div className="flex justify-center flex-wrap gap-2 mb-8 md:mb-10 animate-fade-in-up delay-200">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ease-in-out
                ${activeCategory === category.id
                  ? 'bg-secondary text-primary shadow-md' // Active: Vibrant secondary with dark text
                  : 'text-text-secondary hover:text-primary-light hover:bg-gray-100' // Inactive: Text-based, subtle hover
                }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-secondary rounded-full"></span> // Even smaller indicator
              )}
            </button>
          ))}
        </div>

        {/* Product Display - Horizontal Scroll with Modern Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-border animate-fade-in-up delay-400">
          <h3 className="text-xl md:text-2xl font-bold mb-5 text-primary text-center md:text-left">
            {categories.find(cat => cat.id === activeCategory)?.name}
          </h3>
          {activeProducts.length > 0 ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 custom-scrollbar"> {/* Tighter horizontal spacing */}
              {activeProducts.map((product) => (
                <div key={product.id} className="snap-center flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] mx-2 group
                                                 bg-surface rounded-xl shadow-md hover:shadow-lg
                                                 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                                                 border border-border/70 hover:border-secondary overflow-hidden"> {/* Simpler card styling */}
                  <div className="relative w-full h-40 overflow-hidden rounded-t-xl"> {/* Reduced image height */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Subtle gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div> {/* Lighter overlay */}
                  </div>
                  <div className="p-3 md:p-4 text-text-primary"> {/* Reduced padding */}
                    <h4 className="text-base font-semibold mb-1 group-hover:text-secondary transition-colors duration-300 leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-text-secondary text-xs leading-snug min-h-[3rem] mb-2"> {/* Smaller, tighter description */}
                      {product.description}
                    </p>
                    <button className="relative inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full
                                       bg-secondary text-primary shadow-sm hover:shadow-md // Concise button
                                       transition-all duration-300 ease-in-out transform group-hover:scale-105
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                      View Details
                      <svg className="ml-1 -mr-0.5 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary text-lg py-10">No products available in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;