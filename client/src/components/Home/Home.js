import React, { useContext, useEffect } from "react";
import { blogContext } from "../../context/BlogProvider";
import "./Home.css";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { publishedBlog, setPublishedBlog } = useContext(blogContext);
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
      {publishedBlog?.map((blog) => (
        <>
          {blog.isPublished === true && (
            <div
              className="home-content"
              key={blog._id}
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
                <FiHeart className="like" />
                <FiBookmark className="bookmark" />
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Home;

// {
//   blog.story
//     .split("\n\n")
//     .map((paragraph) => (
//       <p>
//         {paragraph
//           .split("\n")
//           .map((line, index) => (index > 0 ? <span>{line}</span> : line))}
//       </p>
//     ));
// }
