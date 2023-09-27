import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import DashDetail from './DashDetail';
import Layout from "../layouts/Layout";
import DashLayout from '../layouts/DashLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="users" element={<DashLayout />}>
            <Route index element={<Dashboard />} />
            <Route path=":id" element={<DashDetail />} />

          </Route>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;






