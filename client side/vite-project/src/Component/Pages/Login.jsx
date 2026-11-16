import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserFromServer } from "../../Redux Store/Slice";
import { useMutation } from "@tanstack/react-query"
import "../Css/Register.css"


export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userDetails, setUSerDetails] = useState({
        email: "",
        password: ""
    })

    const { email, password } = userDetails;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUSerDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const loginUser = async (userDetails) => {
        let res = await axios.post("https://ai-interview-rbit.onrender.com/api/user/login",
            userDetails,
            {
                withCredentials: true
            }
        )

        return res.data;
    }

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            toast.success(data.message);

            // Fetch user data from server after successful login
            try {
                const userRes = await axios.get('https://ai-interview-rbit.onrender.com/api/user/getUser', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (userRes.data.isUser) {
                    dispatch(setUserFromServer(userRes.data.isUser));
                }
            } catch (error) {
                console.log("Error fetching user data:", error);
            }

            navigate("/createsession")
            console.log(data);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Something is wrong"
            )
        }
    })

    const handleLogin = () => {
        mutation.mutate(userDetails)
    }

    return (

        <main className="auth-page"
            style={{
                background: "radial-gradient(ellipse at 75% 15%, #243b68 0%, #111827 42%, #080d18 100%)",
                minHeight: "calc(100vh - 88px)",
            }}
        >

            <div className="container d-flex justify-content-center align-items-center"
                style={{ minHeight: "88vh" }}>

                <div className="card-hover shadow-lg p-4 bg-white"
                    style={{
                        background: "radial-gradient(ellipse at 75% 15%, #243b68 0%, #111827 42%, #080d18 100%)",
                        width: "400px", borderRadius: "15px"
                    }}>

                    <p className="text-light">WELCOME BACK</p>
                    <h1 className="text-warning">Sign in to SkillUp AI</h1>
                    <p className="text-secondary">Continue preparing for your next opportunity.</p>

                    <div className="mb-4">
                        {/* <label className="form-label fw-bold">Email</label> */}
                        <input type="email" className="inp form-control"
                            onChange={handleChange}
                            name="email" value={email}
                            placeholder="you@example.com" />
                    </div>

                    <div className="mb-4">
                        {/* <label className="form-label fw-bold" >Password</label> */}
                        <input type="password" className=" inp form-control"
                            onChange={handleChange}
                            name="password" value={password}
                            placeholder="Enter Password..." />
                    </div>

                    <div className="mb-4">
                        <button className="btn btn-primary w-100"
                            onClick={handleLogin}
                            disabled={mutation.isPending}>
                            {mutation.isPending ? "Loading in..." : "Login"}
                        </button>
                    </div>

                    <div className="mb-4">
                        <button className="btn btn-danger w-100" onClick={() => navigate("/forgotpass")}>Forgot Password</button>
                    </div>

                    <div>
                        <p className="text-center text-white mb-0">
                            Create account ? {" "} <NavLink to="/register" className="text-decoration-none">
                                Register
                            </NavLink>
                        </p>
                    </div>

                </div>

            </div >

        </main>

    )
}
