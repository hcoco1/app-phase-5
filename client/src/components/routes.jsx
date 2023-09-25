import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

const routes = [
  <Route path="/signin" element={<SignIn />} />,
  <Route path="/signup" element={<SignUp />} />
];

export default routes;

