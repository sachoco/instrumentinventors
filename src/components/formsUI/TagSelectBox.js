import React, { useState } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function TagSelectBox({
  label,
  defaultValue,
  onChange,
  options,
  name,
  filterVal,
  ...props
}) {
  const formatDefaultValue = (str) => {
    if (str) {
      return options.filter((obj) => {
        const array = str.toString().split(",");
        return array.includes(obj.value.toString());
      });
    } else {
      return [];
    }
  };
  const [values, setValues] = useState(formatDefaultValue(defaultValue));
  const handleChange = (event, values) => {
    // setValues(values);
    let return_values = "";

    values &&
      (return_values = values.map(function (v) {
        return v.value;
      }));
    const returnObj = {
      target: { name: name, value: return_values.join(",") },
    };
    console.log(returnObj)
    onChange(returnObj);
  };
  const style = {
    sx: {
      backgroundColor: "white",
      borderRadius: 0,
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid black",
        borderRadius: 0,
      },
    },
  };


  return (
    <Box sx={{ minWidth: 120 }}>
      <Autocomplete
        size="small"
        multiple
        limitTags={2}
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} placeholder={label} />}
        onChange={(event, values) => handleChange(event, values)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={formatDefaultValue(filterVal)}
        {...style}
      />
      {/*<Autocomplete
        size="small"
        multiple
        limitTags={2}
        options={options}
        getOptionLabel={(option) => option.name}
        defaultValue={formatDefaultValue(defaultValue)}
        renderInput={(params) => <TextField {...params} placeholder={label} />}
        onChange={(event, values) => handleChange(event, values)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={values}
        {...style}
      />*/}
    </Box>
  );
}
