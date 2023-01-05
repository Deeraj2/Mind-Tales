import React, { useContext, useRef, useState } from "react";
import "./Write.css";
import useAutosizeTextArea from "./useAutosizeTextArea";
import * as api from "../../api";
import { blogContext } from "../../context/BlogProvider";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const { user, publishedBlog, setPublishedBlog } = useContext(blogContext);
  const [blog, setBlog] = useState({
    title: "",
    story: "",
  });
  let textAreaRef = useRef(null);
  useAutosizeTextArea(textAreaRef.current, blog.story);

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!blog.title || !blog.story) {
      console.log("Please fill the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await api.publishBlog(blog, config);
      // setPublishedBlog([data, ...publishedBlog]);
      clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
    setBlog({
      title: "",
      story: "",
    });
  };
  return (
    <div className="write">
      <input
        type="text"
        value={blog.title}
        placeholder="Title"
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />
      <textarea
        ref={textAreaRef}
        rows={1}
        value={blog.story}
        placeholder="Tell your story..."
        onChange={(e) => setBlog({ ...blog, story: e.target?.value })}
      />
      {blog.story.length > 0 && (
        <button className="publish" onClick={handleCreate}>
          Publish
        </button>
      )}
    </div>
  );
};

export default Write;