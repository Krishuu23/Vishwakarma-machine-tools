import React, { useState, useEffect } from "react";
import { getCategories, getProductsByCategory } from "../api/userApi";

const Products = ({ onInquiryClick }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                        🚀 Fetch all categories on mount                    */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        setCategories(res);
        if (res.length > 0) {
          setActiveCategory(res[0]._id); // auto-select first category
        }
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                📦 Fetch products whenever activeCategory changes            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!activeCategory) return;

    const fetchProducts = async () => {
      try {
        setCategoryLoading(true);
        const res = await getProductsByCategory(activeCategory);
        console.log("Products fetched:", res); 
        setProducts(res.data || []);

      } catch (err) {
        console.error("❌ Error fetching products by category:", err);
        setError("Failed to load products for this category.");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  /* -------------------------------------------------------------------------- */
  /*                            🧱 UI Rendering                                */
  /* -------------------------------------------------------------------------- */

  if (loading) {
    return (
      <section className="py-16 text-center text-text-secondary">
        Loading categories...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section
      id="products"
      className="py-16 bg-background text-text-primary overflow-hidden relative"
    >
      {/* Background bubbles */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-5 blur-xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary-light rounded-full mix-blend-multiply opacity-5 blur-xl animate-float-fast animation-delay-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full animate-fade-in">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3 leading-tight animate-fade-in-up">
            Innovative Solutions for{" "}
            <span className="text-secondary">Every Industry</span>
          </h2>
          <p className="text-base font-light max-w-2xl mx-auto text-text-secondary opacity-90 leading-relaxed animate-fade-in-up delay-100">
            Explore our wide range of products made with precision.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center items-center flex-wrap bg-surface rounded-full shadow-md mx-3 p-1 mb-12 animate-fade-in-up delay-200 border border-border">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory(category._id)}
              className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                activeCategory === category._id
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:text-primary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Display */}
        <div className="relative">
          {categoryLoading ? (
            <p className="text-center text-text-secondary text-lg py-10">
              Loading products...
            </p>
          ) : products.length > 0 ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 mx-3 custom-scrollbar">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="snap-start flex-shrink-0 w-[320px] mx-3 bg-surface rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-border/70 hover:border-secondary overflow-hidden animate-fade-in-up delay-400"
                >
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
                  </div>
                  <div className="p-4 flex flex-col justify-between h-[calc(100%-192px)]">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-primary leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed min-h-[4rem] mb-4">
                        {product.description}
                      </p>
                    </div>
                    <button
                      onClick={onInquiryClick}
                      className="inline-flex items-center justify-center bg-secondary text-primary px-7 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-xl transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary group"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary text-lg py-10">
              No products available in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
