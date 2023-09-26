import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
            })}
            onSubmit={async values => {
                try {
                    const response = await fetch('/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });

                    if (!response.ok) {
                        console.error('Server Error:', response.statusText);
                        return;
                    }

                    const data = await response.json();
                    console.log('Server Response:', data);
                } catch (error) {
                    console.error('Network Error:', error.message);
                }
            }}
        >
            {formik => (
                <Form className="p-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <Field id="email" name="email" type="email" className="form-control" placeholder="jane@acme.com" />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-danger">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <Field id="password" name="password" type="password" className="form-control" placeholder="Enter your password" />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">Sign In</button>
                </Form>
            )}
        </Formik>
    );
};

export default SignIn;

