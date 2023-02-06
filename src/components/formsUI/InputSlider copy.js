import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import MuiInput from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { NumericFormat } from "react-number-format";
import FormControl from "@mui/material/FormControl";
import { useField } from "formik";
import MyTextField from "./TextField";

const Input = styled(MuiInput)`
  width: 120px;
`;
// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
//   props,
//   ref
// ) {
//   const { onChange, ...other } = props;

//   return (
//     <NumericFormat
//       {...other}
//       getInputRef={ref}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       decimalScale={2}
//       thousandSeparator
//       valueIsNumericString
//       step="0.1"
//       min="7"
//       max="15"
//       //   prefix="€"
//     />
//   );
// });

// NumberFormatCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
export default function InputSlider({ name, ...otherProps }) {
  //   const [value, setValue] = React.useState(9.0);
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  //   const handleInputChange = (event) => {
  //     setValue(event.target.value === "" ? "" : Number(event.target.value));
  //   };

  //   const handleBlur = () => {
  //     if (value < 0) {
  //       setValue(0);
  //     } else if (value > 100) {
  //       setValue(100);
  //     }
  //   };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
    type: "number",
    InputProps: {
      startAdornment: "€",
    },
    inputProps: {
      step: 0.1,
      min: 7.0,
      max: 15.0,
      "aria-labelledby": "input-slider",
    },
    sx: {
      "& .MuiInput-root input": {
        padding: "4px 10px 5px",
        width: "120px"
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
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {/* <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Name Your Price*</InputLabel>
            <Input
              id="component-simple"
              className="w-20"
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              inputProps={{
                step: 0.1,
                min: 7.0,
                max: 15.0,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </FormControl> */}

          {/* <TextField
            label="Name Your Price"
            value={value}
            onChange={handleInputChange}
            name="price"
            type="number"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            variant="standard"
          /> */}
          <TextField {...configTextfield} />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            // defaultValue={9.0}
            step={0.1}
            min={7.0}
            max={15.0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
