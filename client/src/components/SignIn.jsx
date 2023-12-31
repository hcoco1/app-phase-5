import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/counter/auth/authSlice';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                    // Login Logic
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
            
                    // Fetch user details based on the user ID received from login.
                    const userDetailsResponse = await fetch(`/users/${data.id}`);
                    
                    // Check for errors in the userDetailsResponse too
                    if (!userDetailsResponse.ok) {
                        const errorData = await userDetailsResponse.json();
                        setStatus(errorData.Message || 'An error occurred fetching user details.');
                        return;
                    }
                    
                    const userDetails = await userDetailsResponse.json();
                    
                    // Dispatch the userDetails to the Redux store
                    dispatch(login(userDetails));
            
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
