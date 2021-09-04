import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import clsx from "clsx";

import fetchData from "./fetchData";

export default function ViewProfile() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const data = fetchData(
    "satoshi.shiraishi",
  );
  // if (me.id==wpApiSettings.profileOf) {
  return (
    <ul>
    {data ? (
      data.map((node, i) => (
        <li key={i} >
          <img src={node.display_url} />
        </li>
      ))
    ) : (
      <em>Loading...</em>
    )}
    </ul>

  );
}

const useStyles = makeStyles((theme) => ({
  
}));
