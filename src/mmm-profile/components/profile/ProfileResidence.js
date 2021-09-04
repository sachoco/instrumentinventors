import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { countries } from "./Constants";

export default function ProfileAvatar(props) {
  const classes = useStyles();

  return (
      <FormControl variant="outlined" className={classes.select}>
        <InputLabel htmlFor="resident_country">Residence</InputLabel>
        <Select
          native
          value={props.value}
          onChange={props.onChange}
          label="Residence"
          inputProps={{
            name: "country",
            id: "resident_country",
          }}
        >
          <option aria-label="None" value="" />
          {countryOptions}
        </Select>
      </FormControl>
  );
}

countries.sort(function (a, b) {
  var nameA = a.label.toUpperCase(); // ignore upper and lowercase
  var nameB = b.label.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});

const countryOptions = countries.map((country, i) => (
  <option key={i} value={country.code}>
    {country.label}
  </option>
));

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    "& select": {
      fontSize: "1.2em",
    },
  },
}));
