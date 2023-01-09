import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as api from "../../api";
import { blogContext } from "../../context/BlogProvider";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ text, id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useContext(blogContext);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePublish = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await api.publishingBlog(id, config);
      console.log(data);
      navigate("/");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        sx={{
          color: "#333",
        }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        sx={{
          color: "#dfdee5",
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        {text === "Unpublish" && (
          <MenuItem onClick={() => handlePublish(id)}>Publish</MenuItem>
        )}
      </Menu>
    </div>
  );
}
