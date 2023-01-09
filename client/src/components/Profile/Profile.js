import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import "./Profile.css";
import { blogContext } from "../../context/BlogProvider";
import ProfileMenu from "./ProfileMenu";

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

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/auth");
  };

  const userBlog = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await api.userBlog(config);
      setUserBlogs(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const savedUserBlogs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await api.savedUserBlog(config);
      setSaved(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  useEffect(() => {
    fetchProfile();
    userBlog();
    savedUserBlogs();
  }, [id]);

  console.log(userBlogs);

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
        <button onClick={logout} className="logout">
          Logout
        </button>
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
            {userBlogs?.map((blog) => (
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
                      <ProfileMenu text={text} />
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
        )}
        {text == "Unpublish" && (
          <>
            {userBlogs?.map((blog) => (
              <div key={blog._id}>
                {blog.isPublished === false && (
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
                      <ProfileMenu
                        text={text}
                        userBlogs={userBlogs}
                        setUserBlogs={setUserBlogs}
                        id={blog._id}
                        userBlog={userBlog}
                      />
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
        )}
        {text == "Saved" && (
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
        )}
      </div>
    </div>
  );
};

export default Profile;
