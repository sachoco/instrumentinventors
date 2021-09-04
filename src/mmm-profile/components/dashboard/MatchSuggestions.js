import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { ProfileFollowBtn } from "../components/profile/index";
import clsx from "clsx";


export default function ProfileStories(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {props.items
        ? props.items.map((item, i) => (
            <Grid item xs={4} key={i}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Avatar
                    alt={item.display_name}
                    src={item.acf.profile_picture.sizes.thumbnail}
                  />
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.display_name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.profession}
                  </Typography>
                  <ProfileFollowBtn
                    userId={wpApiSettings.currentUser}
                    profileOf={item.id}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))
        : null}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    "& select": {
      fontSize: "1.2em",
    },
  },
}));
