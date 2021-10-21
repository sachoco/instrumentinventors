import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
    sx: {
      "& .MuiInput-root input": {
        padding: "4px 10px 5px",
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
          }
        }
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

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
