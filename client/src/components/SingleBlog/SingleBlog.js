import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import { FiHeart, FiMail, FiBookmark } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import "./SingleBlog.css";
import { blogContext } from "../../context/BlogProvider";

const SingleBlog = () => {
  const { id } = useParams();
  const { user } = useContext(blogContext);
  const [singleBlog, setSingleBlog] = useState();

  const fetchBlog = async () => {
    try {
      const { data } = await api.fetchSingleBlog(id);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const likeAPost = async (blogId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await api.likeapost(blogId, config);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeAPost = async (blogId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await api.unlikeapost(blogId, config);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  console.log(singleBlog);

  return (
    <div className="singlePost">
      <div className="singlepost-profile">
        <div className="profile-info">
          <Avatar
            sx={{ height: "48px", width: "48px" }}
            src={singleBlog?.postedBy.pic}
            alt={singleBlog?.postedBy.name}
          >
            {singleBlog?.postedBy?.name?.charAt(0)}
          </Avatar>
          <h3>{singleBlog?.postedBy.name}</h3>
        </div>
        <div className="profile-icoons">
          <FiMail className="email" />
          <FiBookmark className="save" />
        </div>
      </div>
      <div className="singlepost-content">
        <h2>{singleBlog?.title}</h2>
        {singleBlog?.story.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="story-para">
            {paragraph
              .split("\n")
              .map((line, index) => (index > 0 ? <span>{line}</span> : line))}
          </p>
        ))}
      </div>
      <div className="singlepost-function">
        <div className="fn-icon">
          {singleBlog?.likes.includes(user?.result._id) ? (
            <FaHeart
              className="post-heart liked"
              onClick={() => unlikeAPost(singleBlog?._id)}
            />
          ) : (
            <FiHeart
              className="post-heart"
              onClick={() => likeAPost(singleBlog?._id)}
            />
          )}
          <p>{singleBlog?.likes.length}</p>
        </div>
        <div className="fn-icon">
          <BiComment className="post-comment" />
          <p>{singleBlog?.comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
