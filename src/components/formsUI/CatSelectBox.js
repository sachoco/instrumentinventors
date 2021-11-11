import React, { useState } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function CatSelectBox({
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
      return options.find((obj) => {
        return obj.value == str;
      });
    } else {
      return null;
    }
  };
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event, values) => {
    // setValue(values);

    let return_values = "";

    values && (return_values = values.value);

    const returnObj = { target: { name: name, value: return_values } };
    onChange(returnObj);
  };
  const style = {
    sx: {
      backgroundColor: "white",
      borderRadius: 0,
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid black",
        borderRadius: 0,
      }
    }

  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <Autocomplete
        size="small"
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} placeholder={label} />
        )}
        onChange={(event, values) => handleChange(event, values)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={formatDefaultValue(filterVal)}
        {...style}
      />
      {/*<Autocomplete
        size="small"
        options={options}
        getOptionLabel={(option) => option.name}
        defaultValue={defaultValue && defaultValue}
        renderInput={(params) => (
          <TextField {...params} placeholder={label} />
        )}
        onChange={(event, values) => handleChange(event, values)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        {...style}
      />*/}
    </Box>
  );
}
