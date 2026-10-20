import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function CreateSession() {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm()

    const handleSession = async (data) => {
        const res = await axios.post("https://ai-interview-rbit.onrender.com/api/session/createSession", data,
            { withCredentials: true }
        )

        return res.data;
    }

    const mutation = useMutation({
        mutationFn: handleSession,

        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/session");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Something is wrong");
        }
    })

    // console.log("Session : ", data);

    const handleOnSubmit = (data) => {

        mutation.mutate(data);

        console.log("Session create : ", mutation.data)
    }



    return (<>

        <div className="container-fluid d-flex flex-wrap justify-content-center align-items-center gap-4"
            style={{
                minHeight: "88vh",
                background: "#ffffff"
            }}>

            <div className="text-center text-white p-5 shadow-lg mt-4"
                style={{
                    width: "500px",
                    maxWidth: "800px",
                    borderRadius: "20px",
                    background: "#ffffff"
                }}
            >

                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="mb-4">
                        <input {...register("role")} type="text" className="form-control" placeholder="Enter Your role..." />
                    </div>

                    <div className="mb-4">
                        <input {...register("experience")} type="text" className="form-control" placeholder="Enter Your Experience.." />
                    </div>

                    <div className="mb-4">
                        <input {...register("topicsToFocus")} type="text" className="form-control" placeholder="Enter Your Topics" />
                    </div>

                    <div className="mb-4">
                        <button className="btn btn-primary btn-lg px-5">{mutation.isPending ? "Creating Session" : "Create Session"}</button>
                    </div>
                </form>



            </div>

        </div>

    </>)
}
