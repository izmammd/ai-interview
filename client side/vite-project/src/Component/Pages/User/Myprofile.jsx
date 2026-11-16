import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../../../Redux Store/Slice";
import { useDispatch } from "react-redux";

export default function Myprofile() {

    const [steps, setSteps] = useState(0)

    const [conformPassword, setConformPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetUserDetails = async () => {

        const res = await axios.get("https://ai-interview-rbit.onrender.com/api/user/detail", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return res.data;
    }

    const handleDeleteAccount = async (password) => {
        const res = await axios.delete("https://ai-interview-rbit.onrender.com/api/user/delete", {
            data: { password },
            withCredentials: true
        })

        return res.data;
    }


    const mutation = useMutation({
        mutationFn: handleDeleteAccount,


        onSuccess: (data) => {
            toast.success(data.message);
            dispatch(removeUser());
            navigate("/login");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    })

    const handleAccount = (event) => {
        event.preventDefault();

        if (!conformPassword.trim()) {
            toast.error("Please enter your password");
            return;
        }
        mutation.mutate(conformPassword);
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["User Details"],
        queryFn: handleGetUserDetails
    })

    if (isLoading) {
        return <p className="text-center mt-4">Loading profile...</p>;
    }

    if (isError) {
        return <p className="text-center mt-4 text-danger">
            {error.response?.data?.message || "Unable to load profile details."}
        </p>;
    }

    const user = data?.isUser;

    if (!user) {
        return <p className="text-center mt-4">Profile details are unavailable.</p>;
    }


    return (<>

        {steps === 0 && <div className="container-fluid p-4">
            <div className="row">
                <div className="m-auto col-12 col-md-4 col-sm-6">

                    <div className="card m-3 shadow-lg">
                        <div className="card-header">
                            <img src={data?.isUser?.profilePhoto ? data.isUser.profilePhoto : "https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"}
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "contain"
                                }}
                                alt="Profile" />
                        </div>

                        <div className="card-body text-center">

                            <h6 className="fw-semibold">Name : {user.fullName}</h6>
                            <p className="text-muted">email : {user.email}</p>

                            <button type="button" className="btn btn-outline-danger btn-sm shadow-lg" onClick={() => setSteps(1)}>Delete Account</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>}

        {
            steps === 1 && (
                <div className="container-fluid p-4 d-flex justify-content-center align-items-center">
                    <div className="text-center"
                        style={{
                            height: "100%",
                            width: "400px",
                            minHeight: "10vh",
                            minWidth: "180px"
                        }}>
                        <form onSubmit={handleAccount}>
                            <input
                                type="password"
                                required
                                className="form-control shadow-lg border-0 border-bottom border-end mb-4"
                                value={conformPassword}
                                onChange={(event) => setConformPassword(event.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn btn-danger btn-sm w-50 mb-3 rounded-pill shadow-lg"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Deleting..." : "Delete account"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm w-50 mb-3 rounded-pill"
                                onClick={() => {
                                    setSteps(0);
                                    setConformPassword("");
                                }}
                                disabled={mutation.isPending}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )
        }

    </>)
}

