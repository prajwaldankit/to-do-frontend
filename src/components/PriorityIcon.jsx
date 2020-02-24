import React from "react";

import HighPriority from "./../assets/images/highPriority.png";
import ModeratePriority from "./../assets/images/modPriority.png";
import LowPriority from "./../assets/images/lowPriority.png";
import PendingPriority from "./../assets/images/pendingPriority.png";

export default function PriorityIcon(props) {
  let imgSrc = PendingPriority;
  if (props.priority === "high") {
    imgSrc = HighPriority;
  }
  if (props.priority === "moderate") {
    imgSrc = ModeratePriority;
  }
  if (props.priority === "low") {
    imgSrc = LowPriority;
  }
  return (
    <>
      <img
        src={imgSrc}
        alt={`${props.priority} Priority Icon`}
        width="32px"
        height="32px"
      />
    </>
  );
}
