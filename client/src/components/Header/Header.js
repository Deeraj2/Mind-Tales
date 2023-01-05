import React, { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { blogContext } from "../../context/BlogProvider";

const Header = () => {
  const { user, setUser } = useContext(blogContext);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="title">
        <h2 onClick={() => navigate("/")}>
          Mind<span className="name">Tales</span>
        </h2>
        <div className="search">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="content">
        <BiEdit className="edit-icon" onClick={() => navigate("/new-story")} />
        <Avatar
          src={user?.result.pic}
          alt={user?.result.name}
          sx={{ color: "#7c70c2", cursor: "pointer" }}
          onClick={() => navigate(`/profile/${user.result._id}`)}
        >
          {user?.result.name.charAt(0)}
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
