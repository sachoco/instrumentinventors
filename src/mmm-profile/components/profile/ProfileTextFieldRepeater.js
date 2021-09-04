import React from "react";
import {
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

export default function ProfileTextFieldRepeater(props) {
  const classes = useStyles();

  const setValueInPlace = (value, index, key, array) => {
    const new_array = [...array];
    new_array[index][key] = value;
    return new_array;
  };

  const convertToDefEventPara = (e) => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");
    const key = e.target.getAttribute("data-key");
    let v = setValueInPlace(value, index, key, props.items);

    if (props.targetKey && props.index != null) {
      const vv = setValueInPlace(
        v,
        props.index,
        props.targetKey,
        props.parentItems
      );
      v = vv;
    }
    return {
      target: {
        name: name,
        value: v,
      },
    };
  };

  const loading = null;
  return (
    <Grid container spacing={2}>
      {/*{props.items ? (
        <>*/}
          {props.edit ? (
            <>
              {props.items.map((item, i) => (
                <Grid item xs={12} key={i}>
                  <TextField
                    name={props.id}
                    value={item.text ? item.text : ""}
                    label="Text"
                    variant="outlined"
                    className={classes.input_margin}
                    onChange={(e) => props.onChange(convertToDefEventPara(e))}
                    inputProps={{
                      "data-index": `${i}`,
                      "data-key": "text",
                    }}
                  />
                  <Button
                    onClick={() =>
                      props.onRemove(props.id, props.index, props.targetKey, i)
                    }
                    variant="contained"
                    color="secondary"
                  >
                    Remove Item
                  </Button>
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                style={{ textAlign: "center", paddingTop: "10%" }}
              >
                <Button
                  onClick={() =>
                    props.onAdd(props.id, props.index, props.targetKey)
                  }
                  variant="contained"
                >
                  Add Item
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <List className={classes.List}>
                {props.items.map((item, i) => (
                  <ListItem key={i} className={classes.ListItem}>
                    <ListItemIcon className={classes.ListItemIcon}>
                      <FaCheck />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        {/*</>
      ) : (
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" component="ul">
            <ul>
              <li>
                <Skeleton height={20} style={{ marginBottom: 6 }} />
              </li>
              <li>
                <Skeleton height={20} style={{ marginBottom: 6 }} />
              </li>
              <li>
                <Skeleton height={20} style={{ marginBottom: 6 }} />
              </li>
            </ul>
          </Typography>
        </Grid>
      )}*/}
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
  ListItemIcon: {
    minWidth: 25,
  },
  ListItem: {
    padding: 0,
  },
  List: {
    padding: 0,
  }
}));
