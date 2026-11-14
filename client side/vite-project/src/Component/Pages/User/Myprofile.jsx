import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export default function Myprofile() {

    const handleGetUserDetails = async () => {

        const res = await axios.get("https://ai-interview-rbit.onrender.com/api/user/detail", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return res.data;
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

        <div className="container-fluid p-4">
            <div className="row">
                <div className="m-auto col-12 col-md-4 col-sm-6">

                    <div className="card m-3 shadow-lg">
                        <div className="card-header">
                            <img src={data?.isUser?.profilePhoto ? data.isUser.profilePhoto : "https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    maxWidth: "200px",
                                    objectFit: "contain"
                                }}
                                alt="Profile" />
                        </div>

                        <div className="card-body text-center">

                            <h6 className="fw-semibold">Name : {user.fullName}</h6>
                            <p className="text-muted">email : {user.email}</p>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </>)
}

