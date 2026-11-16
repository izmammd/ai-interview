import { useNavigate, useParams } from "react-router-dom";
import AiQuestion from "../AiQuestion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function SessionDetails() {

    const param = useParams();
    const navigate = useNavigate();

    // console.log(param.id)

    const handleGetSessionDetails = async () => {

        try {
            const res = await axios.get(`https://ai-interview-rbit.onrender.com/api/session/getSessionById/${param.id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true

            })

            return res.data;
        }
        catch (err) {
            throw err;
        }
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["session Details", param.id],
        queryFn: handleGetSessionDetails,
        enabled: !!param.id
    })

    if(isLoading){
        return <p className="text-center">Page Loading, Please wait...</p>
    }

    if(isError){
        return <p className="text-center text-danger">{error.response?.data?.message || "Unable to load page try again.."}</p>
    }

    // console.log("S-details : ", data);

    if (!param.id) {
        return <div>Loading session...</div>;
    }

    return (<>

        <div className="conatiner-fluid p-4">

            <div className="mx-auto col-12 col-md-4 col-sm-6 shadow-lg p-4"
                style={{
                    maxWidth: "auto",
                    borderRadius: "18px",
                    minHeight: "10vh",
                    overflow: "hidden"
                }}>

                <h5 className="fw-bold">{data?.isSession.role}</h5>

                <p className="text-secondary">{data?.isSession.experience}</p>

                <p className="text-secondary">{data?.isSession.topicsToFocus}</p>

            </div> 

            <div>
                <AiQuestion />
            </div>
        </div>

    </>)
}
