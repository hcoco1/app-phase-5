import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home'; // Assuming you have a Home component

const routes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="signin" path="/signin" element={<SignIn />} />,
  <Route key="signup" path="/signup" element={<SignUp />} />
];

export default routes;


