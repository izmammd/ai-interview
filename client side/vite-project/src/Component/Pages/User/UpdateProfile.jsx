import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../../../Redux Store/Slice";
import { useDispatch, useSelector } from "react-redux";


export default function UpdateProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticate = useSelector(state=>state.user.isAuthenticate);

    const [Image, setImage] = useState(null);

    const { register: update, handleSubmit, formState: { errors } } = useForm();

    const updateProfileApi = async (formData) => {

        const res = await axios.post("http://localhost:3000/api/user/update",
            formData,
            { withCredentials: true }
        )

        return res.data;

    }

    const mutation = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: (data) => {
            toast.success(data.message);
            dispatch(removeUser());
            navigate("/")
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Something is wrong")
        }
    })

    const handleUpdateProfile = (data) => {
        console.log(data)

        const formData = new FormData();

        formData.append("profilePhoto", Image);
        formData.append("fullName", data.fullName);
        formData.append("password", data.password);
        formData.append("newPassword", data.newPassword);

        mutation.mutate(formData);
    }

    return (<>



        <div className="container-fluid">
            <div className="card shadow-lg"

                style={{
                    width: "400px"
                }}>

                <h1 className="text-center fw-bold">Update Profile</h1>

                <div className="card-body">

                    <form onSubmit={handleSubmit(handleUpdateProfile)}>

                        <div className="mb-3">
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        </div>

                        <div className="mb-3">
                            <input {...update("fullName")} className="form-control" type="text" placeholder="Enter your full Name...." />
                        </div>

                        <div className="mb-3">
                            <input {...update("password")} className="form-control" type="text" placeholder="Enter your full old Password...." />
                        </div>

                        <div className="mb-3">
                            <input {...update("newPassword")} className="form-control" type="text" placeholder="Enter your New Password...." />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary w-100">
                                {mutation.isPending ? "Updating" : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>)
}