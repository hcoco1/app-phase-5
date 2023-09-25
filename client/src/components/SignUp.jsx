import React from 'react';
import { Formik, Field, Form } from 'formik';

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch('/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);  // Handle the data from the response here

          } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="first_name">First Name</label>
            <Field id="first_name" name="first_name" placeholder="Jane" />

            <label htmlFor="last_name">Last Name</label>
            <Field id="last_name" name="last_name" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="jane@acme.com" type="email" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="Enter your password" type="password" />

            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
