import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import * as api from "../../api";
import "./Auth.css";
import { blogContext } from "../../context/BlogProvider";

const Auth = () => {
  const { setUser } = useContext(blogContext);
  const [isSignUp, setisSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });

  const navigate = useNavigate();

  const signUp = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      console.log("Please fill all the fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      console.log("Password doesnt match");
      return;
    }

    try {
      const { data } = await api.singup(formData);
      localStorage.setItem("profileDetail", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const singIn = async () => {
    if (!formData.email || !formData.password) {
      console.log("Please fill the fields");
      return;
    }
    try {
      const { data } = await api.signin(formData);
      localStorage.setItem("profileDetail", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      signUp();
    } else {
      singIn();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profileDetail"));

    if (user) navigate("/");
  }, [navigate]);

  return (
    <div className="auth">
      <div className="auth-gradient" />
      <div className="auth-container">
        <form
          onSubmit={handleSubmit}
          className={isSignUp ? "auth-login sign" : "auth-login"}
        >
          <h1>
            Mind<span className="name">Tales</span>
          </h1>
          <h2>{isSignUp ? "SignUp" : "SignIn"}</h2>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          )}
          {isSignUp && (
            <FileBase
              type="file"
              name="pic"
              multiple={false}
              onDone={({ base64 }) => setFormData({ ...formData, pic: base64 })}
            />
          )}
          <button type="submit" className="submit-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <h4 className="switch-btn" onClick={() => setisSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account ? SignIn"
              : "Don't have an account ? SignUp"}
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Auth;
