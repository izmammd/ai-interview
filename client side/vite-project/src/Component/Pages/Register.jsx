import { useState } from "react";
import "../Css/Register.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";



export default function Register() {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const handleRegisterUser = async (FormData) => {
        let res = await axios.post("https://ai-interview-rbit.onrender.com/api/user/signup",
            FormData,
            { withCredentials: true }
        )

        return res.data;
    }

    const mutation = useMutation({
        mutationFn: handleRegisterUser,

        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/login");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Something is wrong")
        }
    })



    const registerFormHandler = (data) => {
        mutation.mutate(data)
    }

    return (
        <main
            style={{ background: "radial-gradient(ellipse at 75% 15%, #243b68 0%, #111827 42%, #080d18 100%)", }}>



            <div className="container d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "100vh"
                }}>

                <div className="shadow p-4 text-white"
                    style={{
                        background: "radial-gradient(ellipse at 75% 15%, #243b68 0%, #111827 42%, #080d18 100%)",
                        width: "400px", borderRadius: "15px"
                    }}>

                    <form onSubmit={handleSubmit(registerFormHandler)}>

                        <p className="text-light">WELCOME</p>
                        <h1 className="text-center mb-4">Fill All the Details</h1>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Full Name</label>
                            <input type="text" {...register("fullName")} className="form-control"
                            placeholder="Enter your Name..." />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold bg-transparent">Email</label>
                            <input type="email" {...register("email")} className="form-control" placeholder="Enter your Email..." />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Password</label>
                            <input type="text" {...register("password")} className="form-control" placeholder="Enter your Password..." />
                        </div>

                        <div className="mb-4">
                            <button type="submit" disabled={mutation.isPending} className="btn btn-primary w-100">
                                {mutation.isPending ? "Registering" : "Register"}
                            </button>
                        </div>

                        <div>
                            <p className="text-center mb-0">
                                Already have an account ? {" "} <NavLink to="/login" className="text-decoration-none">
                                    Login
                                </NavLink>
                            </p>
                        </div>
                    </form>

                </div>

            </div>

        </main>)
}
