import React from "react";

import "../styles/FAB.css";

function AddIcon(props) {
  return (
    <button
      className="fab btn-add"
      onClick={e => props.onClick("Add Main Task")}
    ></button>
  );
}

export default AddIcon;
