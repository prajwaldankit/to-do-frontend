import React from "react";

import "./../styles/Header.css";
import AppIcon from "./../assets/images/ToDoIcon.png";

function Header(props) {
  return (
    <>
      <div className="heading container">
        <div className="heading content">
          <div className="general">
            <img src={AppIcon} className="app-icon" alt="App Logo" />
            <span className="app-title">To-Do App</span>
          </div>
          {props.isLogged ? (
            <div className="user-options">
              <span className="profile-name">
                Hi, {props.userData.username}
              </span>
              <button
                className="btn btn-logout"
                onClick={e => props.handleLogOut()}
              ></button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
