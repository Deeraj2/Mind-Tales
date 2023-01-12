import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7000" });

export const singup = (formData) => API.post(`/user/signup`, formData);
export const signin = (formData) => API.post(`/user/signin`, formData);

export const userInfo = (id) => API.get(`/user/userInfo/${id}`);

export const publishBlog = (blog, config) =>
  API.post("/blog/publish", blog, config);
export const fetchBlogs = () => API.get("/blog");
export const fetchPages = (page) => API.get(`/blog?page=${page}`);
export const fetchSingleBlog = (id) => API.get(`/blog/singleBlog/${id}`);

export const likeapost = (blogId, config) =>
  API.put("/blog/like", { blogId: blogId }, config);
export const unlikeapost = (blogId, config) =>
  API.put("/blog/unlike", { blogId: blogId }, config);

export const saveapost = (blogId, config) =>
  API.put("/blog/save", { blogId: blogId }, config);
export const unsaveapost = (blogId, config) =>
  API.put("/blog/unsave", { blogId: blogId }, config);

export const comment = (blogId, text, config) =>
  API.put("/blog/comment", { blogId: blogId, text: text }, config);
export const deletecomment = (blogId, commentId, config) =>
  API.put(
    `/blog/deleteComment`,
    { blogId: blogId, commentId: commentId },
    config
  );

export const reply = (blogId, reply, commentId, config) =>
  API.put(
    "/blog/reply",
    { blogId: blogId, reply: reply, commentId: commentId },
    config
  );
export const deletereply = (blogId, commentId, config) =>
  API.put(
    `/blog/deletereply`,
    { blogId: blogId, commentId: commentId },
    config
  );

export const unpublishBlog = (id, config) =>
  API.put(`/blog/unpublish`, { id: id }, config);

export const publishingBlog = (id, config) =>
  API.put("/blog/publishing", { id: id }, config);

export const userBlog = (id) => API.get(`/blog/userBlog/${id}`);
export const savedUserBlog = (id) => API.get(`/blog/savedUserBlog/${id}`);

export const editBlog = (id, blog, config) =>
  API.put(`/blog/update/${id}`, blog, config);

export const deleteBlog = (id, config) =>
  API.delete(`/blog/delete/${id}`, config);

export const searchProfile = (search) =>
  API.post("/user/searchUser", { name: search });
