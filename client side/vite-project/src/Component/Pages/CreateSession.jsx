import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
// import "../Css/Register.css"


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

            <div className="p-5 shadow-lg mt-4"
                style={{
                    width: "500px",
                    maxWidth: "800px",
                    borderRadius: "20px",
                    background: "#ffffff"
                }}
            >

                <form onSubmit={handleSubmit(handleOnSubmit)}>

                    <div className="mb-4">
                        <h5 className="fw-bold">ROLE</h5>
                        <input {...register("role")} type="text" className="form-control text-dark border-0 border-end border-bottom" placeholder="Enter Your role..." />
                    </div>

                    <div className="mb-4">
                        <p className="fw-semibold text-muted">EXPERIENCE</p>
                        <input style={{color: "black"}} {...register("experience")} type="text" className="form-control border-0 border-end border-bottom" placeholder="Enter Your Experience.." />
                    </div>

                    <div className="mb-4">
                        <p className="fw-semibold text-muted">TOPICS</p>
                        <input {...register("topicsToFocus")} type="text" className="form-control border-0 border-end border-bottom" placeholder="Enter Your Topics" />
                    </div>

                    <div className="mb-3 text-center">
                        <button className="btn btn-primary rounded-pill px-5">{mutation.isPending ? "Creating Session" : "Create Session →"}</button>
                    </div>
                </form>

            </div>

        </div>

    </>)
}
