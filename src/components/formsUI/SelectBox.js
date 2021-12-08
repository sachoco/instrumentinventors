import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function SelectBox({ label, defaultValue = "", onChange, options, name, ...props }) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };
  const style = {
    sx: {
      backgroundColor: "white",
      borderRadius: 0,
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid black"
      },
      "& .MuiOutlinedInput-input": {
        paddingTop: "8.5px",
        paddingBottom: "8.5px"
      }
    }

  };
  useEffect(()=>{
    setValue(defaultValue);
  },[defaultValue])
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/*<InputLabel id="select-label">{label}</InputLabel>*/}
        <Select
          labelId="select-label"
          value={value}
          onChange={handleChange}
          name={name}
          {...style}
        >
        {options.map((item, i) => (
          <MenuItem key={i} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}
