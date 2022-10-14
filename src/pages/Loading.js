import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { useStyles } from '../components/Overlay/useStyles';

function Loading() {
  const classes = useStyles();
  return (
    <div class="contentWrap" className={classes.popupOverlay} >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="#2947fb"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
}

export default Loading;