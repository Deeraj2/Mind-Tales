import React, { useContext, useEffect } from "react";
import { blogContext } from "../../context/BlogProvider";
import { PaginationItem, Pagination } from "@mui/material";
import * as api from "../../api";
import { Link } from "react-router-dom";

function Paginate({ page }) {
  const { publishedBlog, setPublishedBlog } = useContext(blogContext);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.fetchPages(page);
      setPublishedBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (page) fetchBlogs();
  }, [page]);

  return (
    <Pagination
      count={publishedBlog.numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      sx={{
        color: "#7c70c2",
      }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/blogs?page=${item.page}`}
        />
      )}
    />
  );
}

export default Paginate;
