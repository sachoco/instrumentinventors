import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

export default function InputSlider({ name, minPrice, maxPrice, ...otherProps }) {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const handleSliderChange = (event, newValue) => {
    // setValue(newValue);
    setValue(parseFloat(newValue).toFixed(2));
  };
  const handleTextfieldChange = (event) => {
    // console.log(event.target.value)
    // setValue(newValue);
    setValue(parseFloat(event.target.value).toFixed(2));
  };
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
    type: "number",
    onChange: handleTextfieldChange,
    InputProps: {
      startAdornment: "€",
    },
    inputProps: {
      step: 0.1,
      min: minPrice,
      max: maxPrice,
      "aria-labelledby": "input-slider",
    },
    sx: {
      "& .MuiInput-root input": {
        padding: "4px 10px 5px",
        width: "120px",
      },
      "& .MuiInput-root:before": {
        borderBottom: "2px solid black",
      },
      "& .MuiInputLabel-root": {
        transform: "translate(10px, 20px) scale(1)",
        "&.MuiInputLabel-shrink": {
          transform: "translate(0, -1.5px) scale(0.75)",
        },

        "&.Mui-focused, &.MuiFormLabel-filled": {
          "& .MuiFormLabel-asterisk": {
            // color: "green"
          },
        },
      },
      // focused color for input with variant='standard'
      "& .MuiInput-underline:after": {
        // borderBottomColor: "green",
      },
      // focused color for input with variant='outlined'
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          // borderColor: "green",
        },
      },
    },
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <div>
      <div>
        <TextField {...configTextfield} />
      </div>
      <div>
        <Slider
          value={typeof value === "number" ? value : Number(value)}
          step={0.1}
          min={Number(minPrice)}
          max={Number(maxPrice)}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </div>
    </div>
  );
}
