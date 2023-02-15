import React, { useState, useEffect, useFormikContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import fetchVariations from "../rest-api/fetchVariations";
import parse from "html-react-parser";

import { useField } from "formik";

export default function VariationSelectBox({
  label,
  defaultValue = "",
  onChange,
  options,
  productID = "",
  variations = null,
  ...props
}) {
  // const state = fetchVariations(productID);
  const [description, setDescription] = useState("");
  const [field, meta, helpers] = useField("variation_id");
  const { value } = meta;
  const { setValue } = helpers;

  const [priceField, priceMeta, priceHelpers] = useField("price");
  const { setValue: setPriceValue } = priceHelpers;

  const handleChange = (event) => {

    setPriceValue(
      parseFloat(
        variations.find((elem, index) => elem.id === event.target.value).price
      ).toFixed(2)
    );

    setValue(event.target.value);

    setDescription(
      parse(
        variations.find((elem, index) => elem.id === event.target.value)
          .description
      )
    );
  };
  const style = {
    sx: {
      // backgroundColor: "white",
      borderRadius: 0,
      "& .MuiOutlinedInput-notchedOutline": {
        // border: "2px solid black"
      },
      "& .MuiOutlinedInput-input": {
        // paddingTop: "8.5px",
        // paddingBottom: "8.5px"
      },
      "&:before": {
        borderBottom: "solid 2px",
      },
    },
  };
  const configSelectBox = {}
  // useEffect(()=>{
    if (meta && meta.touched && meta.error) {
      configSelectBox.error = true;
      configSelectBox.helperText = meta.error;
    }
  // },[productID])

  return (
    <div className="flex py-2 flex-col lg:flex-row items-start ">
      <div className="w-80 mr-3 leading-tight mb-5 lg:mb-auto">
        <FormControl
          fullWidth
          variant="standard"
          error={configSelectBox.error}
        >
          <InputLabel id="variation-select-label">
            {variations[0].attributes[0].name}
          </InputLabel>
          <Select
            labelId="variation-select-label"
            id="variation-select"
            defaultValue={0}
            onChange={handleChange}
            label="Payment method"
            name="variation_id"
            // displayEmpty
            {...style}
          >
            <MenuItem disabled value={0}>
              <em>Choose an option</em>
            </MenuItem>
            {variations.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.attributes[0].option}
              </MenuItem>
            ))}
          </Select>
          {configSelectBox.helperText && configSelectBox.error && (
            <FormHelperText htmlFor="render-select" error>
              {configSelectBox.helperText}
            </FormHelperText>
          )}
          <FormHelperText></FormHelperText>
        </FormControl>
        <div className="mt-2 opacity-60">{description}</div>
      </div>
    </div>
  );
}
