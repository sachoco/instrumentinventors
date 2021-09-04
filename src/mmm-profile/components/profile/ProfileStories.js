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

import clsx from "clsx";

export default function ProfileStories(props) {
  const classes = useStyles();

  const convertToDefEventPara = (e) => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");
    const key = e.target.getAttribute("data-key");
    let new_value = [...props.stories];
    new_value[index][key] = value;
    return {
      target: {
        name: name,
        value: new_value,
      },
    };
  };

  return (
    <Grid container spacing={2}>
      {props.stories
        ? props.stories.map((story, i) => (
            <Grid item xs={4} key={i}>
              <Card className={classes.card} variant="outlined">
                {!story ? (
                  <Skeleton variant="rect" className={classes.media} />
                ) : (
                  <>
                    <CardMedia
                      className={
                        story.image
                          ? classes.media
                          : clsx(classes.media, "noImage")
                      }
                      image={story.image ? story.image.url : ""}
                      title={story.title ? story.title : ""}
                    >
                      {props.edit && (
                        <div className="overlay">
                          <Button
                            onClick={() => props.imageUploader.open("stories", i, props.stories)}
                            size="small"
                            variant="outlined"
                            color="primary"
                          >
                            Edit Image
                          </Button>
                        </div>
                      )}
                    </CardMedia>
                  </>
                )}
                <CardContent>
                  {props.edit ? (
                    <TextField
                      name="stories"
                      value={story.title ? story.title : ""}
                      label="Title"
                      variant="outlined"
                      className={classes.input_margin}
                      onChange={(e) => props.onChange(convertToDefEventPara(e))}
                      inputProps={{
                        "data-index": `${i}`,
                        "data-key": "title",
                      }}
                    />
                  ) : (
                    <>
                      {story.title ? (
                        <Typography gutterBottom variant="h5" component="h2">
                          {story.title}
                        </Typography>
                      ) : (
                        <Typography gutterBottom variant="h5" component="h2">
                          <Skeleton variant="rect" />
                        </Typography>
                      )}
                    </>
                  )}

                  {props.edit ? (
                    <>
                      <TextareaAutosize
                        name="stories"
                        aria-label="Text"
                        rowsMin={3}
                        defaultValue={story.text ? story.text : ""}
                        placeholder="Add your text here..."
                        onChange={(e) =>
                          props.onChange(convertToDefEventPara(e))
                        }
                        data-index={i}
                        data-key="text"
                      />
                    </>
                  ) : (
                    <>
                      {story.text ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {story.text}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <Skeleton variant="rect" />
                        </Typography>
                      )}
                    </>
                  )}
                  {props.edit && (
                    <Button
                      onClick={() => props.onRemove("stories", i)}
                      variant="contained"
                      color="secondary"
                    >
                      Remove Story
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        : null}
      {props.edit && (
        <Grid item xs={4} style={{ textAlign: "center", paddingTop: "10%" }}>
          <Button onClick={() => props.onAdd("stories")} variant="contained">
            Add Story
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
  card: {
    width: "100%",
    "& select": {
      fontSize: "1.2em",
    },
  },
  input_margin: {
    width: "100%",
    marginBottom: "1em",
  },
  media: {
    position: "relative",
    paddingTop: "60%",
    "& .overlay": {
      content: '""',
      top: 0,
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: "5%",
      display: "flex",
      zIndex: "9",
      visibility: "hidden",
    },
    "&:hover": {
      "& .overlay": {
        visibility: "visible",
      },
    },
    "&.noImage": {
      "& .overlay": {
        visibility: "visible",
      },
    },
  },
}));
