import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const blogContext = createContext();

const BlogProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publishedBlog, setPublishedBlog] = useState([]);
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchQuery = () => {
    let blogs = publishedBlog.data;
    if (search) {
      blogs = blogs.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.postedBy.name.toLowerCase().includes(search)
      );
    }
    return blogs;
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profileDetail"));
    setUser(userInfo);
    if (!userInfo) navigate("/auth");
  }, []);

  return (
    <blogContext.Provider
      value={{
        user,
        setUser,
        publishedBlog,
        setPublishedBlog,
        search,
        setSearch,
        searchQuery,
        currentId,
        setCurrentId,
        loading,
        setLoading,
      }}
    >
      {children}
    </blogContext.Provider>
  );
};

export default BlogProvider;
