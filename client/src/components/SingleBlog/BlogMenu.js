import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UnpublishModal from "./UnpublishModal";
import { blogContext } from "../../context/BlogProvider";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import DeleteModal from "./DeleteModal";

export default function BlogMenu({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setCurrentId, user } = useContext(blogContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleUpdate = (id) => {
    setCurrentId(id);
    navigate("/new-story");
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{
          color: "#333",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleUpdate(id)}>Edit</MenuItem>
        <MenuItem>
          <DeleteModal id={id} />
        </MenuItem>
        <MenuItem>
          <UnpublishModal id={id} />
        </MenuItem>
      </Menu>
    </div>
  );
}
