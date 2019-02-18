import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import Radios from './Radios';
import TextInput from './TextInput';
import Checkboxes from './Checkboxes';
import './css/globals.css';

/**
 * You can create checkboxes, radios and text inputs.
 * 1. Add an initial value. The key-value pair must match the input's name
 *    variable, and it's intended value.
 * 2. Add the input's validation checking to the Yup's scheme.
 *    https://www.npmjs.com/package/yup
 * 3. Add the input's component to the <Formik /> component.
 */

const DialogBox = styled.div`
  border: 1px solid #6f6e6e;
  padding: 15px;
  border-radius: 10px;
  width: 50%;
`;

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.number()
    .typeError('Invalid contact number')
    .min(11111111, 'A contact number must have a minimum of 8 numbers'),
  parentFirstName: Yup.string().required('Required'),
  parentLastName: Yup.string().required('Required'),
  childFirstName: Yup.string().required('Required'),
  childLastName: Yup.string().required('Required'),
  childBirthYear: Yup.number()
    .required('Required')
    .positive()
    .moreThan(1900, 'Year must be more than 1900')
    .lessThan(2100, 'Year must be less than 2100'),
  hearFrom: Yup.object({
    google: Yup.bool(),
    facebook: Yup.bool(),
    instagram: Yup.bool(),
    onlinePlatform: Yup.bool(),
    other: Yup.object({
      checkbox: Yup.bool(),
      input: Yup.string(),
    }),
  }).test(
    'testHearFromCheckboxes',
    (obj) => {
      const { other } = obj.value;

      return other.checkbox && !other.input
        ? 'Please add comment in the textbox'
        : 'Please select at least one';
    },
    (obj) => {
      const {
        google, facebook, instagram, onlinePlatform, other,
      } = obj;

      if (other.checkbox && !other.input) {
        return false;
      }

      return google || facebook || instagram || onlinePlatform || (other.checkbox && other.input);
    },
  ),
  courses: Yup.object({
    radio: Yup.string()
      .required()
      .oneOf(
        ['fun1', 'boc1', 'boc3', 'poc1', 'poc2', 'java', 'not_sure', 'other'],
        'Please select one option',
      ),
    input: Yup.string().when('radio', {
      is: 'other',
      then: Yup.string().required('Please add comment in the text box'),
    }),
  }),
  campus: Yup.object({
    radio: Yup.string()
      .required()
      .oneOf(['bukit_timah', 'marine_parade', 'no_pref'], 'Please select one option'),
  }),
  priorExp: Yup.object({
    radio: Yup.string()
      .required()
      .oneOf(['no', 'yes_010', 'yes_1120', 'yes_21'], 'Please select one option'),
  }),
  priorExpDetail: Yup.string(),
  comment: Yup.string(),
});

class CustomForm extends React.Component {
  initialValues = {
    email: '',
    phone: '',
    parentFirstName: '',
    parentLastName: '',
    childFirstName: '',
    childLastName: '',
    childBirthYear: '',
    hearFrom: {
      google: false,
      facebook: false,
      instagram: false,
      onlinePlatform: false,
      other: {
        checkbox: false,
        input: '',
      },
    },
    courses: { radio: '', input: '' },
    campus: { radio: '' },
    priorExp: { radio: '' },
    priorExpDetail: '',
    comment: '',
  };

  handleSubmit = (values, actions) => {
    const { setSubmitting } = actions;

    console.log('Submitted: ', values);

    setSubmitting(false);
  };

  render() {
    return (
      <DialogBox>
        <h1>SG Code Campus Enquiry Form</h1>
        <h3>
          Thank you for your interest in SG Code Campus! To assist us in serving you better, please
          fill in the form below and we will get back to you shortly.
        </h3>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.initialValues}
          validationSchema={schema}
        >
          {({
            isSubmitting, errors, touched, setFieldTouched, handleChange,
          }) => {
            const params = {
              errors,
              touched,
              onChange: (e) => {
                setFieldTouched(e.target.name);
                handleChange(e);
              },
            };

            return (
              <Form>
                <TextInput
                  name="email"
                  type="email"
                  placeholder="E.g. eric@gmail.com"
                  labelText="Email address"
                  required
                  {...params}
                />
                <TextInput
                  name="phone"
                  labelText="Contact Number"
                  placeholder="E.g. 6512345678"
                  {...params}
                />
                <Checkboxes
                  name="hearFrom"
                  labelText="Where did you hear about us?"
                  required
                  other
                  {...params}
                  options={[
                    { value: 'google', text: 'Google' },
                    { value: 'facebook', text: 'Facebook' },
                    { value: 'instagram', text: 'Instagram' },
                    {
                      value: 'onlinePlatform',
                      text: 'Online Platform (e.g. SassyMama, HoneyKids)',
                    },
                  ]}
                />
                <TextInput
                  name="parentFirstName"
                  labelText="Parent's First Name"
                  required
                  {...params}
                />
                <TextInput
                  name="parentLastName"
                  labelText="Parent`s Last Name"
                  required
                  {...params}
                />
                <TextInput
                  name="childFirstName"
                  labelText="Child`s First Name"
                  required
                  {...params}
                />
                <TextInput
                  name="childLastName"
                  labelText="Child`s First Name"
                  required
                  {...params}
                />
                <TextInput
                  name="childBirthYear"
                  labelText="Child`s Birth Year (YYYY)"
                  placeholder="E.g. 2000"
                  required
                  {...params}
                />
                <Radios
                  name="courses"
                  labelText="Which course are you interested in?"
                  other
                  required
                  {...params}
                  options={[
                    {
                      value: 'fun1',
                      text: 'Fundamentals 1 (ages 7 - 8)',
                    },
                    {
                      value: 'basics1',
                      text: 'Basics 1 (ages 9 - 10)',
                    },
                    {
                      value: 'basics3',
                      text: 'Basics 3 (ages 11 - 12)',
                    },
                    {
                      value: 'poc1',
                      text: 'Principles 1 (ages 13 - 18)',
                    },
                    {
                      value: 'poc2',
                      text: 'Principles 2 and above (ages 13 - 18)',
                    },
                    {
                      value: 'java',
                      text: 'Java iGCSE/IB/AP focused Academics Programme (ages 15-18) (NEW!)',
                    },
                    {
                      value: 'not_sure',
                      text: 'Not sure, please advise.',
                    },
                  ]}
                />
                <Radios
                  name="campus"
                  labelText="Preferred Campus"
                  required
                  {...params}
                  options={[
                    {
                      value: 'bukit_timah',
                      text: 'Bukit Timah (King`s Arcade)',
                    },
                    {
                      value: 'marine_parade',
                      text: 'Marine Parade (Parkway Centre)',
                    },
                    {
                      value: 'no_pref',
                      text: 'No Preference',
                    },
                  ]}
                />
                <Radios
                  name="priorExp"
                  labelText="Does your child have prior coding experience?"
                  required
                  {...params}
                  options={[
                    {
                      value: 'no',
                      text: 'No',
                    },
                    {
                      value: 'yes_010',
                      text: 'Yes: 0 - 10 hrs',
                    },
                    {
                      value: 'yes_1120',
                      text: 'Yes: 11 - 20 hrs',
                    },
                    {
                      value: 'yes_21',
                      text: 'Yes: 21 hrs and above',
                    },
                  ]}
                />
                <TextInput
                  name="priorExpDetail"
                  labelText="Details of prior coding experience (if any)"
                  onChange={handleChange}
                />
                <TextInput
                  name="comment"
                  labelText="Any other questions or comments"
                  onChange={handleChange}
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
