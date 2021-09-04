import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { fetchCategories } from "../rest-api/fetchData";

export default function ProfileCategories(props) {
  const classes = useStyles();

  const categories = fetchCategories(props.userRole);

  const convertToDefEventPara = (e) => {
    const { name, value, checked } = e.target;
    let new_value = [...props.fields];
    if (checked) {
      new_value.push(parseInt(value));
    } else {
      let index = new_value.indexOf(parseInt(value));
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
    <FormGroup row className={classes.catWrapper}>
      {categories &&
        categories.map((cat, i) => (
          <div className={classes.mainCat} key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.fields && props.fields.indexOf(cat.id) > -1}
                  onChange={(e) => props.onChange(convertToDefEventPara(e))}
                  name="fields"
                  color="primary"
                  value={cat.id}
                />
              }
              label={cat.name}
            />
            <div className={classes.subCat}>
              {cat.children.length > 0 &&
                props.fields &&
                props.fields.indexOf(cat.id) > -1 &&
                cat.children.map((child) => {
                  return (
                    <FormControlLabel
                      key={child.id}
                      control={
                        <Checkbox
                          checked={props.fields.indexOf(child.id) > -1}
                          onChange={(e) =>
                            props.onChange(convertToDefEventPara(e))
                          }
                          name="fields"
                          color="primary"
                          value={child.id}
                        />
                      }
                      label={child.name}
                    />
                  );
                })}
            </div>
          </div>
        ))}
    </FormGroup>
  );
}

const useStyles = makeStyles((theme) => ({
  catWrapper: {
    display: "flex",
    flexDirection: "column",
    // maxHeight: 530,
  },
  mainCat: {
    // width: "50%",
  },
  subCat: {
    marginLeft: "50px",
  },
}));
