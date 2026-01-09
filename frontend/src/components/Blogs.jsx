import React, { useState, useEffect } from "react";
import { getBlogs, getBlogById } from "../api/userApi"; // ✅ Import APIs

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // dynamic blogs from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // ✅ Fetch all blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data); // data should be array of blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Fetch single blog by ID when modal opens (optional)
  const openBlogModal = async (blogId) => {
    try {
      const data = await getBlogById(blogId);
      setSelectedBlog(data);
      setIsBlogModalOpen(true);
    } catch (err) {
      console.error("Error fetching blog details:", err);
    }
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlog(null);
  };

  // ✅ Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isBlogModalOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isBlogModalOpen]);

  if (loading) {
    return (
      <section className="py-12 text-center text-text-secondary">
        Loading blogs...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 text-center text-red-500">{error}</section>
    );
  }

  return (
    <section
      id="blogs"
      className="py-12 md:py-16 bg-background text-text-primary overflow-hidden relative"
    >
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-secondary rounded-full mix-blend-multiply opacity-5 blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-primary-light rounded-full mix-blend-multiply opacity-5 blur-xl animate-pulse-slow animation-delay-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-semibold tracking-wide uppercase bg-secondary text-primary rounded-full animate-fade-in">
            Our Blog
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 leading-tight animate-fade-in-up">
            Latest Insights &{" "}
            <span className="text-secondary">Industry News</span>
          </h2>
          <p className="text-sm font-light max-w-xl mx-auto text-text-secondary opacity-90 leading-relaxed animate-fade-in-up delay-100">
            Stay informed with our expert articles on sustainable practices,
            precision engineering, and market trends.
          </p>
        </div>

        {/* ✅ Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in-up delay-200">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className={`group bg-surface rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                          border border-border/70 hover:border-secondary overflow-hidden cursor-pointer
                          animate-fade-in-up ${index === 0 ? "delay-200" : index === 1 ? "delay-300" : "delay-400"}`}
              onClick={() => openBlogModal(blog._id)}
            >
              <div className="block">
                <img
                  src={blog.image || "/placeholder.jpg"} // fallback image
                  alt={blog.title}
                  className="w-full h-44 object-cover object-center rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-text-secondary mb-1 uppercase font-semibold">
                      {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                      {blog.author || "Admin"}
                    </p>
                    <h3 className="text-lg font-bold mb-2 text-text-primary group-hover:text-secondary leading-snug line-clamp-2 min-h-[2.5rem]">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 leading-snug line-clamp-3 min-h-[3.75rem]">
                      {blog.content || blog.description || ""}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-secondary hover:text-primary-light font-medium transition-colors duration-300 mt-3 text-sm">
                    Read More
                    <svg
                      className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Blog Detail Modal */}
      {isBlogModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary bg-opacity-70 backdrop-filter backdrop-blur-xl animate-fade-in"></div>

          <div className="relative z-10 w-full max-w-lg mx-auto my-8 bg-surface rounded-xl shadow-2xl border border-border animate-fade-in-up overflow-hidden">
            <button
              onClick={closeBlogModal}
              className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none z-20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="flex flex-col h-full">
              <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-t-xl">
                <img
                  src={selectedBlog.image || "/placeholder.jpg"}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-light to-transparent opacity-80 flex items-end p-4">
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {selectedBlog.title}
                  </h2>
                </div>
              </div>

              <div
                className="p-6 flex-grow overflow-y-auto custom-scrollbar text-text-primary"
                style={{ maxHeight: "calc(100vh - 20rem)" }}
              >
                <p className="text-sm text-text-secondary mb-4">
                  <span className="font-semibold">
                    {new Date(selectedBlog.createdAt).toLocaleDateString()}
                  </span>{" "}
                  • <span className="font-medium">{selectedBlog.author}</span>
                </p>
                <p className="text-text-primary leading-relaxed text-base">
                  {selectedBlog.content ||
                    selectedBlog.description ||
                    "No content available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
