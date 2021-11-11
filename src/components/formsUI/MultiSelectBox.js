import React, { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const style = {
  sx: {
    backgroundColor: "white",
    borderRadius: 0,
    "& .MuiSelect-root": {
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid black"
    }
  }

};

export default function MultiSelectBox({
  label,
  defaultValue = [],
  onChange,
  options,
  name,
  ...props
}) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onChange(event);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/*<InputLabel id="select-label">{label}</InputLabel>*/}
        <Select
          labelId="select-label"
          value={value}
          onChange={handleChange}
          multiple
          input={<OutlinedInput placeholder={label} />}
          renderValue={(selected) => selected.map(e=>options.find(obj=>obj.value==e).name).join(', ')}
          MenuProps={MenuProps}
          name={name}
          {...style}
        >
          {options.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {/*<Checkbox checked={value.indexOf(item.value) > -1} />*/}
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
