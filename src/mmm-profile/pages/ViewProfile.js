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
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import clsx from "clsx";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  ProfileSlideshow,
  ProfileStories,
  ProfileTags,
  ProfileProjects,
  ProfileFollowBtn,
  ProfileContactBtn,
} from "../components/profile/index";
import Emoji from "a11y-react-emoji";

import fetchUserData from "../components/rest-api/fetchUserData";

import InstaFeeds from '../components/InstagramFeed/InstaFeeds';

export default function ViewProfile() {
  const classes = useStyles();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    wpApiSettings.currentUser ? true : false
  );

  const data = fetchUserData("mmm/v1/members/" + wpApiSettings.profileOf);
  const role = wpApiSettings.roleOfProfile;
  const isMyProfile = wpApiSettings.profileOf==wpApiSettings.currentUser;
  // const follow =
  // if (me.id==wpApiSettings.profileOf) {
  return (
    <Grid container spacing={4}>
      {isUserLoggedIn && !isMyProfile && data && (
        <Grid item xs={12}>
          <ProfileFollowBtn
            userId={wpApiSettings.currentUser}
            profileOf={wpApiSettings.profileOf}
          />
        </Grid>
      )}
      <Grid item xs={4}>
        {!data ? (
          <Skeleton variant="circle">
            <Avatar className={classes.large} />
          </Skeleton>
        ) : (
          <Avatar
            alt={data.display_name}
            src={data.acf.profile_picture?.sizes?.thumbnail}
            className={classes.large}
          />
        )}

        {!data ? (
          <h1>
            <Skeleton variant="rect" />
          </h1>
        ) : (
          <h1>{data.first_name + " " + data.last_name}</h1>
        )}
        {!data ? (
          <h2>
            <Skeleton variant="rect" />
          </h2>
        ) : (
          <h2>{data.display_name}</h2>
        )}

        {!data ? (
          <div>
            <Skeleton variant="rect" height={20} style={{ marginBottom: 6 }} />
          </div>
        ) : (
          <div>{data.acf.profession + "・" + data.acf.country?.label}</div>
        )}

        {!data ? (
          <div>
            <Skeleton variant="rect" height={20} style={{ marginBottom: 6 }} />
          </div>
        ) : (
          <div>
            <a href={data.url} target="_blank">
              {data.url}
            </a>
          </div>
        )}

        {data ? (
          <div>
            {data.acf.facebook ? (
              <a href={data.acf.facebook} target="_blank">
                <IconButton color="primary" className={classes.IconButton}>
                  <FaFacebookF
                    className={clsx(styles.circleOutline, styles.facebook)}
                  />
                </IconButton>
              </a>
            ) : null}
            {data.acf.instagram ? (
              <a href={data.instagram} target="_blank">
                <IconButton color="primary" className={classes.IconButton}>
                  <FaInstagram
                    className={clsx(styles.circleOutline, styles.instagram)}
                  />
                </IconButton>
              </a>
            ) : null}
            {data.acf.twitter ? (
              <a href={data.twitter} target="_blank">
                <IconButton color="primary" className={classes.IconButton}>
                  <FaTwitter
                    className={clsx(styles.circleOutline, styles.twitter)}
                  />
                </IconButton>
              </a>
            ) : null}
            {data.acf.youtube ? (
              <a href={data.youtube} target="_blank">
                <IconButton color="primary" className={classes.IconButton}>
                  <FaYoutube
                    className={clsx(styles.circleOutline, styles.youtube)}
                  />
                </IconButton>
              </a>
            ) : null}
            {data.acf.pinterest ? (
              <a href={data.pinterest} target="_blank">
                <IconButton color="primary" className={classes.IconButton}>
                  <FaPinterest
                    className={clsx(styles.circleOutline, styles.pinterest)}
                  />
                </IconButton>
              </a>
            ) : null}
            {data.acf.linkedin ? (
              <a href={data.linkedin} target="_blank">
                <IconButton color="primary" className={classes.IconButton}>
                  <FaLinkedinIn
                    className={clsx(styles.circleOutline, styles.linkedin)}
                  />
                </IconButton>
              </a>
            ) : null}
          </div>
        ) : null}
        {isUserLoggedIn && !isMyProfile && data && (
          <ProfileContactBtn
            senderId={wpApiSettings.currentUser}
            recipientMemberId={wpApiSettings.profileOf}
          />
        )}
      </Grid>
      <Grid item xs={8}>
        {!data ? (
          <p>
            <Skeleton height={20} style={{ marginBottom: 6 }} />
            <Skeleton height={20} style={{ marginBottom: 6 }} />
            <Skeleton height={20} style={{ marginBottom: 6 }} />
            <Skeleton height={20} style={{ marginBottom: 6 }} />
            <Skeleton height={20} style={{ marginBottom: 6 }} />
            <Skeleton height={20} width="80%" />
          </p>
        ) : (
          <p>{data.acf.description}</p>
        )}

        {data && (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <div style={{ marginBottom: 10 }}>
                <div>{data.role == "mmm_creator" ? "I AM" : "WE ARE"}</div>
                {data.acf.fields &&
                  data.acf.fields.map((f, i) => (
                    <Chip
                      key={i}
                      variant="outlined"
                      label={f.name}
                      className={styles.Chip}
                    />
                  ))}
              </div>
              <div style={{ marginBottom: 10 }}>
                <div>{data.role == "mmm_creator" ? "MY" : "OUR"} LANGUAGES</div>
                {data.acf.language &&
                  data.acf.language.map((lang, i) => (
                    <Chip
                      key={i}
                      variant="outlined"
                      label={lang.label}
                      className={styles.Chip}
                    />
                  ))}
              </div>
              <div style={{ marginBottom: 10 }}>
                <div>{data.role == "mmm_creator" ? "I" : "WE"} CAN OFFER</div>
                {data.acf.offer &&
                  data.acf.offer.map((t, i) => (
                    <Chip
                      key={i}
                      variant="outlined"
                      label={t.name}
                      className={styles.Chip}
                    />
                  ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginBottom: 10 }}>
                <div>AREA OF INTERESTS</div>
                {data.acf.interests &&
                  data.acf.interests.map((t, i) => (
                    <Chip
                      key={i}
                      variant="outlined"
                      label={t.name}
                      className={styles.Chip}
                    />
                  ))}
              </div>
              <div style={{ marginBottom: 10 }}>
                <div>LOOKING FOR</div>
                {data.acf.looking_for &&
                  data.acf.looking_for.map((t, i) => (
                    <Chip
                      key={i}
                      variant="outlined"
                      label={t.name}
                      className={styles.Chip}
                    />
                  ))}
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
      {role == "mmm_creator" && (
        <>
          <Grid item xs={12}>
            <h4>MY WORKS</h4>
            {!data ? (
              <Skeleton variant="rect" className={classes.media} />
            ) : (
              <ProfileSlideshow slideshow={data.acf.slideshow} />
            )}
          </Grid>
          <Grid item xs={12}>
            <h4>MY STORY</h4>
            <ProfileStories stories={data ? data.acf.stories : [{}, {}, {}]} />
          </Grid>
        </>
      )}
      {role == "mmm_company" && (
        <>
          <Grid item xs={12}>
            {!data ? (
              <>
                <h4>
                  <Skeleton variant="rect" />
                </h4>
                <p>
                  <Skeleton height={20} style={{ marginBottom: 6 }} />
                  <Skeleton height={20} style={{ marginBottom: 6 }} />
                  <Skeleton height={20} style={{ marginBottom: 6 }} />
                  <Skeleton height={20} width="80%" />
                </p>
              </>
            ) : (
              <>
                <h4>OUR MISSION</h4>
                <p>{data.acf.mission}</p>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <ProfileProjects items={data ? data.acf.projects : [{}]} />
          </Grid>
          <Grid item xs={12}>
            {!data ? (
              <>
                <h4>
                  <Skeleton variant="rect" />
                </h4>
                <p>
                  <Skeleton height={20} style={{ marginBottom: 6 }} />
                  <Skeleton height={20} style={{ marginBottom: 6 }} />
                  <Skeleton height={20} style={{ marginBottom: 6 }} />
                  <Skeleton height={20} width="80%" />
                </p>
              </>
            ) : (
              <>
                <h4>WHAT WE OFFER</h4>
                <p>{data.acf.our_offer}</p>
              </>
            )}
          </Grid>
        </>
      )}
      {
        data?.instagram_token && (
          <Grid item xs={12}>
            <h4>RECENT INSTAGRAM FEEDS</h4>
            <InstaFeeds token={data.instagram_token} limit={6}/>
          </Grid>
        )
      }
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  input: {
    width: "100%",
  },
  select: {
    width: "100%",
    "& select": {
      fontSize: "1.2em",
    },
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  input_margin: {
    width: "100%",
    marginBottom: "1em",
  },
  media: {
    paddingTop: "36%",
  },
  IconButton: {
    padding: 3,
    margin: 2,
  },
}));
