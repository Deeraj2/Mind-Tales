import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import "./Profile.css";
import { blogContext } from "../../context/BlogProvider";
import ProfileMenu from "./ProfileMenu";
import LogoutModal from "./LogoutModal";

const Profile = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(blogContext);
  const [profile, setProfile] = useState();
  const [userBlogs, setUserBlogs] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeBtn, setActiveBtn] = useState("publish");
  const [text, setText] = useState("Publish");

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const { data } = await api.userInfo(id);
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const userBlog = async () => {
    try {
      const { data } = await api.userBlog(id);
      setUserBlogs(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const savedUserBlogs = async () => {
    try {
      const { data } = await api.savedUserBlog(id);
      setSaved(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const unPublished = userBlogs?.filter((b) => {
    return b.isPublished === false;
  });

  const published = userBlogs?.filter((b) => {
    return b.isPublished === true;
  });

  useEffect(() => {
    fetchProfile();
    userBlog();
    savedUserBlogs();
  }, [id]);

  return (
    <div className="profile">
      <div className="profile-content">
        <Avatar
          src={profile?.pic}
          alt={profile?.name}
          sx={{ height: "150px", width: "150px" }}
        >
          {profile?.name.charAt(0)}
        </Avatar>
        <h2>{profile?.name}</h2>
        <p>{profile?.email}</p>
        {user.result?._id == profile?._id && <LogoutModal />}
      </div>
      <div className="user-content">
        <div className="user-title">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("publish");
            }}
            className={`${
              activeBtn === "publish" ? "activeBtnStyles" : "notActiveBtnStyles"
            }`}
          >
            Publish
          </button>
          {user?.result._id === id && (
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("unpublish");
              }}
              className={`${
                activeBtn === "unpublish"
                  ? "activeBtnStyles"
                  : "notActiveBtnStyles"
              }`}
            >
              Unpublish
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? "activeBtnStyles" : "notActiveBtnStyles"
            }`}
          >
            Saved
          </button>
        </div>
        {text == "Publish" && (
          <>
            {published.length > 0 ? (
              <>
                {published?.map((blog) => (
                  <div key={blog._id}>
                    <div
                      className="userBlog"
                      onClick={() => {
                        navigate(`/blog/${blog._id}`);
                      }}
                    >
                      <div className="userBlog-profile">
                        <div className="profile-user">
                          <Avatar
                            src={blog.postedBy.pic}
                            alt={blog.postedBy.name}
                            sx={{ height: "40px", width: "40px" }}
                          >
                            {blog?.postedBy.name.charAt(0)}
                          </Avatar>
                          <p>{blog.postedBy.name}</p>
                        </div>
                      </div>
                      <div className="userBlog-info">
                        <h2>{truncate(blog.title, 120)}</h2>
                        <p>{truncate(blog.story, 400)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-blog">
                <p>Haven't published Blogs</p>
              </div>
            )}
          </>
        )}
        {user?.result._id === id && (
          <>
            {text == "Unpublish" && (
              <>
                {unPublished.length > 0 ? (
                  <>
                    {unPublished.map((blog) => (
                      <div key={blog._id}>
                        <div className="userBlog">
                          <div className="userBlog-profile">
                            <div className="profile-user">
                              <Avatar
                                src={blog.postedBy.pic}
                                alt={blog.postedBy.name}
                                sx={{ height: "40px", width: "40px" }}
                              >
                                {blog?.postedBy.name.charAt(0)}
                              </Avatar>
                              <p>{blog.postedBy.name}</p>
                            </div>
                            <ProfileMenu text={text} id={blog._id} />
                          </div>
                          <div className="userBlog-info">
                            <h2>{truncate(blog.title, 120)}</h2>
                            <p>{truncate(blog.story, 400)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="no-blog">
                    <p>Everything is published</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {text == "Saved" && (
          <>
            {saved.length > 0 ? (
              <>
                {saved?.map((blog) => (
                  <div key={blog._id}>
                    {blog.isPublished === true && (
                      <div
                        className="userBlog"
                        onClick={() => {
                          navigate(`/blog/${blog._id}`);
                        }}
                      >
                        <div className="userBlog-profile">
                          <div className="profile-user">
                            <Avatar
                              src={blog.postedBy.pic}
                              alt={blog.postedBy.name}
                              sx={{ height: "40px", width: "40px" }}
                            >
                              {blog?.postedBy.name.charAt(0)}
                            </Avatar>
                            <p>{blog.postedBy.name}</p>
                          </div>
                        </div>
                        <div className="userBlog-info">
                          <h2>{truncate(blog.title, 120)}</h2>
                          <p>{truncate(blog.story, 400)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="no-blog">
                <p>There is no saved blog</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
