import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import Write from "./components/Write/Write";
import { blogContext } from "./context/BlogProvider";
import Header from "./components/Header/Header";
import SingleBlog from "./components/SingleBlog/SingleBlog";

function App() {
  const { user } = useContext(blogContext);
  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Routes>
            <Route path="/blogs" element={<Home />} />
            <Route path="/" element={<Navigate replace to="/blogs" />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/new-story" element={<Write />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
