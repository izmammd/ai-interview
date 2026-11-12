import { useNavigate } from "react-router-dom";

const features = [
    {
        icon: "bi-person-video3",
        title: "Practice your way",
        description: "Choose a role and focus on the skills you want to improve.",
    },
    {
        icon: "bi-chat-square-text",
        title: "Get interview questions",
        description: "Work through questions tailored to your interview preparation.",
    },
    {
        icon: "bi-graph-up-arrow",
        title: "Build confidence",
        description: "Practice at your own pace and feel more prepared for the real thing.",
    },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <main
            className="text-light"
            style={{
                background: "radial-gradient(ellipse at 75% 15%, #243b68 0%, #111827 42%, #080d18 100%)",
                minHeight: "calc(100vh - 88px)",
            }}
        >
            <section className="container py-5">
                <div className="row align-items-center g-5 py-lg-5">
                    <div className="col-lg-7">
                        <span className="badge rounded-pill text-bg-primary px-3 py-2 mb-4">
                            <i className="bi bi-stars me-2" aria-hidden="true"></i>
                            Your next opportunity starts here
                        </span>
                        <h1 className="display-3 fw-bold lh-sm mb-4">
                            Walk into your next interview
                            <span className="text-info"> with confidence.</span>
                        </h1>
                        <p className="lead text-white-50 mb-4">
                            Prepare with AI-powered interview practice built around your goals.
                            Choose a role, explore questions, and get ready at your own pace.
                        </p>
                        <div className="d-flex flex-wrap gap-3">
                            <button
                                className="btn btn-info btn-lg fw-semibold px-4"
                                onClick={() => navigate("/login")}
                            >
                                Start practicing
                                <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                            </button>
                            <button
                                className="btn btn-outline-light btn-lg px-4"
                                onClick={() => navigate("/register")}
                            >
                                Create an account
                            </button>
                        </div>
                        <p className="small text-white-50 mt-4 mb-0">
                            <i className="bi bi-check-circle-fill text-info me-2" aria-hidden="true"></i>
                            Practice whenever you&apos;re ready, at your own pace.
                        </p>
                    </div>

                    <div className="col-lg-5">
                        <div
                            className="rounded-4 border border-light border-opacity-10 p-4 p-md-5 shadow-lg"
                            style={{
                                background: "linear-gradient(145deg, rgba(37, 55, 88, 0.9), rgba(17, 24, 39, 0.95))",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <p className="small text-info text-uppercase fw-semibold mb-1">Practice preview</p>
                                    <h2 className="h4 fw-bold mb-0">Your interview session</h2>
                                </div>
                                <span className="rounded-circle bg-info bg-opacity-10 text-info p-3">
                                    <i className="bi bi-mic-fill fs-4" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="rounded-3 bg-dark bg-opacity-50 p-3 mb-3">
                                <p className="small text-white-50 mb-2">QUESTION 01</p>
                                <p className="mb-0">
                                    Tell me about a project you&apos;re proud of and the impact you made.
                                </p>
                            </div>
                            <div className="d-flex align-items-center gap-3 text-white-50 small">
                                <span><i className="bi bi-lightning-charge text-warning me-2" aria-hidden="true"></i>Role-focused practice</span>
                                <span><i className="bi bi-clock me-2" aria-hidden="true"></i>Your own pace</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container pb-5" aria-label="How interview practice helps">
                <div className="row g-3">
                    {features.map((feature) => (
                        <div className="col-md-4" key={feature.title}>
                            <article className="h-100 rounded-4 border border-light border-opacity-10 bg-white bg-opacity-5 p-4">
                                <i className={`bi ${feature.icon} fs-3 text-info`} aria-hidden="true"></i>
                                <h2 className="h5 fw-bold mt-3">{feature.title}</h2>
                                <p className="text-white-50 mb-0">{feature.description}</p>
                            </article>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
