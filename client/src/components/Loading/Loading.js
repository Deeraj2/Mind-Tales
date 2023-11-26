import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <div class="spinner-box">
        <div class="leo-border-1">
          <div class="leo-core-1"></div>
        </div>
        <div class="leo-border-2">
          <div class="leo-core-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
