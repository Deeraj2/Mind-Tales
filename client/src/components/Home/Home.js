import React, { useContext, useEffect, useState } from "react";
import { blogContext } from "../../context/BlogProvider";
import "./Home.css";
import { Avatar, CircularProgress } from "@mui/material";
import { FiHeart } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Paginate from "../Pagination/Paginate";
import Loading from "../Loading/Loading";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { user, publishedBlog } = useContext(blogContext);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="home">
      {publishedBlog.length == 0 ? (
        <Loading />
      ) : (
        <>
          {publishedBlog.data?.map((blog) => (
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
        </>
      )}
      <div className="pagination">
        <Paginate
          page={page}
          setisLoading={setisLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
