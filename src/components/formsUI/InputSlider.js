import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { useField } from "formik";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 420,
    // fontSize: theme.typography.pxToRem(12),
    fontSize: "1rem",
    border: "1px solid #dadde9",
    lineHeight: "120%",
    padding: "1rem"
  },
}));

export default function InputSlider({
  name,
  minPrice,
  maxPrice,
  ...otherProps
}) {
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
      <div className="relative">
        <HtmlTooltip
          title={
            <>
              At iii we use a sliding scale for ticket prices to events, since
              everyone’s budget is different and we want to make our program
              accessible to everyone. So please select the amount that balances
              best your love for our program and your budget.
            </>
          }
        >
          <div className="absolute -right-1 -top-1 z-50">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7.5" cy="7.5" r="6.5" fill="white" />
              <path
                d="M7.5 4.25H7.50813M8.3125 10.75H7.5V7.5H6.6875L8.3125 10.75Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 7.5C14 8.35359 13.8319 9.19883 13.5052 9.98744C13.1786 10.7761 12.6998 11.4926 12.0962 12.0962C11.4926 12.6998 10.7761 13.1786 9.98744 13.5052C9.19883 13.8319 8.35359 14 7.5 14C6.64641 14 5.80117 13.8319 5.01256 13.5052C4.22394 13.1786 3.50739 12.6998 2.90381 12.0962C2.30022 11.4926 1.82144 10.7761 1.49478 9.98744C1.16813 9.19883 1 8.35359 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5Z"
                stroke="black"
                stroke-width="0.444444"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </HtmlTooltip>

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
