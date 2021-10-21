import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useMailchimp, Status } from "../hooks/mailchimp";
import TextField from "../formsUI/TextField";

const SignupForm = () => {
  const mailchimpUrl =
    "https://satoshishiraishi.us9.list-manage.com/subscribe/post?u=ee12e649e14a17d08181c6b3a&amp;id=467bb26655";
  const dummyField = "b_ee12e649e14a17d08181c6b3a_467bb26655";
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    [dummyField]: "",
  });
  const { subscribe, status, error, value } = useMailchimp(mailchimpUrl);

  const onChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

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
    [dummyField]: "",
  };
  const onSubmitHandler = () => {
    // We are performing some simple validation here.
    // I highly recommend checking a fully-fledged solution
    // for forms like https://react-hook-form.com/
    console.log(form);
    if (form.firstName === "" || form.lastName === "" || form.email === "")
      return;

    subscribe({
      FNAME: form.firstName,
      LNAME: form.lastName,
      EMAIL: form.email,
      [dummyField]: form[dummyField],
    });
  };

  // if (status === Status.loading) {
  //   return <div>loading</div>;
  // }
  //
  // if (status === Status.error) {
  //   return <div>error</div>;
  // }

  if (value.includes("Already subscribed")) {
    return <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">You seem to be already in our list.</div>;
  }

  if (value) {
    return <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">Thank you for subscribing.</div>;
  }
  return (
    <Formik
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmitHandler(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-4xl" autoComplete="off">
          <div className="flex py-2 flex-col lg:flex-row items-start">
            <div className="w-full mr-3 leading-tight lg:max-w-input-name mb-5 lg:mb-auto">
              <TextField name="firstName" label="first name" autoComplete="off" required />
            </div>
            <div className="w-full mr-3 leading-tight lg:max-w-input-name mb-5 lg:mb-auto">
              <TextField name="lastName" label="last name" autoComplete="off" required />
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
                type="submit"
                disabled={isSubmitting}
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
