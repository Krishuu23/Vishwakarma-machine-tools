import axios from 'axios';
import adminAxios from './adminAxios';



// Get token from localStorage


// const authConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${getToken()}`,
//     "Cache-Control": "no-cache",
//     "Pragma": "no-cache",
//     "Expires": "0"
//   }
// });


// --------- BLOG APIS ---------
export const createBlog = async (blogData) => {
  const response = await adminAxios.post(`/blogs`, blogData );
  return response.data;
};

export const deleteBlog = async (blogId) => {
  const response = await adminAxios.delete(`/blogs/${blogId}`);
  return response.data;
};

// --------- CATEGORY APIS ---------
export const createCategory = async (categoryData) => {
  const response = await adminAxios.post(`/categories`, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await adminAxios.delete(`/categories/${categoryId}`);
  return response.data;
};

// --------- ENQUIRY APIS ---------
export const getAllEnquiries = async () => {
  const response = await adminAxios.get(`/enquiries`);
  return response.data;
};

// --------- PRODUCT APIS ---------
export const createProduct = async (productData) => {
  const response = await adminAxios.post(`/products`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await adminAxios.delete(`/products/${productId}`);
  return response.data;
};

export const deleteEnquiry = async (EnquiryId) => {
  const response = await adminAxios.delete(`/enquiries/${EnquiryId}`);
  return response.data;
};

export const adminLogout = async () => {
  // backend should clear refresh cookie and/or revoke refresh token
  const res = await adminAxios.post(`/admin/logout`); 
  return res.data;
};
