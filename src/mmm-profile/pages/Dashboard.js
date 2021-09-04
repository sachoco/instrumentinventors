import React, { useState } from "react";
// import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import Slider from "react-slick";

import fetchUserData from "../components/rest-api/fetchUserData";
import {
  fetchSuggestedMembers,
  fetchRelatedPosts,
  fetchFollowingMembers,
  fetchFollowers,
} from "../components/rest-api/fetchData";

export default function ViewProfile() {
  const classes = useStyles();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    wpApiSettings.currentUser ? true : false
  );

  const data = fetchUserData("mmm/v1/members/" + wpApiSettings.currentUser);
  const role = wpApiSettings.roleOfProfile;
  const suggestedMembers = fetchSuggestedMembers(wpApiSettings.currentUser);
  const relatedPosts = fetchRelatedPosts(wpApiSettings.currentUser);
  const followingMembers = fetchFollowingMembers(wpApiSettings.currentUser);
  const followers = fetchFollowers(wpApiSettings.currentUser);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SliderArrow to="left" />,
    nextArrow: <SliderArrow to="right" />,
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <>
          <h4>MATCH SUGGESTIONS</h4>
          {/*<Grid container spacing={1}>*/}
          <Slider className={classes.slider} {...settings}>
            {suggestedMembers
              ? suggestedMembers.map((member, i) => (
                  <div className={classes.wrapper}>
                    <Card key={i} variant="outlined" className={classes.Card}>
                      <CardContent className={classes.CardContent}>
                        <Avatar
                          alt={member.display_name}
                          src={member.acf.profile_picture?.sizes?.thumbnail}
                          className={classes.middle}
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                          {member.display_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {member.acf.profession}
                        </Typography>
                        <Button
                          className={classes.Button}
                          variant="contained"
                          color="primary"
                          href={`/member/` + member.id}
                        >
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))
              : null}
          </Slider>
          {/*</Grid>*/}
        </>
      </Grid>
      <Grid item xs={12}>
        <h4>SELECTED ARTICLES</h4>
        <Grid container spacing={1}>
          {relatedPosts
            ? relatedPosts.map((post, i) => (
                <Grid item xs={2} key={i}>
                  <Card variant="outlined" className={classes.Card}>
                    <CardMedia
                      image={post.thumbnail && post.thumbnail}
                      title={post.title && post.title}
                      className={classes.media}
                    />

                    <CardContent className={classes.CardContent}>
                      {post.tag &&
                        post.tag.map((t, i) => (
                          <Chip
                            key={i}
                            variant="outlined"
                            label={t.name}
                            className={classes.Chip}
                            size="small"
                          />
                        ))}
                      <Typography gutterBottom variant="body2" component="h2">
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {post.excerpt ? post.excerpt : "Some excerpt here..."}
                      </Typography>
                      <Button href={post.url}>
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h4>MEMBERS YOU ARE FOLLOWING</h4>
        <Grid container spacing={1}>
          {followingMembers
            ? followingMembers.map((member, i) => (
                <Grid item xs={2} key={i}>
                  <Card key={i} variant="outlined" className={classes.Card}>
                    <CardContent className={classes.CardContent}>
                      <Avatar
                        alt={member.display_name}
                        src={member.acf.profile_picture?.sizes?.thumbnail}
                        className={classes.middle}
                      />
                      <Typography gutterBottom variant="h5" component="h2">
                        {member.display_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {member.acf.profession}
                      </Typography>
                      <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        href={`/member/` + member.id}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h4>MEMBERS WHO FOLLOW YOU</h4>
        <Grid container spacing={1}>
          {followers
            ? followers.map((member, i) => (
                <Grid item xs={2} key={i}>
                  <Card key={i} variant="outlined" className={classes.Card}>
                    <CardContent className={classes.CardContent}>
                      <Avatar
                        alt={member.display_name}
                        src={member.acf.profile_picture?.sizes?.thumbnail}
                        className={classes.middle}
                      />
                      <Typography gutterBottom variant="h5" component="h2">
                        {member.display_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {member.acf.profession}
                      </Typography>
                      <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        href={`/member/` + member.id}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  middle: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "auto",
  },
  slider: {
    "& .slick-list": {
      margin: "0 -5px",
    },
  },
  wrapper: {
    padding: "0 5px",
  },
  Card: {
    // margin: "0 5px",
  },
  CardContent: {
    textAlign: "center",
  },
  media: {
    paddingTop: "80%",
  },
  IconButton: {
    padding: 3,
    margin: 2,
  },
  Button: {
    "&:visited": {
      color: "white",
    },
  },
}));

const SliderArrow = ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`button button--text button--icon ${className}`}
    aria-label={to}
  >
    {to == "right" ? ">" : "<"}
  </button>
);
