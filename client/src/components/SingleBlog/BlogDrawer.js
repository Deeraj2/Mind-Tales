import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { BiComment } from "react-icons/bi";
import { MdOutlineDelete, MdClose, MdReply } from "react-icons/md";
import * as api from "../../api";
import { blogContext } from "../../context/BlogProvider";
import { Avatar } from "@mui/material";

export default function BlogDrawer({ singleBlog, setSingleBlog, id }) {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const [text, setText] = useState("");
  const [expand, setExpand] = useState(false);
  const [reply, setReply] = useState("");
  const [replyExpand, setReplyExpand] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const { user } = useContext(blogContext);

  const isExpanded = (e) => {
    e.stopPropagation();
    console.log(expand);
    setExpand(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const comment = async (blogId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await api.comment(blogId, text, config);
      setSingleBlog(data);
      setText("");
      setExpand(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await api.deletecomment(id, commentId, config);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const replied = async (commentId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await api.reply(id, reply, commentId, config);
      setSingleBlog(data);
      setReply("");
      setReplyExpand(false);
      setCurrentId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReply = async (commentId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await api.deletereply(id, commentId, config);
      setSingleBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const replyEpanding = (id) => {
    setCurrentId(id);
    setReplyExpand(true);
  };

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="fn-icon">
            <BiComment
              className="post-comment"
              onClick={toggleDrawer(anchor, true)}
            />
            <p>{singleBlog?.comments.length}</p>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="commentBody">
              <MdClose
                className="close"
                onClick={toggleDrawer(anchor, false)}
              />
              <div
                className={expand ? "comment-input" : "non-comment"}
                onClick={() => setExpand(true)}
              >
                <p className={expand ? "hide" : " thoughts "}>
                  What are your thoughts?
                </p>
                {expand && (
                  <>
                    <div className="input-avatar">
                      <Avatar
                        src={user?.result.pic}
                        alt={user?.result.name}
                        sx={{ width: "30px", height: "30px" }}
                      >
                        {user?.result.name.charAt(0)}
                      </Avatar>
                      <p>{user?.result.name}</p>
                    </div>

                    <textarea
                      placeholder="What are your thoughts?"
                      className="activeText"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="input-button">
                      <button className="cancel" onClick={isExpanded}>
                        Cancel
                      </button>
                      <button
                        disabled={text.length == 0}
                        className={text.length !== 0 ? "Add" : "disable"}
                        onClick={() => comment(singleBlog?._id)}
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="comment-content">
                {singleBlog?.comments.map((c) => (
                  <div key={c._id}>
                    <div className="comment-info">
                      <div className="profile-info">
                        <Avatar
                          src={c.commentedBy?.pic}
                          alt={c.commentedBy?.name}
                          sx={{ width: "40px", height: "40px" }}
                        >
                          {c.commentedBy?.name.charAt(0)}
                        </Avatar>
                        <div className="profile-name">
                          <div className="comment-delete">
                            <p className="pic-name">{c.commentedBy?.name}</p>
                            {c.commentedBy?._id === user?.result._id && (
                              <MdOutlineDelete
                                className="delete"
                                onClick={() => deleteComment(c._id)}
                              />
                            )}
                            <MdReply
                              className="reply"
                              onClick={() => replyEpanding(c._id)}
                            />
                          </div>
                          <p className="names">{c.text}</p>
                        </div>
                      </div>
                    </div>
                    {c.replies?.map((r) => (
                      <div className="comment-info replyy" key={r._id}>
                        <div className="profile-info">
                          <Avatar
                            src={r.commentedBy?.pic}
                            alt={r.commentedBy?.name}
                            sx={{ width: "40px", height: "40px" }}
                          >
                            {r.commentedBy?.name?.charAt(0)}
                          </Avatar>
                          <div className="profile-name">
                            <div className="comment-delete">
                              <p className="pic-name">{r.commentedBy?.name}</p>
                              {r.commentedBy?._id === user?.result._id && (
                                <MdOutlineDelete
                                  className="delete"
                                  onClick={() => deleteReply(r._id)}
                                />
                              )}
                            </div>
                            <p className="names">{r.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {c._id === currentId && (
                      <div
                        className={replyExpand ? "reply-input" : "non-reply"}
                      >
                        <textarea
                          className="reply-text"
                          placeholder={`Reply to ${c.commentedBy?.name}`}
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        />
                        <div className="reply-btn">
                          <button
                            className="reply-cancel"
                            onClick={() => setReplyExpand(false)}
                          >
                            Cancel
                          </button>
                          <button
                            disabled={reply.length == 0}
                            className={reply.length !== 0 ? "Add" : "disable"}
                            onClick={() => replied(c._id)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
