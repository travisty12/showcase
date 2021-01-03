import React from "react";
import { Link } from "react-router-dom";

function LinkList() {
  {/* <p>Image Recognition</p> */}
  {/* <p>User Profiles</p> */}
  return (
    <React.Fragment>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/chatbot">Chat Bot</Link>
      <Link to="/">Home</Link>
    </React.Fragment>
  );
}

export default LinkList;