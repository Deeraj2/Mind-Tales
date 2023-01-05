import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api";
import { Avatar } from "@mui/material";
import "./Profile.css";
import { blogContext } from "../../context/BlogProvider";

const Profile = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(blogContext);
  const [profile, setProfile] = useState();

  const naivgate = useNavigate();

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
    naivgate("/auth");
  };

  useEffect(() => {
    fetchProfile();
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
        <button onClick={logout}>Logout</button>
      </div>
      <div className="user-content">
        <div className="user-list">
          <h2>Reading List</h2>
          <div className="user-btn">
            <button>View List</button>
            <p>8 stories</p>
          </div>
        </div>
        <div className="user-list">
          <h2>Draft</h2>
          <div className="user-btn">
            <button>View List</button>
            <p>8 stories</p>
          </div>
        </div>
        <div className="user-list">
          <h2>Published</h2>
          <div className="user-btn">
            <button>View List</button>
            <p>8 stories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
