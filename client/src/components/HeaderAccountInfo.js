import React from "react";
import { Link } from "react-router-dom";

function HeaderAccountInfo(props) {
  let output;
  if (props.userSignedIn) {
    output = <p><Link to="/profile">Profile</Link>  |  <Link to="/signout">Sign Out</Link></p>;
  } else {
    output = <p><Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link></p>;
  }
  return (
    <React.Fragment>
      {output}
    </React.Fragment>
  );
}

export default HeaderAccountInfo;