import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip, TextField, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ProfileTags(props) {
  const classes = useStyles();

  const convertToDefEventPara = (event, values, name) => {
    let new_value = [];

    if(props.targetKey&&(props.index!=null)){
      new_value = [...props.parentItems];
      let convertedValues = []
      values &&
        (convertedValues = values.map(function (v) {
          return v.id;
        }));
      new_value[props.index][props.targetKey] = convertedValues;
    }else{
      values &&
        (new_value = values.map(function (v) {
          return v.id;
        }));
    }

    return {
      target: {
        name: name,
        value: new_value,
      },
    };
  };

  return (
    <>
      {props.tags && (
        <div>
          <Autocomplete
            {...props}
            multiple
            id={props.id}
            options={props.tags}
            freeSolo
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            defaultValue={
              props.defaultTermId
                ? props.tags.filter((x) => props.defaultTermId.includes(x.id))
                : []
            }
            onChange={(event, values) =>
              props.onChange(convertToDefEventPara(event, values, props.id))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={props.label}
                placeholder={props.placeholder}
                className={classes.noBorder}
              />
            )}
          />
          {/*<Autocomplete
              multiple
              id={props.id}
              options={tags}
              getOptionLabel={(option) => option.name}
              freeSolo
              filterSelectedOptions
              onChange={props.onChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={props.label}
                  placeholder={props.placeholder}
                />
              )}
            />*/}
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
