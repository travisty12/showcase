import React from "react";
import { connect } from 'react-redux';

const Profile = ({session, match: {params: { username }}}) => {
  console.log(username);
  if (!session.username) {
    console.log('Something went wrong!');
  } else {
    console.log(session);
  }
  return (
    <React.Fragment>
      <p>{session.username}'s profile overview</p>
    </React.Fragment>
  );
}

const mapStateToProps = ({session}) => ({
  session
});

export default connect(mapStateToProps)(Profile);