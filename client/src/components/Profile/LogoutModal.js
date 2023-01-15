import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as api from "../../api";
import { blogContext } from "../../context/BlogProvider";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#dfdee5",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function LogoutModal() {
  const [open, setOpen] = React.useState(false);
  const { setUser } = useContext(blogContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/auth");
  };

  return (
    <div>
      <button onClick={handleOpen} className="logout">
        Logout
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal">
            <div className="modal__detail">
              <p>Are you sure you want to logout?</p>
              <MdClose className="modal__close" onClick={handleClose} />
            </div>
            <div className="modal__Btn">
              <button className="cancel" onClick={handleClose}>
                Cancel
              </button>
              <button className="deleteBtn" onClick={logout}>
                Log out
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
