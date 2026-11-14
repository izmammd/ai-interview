import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function Session() {

    const navigate = useNavigate()

    const getSession = async () => {
        const res = await axios.get("https://ai-interview-rbit.onrender.com/api/session/getSession", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return res.data
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["session"],
        queryFn: getSession
    })

    // console.log("Session : ", data?.sessions);
    const sessions = data?.sessions || [];

    const navigateSession = (id) => {
        // console.log(id)
        navigate(`/session/${id}`)
    }

    const handleRemove = async (id) => {
        try {
            const res = await axios.delete(`https://ai-interview-rbit.onrender.com/api/session/deleteSession/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (res.data.success) {
                // Refresh the session list after successful deletion
                refetch();
                toast.success(res.data.message);

            }
        } catch (error) {
            console.error("Error deleting session:", error)
            toast.error(err.response?.data?.message || "Something is wrong")
        }
    }

    return (

        <main className="container-fluid py-5"
            style={{
                minHeight: "88vh",
                background: "#f4f6fb"
            }}>

            <div className="row g-4">

                {sessions.length ? (
                    sessions.map((item, i) => (

                        <div className="col-12 col-sm-6 col-lg-4" key={i}>

                            <div className="card border-0 shadow-lg h-100"
                                style={{
                                    borderRadius: "18px",
                                    overflow: "hidden"
                                }}>

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <span className="badge bg-primary px-3 py-2">Interview Session</span>

                                        <button className="btn btn-sm btn-outline-danger rounded-circle" onClick={() => handleRemove(item._id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </div>

                                    <h4 className="fw-bold text-dark mb-4">{item.role}</h4>

                                    <div className="mb-3">
                                        <small className="text-secondary">EXPERIENCE</small>
                                        <h6 className="fw-semibold mt-1">{item.experience}</h6>
                                    </div>

                                    <div className="mb-4">
                                        <small className="text-secondary">TOPICS TO FOCUS</small>
                                        <h6 className="fw-semibold mt-1">{item.topicsToFocus}</h6>
                                    </div>

                                    <button className="btn btn-primary w-100 rounded-pill" onClick={() => navigateSession(item._id)}>
                                        View Session →
                                    </button>
                                </div>

                            </div>

                        </div>

                    ))
                ) : (
                    <div className="text-center mt-5">
                        <h4 className="text-secondary">No Sessions Found</h4>
                    </div>
                )}

            </div>

        </main>)
}
