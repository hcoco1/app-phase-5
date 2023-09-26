import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home'; 
import Dashboard from './Dashboard';

const routes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="signin" path="/signin" element={<SignIn />} />,
  <Route key="signup" path="/signup" element={<SignUp />} />,
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} /> 
];

export default routes;


