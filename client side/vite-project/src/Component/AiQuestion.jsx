import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";

export default function AiQuestion() {

    const param = useParams();
    const [questions, setQuestions] = useState([]);

    // Fetch existing questions from session
    const getExistingQuestions = async () => {
        const res = await axios.get(`http://localhost:3000/api/session/getSessionById/${param.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return res.data;
    }

    const { data: sessionData, isLoading: sessionLoading } = useQuery({
        queryKey: ["session questions", param.id],
        queryFn: getExistingQuestions,
        enabled: !!param.id
    });

    // Set questions from existing session data
    useEffect(() => {
        if (sessionData?.isSession?.questions && sessionData.isSession.questions.length > 0) {
            setQuestions(sessionData.isSession.questions);
        }
    }, [sessionData]);

    const generateQuestion = async () => {
        const res = await axios.post(`http://localhost:3000/api/question/generateQuestion`,
            { sessionId: param.id },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        )
        return res.data;
    }

    const mutation = useMutation({
        mutationFn: generateQuestion,
        onSuccess: (data) => {
            console.log("Questions generated:", data);
            setQuestions(data?.data || []);
        },
        onError: (error) => {
            console.log("Error generating questions:", error);
        }
    });

    const handleGenerateClick = () => {
        mutation.mutate();
    }

    return (
        <>
            <div className="text-center my-4">
                {questions.length === 0 && (
                    <button
                        className="btn btn-primary mb-4"
                        onClick={handleGenerateClick}
                        disabled={mutation.isPending || sessionLoading}
                    >
                        {mutation.isPending ? "Generating..." : "Generate Questions"}
                    </button>
                )}
            </div>

            <Accordion defaultActiveKey="0" className="m-auto"
                style={{
                    width: "800px",
                }}>
                {
                    questions.length > 0 ?
                        questions.map((que, i) => {
                            return (
                                <Accordion.Item eventKey={i.toString()} key={i}>
                                    <Accordion.Header>
                                        <h4 className="fw-bold">{i + 1}. {que.question}</h4>
                                    </Accordion.Header>

                                    <Accordion.Body>
                                        <span>{que.answer}</span>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }) : (<h3 className="text-center">No Question</h3>)
                }

            </Accordion>
        </>
    );
}

