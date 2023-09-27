import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    
    const navigate = useNavigate();

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
            onSubmit={async (values, { setStatus }) => {
                try {
                    const response = await fetch('/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        setStatus(data.message || 'An error occurred during sign in.');
                        return;
                    }

                    setStatus('Sign in successful! Redirecting...');
                    // Update the user's authentication status
                    
                    navigate('/users');
                } catch (error) {
                    setStatus('Network error. Please try again later.');
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
                    {formik.status && <div className="mt-3 alert alert-info">{formik.status}</div>}
                </Form>
            )}
        </Formik>
    );
};

export default SignIn;
