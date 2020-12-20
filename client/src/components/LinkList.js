import React from "react";
import { Link } from "react-router-dom";

function LinkList() {
  return (
    <React.Fragment>
      <Link to="/portfolio">Portfolio</Link>
      <p>Image Recognition</p>
      <Link to="/chatbot">Chat Bot</Link>
      <p>User Profiles</p>
      <Link to="/">Home</Link>
    </React.Fragment>
  );
}

export default LinkList;