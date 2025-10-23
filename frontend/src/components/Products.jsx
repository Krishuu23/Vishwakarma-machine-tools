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
      { id: 'm1', name: 'FlexiPrint Pro X1', image: machine1, description: 'Advanced flexographic printing machine with precision control systems for high-quality packaging production.' },
      { id: 'm2', name: 'LaminaMax 3000', image: machine2, description: 'State-of-the-art lamination machine for creating durable multi-layer packaging materials with superior bonding.' },
      { id: 'm3', name: 'PrecisionCut S500', image: 'https://via.placeholder.com/400/031020/57BFFF?text=PrecisionCut+S500', description: 'High-precision slitting and rewinding machine for converting large rolls into smaller, market-ready formats.' },
      { id: 'm4', name: 'RoboPack 7000', image: 'https://via.placeholder.com/400/102F50/FFFFFF?text=RoboPack+7000', description: 'Automated robotic packaging system for speed and efficiency in diverse packing lines.' },
      { id: 'm5', name: 'EcoSeal Pro', image: 'https://via.placeholder.com/400/57BFFF/031020?text=EcoSeal+Pro', description: 'Environmentally friendly sealing machine for various flexible packaging types.' },
      { id: 'm6', name: 'ThermoForm 900', image: 'https://via.placeholder.com/400/F59E0B/FFFFFF?text=ThermoForm+900', description: 'Advanced thermoforming machine for producing high-quality plastic containers and trays.' },
    ],
  },
  {
    id: 'flexible-packaging',
    name: 'Flexible Packaging',
    products: [
      { id: 'fp1', name: 'Biodegradable Film Rolls', image: packaging1, description: 'Eco-friendly and sustainable films perfect for food and non-food applications, reducing environmental impact.' },
      { id: 'fp2', name: 'Custom Pouches & Bags', image: packaging2, description: 'High-barrier, custom-printed pouches and bags designed to preserve product freshness and enhance brand visibility.' },
      { id: 'fp3', name: 'Laminated Films', image: 'https://via.placeholder.com/400/102F50/FFFFFF?text=Laminated+Films', description: 'Multi-layer laminated films offering superior protection against moisture, oxygen, and light for extended shelf life.' },
      { id: 'fp4', name: 'Shrink & Stretch Films', image: 'https://via.placeholder.com/400/57BFFF/031020?text=Shrink+Films', description: 'Durable and versatile shrink and stretch films for secure bundling, palletizing, and product presentation.' },
      { id: 'fp5', name: 'Stand-Up Pouches', image: 'https://via.placeholder.com/400/F59E0B/FFFFFF?text=Stand-Up+Pouches', description: 'Attractive and functional stand-up pouches ideal for retail display, offering convenience and product protection.' },
      { id: 'fp6', name: 'Barrier Films', image: 'https://via.placeholder.com/400/031020/57BFFF?text=Barrier+Films', description: 'Specialized barrier films designed to protect sensitive products from external elements, ensuring peak quality.' },
    ],
  },
  {
    id: 'plastic-solutions',
    name: 'Plastic Solutions',
    products: [
      { id: 'ps1', name: 'Custom PET Bottles', image: plastic1, description: 'Lightweight and durable custom-designed PET bottles for beverages, cosmetics, and household products.' },
      { id: 'ps2', name: 'Precision Molded Parts', image: plastic2, description: 'High-tolerance, injection-molded plastic components for automotive, electronics, and industrial applications.' },
      { id: 'ps3', name: 'HDPE Containers', image: 'https://via.placeholder.com/400/57BFFF/031020?text=HDPE+Containers', description: 'Robust High-Density Polyethylene containers suitable for chemicals, food, and various bulk storage needs.' },
      { id: 'ps4', name: 'PP Sheets & Rolls', image: 'https://via.placeholder.com/400/102F50/FFFFFF?text=PP+Sheets', description: 'Versatile Polypropylene sheets and rolls for fabrication, packaging, and protective layering.' },
      { id: 'ps5', name: 'Specialty Plastic Films', image: 'https://via.placeholder.com/400/F59E0B/FFFFFF?text=Specialty+Films', description: 'Innovative plastic films with specific properties like anti-fog, UV protection, or anti-static for specialized applications.' },
      { id: 'ps6', name: 'Recycled Plastic Products', image: 'https://via.placeholder.com/400/031020/57BFFF?text=Recycled+Plastics', description: 'Sustainable products made from high-quality recycled plastics, contributing to a circular economy.' },
    ],
  },
  {
    id: 'raw-materials',
    name: 'Raw Materials',
    products: [
      { id: 'rm1', name: 'Polyethylene (PE) Granules', image: 'https://via.placeholder.com/400/6B7280/FFFFFF?text=PE+Granules', description: 'High-grade PE granules for injection molding, extrusion, and film blowing applications.' },
      { id: 'rm2', name: 'Polypropylene (PP) Resins', image: 'https://via.placeholder.com/400/EF4444/FFFFFF?text=PP+Resins', description: 'Versatile PP resins for a wide range of products including packaging, automotive, and textiles.' },
      { id: 'rm3', name: 'PET Pellets', image: 'https://via.placeholder.com/400/22C55E/FFFFFF?text=PET+Pellets', description: 'Premium PET pellets suitable for bottle production, sheets, and fibers with excellent clarity and strength.' },
      { id: 'rm4', name: 'Additives & Masterbatches', image: 'https://via.placeholder.com/400/F59E0B/FFFFFF?text=Additives', description: 'Enhance plastic properties with our range of additives, color masterbatches, and functional compounds.' },
      { id: 'rm5', name: 'Recycled Plastic Flakes', image: 'https://via.placeholder.com/400/102F50/FFFFFF?text=Recycled+Flakes', description: 'Sustainable source of raw material for various plastic manufacturing processes, promoting circularity.' },
      { id: 'rm6', name: 'Specialty Polymers', image: 'https://via.placeholder.com/400/031020/57BFFF?text=Specialty+Polymers', description: 'Advanced polymers for demanding applications requiring specific chemical, thermal, or mechanical properties.' },
    ],
  },
];


const Products = ({onInquiryClick}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const activeProducts = categories.find(cat => cat.id === activeCategory)?.products || [];

  return (
    <section id="products" className="py-16 bg-background text-text-primary overflow-hidden relative">
      {/* Subtle, moving background elements for dynamic feel */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-5 blur-xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary-light rounded-full mix-blend-multiply opacity-5 blur-xl animate-float-fast animation-delay-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full animate-fade-in">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3 leading-tight animate-fade-in-up">
            Innovative Solutions for <span className="text-secondary">Every Industry</span>
          </h2>
          <p className="text-base font-light max-w-2xl mx-auto text-text-secondary opacity-90 leading-relaxed animate-fade-in-up delay-100">
            From cutting-edge machinery to premium flexible packaging solutions, discover
            our comprehensive range of products designed to elevate your business operations.
          </p>
        </div>

        {/* Category Tabs/Pills - Matching the image design */}
        <div className="flex justify-center items-center flex-wrap bg-surface rounded-full shadow-md mx-3 p-1 mb-12 animate-fade-in-up delay-200 border border-border">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                ${activeCategory === category.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-primary' // Inactive: Text-based, subtle hover
                }`}
            >
              {/* Icon Placeholder - You might add actual icons here later */}
              {category.id === 'machines' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>}
              {category.id === 'flexible-packaging' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>}
              {category.id === 'plastic-solutions' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4m0-10h8"></path></svg>}
              {category.id === 'raw-materials' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V3m0 9v3m0 0H9m3 0h3m-6 10l2-2m-2 2l-2-2m4 0l2 2m-2-2l-2 2"></path></svg>}
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Display - Horizontal Scroll with Modern Cards */}
        <div className="relative">
          {activeProducts.length > 0 ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 mx-3 custom-scrollbar">
              {activeProducts.map((product) => (
                <div key={product.id} className="snap-start flex-shrink-0 w-[320px] mx-3
                                                 bg-surface rounded-lg shadow-lg
                                                 transition-all duration-300 ease-in-out transform hover:-translate-y-2
                                                 border border-border/70 hover:border-secondary overflow-hidden animate-fade-in-up delay-400">
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
                  </div>
                  <div className="p-4 flex flex-col justify-between h-[calc(100%-192px)]"> {/* Adjust height based on image height */}
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-primary leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed min-h-[4rem] mb-4">
                        {product.description}
                      </p>
                    </div>
                    <button onClick = {onInquiryClick} className="inline-flex items-center justify-center bg-secondary text-primary px-7 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-xl transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary group">
                      Inquire Now
                      
                        
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