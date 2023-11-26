import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";

import { BsBookmark } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import "./SingleBlog.css";
import { blogContext } from "../../context/BlogProvider";
import BlogDrawer from "./BlogDrawer";
import UnpublishModal from "./UnpublishModal";
import BlogMenu from "./BlogMenu";
import Loading from "../Loading/Loading";

const SingleBlog = () => {
  const { id } = useParams();
  const { user } = useContext(blogContext);
  const [singleBlog, setSingleBlog] = useState();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const { data } = await api.fetchSingleBlog(id);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Like the blog
  const likeABlog = async (blogId) => {
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

  //unlike the blog
  const unlikeABlog = async (blogId) => {
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

  const saveaBlog = async (blogId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await api.saveapost(blogId, config);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unsaveABlog = async (blogId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await api.unsaveapost(blogId, config);

      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <>
      {singleBlog == undefined ? (
        <Loading />
      ) : (
        <div className="singlePost">
          <div className="singlepost-profile">
            <div
              className="profile-info"
              onClick={() => navigate(`/profile/${singleBlog?.postedBy._id}`)}
            >
              <Avatar
                sx={{ height: "48px", width: "48px" }}
                src={singleBlog?.postedBy.pic}
                alt={singleBlog?.postedBy.name}
              >
                {singleBlog?.postedBy?.name?.charAt(0)}
              </Avatar>
              <h3>{singleBlog?.postedBy.name}</h3>
            </div>
            <div className="profile-icons">
              <a href={`mailto:${singleBlog?.postedBy.email}`}>
                <IoMailOutline className="email" />
              </a>
              {singleBlog?.savePost?.includes(user?.result?._id) ? (
                <FaBookmark
                  className="save saved"
                  onClick={() => unsaveABlog(singleBlog?._id)}
                />
              ) : (
                <BsBookmark
                  className="save"
                  onClick={() => saveaBlog(singleBlog?._id)}
                />
              )}
              {singleBlog?.postedBy._id === user?.result._id && (
                <BlogMenu id={id} />
              )}
            </div>
          </div>
          <div className="singlepost-content">
            <h2>{singleBlog?.title}</h2>
            {singleBlog?.story.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="story-para">
                {paragraph
                  .split("\n")
                  .map((line, index) =>
                    index > 0 ? <span>{line}</span> : line
                  )}
              </p>
            ))}
          </div>
          <div className="singlepost-function">
            <div className="fn-icon">
              {singleBlog?.likes.includes(user?.result?._id) ? (
                <FaHeart
                  className="post-heart liked"
                  onClick={() => unlikeABlog(singleBlog?._id)}
                />
              ) : (
                <FiHeart
                  className="post-heart"
                  onClick={() => likeABlog(singleBlog?._id)}
                />
              )}
              <p>{singleBlog?.likes.length}</p>
            </div>
            <BlogDrawer
              id={id}
              singleBlog={singleBlog}
              setSingleBlog={setSingleBlog}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
