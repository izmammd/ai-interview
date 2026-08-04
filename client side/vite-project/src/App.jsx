import { useState } from 'react'

//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './Component/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Pages/Home';
import Register from './Component/Pages/Register';
import Login from './Component/Pages/Login';
import Session from './Component/Pages/Session';
import Question from './Component/Pages/Question';
import SessionDetails from './Component/Pages/SessionDetails';
import ForgotPass from './Component/Pages/User/ForgotPass';
import UpdatePass from './Component/Pages/User/UpdatePass';
import Myprofile from './Component/Pages/User/Myprofile';
import UpdateProfile from './Component/Pages/User/UpdateProfile';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/session' element={<Session />} />
          <Route path='/question' element={<Question />} />
          <Route path='/session/:id' element={<SessionDetails />}>Session By Id</Route>
          <Route path='/forgotpass' element={<ForgotPass />}></Route>
          <Route path='/updatepass' element={<UpdatePass />}></Route>
          <Route path='/myprofile' element={<Myprofile />}></Route>
          <Route path='/updateprofile' element={<UpdateProfile />}></Route>
        </Routes>

      </BrowserRouter>

      <ToastContainer />

    </>
  )
}

export default App
