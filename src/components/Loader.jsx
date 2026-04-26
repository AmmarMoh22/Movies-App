import React from "react";
import loadingVideo from "../assets/loading.webm";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f0f",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: 180, height: 180 }}
      >
        <source src={loadingVideo} type="video/webm" />
      </video>
    </div>
  );
};

export default Loader;
