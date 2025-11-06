import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductsByCategory,
  getAllProducts,
  getCategories,
  getBlogs,
} from "../api/userApi";
import {
  createBlog,
  deleteBlog,
  createProduct,
  getAllEnquiries,
  deleteCategory,
  deleteProduct,
  createCategory,
  deleteEnquiry, adminLogout
} from "../api/adminApi";
import { PlusIcon, TrashIcon, XMarkIcon, CubeIcon, ListBulletIcon, NewspaperIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';


/**
 * Helper: normalize response payloads to array or object
 */
const extractArray = (res) => {
  if (!res) return [];
  // res may already be an array
  if (Array.isArray(res)) return res;
  // res might be { data: [...] }
  if (Array.isArray(res.data)) return res.data;
  // res might be { data: { data: [...] } } OR { data: { ... } }
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
  // res might be { data: { items: [...] } } (rare) try to find arrays inside
  if (typeof res === "object") {
    // search for first array in object
    for (const k of Object.keys(res)) {
      if (Array.isArray(res[k])) return res[k];
    }
    if (res.data && typeof res.data === "object") {
      for (const k of Object.keys(res.data)) {
        if (Array.isArray(res.data[k])) return res[k];
      }
    }
  }
  return [];
};


/* ---------- Modal Component (Sleek Design) ---------- */
const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary bg-opacity-80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface rounded-xl shadow-2xl overflow-hidden max-h-[90vh] animate-fade-in-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl leading-none p-1 rounded-full text-text-secondary hover:bg-gray-100 transition duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">{children}</div>
      </div>
    </div>
  );
};

/* ---------- Custom Loader Component ---------- */
const Loader = ({ message = "Loading data..." }) => (
    <div className="flex items-center justify-center mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary animate-fade-in">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-medium text-secondary">{message}</span>
    </div>
);


/* ---------- Admin Dashboard ---------- */
export default function AdminDashboard() {
  // UI state
  const [activeTab, setActiveTab] = useState("products"); 
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken") || "";

  // Data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const [image, setImage] = useState(null); 


  // Product filter
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modals
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);

  // Product form
  const [pName, setPName] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pImage, setPImage] = useState(""); 
  const [pCategory, setPCategory] = useState("");

  // Category form
  const [cName, setCName] = useState("");

  // Blog form
  const [bTitle, setBTitle] = useState("");
  const [bContent, setBContent] = useState("");
  const [bImage, setBImage] = useState(""); 

  // Status
  // Note: 'loading' is used globally for all API operations (fetches and CRUD)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Clear status messages
  useEffect(() => {
    if (error || success) {
      const t = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [error, success]);

   useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  /* ---------------- Fetchers ---------------- */

  const loadProducts = async (categoryId = "all") => {
    setLoading(true);
    setError("");
    try {
      let res;
      if (!categoryId || categoryId === "all") {
        res = await getAllProducts();
      } else {
        res = await getProductsByCategory(categoryId);
      }
      const arr = extractArray(res);
      setProducts(arr);
    } catch (err) {
      console.error("Products fetch error:", err);
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      // Delaying the hide of the loader slightly for a smoother transition after data loads
      setTimeout(() => setLoading(false), 300); 
    }
  };

  const loadCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getCategories();
      const arr = Array.isArray(res) ? res : extractArray(res);
      setCategories(arr);
      // default selected category if none
      if (!pCategory && arr.length > 0) setPCategory(arr[0]._id || arr[0].id || arr[0].value || "");
    } catch (err) {
      console.error("Categories fetch error:", err);
      setError("Failed to load categories.");
      setCategories([]);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getBlogs();
      const arr = extractArray(res);
      setBlogs(arr);
    } catch (err) {
      console.error("Blogs fetch error:", err);
      setError("Failed to load blogs.");
      setBlogs([]);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const loadEnquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllEnquiries();
      const arr = extractArray(res);
      setEnquiries(arr);
    } catch (err) {
      console.error("Enquiries fetch error:", err);
      if (err?.response?.status === 401) {
        setError("Unauthorized: please login as admin");
      } else {
        setError("Failed to load enquiries.");
      }
      setEnquiries([]);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  // Unified initial load depending on activeTab and token
  useEffect(() => {
    // Only load if not already globally loading from a previous action
    if (!loading) { 
        if (activeTab === "products") {
          loadCategories();
          loadProducts(selectedCategory);
        }
        if (activeTab === "categories") {
          loadCategories();
        }
        if (activeTab === "blogs") {
          loadBlogs();
        }
        if (activeTab === "enquiries" && token) {
          loadEnquiries();
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, token]);


  // Whenever selectedCategory changes, reload products
  useEffect(() => {
    if (activeTab === "products") {
        loadProducts(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  /* ---------------- CRUD Handlers ---------------- */

  const handleCreateProduct = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const formData = new FormData();
    formData.append("name", pName);
    formData.append("description", pDescription);
    formData.append("category", pCategory);
    if (image) formData.append("image", image);

    await createProduct(formData); 

    setSuccess("Product created successfully!");
    setShowAddProduct(false);
    setPName("");
    setPDescription("");
    setPCategory(categories[0]?._id || categories[0]?.id || "");
    setImage(null);
    await loadProducts(selectedCategory);
  } catch (err) {
    console.error("Create product error:", err);
    setError(err?.response?.data?.message || "Failed to create product");
  } finally {
    // Note: setLoading(false) is handled inside loadProducts/loadCategories/loadBlogs
    // If an error occurs before calling loadProducts, we ensure setLoading(false) runs here.
    if (error) setLoading(false);
  }
};


  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (type === "product") {
        await deleteProduct(id);
        setSuccess("Product deleted");
        await loadProducts(selectedCategory);
      } else if (type === "category") {
        await deleteCategory(id);
        setSuccess("Category deleted");
        await loadCategories();
        await loadProducts("all");
      } else if (type === "blog") {
        await deleteBlog(id);
        setSuccess("Blog deleted");
        await loadBlogs();
      } else if (type === "enquiry") {
        await deleteEnquiry(id);
        setSuccess("Enquiry resolved/deleted");
        await loadEnquiries();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err?.response?.data?.message || `Failed to delete ${type}`);
    } finally {
      // If the delete action didn't trigger a subsequent load function (which handles setting loading=false), we must ensure it's set here.
      if (error) setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createCategory({ name: cName });
      setSuccess("Category created");
      setShowAddCategory(false);
      setCName("");
      await loadCategories();
    } catch (err) {
      console.error("Create category error:", err);
      setError(err?.response?.data?.message || "Failed to create category");
    } finally {
      if (error) setLoading(false);
    }
  };

  const handleCreateBlog = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const formData = new FormData();
    formData.append("title", bTitle);
    formData.append("content", bContent);
    if (image) formData.append("image", image);

    await createBlog(formData);

    setSuccess("Blog published");
    setShowAddBlog(false);
    setBTitle("");
    setBContent("");
    setImage(null);
    await loadBlogs();
  } catch (err) {
    console.error("Create blog error:", err);
    setError(err?.response?.data?.message || "Failed to publish blog");
  } finally {
    if (error) setLoading(false);
  }
};


  /* ---------------- Logout ---------------- */
 const handleLogout = async () => {
  try {
    await adminLogout({}, { withCredentials: true }); // ✅ Send cookie to backend
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("adminToken"); // ✅ Remove access token
    navigate("/admin"); // ✅ Redirect to login
  }
};



  /* ---------------- Render & Styles ---------------- */
  const tabIcons = {
    products: CubeIcon,
    categories: ListBulletIcon,
    blogs: NewspaperIcon,
    enquiries: ChatBubbleBottomCenterTextIcon
  };

  // Themed classes updated to use the new color palette
  const themedInputClass = "w-full p-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:ring-secondary focus:border-secondary transition duration-200 shadow-sm";
  const themedSelectClass = "w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:ring-secondary focus:border-secondary transition duration-200 shadow-sm appearance-none pr-8";
  const primaryButtonClass = "flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300 shadow-lg shadow-secondary/40 disabled:opacity-50 disabled:cursor-not-allowed"; 
  
  // Sleeker Delete Button Style
  const deleteButtonClass = "flex items-center gap-1 bg-error/5 text-error px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-error hover:text-white transition duration-200 border border-error/0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";
  
  const subtleButtonClass = "px-4 py-2.5 rounded-lg border border-border text-text-secondary hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col md:flex-row">
      
      {/* 1. Desktop Sidebar Navigation (Fixed) */}
      <div className="hidden md:flex flex-col w-64 bg-surface border-r border-border shadow-xl sticky top-0 h-screen z-50">
          
          {/* Logo Area */}
          <div className="flex items-center justify-center h-20 px-4 border-b border-border bg-background">
              <img className="h-13 w-auto" src="/logo.png" alt="Logo" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4  mt-5 space-y-2 overflow-y-auto">
              {["products", "categories", "blogs", "enquiries"].map((t) => {
                  const Icon = tabIcons[t];
                  const isActive = activeTab === t;
                  return (
                      <button
                          key={t}
                          onClick={() => setActiveTab(t)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition duration-200 ${
                              isActive
                                  ? "bg-secondary text-white shadow-md shadow-secondary/30"
                                  : "text-text-primary hover:bg-background"
                          }`}
                      >
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-secondary'}`} />
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                  );
              })}
          </nav>

          {/* Logout Button (Modern Error Style) */}
          <div className="p-4 border-t border-border">
              <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-error text-white px-4 py-3 rounded-xl font-medium hover:bg-red-700 transition duration-300 shadow-lg shadow-error/40"
              >
                  Logout
              </button>
          </div>
      </div>

      {/* 2. Mobile Header and Tabs */}
      <div className="md:hidden sticky top-0 z-40 bg-surface shadow-md">
          <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center">
                  <img className="h-6" src="/logo.png" alt="Logo" />
                  <span className="text-secondary text-xl font-light ml-2">Admin Panel</span>
              </div>
              <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-error text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-300"
              >
                  Logout
              </button>
          </div>
          {/* Mobile Tabs (Horizontal Scroll) */}
          <div className="flex overflow-x-auto whitespace-nowrap border-t border-border">
              {["products", "categories", "blogs", "enquiries"].map((t) => {
                  const Icon = tabIcons[t];
                  const isActive = activeTab === t;
                  return (
                      <button
                          key={t}
                          onClick={() => setActiveTab(t)}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition duration-300 flex-shrink-0 ${
                              isActive
                                  ? "text-secondary font-bold border-b-2 border-secondary"
                                  : "text-text-secondary hover:bg-background"
                          }`}
                      >
                          <Icon className="w-4 h-4" />
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                  );
              })}
          </div>
      </div>


      {/* 3. Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          
          <h1 className="hidden md:block text-3xl font-bold text-primary mb-8 border-b pb-4 border-border">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h1>

          {/* Status Section */}
          {error && <div className="mb-6 p-4 rounded-xl bg-error/10 text-error border border-error animate-fade-in font-medium">{error}</div>}
          {success && <div className="mb-6 p-4 rounded-xl bg-success/10 text-success border border-success animate-fade-in font-medium">{success}</div>}
          {/* Global Loader Display */}
          {loading && <Loader message="Processing request..." />}


          {/* Tab Content */}
          <div className="animate-fade-in">
          
              {/* Products Tab */}
              {activeTab === "products" && (
              <section>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-border pb-4">
                      <h2 className="text-2xl font-semibold text-primary mb-3 md:mb-0 hidden md:block">
                          Products <span className="text-text-secondary font-light text-xl">({products.length})</span>
                      </h2>
                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                          <div className="relative w-full md:w-48">
                              <select
                                  value={selectedCategory}
                                  onChange={(e) => setSelectedCategory(e.target.value)}
                                  className={themedSelectClass + " text-sm"}
                              >
                                  <option value="all">All Categories</option>
                                  {categories.map((c) => (
                                      <option key={c._id || c.id} value={c._id || c.id}>
                                          {c.name}
                                      </option>
                                  ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
                                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                              </div>
                          </div>

                          <button
                              onClick={() => {
                                  setPCategory(categories[0]?._id || categories[0]?.id || "");
                                  setShowAddProduct(true);
                              }}
                              className={primaryButtonClass + " w-full md:w-auto"}
                          >
                              <PlusIcon className="w-5 h-5" /> Add Product
                          </button>
                      </div>
                  </div>

                  {products.length === 0 && !loading ? (
                      <p className="text-text-secondary p-6 bg-surface rounded-xl shadow-inner border border-border">No products found for the current selection.</p>
                  ) : (
                      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {products.map((p) => (
                              <li
                                  key={p._id || p.id}
                                  className="p-4 bg-surface shadow-md hover:shadow-lg transition duration-300 rounded-xl flex flex-col justify-between border-l-4 border-secondary/70"
                              >
                                  <div className="flex-1">
                                      <div className="font-bold text-primary truncate">{p.name}</div>
                                      <div className="text-sm text-text-secondary mt-1 line-clamp-2 min-h-[40px]">{p.description}</div>
                                  </div>
                                  <div className="pt-3 border-t border-border mt-3">
                                      <button
                                          onClick={() => handleDelete("product", p._id || p.id)}
                                          className={deleteButtonClass}
                                          disabled={loading}
                                      >
                                          <TrashIcon className="w-4 h-4"/> Delete
                                      </button>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  )}
              </section>
              )}

              {/* Categories Tab */}
              {activeTab === "categories" && (
              <section>
                  <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                      <h2 className="text-2xl font-semibold text-primary hidden md:block">
                          Categories <span className="text-text-secondary font-light text-xl">({categories.length})</span>
                      </h2>
                      <button
                          onClick={() => setShowAddCategory(true)}
                          className={primaryButtonClass}
                      >
                          <PlusIcon className="w-5 h-5" /> Add Category
                      </button>
                  </div>

                  {categories.length === 0 && !loading ? (
                      <p className="text-text-secondary p-6 bg-surface rounded-xl shadow-inner border border-border">No categories found.</p>
                  ) : (
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categories.map((c) => (
                              <li
                                  key={c._id || c.id}
                                  className="p-5 bg-surface shadow-md hover:shadow-lg transition duration-300 rounded-xl flex justify-between items-center border border-border"
                              >
                                  <span className="font-medium text-primary text-lg">{c.name}</span>
                                  <button
                                      onClick={() => handleDelete("category", c._id || c.id)}
                                      className={deleteButtonClass}
                                      disabled={loading}
                                  >
                                      <TrashIcon className="w-4 h-4"/> Delete
                                  </button>
                              </li>
                          ))}
                      </ul>
                  )}
              </section>
              )}

              {/* Blogs Tab */}
              {activeTab === "blogs" && (
              <section>
                  <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                      <h2 className="text-2xl font-semibold text-primary hidden md:block">
                          Blog Posts <span className="text-text-secondary font-light text-xl">({blogs.length})</span>
                      </h2>
                      <button
                          onClick={() => setShowAddBlog(true)}
                          className={primaryButtonClass}
                      >
                          <PlusIcon className="w-5 h-5" /> Publish Blog
                      </button>
                  </div>

                  {blogs.length === 0 && !loading ? (
                      <p className="text-text-secondary p-6 bg-surface rounded-xl shadow-inner border border-border">No blogs found.</p>
                  ) : (
                      <ul className="space-y-4">
                          {blogs.map((b) => (
                              <li
                                  key={b._id || b.id}
                                  className="p-5 bg-surface shadow-md hover:shadow-lg transition duration-300 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center border border-border"
                              >
                                  <div className="flex-1 min-w-0 pr-4 mb-3 sm:mb-0">
                                      <div className="font-semibold text-primary text-lg truncate">{b.title}</div>
                                      <div className="text-xs text-text-secondary mt-1 mb-2">
                                          {b.createdAt ? `Published: ${new Date(b.createdAt).toLocaleDateString()}` : 'Date N/A'}
                                      </div>
                                      <div className="text-sm text-text-secondary line-clamp-2">{b.content}</div>
                                  </div>
                                  <button
                                      onClick={() => handleDelete("blog", b._id || b.id)}
                                      className={deleteButtonClass}
                                      disabled={loading}
                                  >
                                      <TrashIcon className="w-4 h-4"/> Delete
                                  </button>
                              </li>
                          ))}
                      </ul>
                  )}
              </section>
              )}

              {/* Enquiries Tab */}
              {activeTab === "enquiries" && (
              <section>
                  <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-4 text-primary hidden md:block">
                      User Enquiries <span className="text-text-secondary font-light text-xl">({enquiries.length})</span>
                  </h2>

                  {enquiries.length === 0 && !loading ? (
                      <p className="text-text-secondary p-6 bg-surface rounded-xl shadow-inner border border-border">No enquiries yet. Great job!</p>
                  ) : (
                      <ul className="space-y-4">
                          {enquiries.map((e) => (
                              <li
                                  key={e._id || e.id}
                                  className="p-5 bg-surface shadow-md rounded-xl border border-border hover:shadow-lg transition duration-300"
                              >
                                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                      <div className="flex-1 mb-3 md:mb-0">
                                          <div className="flex flex-wrap items-center gap-x-4">
                                              <p className="font-bold text-primary text-lg">{e.name || "N/A"}</p>
                                              <p className="text-sm text-text-secondary">| {e.email || "N/A"}</p>
                                              <p className="text-sm text-text-secondary">| {e.phone || "No phone"}</p>
                                          </div>
                                          <p className="p-3 bg-background rounded-lg text-text-primary border border-border italic mt-3 text-sm max-w-full">
                                              "{e.message || "No message content provided."}"
                                          </p>
                                          <p className="text-xs text-text-secondary mt-3">
                                              Received: {e.createdAt ? new Date(e.createdAt).toLocaleString() : "N/A"}
                                          </p>
                                      </div>
                                      <button
                                          onClick={() => handleDelete("enquiry", e._id || e.id)}
                                          className={deleteButtonClass + " mt-3 md:mt-0 flex-shrink-0"}
                                          disabled={loading}
                                      >
                                          <TrashIcon className="w-4 h-4"/> Resolve/Delete
                                      </button>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  )}
              </section>
              )}
          </div>
      </main>

      {/* ---------- Modals ---------- */}

      {showAddProduct && (
        <Modal title="Add New Product" onClose={() => setShowAddProduct(false)}>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <input
              required
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              placeholder="Product name"
              className={themedInputClass}
            />
            <textarea
              required
              value={pDescription}
              onChange={(e) => setPDescription(e.target.value)}
              placeholder="Detailed description"
              className={themedInputClass}
              rows={4}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={themedInputClass}
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2 rounded-lg border border-border shadow-md"
              />
            )}
            <div className="relative">
                <select
                required
                value={pCategory}
                onChange={(e) => setPCategory(e.target.value)}
                className={themedSelectClass}
                >
                <option value="" disabled>
                    Select Category
                </option>
                {categories.map((c) => (
                    <option value={c._id || c.id} key={c._id || c.id}>
                    {c.name}
                    </option>
                ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
            </div>


            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowAddProduct(false)} className={subtleButtonClass} disabled={loading}>Cancel</button>
              <button type="submit" className={primaryButtonClass} disabled={loading}>
                {loading ? 'Creating...' : (<><PlusIcon className="w-5 h-5"/> Create Product</>)}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showAddCategory && (
        <Modal title="Add New Category" onClose={() => setShowAddCategory(false)}>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <input
              required
              value={cName}
              onChange={(e) => setCName(e.target.value)}
              placeholder="Category name (e.g., CNC Machines)"
              className={themedInputClass}
            />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowAddCategory(false)} className={subtleButtonClass} disabled={loading}>Cancel</button>
              <button type="submit" className={primaryButtonClass} disabled={loading}>
                {loading ? 'Adding...' : (<><PlusIcon className="w-5 h-5"/> Add</>)}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showAddBlog && (
        <Modal title="Publish New Blog Post" onClose={() => setShowAddBlog(false)}>
          <form onSubmit={handleCreateBlog} className="space-y-4">
            <input
              required
              value={bTitle}
              onChange={(e) => setBTitle(e.target.value)}
              placeholder="Blog Post Title"
              className={themedInputClass}
            />
            <textarea
              required
              value={bContent}
              onChange={(e) => setBContent(e.target.value)}
              placeholder="Write the full content here..."
              className={themedInputClass}
              rows={8}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={themedInputClass}
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2 rounded-lg border border-border shadow-md"
              />
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowAddBlog(false)} className={subtleButtonClass} disabled={loading}>Cancel</button>
              <button type="submit" className={primaryButtonClass} disabled={loading}>
                {loading ? 'Publishing...' : (<><NewspaperIcon className="w-5 h-5"/> Publish</>)}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}