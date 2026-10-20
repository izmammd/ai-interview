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

    const { data, isLoading } = useQuery({
        queryKey: ["session Details", param.id],
        queryFn: handleGetSessionDetails,
        enabled: !!param.id
    })

    // console.log("S-details : ", data);



    if (!param.id) {
        return <div>Loading session...</div>;
    }

    return (<>

        <div className="conatiner">

            <div className="text-center d-flex flex-column m-auto my-4 shadow-lg"
                style={{
                    width: "800px",
                    borderRadius: "15px"
                }}>
                <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                    <h1>Role :</h1>
                    <h1>{data?.isSession.role}</h1>
                </div>

                <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                    <h1>Experience :</h1>
                    <h1>{data?.isSession.experience} year</h1>
                </div>

                <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                    <h1>Topics to Focus :</h1>
                    <h1>{data?.isSession.topicsToFocus}</h1>
                </div>
            </div>

            <div>
                <AiQuestion />
            </div>
        </div>

    </>)
}
