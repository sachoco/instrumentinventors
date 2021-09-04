import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  TextareaAutosize,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import ProfileTags from "./ProfileTags";
import ProfileTextFieldRepeater from "./ProfileTextFieldRepeater";
import clsx from "clsx";

export default function ProfileStories(props) {
  const classes = useStyles();

  const convertToDefEventPara = (e) => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");
    const key = e.target.getAttribute("data-key");
    let new_value = [...props.items];
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
      {props.items
        ? props.items.map((item, i) => (
            <Grid item xs={12} key={i}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {props.edit ? (
                        <TextField
                          name="projects"
                          value={item.title ? item.title : ""}
                          label="Title"
                          variant="outlined"
                          className={classes.input_margin}
                          onChange={(e) =>
                            props.onChange(convertToDefEventPara(e))
                          }
                          inputProps={{
                            "data-index": `${i}`,
                            "data-key": "title",
                          }}
                        />
                      ) : (
                        <>
                          {item.title ? (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {item.title}
                            </Typography>
                          ) : (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              <Skeleton variant="rect" />
                            </Typography>
                          )}
                        </>
                      )}
                      {props.edit ? (
                        <ProfileTags
                          style={{ marginBottom: "14px" }}
                          tags={props.tags}
                          id="projects"
                          label="Tags"
                          placeholder="Tags"
                          defaultTermId={item.tags && [...item.tags]}
                          onChange={props.onChange}
                          index={i}
                          targetKey="tags"
                          parentItems={props.items}
                        />
                      ) : (
                        <>
                          {item.tags &&
                            item.tags.map((t, i) => (
                              <Chip key={i} variant="outlined" label={t.name} />
                            ))}
                        </>
                      )}
                      {props.edit ? (
                        <>
                          <TextareaAutosize
                            name="projects"
                            aria-label="Text"
                            rowsMin={3}
                            defaultValue={item.text ? item.text : ""}
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
                          {item.text ? (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {item.text}
                            </Typography>
                          ) : (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <Skeleton
                                height={20}
                                style={{ marginBottom: 6 }}
                              />
                              <Skeleton
                                height={20}
                                style={{ marginBottom: 6 }}
                              />
                              <Skeleton
                                height={20}
                                style={{ marginBottom: 6 }}
                              />
                              <Skeleton
                                height={20}
                                style={{ marginBottom: 6 }}
                              />
                              <Skeleton
                                height={20}
                                style={{ marginBottom: 6 }}
                              />
                              <Skeleton height={20} width="80%" />
                            </Typography>
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Divider style={{margin:'10px 0'}}/>

                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      {props.edit ? (
                        <>
                          <h4>Start date</h4>
                          <TextField
                            name="projects"
                            value={item.start_date ? item.start_date : ""}
                            label="Start date"
                            variant="outlined"
                            className={classes.input_margin}
                            onChange={(e) =>
                              props.onChange(convertToDefEventPara(e))
                            }
                            inputProps={{
                              "data-index": `${i}`,
                              "data-key": "start_date",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          {item.start_date ? (
                            <>
                              <h4>Start date</h4>
                              <Typography
                                gutterBottom
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                style={{marginBottom: '30px'}}
                              >
                                {item.start_date}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <h4>
                                <Skeleton
                                  variant="rect"
                                  style={{ marginBottom: 6 }}
                                />
                              </h4>
                              <Typography
                                gutterBottom
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <Skeleton variant="rect" height={20} />
                              </Typography>
                            </>
                          )}
                        </>
                      )}

                      {props.edit ? (
                        <>
                          <h4>Place to stay</h4>
                          <TextareaAutosize
                            name="projects"
                            aria-label="Place to stay"
                            rowsMin={1}
                            defaultValue={
                              item.place_to_stay ? item.place_to_stay : ""
                            }
                            placeholder="Place to stay"
                            onChange={(e) =>
                              props.onChange(convertToDefEventPara(e))
                            }
                            data-index={i}
                            data-key="place_to_stay"
                          />
                        </>
                      ) : (
                        <>
                          {item.place_to_stay ? (
                            <>
                              <h4>Place to stay</h4>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {item.place_to_stay}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <h4>
                                <Skeleton
                                  variant="rect"
                                  style={{ marginBottom: 6 }}
                                />
                              </h4>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <Skeleton variant="rect" height={20} />
                              </Typography>
                            </>
                          )}
                        </>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {item.key_qualifications||props.edit ? (
                        <h4>Key qualifications</h4>
                      ) : (
                        <h4>
                          <Skeleton
                            variant="rect"
                            style={{ marginBottom: 6 }}
                          />
                        </h4>
                      )}
                      <ProfileTextFieldRepeater
                        id="projects"
                        items={item.key_qualifications ? item.key_qualifications : []}
                        onChange={props.onChange}
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                        index={i}
                        targetKey="key_qualifications"
                        parentItems={props.items}
                        edit={props.edit}
                      />
                    </Grid>
                  </Grid>
                  {props.edit && (
                    <Button
                      onClick={() => props.onRemove("projects", i)}
                      variant="contained"
                      color="secondary"
                    >
                      Remove Project
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        : null}
      {props.edit && (
        <Grid item xs={4} style={{ marginTop: "20px" }}>
          <Button onClick={() => props.onAdd("projects")} variant="contained">
            Add Project
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
}));
