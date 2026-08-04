import { useNavigate } from "react-router-dom";


export default function Home() {

    const navigate = useNavigate();

    return (<>

        <div className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                minHeight: "88vh",
                background: "linear-gradient(135deg, #000000, #1a1a1a, #2c2c2c)",
            }}>

            <div
                className="text-center text-white p-5 shadow-lg"
                style={{
                    maxWidth: "800px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <div className="display-4 fw-bold mb-5">
                    Prepare Your Interview with ME
                </div>

                <div className="display-3 fw-bold text-info mb-4">AI Coach</div>

                
                    <p className="lead text-light mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vero maxime ullam at! Molestiae ipsa veritatis exercitationem assumenda id quae dolorem, rem error. Iusto officiis accusantium cum temporibus libero ut?
                        Sapiente tenetur hic eveniet delectus ab id sit molestias cupiditate nesciunt provident possimus impedit numquam reiciendis, enim repellat doloribus, mollitia est beatae officia sequi magni. Non ducimus at quae voluptatem.</p>
                

                <div>
                    <button className="btn btn-primary btn-lg px-5" onClick={()=>navigate("/login")}>Get Started</button>
                </div>
            </div>

        </div>

    </>)
}