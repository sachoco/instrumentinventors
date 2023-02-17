import React from "react";
import { Formik, Form, Field } from "formik";
import TextField from "./TextField";
import InputSlider from "./InputSlider";
import VariationSelectBox from "./VariationSelectBox";

import * as Yup from "yup";

export default function AddToCart({
  productID = null,
  defaultPrice = "",
  openPrice = false,
  variablePrice = false,
  variations = null,
  minPrice = "1",
  maxPrice = "9999999",
}) {
  let FORM_VALIDATION = Yup.object().shape({
    price: Yup.number().required("Price is required"),
    amount: Yup.number().required("Amount is required").min(1),
  });
  if (openPrice) {
    FORM_VALIDATION = Yup.object().shape({
      price: Yup.number()
        .required("Price is required")
        .min(minPrice)
        .max(maxPrice),
      amount: Yup.number().required("Amount is required").min(1),
    });
  } else if (variablePrice) {
    FORM_VALIDATION = Yup.object().shape({
      amount: Yup.number().required("Amount is required").min(1),
      variation_id: Yup.number()
        .required("Please select an option")
        .oneOf(variablePrice, "Please select appropreate option"),
    });
  }

  let INITIAL_FORM_STATE = {
    id: productID,
    price: parseFloat(defaultPrice).toFixed(2),
    amount: 1,
    variation_id: 0
  };
  if (variablePrice) {
    INITIAL_FORM_STATE =  {
      id: productID,
      price: defaultPrice,
      amount: 1,
      variation_id: 0
    };
  }


  const onSubmitHandler = (values) => {
    if (openPrice) {
      window.open(
        process.env.WC_SHOP_URL +
          "/checkout/?add-to-cart=" +
          productID +
          "&alg_open_price=" +
          values.price +
          "&quantity=" +
          values.amount
      );
    } else if (variablePrice) {
      window.open(
        process.env.WC_SHOP_URL +
          "/checkout/?add-to-cart=" +
          productID +
          "&variation_id=" +
          values.variation_id +
          "&quantity=" +
          values.amount
      );
    } else {
      window.open(
        process.env.WC_SHOP_URL +
          "/checkout/?add-to-cart=" +
          productID +
          "&quantity=" +
          values.amount
      );
    }
  };
  

  return (
    <Formik
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      // validateOnChange={false}
      // validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values)
        await onSubmitHandler(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <Form className="w-full max-w-4xl" autoComplete="off">
          <div className="flex pb-2 flex-col lg:flex-row items-start ">
            {variablePrice && <VariationSelectBox productID={productID} variations={variations} />}
          </div>
          <div className="flex py-2 flex-col lg:flex-row items-start ">
            {openPrice ? (
              <div className=" w-24 mr-3 leading-tight lg:w-24 mb-5 lg:mb-auto">
                <InputSlider
                  name="price"
                  label="Name Your Price"
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  // required
                />
              </div>
            ) : variablePrice ? (
              <div className=" w-24 mr-3 leading-tight lg:w-24 mb-5 lg:mb-auto">
                <TextField
                  type="text"
                  name="price"
                  label="Price"
                  InputProps={{
                    readOnly: true,
                    startAdornment: "€",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            ) : (
              <div className=" w-24 mr-3 leading-tight lg:w-24 mb-5 lg:mb-auto">
                <TextField
                  type="text"
                  name="price"
                  label="Price"
                  InputProps={{
                    readOnly: true,
                    startAdornment: "€",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            )}
            <div className=" w-24 mr-3 leading-tight lg:w-24 mb-5 lg:mb-auto">
              <TextField
                type="number"
                name="amount"
                label="QTY"
                // required
                // InputProps={{
                //   readOnly: openPrice,
                // }}
                inputProps={{
                  step: 1,
                  min: 1,
                }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <Field type="text" name="id" tabIndex="-1" />
            </div>
            <span className="lg:text-right mt-3 lg:mt-3">
              <button
                className="flex-grow bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
                type="button"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Get Your Ticket
              </button>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
}
