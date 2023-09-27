import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
  const navigate = useNavigate();


  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        photo_url: '',
        birth_date: '',
        privacy_settings: '',
        password: '',
        confirm_password: ''
      }}
      validationSchema={Yup.object({
        first_name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
        last_name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
        email: Yup.string().email('Invalid email address').max(100, 'Must be 100 characters or less').required('Required'),
        photo_url: Yup.string().url('Invalid URL').max(512, 'Must be 512 characters or less').required('Required'),
        birth_date: Yup.date().required('Required'),
        privacy_settings: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
        password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
        confirm_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={async (values, { setStatus }) => {
        // Destructure to exclude confirm_password and get the rest of the values
        const { confirm_password, ...dataToSend } = values;

        try {
          const response = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)  // Send data without confirm_password
          });

          if (!response.ok) {
            const data = await response.json();
            setStatus(data.message || 'An error occurred during signup.');
            return;
          }

          setStatus('Signup successful! Please check your email for confirmation.');
       
          navigate('/users');
        } catch (error) {
          setStatus('Network error. Please try again later.');
        }
      }}
    >
      {formik => (
        <Form className="p-4">
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <Field id="first_name" name="first_name" type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <Field id="last_name" name="last_name" type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field id="email" name="email" type="email" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="photo_url" className="form-label">Photo URL</label>
            <Field id="photo_url" name="photo_url" type="url" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="birth_date" className="form-label">Birth Date</label>
            <Field id="birth_date" name="birth_date" type="date" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="privacy_settings" className="form-label">Privacy Settings</label>
            <Field id="privacy_settings" name="privacy_settings" type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Field id="password" name="password" type="password" className="form-control" />
            
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
            <Field id="confirm_password" name="confirm_password" type="password" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>
          {formik.status && <div className="mt-3 alert alert-info">{formik.status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
