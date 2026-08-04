import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeUser } from "../Redux Store/Slice.jsx"
import axios from "axios"
import { toast } from "react-toastify"
import Profile from "./Pages/Profile.jsx"

export default function Navbar() {

    const navigate = useNavigate();

    const isAuthenticate = useSelector((state) => {
        return state.user.isAuthenticate;
    })

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            let res = await axios.get(`http://localhost:3000/api/user/logout`,
                {
                    withCredentials: true
                }
            );

            toast.success(res.data.message);
            dispatch(removeUser());
            navigate("/login");
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    return (<>
        <nav className="nav navbar shadow-sm p-4 sticky-top">
            <div className="navbar-brand">
                Question Generaator
            </div>

            <div className="d-flex gap-3">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/session">Session</NavLink>
                <NavLink to="/question">Question</NavLink>
                <NavLink to="session/:id">Session By ID</NavLink>
            </div>

            <div>

                {
                    isAuthenticate ?
                        <Profile />:
                        (<>
                            <button className="btn btn-primary me-3" onClick={handleLogin}>Login</button>
                            <button className="btn btn-warning" onClick={handleRegister}>Register</button>
                        </>)

                }
                {/* {
                    isAuthenticate ?
                        <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button> :
                        <button className="btn btn-primary me-3" onClick={handleLogin}>Login</button>
                } */}

                {/* {
                    isAuthenticate ?
                        null :
                        <button className="btn btn-warning" onClick={handleRegister}>Register</button>
                } */}
            </div>
        </nav>


        
    </>)
}