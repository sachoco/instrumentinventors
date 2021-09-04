import React from "react";
import { Grid, TextField } from "@material-ui/core";

export default function ProfileSns(props) {
  return (
    <Grid container spacing={2}>
      {props.sns
        ? props.sns.map((item, i) => (
            <Grid item xs={4} key={i}>
              <TextField
                name={item.name}
                value={item.value}
                label={item.label}
                variant="outlined"
                className={props.className}
                onChange={props.onChange}
              />
            </Grid>
          ))
        : null}
    </Grid>
  );
}
