import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { languages } from "./Constants";

export default function ProfileLanguages(props) {
  const convertToDefEventPara = (e) => {
    const { name, value, checked } = e.target;
    let new_value = [...props.language];
    if (checked) {
      new_value.push(value);
    } else {
      let index = new_value.indexOf(value);
      if (index > -1) {
        new_value.splice(index, 1);
      }
    }
    return {
      target: {
        name: name,
        value: new_value,
      },
    };
  };
  return (
    <FormGroup row>
      {languages ? (
        languages.map((lang, i) => (
          <FormControlLabel
            key={lang.code}
            control={
              <Checkbox
                checked={props.language.indexOf(lang.code) > -1}
                onChange={(e) => props.onChange(convertToDefEventPara(e))}
                name="language"
                color="primary"
                value={lang.code}
              />
            }
            label={lang.label}
          />
        ))
      ) : (
        <em>Loading...</em>
      )}
    </FormGroup>
  );
}
