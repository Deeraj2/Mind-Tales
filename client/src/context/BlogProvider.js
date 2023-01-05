import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";

export const blogContext = createContext();

const BlogProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publishedBlog, setPublishedBlog] = useState([]);

  const fetchPublish = async () => {
    try {
      const { data } = await api.fetchBlogs();
      const result = data.reverse();
      setPublishedBlog(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profileDetail"));
    setUser(userInfo);
    if (!userInfo) navigate("/auth");
  }, []);

  return (
    <blogContext.Provider
      value={{ user, setUser, publishedBlog, setPublishedBlog }}
    >
      {children}
    </blogContext.Provider>
  );
};

export default BlogProvider;
