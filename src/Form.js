import React from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import TextInput from "./TextInput";
import Checkboxes from "./Checkboxes";
import "./css/globals.css";

/**
 * //Select or Checkboxes
 * 1. How did you hear about us?
 * 2. Which course are you interested in?
 * 3. Preferred Campus
 * 4. Does your child have prior coding experience?
 *
 * //Textarea
 * 5. Details of prior coding experience
 * 6. Any other questions or comments
 */

const DialogBox = styled.div`
  border: 1px solid #6f6e6e;
  padding: 15px;
  border-radius: 10px;
`;

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  phone: Yup.number()
    .typeError("Invalid contact number")
    .min(8, "A contact number must have a minimum of 8 numbers"),
  parent_first_name: Yup.string().required("Required"),
  parent_last_name: Yup.string().required("Required"),
  child_first_name: Yup.string().required("Required"),
  child_last_name: Yup.string().required("Required"),
  child_birth_year: Yup.number()
    .required("Required")
    .positive()
    .moreThan(1900)
    .lessThan(2100),
  hear_from: Yup.array()
    .required()
    .of(Yup.string())
});

class CustomForm extends React.Component {
  initialValues = {
    email: "",
    phone: "",
    parent_first_name: "",
    parent_last_name: "",
    child_first_name: "",
    child_last_name: "",
    child_birth_year: "",
    hear_from: []
  };

  handleSubmit = (values, actions) => {
    const { setSubmitting, resetForm } = actions;

    setSubmitting(false);
    //clears form
    resetForm();
  };

  render() {
    return (
      <DialogBox>
        <h1>SG Code Campus Enquiry Form</h1>
        <h3>
          Thank you for your interest in SG Code Campus! To assist us in serving
          you better, please fill in the form below and we will get back to you
          shortly.
        </h3>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.initialValues}
          validationSchema={schema}
        >
          {({ isSubmitting, errors, handleChange }) => {
            console.log(errors);
            return (
              <Form>
                <TextInput
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="E.g. eric@gmail.com"
                  error={errors}
                  label_text="Email address"
                  required={true}
                />
                <TextInput
                  name="phone"
                  label_text="Contact Number"
                  placeholder="E.g. 6512345678"
                  onChange={handleChange}
                  error={errors}
                />
                <Checkboxes
                  name="hear_from"
                  label_text="Where did you hear about us?"
                  required={true}
                  other={true}
                  error={errors}
                  options={[
                    { value: "google", text: "Google" },
                    { value: "facebook", text: "Facebook" },
                    { value: "instagram", text: "Instagram" },
                    {
                      value: "online_platform",
                      text: "Online Platform (e.g. SassyMama, HoneyKids)"
                    }
                  ]}
                />
                <TextInput
                  name="parent_first_name"
                  label_text="Parent's First Name"
                  required={true}
                  onChange={handleChange}
                  error={errors}
                />
                <TextInput
                  name="parent_last_name"
                  label_text="Parent's Last Name"
                  required={true}
                  onChange={handleChange}
                  error={errors}
                />
                <TextInput
                  name="child_first_name"
                  label_text="Child's First Name"
                  required={true}
                  onChange={handleChange}
                  error={errors}
                />
                <TextInput
                  name="child_last_name"
                  label_text="Child's First Name"
                  required={true}
                  onChange={handleChange}
                  error={errors}
                />
                <TextInput
                  name="child_birth_year"
                  label_text="Child's Birth Year (YYYY)"
                  placeholder="E.g. 2000"
                  required={true}
                  onChange={handleChange}
                  error={errors}
                />
                <button type="submit" disabled={isSubmitting}>
                  SUBMIT
                </button>
              </Form>
            );
          }}
        </Formik>
      </DialogBox>
    );
  }
}

export default CustomForm;
