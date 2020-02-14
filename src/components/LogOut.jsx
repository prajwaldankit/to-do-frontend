import React from "react";

function LogOut(props) {
  return (
    <>
      <button onClick={e => props.handleLogOut()}>Log Out</button>
    </>
  );
}

export default LogOut;
