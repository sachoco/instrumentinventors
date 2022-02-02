import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import he from "he";
import parse from "html-react-parser";

import * as Yup from "yup";

import { useMailchimp, Status } from "../hooks/mailchimp";
import TextField from "../formsUI/TextField";

const SignupForm = () => {
  const mailchimpUrl = process.env.MAILCHIMP_URL;
  const dummyField = process.env.MAILCHIMP_DUMMY_FIELD;

  const { subscribe, status, error, value } = useMailchimp(mailchimpUrl);


  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string("Enter your first name").required(
      "First name is required"
    ),
    lastName: Yup.string("Enter your last name").required(
      "Last name is required"
    ),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    // gdpr: "",
    [dummyField]: "",
  };
  const onSubmitHandler = (values) => {
    // We are performing some simple validation here.
    // I highly recommend checking a fully-fledged solution
    // for forms like https://react-hook-form.com/
    // console.log(values);
    // if (form.firstName === "" || form.lastName === "" || form.email === "")
    //   return;

    subscribe({
      FNAME: values.firstName,
      LNAME: values.lastName,
      EMAIL: values.email,
      // gdpr: [5429,"Y"],
      // gdpr: [37901,"Y"],
      [dummyField]: values[dummyField],
    });
  };

  // if (status === Status.loading) {
  //   return <div>loading</div>;
  // }
  //
  if (status === Status.error) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
        {error && parse(error)}
      </div>
    );
  }

  // if (value.includes("already subscribed")) {
  //   return (
  //     <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
  //       You seem to be already in our list.
  //     </div>
  //   );
  // }

  if (status === Status.success) {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
        {value && parse(value)}
      </div>
    );
  }
  return (
    <Formik
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      validateOnChange={false}
      // validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        // console.log(values)
        await onSubmitHandler(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <Form className="w-full max-w-4xl" autoComplete="off">
          <div className="flex py-2 flex-col lg:flex-row items-start">
            <div className="w-full mr-3 leading-tight lg:max-w-input-name mb-5 lg:mb-auto">
              <TextField
                name="firstName"
                label="first name"
                autoComplete="off"
                required
              />
            </div>
            <div className="w-full mr-3 leading-tight lg:max-w-input-name mb-5 lg:mb-auto">
              <TextField
                name="lastName"
                label="last name"
                autoComplete="off"
                required
              />
            </div>
            <div className="w-full mr-3 leading-tight lg:max-w-input-email mb-5 lg:mb-auto">
              <TextField type="email" name="email" label="email" required />
            </div>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <Field type="text" name={dummyField} tabIndex="-1" />
            </div>
            <span className="flex-grow lg:text-right mt-3 lg:mt-3">
              <button
                className="flex-grow bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
                type="button"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                subscribe
              </button>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
