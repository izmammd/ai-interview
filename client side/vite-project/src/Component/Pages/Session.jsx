import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../../api";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function Session() {

    const navigate = useNavigate()

    const getSession = async () => {
        const res = await api.get("/api/session/getSession", {
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
            const res = await api.delete(`/api/session/deleteSession/${id}`, {
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

    return (<>

        <div className="container-fluid d-flex flex-wrap justify-content-center align-items-center gap-4"
            style={{
                minHeight: "88vh",
                background: "#ffffff"
            }}>

            {sessions.length ? (
                sessions.map((item, i) => {
                    return (
                        <div key={i} className="card shadow-lg text-center p-5 mt-4">

                            <div className="d-flex justify-content-end align-items-center">
                                <button className="btn btn-danger d-flex me-1" onClick={() => handleRemove(item._id)}><i class="bi bi-trash3"></i></button>
                            </div>

                            <div onClick={() => navigateSession(item._id)}>
                                <h1>{item.role}</h1>
                                <h3>{item.experience}</h3>
                                <h4>{item.topicsToFocus}</h4>
                            </div>

                        </div>
                    )
                })
            ) : (<h1>No Data</h1>)}

        </div>

    </>)
}
