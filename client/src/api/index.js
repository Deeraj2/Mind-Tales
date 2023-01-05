import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7000" });

export const singup = (formData) => API.post(`/user/signup`, formData);
export const signin = (formData) => API.post(`/user/signin`, formData);
export const userInfo = (id) => API.get(`/user/userInfo/${id}`);

export const publishBlog = (blog, config) =>
  API.post("/blog/publish", blog, config);
export const fetchBlogs = () => API.get("/blog");
export const fetchSingleBlog = (id) => API.get(`/blog/singleBlog/${id}`);
export const likeapost = (blogId, config) =>
  API.put("/blog/like", { blogId: blogId }, config);

export const unlikeapost = (blogId, config) =>
  API.put("/blog/unlike", { blogId: blogId }, config);

export const likepost = (blogId, config) =>
  API.post(`/like`, { blogId: blogId }, config);
