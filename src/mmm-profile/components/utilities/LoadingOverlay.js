import React from "react";
import { default as MmmLogo } from "../../../assets/mmm-logo.svg";
import { makeStyles } from "@material-ui/core/styles";

export default function LoadingOverlay(props) {
  const classes = useStyles();

  return (
    <div className={classes.loadingOverlay}>
      <img className="spinner" src={MmmLogo} alt="MMM Logo" />
      <span>Handling Data...</span>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 1,
  },
}));
