import React from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import Radios from "./Radios";
import TextInput from "./TextInput";
import Checkboxes from "./Checkboxes";
import "./css/globals.css";

const DialogBox = styled.div`
  border: 1px solid #6f6e6e;
  padding: 15px;
  border-radius: 10px;
  width: 50%;
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
  hear_from: Yup.object({
    google: Yup.bool(),
    facebook: Yup.bool(),
    instagram: Yup.bool(),
    online_platform: Yup.bool(),
    other: Yup.object({
      checkbox: Yup.bool(),
      input: Yup.string()
    })
  }).test(
    "testHearFromCheckboxes",
    obj => {
      const { other } = obj.value;

      return other.checkbox && !other.input
        ? "Please add comment in the textbox"
        : "Please select at least one";
    },
    obj => {
      const { google, facebook, instagram, online_platform, other } = obj;

      //ensures that the Other: option is always accompanied by text.
      //checked first to get this condition out of the way.
      if (other.checkbox && !other.input) {
        return false;
      }

      return (
        google ||
        facebook ||
        instagram ||
        online_platform ||
        (other.checkbox && other.input)
      );
    }
  ),
  courses: Yup.object({
    fun1: Yup.string(),
    basics1: Yup.string(),
    basics3: Yup.string(),
    poc1: Yup.string(),
    poc2: Yup.string(),
    java: Yup.string(),
    not_sure: Yup.string(),
    other: Yup.object({
      radio: Yup.string(),
      input: Yup.string()
    })
  }).test(
    "testCourseRadios",
    obj => {
      const { other } = obj.value;

      return other.radio && !other.input
        ? "Please add comment in the textbox"
        : "Please select at least one";
    },
    obj => {
      const { fun1, basics1, basics3, poc1, poc2, java, not_sure, other } = obj;

      //ensures that the Other: option is always accompanied by text.
      //checked first to get this condition out of the way.
      if (other.radio && !other.input) {
        return false;
      }

      return (
        fun1 ||
        basics1 ||
        basics3 ||
        poc1 ||
        poc2 | java ||
        not_sure ||
        (other.radio && other.input)
      );
    }
  ),
  campus: Yup.object({
    bukit_timah: Yup.string(),
    marine_parade: Yup.string(),
    no_pref: Yup.string()
  }).test("testCampusRadios", "Please select one option", obj => {
    const { bukit_timah, marine_parade, no_pref } = obj;
    return bukit_timah || marine_parade || no_pref;
  }),
  prior_exp: Yup.object({
    no: Yup.string(),
    yes_010: Yup.string(),
    yes_1120: Yup.string(),
    yes_21: Yup.string()
  }).test("testPriorRadios", "Please select one option", obj => {
    const { no, yes_010, yes_1120, yes_21 } = obj;
    return no || yes_010 || yes_1120 || yes_21;
  })
});

class CustomForm extends React.Component {
  // initialValues MUST be added to ensure all values are given a default value
  // and are accounted for during form submissing, which makes your coding much // easier.
  initialValues = {
    email: "",
    phone: "",
    parent_first_name: "",
    parent_last_name: "",
    child_first_name: "",
    child_last_name: "",
    child_birth_year: "",
    hear_from: {
      google: false,
      facebook: false,
      instagram: false,
      online_platform: false,
      other: {
        checkbox: false,
        input: ""
      }
    },
    courses: {
      fun1: "",
      basics1: "",
      basics3: "",
      poc1: "",
      poc2: "",
      java: "",
      not_sure: "",
      other: {
        radio: "",
        input: ""
      }
    },
    campus: {
      bukit_timah: "",
      marine_parade: "",
      no_pref: ""
    },
    prior_exp: {
      no: "",
      yes_010: "",
      yes_1120: "",
      yes_21: ""
    }
  };

  handleSubmit = (values, actions) => {
    const { setSubmitting, resetForm } = actions;

    console.log("Submitted: ", values);

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
                  onChange={handleChange}
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
                <Radios
                  name="courses"
                  label_text="Which course are you interested in?"
                  other={true}
                  required={true}
                  onChange={handleChange}
                  error={errors}
                  options={[
                    {
                      value: "fun1",
                      text: "Fundamentals 1 (ages 7 - 8)"
                    },
                    {
                      value: "basics1",
                      text: "Basics 1 (ages 9 - 10)"
                    },
                    {
                      value: "basics3",
                      text: "Basics 3 (ages 11 - 12)"
                    },
                    {
                      value: "poc1",
                      text: "Principles 1 (ages 13 - 18)"
                    },
                    {
                      value: "poc2",
                      text: "Principles 2 and above (ages 13 - 18)"
                    },
                    {
                      value: "java",
                      text:
                        "Java iGCSE/IB/AP focused Academics Programme (ages 15-18) (NEW!)"
                    },
                    {
                      value: "not_sure",
                      text: "Not sure, please advise."
                    }
                  ]}
                />
                <Radios
                  name="campus"
                  label_text="Preferred Campus"
                  required={true}
                  error={errors}
                  onChange={handleChange}
                  options={[
                    {
                      value: "bukit_timah",
                      text: "Bukit Timah (King's Arcade)"
                    },
                    {
                      value: "marine_parade",
                      text: "Marine Parade (Parkway Centre)"
                    },
                    {
                      value: "no_pref",
                      text: "No Preference"
                    }
                  ]}
                />
                <Radios
                  name="prior_exp"
                  label_text="Does your child have prior coding experience?"
                  required={true}
                  onChange={handleChange}
                  error={errors}
                  options={[
                    {
                      value: "no",
                      text: "No"
                    },
                    {
                      value: "yes_010",
                      text: "Yes: 0 - 10 hrs"
                    },
                    {
                      value: "yes_1120",
                      text: "Yes: 11 - 20 hrs"
                    },
                    {
                      value: "yes_21",
                      text: "Yes: 21 hrs and above"
                    }
                  ]}
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
