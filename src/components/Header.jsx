import React, { Fragment } from "react";

import { getProfileImage } from "./../services/userServices.js";

function Header(props) {
  return (
    <Fragment>
      <div className="header__container">
        <div className="header__content">
          <div className="header__general">
            <i className="fas fa-list header__icon"></i>
            <span className="header__title">To-Do App</span>
          </div>
          {props.isLogged ? (
            <div className="header__options">
              <span className="header__username">
                Hi, {props.userData.username}
              </span>
              <span>
                {!(props.hasUserData && getProfileImage(props.userData)) ? (
                  <i className="fas fa-user header__profile-img"></i>
                ) : (
                  <img
                    className="header__profile-img"
                    src={getProfileImage(props.userData)}
                    alt="profile img"
                  />
                )}
              </span>
              <i
                className="btn fa fa-sign-out header__logout "
                aria-hidden="true"
                onClick={e => props.handleLogOut()}
              ></i>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
