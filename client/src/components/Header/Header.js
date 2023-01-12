import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { blogContext } from "../../context/BlogProvider";
import * as api from "../../api";

const Header = () => {
  const { user, search, setSearch } = useContext(blogContext);
  const navigate = useNavigate();
  const [searchProfile, setSearchProfile] = useState([]);

  const fetchSearchProfile = async () => {
    try {
      const { data } = await api.searchProfile(search);
      setSearchProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  useEffect(() => {
    if (search) fetchSearchProfile();
  }, [search]);

  return (
    <>
      <div className="header">
        <div className="title">
          <h2 onClick={() => navigate("/")}>
            Mind<span className="name">Tales</span>
          </h2>
          <div className="Profile">
            <div className="search">
              <BsSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Profile"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {search.length > 0 && (
              <div className="searchProfile">
                {searchProfile?.map((p) => (
                  <div
                    key={p._id}
                    className="search-content"
                    onClick={() => handleNavigate(p._id)}
                  >
                    <Avatar
                      src={p.pic}
                      alt={p.name}
                      sx={{ color: "#7c70c2", cursor: "pointer" }}
                    >
                      {p.name.charAt(0)}
                    </Avatar>
                    <div className="search-profile">
                      <p className="search-name">{p.name}</p>
                      <p className="search-email">{p.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <BiEdit
            className="edit-icon"
            onClick={() => navigate("/new-story")}
          />
          <Avatar
            src={user?.result?.pic}
            alt={user?.result?.name}
            sx={{ color: "#7c70c2", cursor: "pointer" }}
            onClick={() => navigate(`/profile/${user.result._id}`)}
          >
            {user?.result?.name.charAt(0)}
          </Avatar>
        </div>
      </div>
      <div className="mobile-profile">
        <div className="mobile-search">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {search.length > 0 && (
          <div className="mobileProfile">
            {searchProfile?.map((p) => (
              <div
                key={p._id}
                className="mobile-content"
                onClick={() => handleNavigate(p._id)}
              >
                <Avatar
                  src={p.pic}
                  alt={p.name}
                  sx={{
                    color: "#7c70c2",
                    cursor: "pointer",
                    width: "46px",
                    height: "46px",
                  }}
                >
                  {p.name.charAt(0)}
                </Avatar>
                <div className="mobprofile">
                  <p className="mobile-name">{p.name}</p>
                  <p className="mobile-email">{p.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
