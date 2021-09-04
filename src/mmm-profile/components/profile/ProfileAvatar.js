import React from "react";
import {
  Avatar,
  Button,
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';

import styles from "./ProfileAvatar.module.scss";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

export default function ProfileAvatar(props) {
  const classes = useStyles();

  return (
    <>
    {/*{props.src ? (*/}
      <Avatar
        alt={props.alt}
        src={props.src}
        className={clsx(
          classes.large,
          styles.MuiAvatar
        )}
        onClick={props.onClick}
      />
    {/*) : (
      <Skeleton variant="circle" width={140} height={140} />
    )}*/}

    </>
  );
}

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));
