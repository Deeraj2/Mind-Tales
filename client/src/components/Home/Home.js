import React, { useContext, useEffect } from "react";
import { blogContext } from "../../context/BlogProvider";
import "./Home.css";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import { FiHeart } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { publishedBlog, setPublishedBlog, user, searchQuery } =
    useContext(blogContext);
  const navigate = useNavigate();

  const fetchPublish = async () => {
    try {
      const { data } = await api.fetchBlogs();
      const result = data.reverse();
      setPublishedBlog(result);
    } catch (error) {
      console.log(error);
    }
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  useEffect(() => {
    fetchPublish();
  }, []);

  return (
    <div className="home">
      {searchQuery()?.map((blog) => (
        <div key={blog._id}>
          {blog.isPublished === true && (
            <div
              className="home-content"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <div className="home-profile">
                <Avatar
                  src={blog.postedBy.pic}
                  alt={blog.postedBy.name}
                  sx={{ height: "40px", width: "40px" }}
                >
                  {blog?.postedBy.name.charAt(0)}
                </Avatar>
                <p>{blog.postedBy.name}</p>
              </div>
              <h2>{truncate(blog.title, 120)}</h2>
              <p>{truncate(blog.story, 400)}</p>
              <div className="home-icons">
                <div className="fn-icon">
                  {blog.likes?.includes(user?.result?._id) ? (
                    <FaHeart className="like liked" />
                  ) : (
                    <FiHeart className="like" />
                  )}
                  <p className="like-n">{blog.likes.length}</p>
                </div>
                {blog.savePost?.includes(user?.result?._id) ? (
                  <FaBookmark className="bookmark" />
                ) : (
                  <BsBookmark className="bookmark" />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
