import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserFromServer } from './Redux Store/Slice';
import api from './api';

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
import CreateSession from './Component/Pages/CreateSession';


function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status from server on app mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/api/user/getUser', {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        
        if (res.data.isUser) {
          dispatch(setUserFromServer(res.data.isUser));
        }
      } catch (error) {
        console.log("User not authenticated");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

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
          <Route path='/session/:id' element={<SessionDetails />}></Route>
          <Route path='/forgotpass' element={<ForgotPass />}></Route>
          <Route path='/updatepass' element={<UpdatePass />}></Route>
          <Route path='/myprofile' element={<Myprofile />}></Route>
          <Route path='/updateprofile' element={<UpdateProfile />}></Route>
          <Route path='/createsession' element={<CreateSession />}></Route>
        </Routes>

      </BrowserRouter>

      <ToastContainer />

    </>
  )
}

export default App

