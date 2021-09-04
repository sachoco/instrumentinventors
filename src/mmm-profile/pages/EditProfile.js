import React, { useState, useRef } from "react";
import styles from "./Profile.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Typography,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Emoji from "a11y-react-emoji";
// import 'holderjs';
import { FaSpinner } from "react-icons/fa";
import { useSnackbar } from "notistack";
import {
  ProfileAvatar,
  ProfileCategories,
  ProfileResidence,
  ProfileLanguages,
  ProfileSns,
  ProfileTags,
  ProfileSlideshow,
  ProfileStories,
  ProfileProjects,
} from "../components/profile/index";
import { LoadingOverlay } from "../components/utilities/index";
import fetchUserData from "../components/rest-api/fetchUserData";
import { fetchTags } from "../components/rest-api/fetchData";
import imageUploader from "../components/profile/imageUploader";

export default function EditProfile() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    wpApiSettings.currentUser ? true : false
  );
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState();

  const initState = (userdata) => {
    setState({
      ["profile_picture"]: userdata.acf.profile_picture,
      ["first_name"]: userdata.first_name,
      ["last_name"]: userdata.last_name,
      ["display_name"]: userdata.name,
      ["description"]: userdata.acf.description,
      ["profession"]: userdata.acf.profession,
      ["country"]: userdata.acf.country.value,
      ["url"]: userdata.url,
      ["instagram_token"]: userdata.meta.instagram_token,
      ["facebook"]: userdata.acf.facebook,
      ["instagram"]: userdata.acf.instagram,
      ["twitter"]: userdata.acf.twitter,
      ["youtube"]: userdata.acf.youtube,
      ["pinterest"]: userdata.acf.pinterest,
      ["linkedin"]: userdata.acf.linkedin,
      ["language"]: userdata.acf.language ? userdata.acf.language : [],
      ["description"]: userdata.acf.description,
      ["fields"]: userdata.acf.fields ? userdata.acf.fields : [],
      ["looking_for"]: userdata.acf.looking_for ? userdata.acf.looking_for : [],
      ["interests"]: userdata.acf.interests ? userdata.acf.interests : [],
      ["offer"]: userdata.acf.offer ? userdata.acf.offer : [],
      ["slideshow"]: userdata.acf.slideshow ? userdata.acf.slideshow : [],
      ["stories"]: userdata.acf.stories ? userdata.acf.stories : [],
      ["mission"]: userdata.acf.mission,
      ["our_offer"]: userdata.acf.our_offer,
      ["projects"]: userdata.acf.projects ? userdata.acf.projects : [],
    });
  };

  const me = fetchUserData(
    "wp/v2/users/" + wpApiSettings.currentUser,
    initState
  );
  const tags = fetchTags();

  const addItem = (prop, index = null, key = null) => {
    if (index != null && key) {
      let currentState = [...state[prop]];
      !currentState[index][key]
        ? (currentState[index][key] = [{}])
        : (currentState[index][key] = [...currentState[index][key], {}]);
      // console.log(currentState);
      setState({
        ...state,
        [prop]: currentState,
      });
    } else {
      !state[prop]
        ? setState({
            ...state,
            [prop]: [{}],
          })
        : setState({
            ...state,
            [prop]: [...state[prop], {}],
          });
    }
  };
  const removeItem = (prop, key, targetKey = null, index = null) => {
    let newArr = [...state[prop]];

    if (index != null && targetKey) {
      newArr[index][targetKey].splice(key, 1);
      // console.log(newArr);
    } else {
      newArr.splice(key, 1);
    }
    setState({
      ...state,
      [prop]: newArr,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaving(true);
    const newdata = {
      nickname: state.display_name,
      name: state.display_name,
      first_name: state.first_name,
      last_name: state.last_name,
      url: state.url,
      meta: {
        instagram_token: state.instagram_token,
      },
      fields: {
        profile_picture: state.profile_picture.id,
        description: state.description,
        profession: state.profession,
        country: state.country,
        facebook: state.facebook,
        instagram: state.instagram,
        twitter: state.twitter,
        youtube: state.youtube,
        pinterest: state.pinterest,
        linkedin: state.linkedin,
        language: state.language,
        description: state.description,
        fields: state.fields,
        looking_for: state.looking_for,
        interests: state.interests,
        offer: state.offer,
        slideshow: state.slideshow
          ? state.slideshow.map((item) => {
              return item.image.id ? { image: item.image.id } : null;
            })
          : [],
        stories: state.stories
          ? state.stories.map((item) => {
              let obj;
              if (item.image || item.title || item.text) {
                obj = { ...item, image: item.image.id };
              } else {
                obj = null;
              }
              return obj ? obj : null;
            })
          : [],
        mission: state.mission,
        our_offer: state.our_offer,
        projects: state.projects,
      },
    };
    console.log(newdata);
    const wp_root = wpApiSettings.root;
    const url = "wp/v2/users/" + wpApiSettings.currentUser;

    fetch(wp_root + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": wpApiSettings.nonce,
      },
      body: JSON.stringify(newdata),
    })
      .then((response) => {
        if (response.ok === true) {
          // Submitted successfully!
          enqueueSnackbar("Saved!", { variant: "success" });
        }
        // setSaving(false);
        return response.json();
      })
      .then((object) => {
        // Comment submission failed.
        // Output `object.message` to see the error message.
        // enqueueSnackbar(object.message, { variant: 'error' });
        setSaving(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const myImageUploader = new imageUploader(handleChange);

  if (me) {
    const myRole = me.roles[0];
    return (
      <form noValidate autoComplete="on" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {loading ? (
              <Skeleton variant="circle">
                <ProfileAvatar />
              </Skeleton>
            ) : (
              <ProfileAvatar
                alt={state.display_name}
                src={state.profile_picture && state.profile_picture.url}
                className={classes.large}
                onClick={() => myImageUploader.open("profile_picture")}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="first_name"
              value={state.first_name}
              label="First Name"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="last_name"
              value={state.last_name}
              label="Last Name"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="display_name"
              value={state.display_name}
              label="Display Name"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="profession"
              value={state.profession}
              label="Profession"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <ProfileResidence onChange={handleChange} value={state.country} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="url"
              value={state.url}
              label="URL"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="instagram_token"
              value={state.instagram_token}
              label="Instagram Token"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="🌐" label="international" />{" "}
              {myRole == "mmm_creator" ? "MY" : "OUR"} SOCIAL NETWORKS
            </Typography>
            <ProfileSns
              sns={[
                { label: "Facebook", name: "facebook", value: state.facebook },
                {
                  label: "Instagram",
                  name: "instagram",
                  value: state.instagram,
                },
                { label: "Twiter", name: "twitter", value: state.twitter },
                { label: "Youtube", name: "youtube", value: state.youtube },
                {
                  label: "Pinterest",
                  name: "pinterest",
                  value: state.pinterest,
                },
                { label: "LinkedIn", name: "linkedin", value: state.linkedin },
              ]}
              onChange={handleChange}
              className={classes.input}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="🌐" label="international" />{" "}
              {myRole == "mmm_creator" ? "MY" : "OUR"} LANGUAGES
            </Typography>
            <ProfileLanguages
              language={state.language}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="🧳" label="bag" />{" "}
              {myRole == "mmm_creator" ? "I AM" : "WE ARE"}
            </Typography>
            <ProfileCategories
              userRole={myRole}
              fields={state.fields}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="🧳" label="bag" />{" "}
              {me.roles[0] == "mmm_creator" ? "I AM" : "WE ARE"} LOOKING FOR
            </Typography>
            <ProfileTags
              tags={tags}
              id="looking_for"
              label="Looking for"
              placeholder="looking for"
              defaultTermId={me.acf.looking_for}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="🧳" label="bag" /> AREA OF INTERESTS
            </Typography>
            <ProfileTags
              tags={tags}
              id="interests"
              label="Area of Interests"
              placeholder="Area of Interests"
              defaultTermId={me.acf.interests}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="🧳" label="bag" /> WHAT{" "}
              {myRole == "mmm_creator" ? "I" : "WE"} OFFER
            </Typography>
            <ProfileTags
              tags={tags}
              id="offer"
              label="What I offer"
              placeholder="What I offer"
              defaultTermId={me.acf.offer}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" component="h4">
              <Emoji symbol="✍" label="writing" /> ABOUT{" "}
              {myRole == "mmm_creator" ? "ME" : "US"}
            </Typography>
            <TextareaAutosize
              aria-label="Introduction"
              name="description"
              rowsMin={3}
              defaultValue={me.description}
              placeholder="Introduction text here..."
              onChange={handleChange}
            />
          </Grid>
          {myRole == "mmm_creator" && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" component="h4">
                  <Emoji symbol="🌈" label="rainbow" /> SHOWCASES
                </Typography>
                <ProfileSlideshow
                  slideshow={state.slideshow}
                  imageUploader={myImageUploader}
                  onRemove={removeItem}
                  edit
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" component="h4">
                  <Emoji symbol="🌈" label="rainbow" />
                  {myRole == "mmm_creator" ? "MY" : "OUR"} STORY
                </Typography>
                <ProfileStories
                  stories={state.stories}
                  imageUploader={myImageUploader}
                  onAdd={addItem}
                  onRemove={removeItem}
                  onChange={handleChange}
                  edit
                />
              </Grid>
            </>
          )}
          {myRole == "mmm_company" && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" component="h4">
                  <Emoji symbol="✍" label="writing" /> OUR MISSION
                </Typography>
                <TextareaAutosize
                  aria-label="Our mission"
                  name="mission"
                  rowsMin={3}
                  defaultValue={me.acf.mission}
                  placeholder="Write your mission here..."
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ProfileProjects
                  tags={tags}
                  items={state.projects}
                  onAdd={addItem}
                  onRemove={removeItem}
                  onChange={handleChange}
                  edit
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="h4">
                  <Emoji symbol="✍" label="writing" /> WHAT WE OFFER
                </Typography>
                <TextareaAutosize
                  aria-label="What we offer"
                  name="our_offer"
                  rowsMin={3}
                  defaultValue={me.acf.our_offer}
                  placeholder="Write your offer here..."
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {saving ? (
                <>
                  <FaSpinner
                    icon="spinner"
                    className="spinner"
                    style={{ marginRight: 10 }}
                  />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </Grid>
        </Grid>
        {saving ? <LoadingOverlay /> : null}
      </form>
    );
  }
  return null;
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
}));
