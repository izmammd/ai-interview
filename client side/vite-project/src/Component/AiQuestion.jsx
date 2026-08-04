import Accordion from "react-bootstrap/Accordion";

export default function AiQuestion() {
    const isPinned = true;

    return (
        <Accordion defaultActiveKey="0" className="m-auto"
        style={{
            width:"800px",
        }}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <span>Is it accessible?</span>
                        <i
                            className={`me-3 bi ${isPinned ? "bi-pin" : "bi-pin-fill"}`}
                            style={{ fontSize: "20px", cursor: "pointer" }}
                        ></i>
                    </div>
                </Accordion.Header>

                <Accordion.Body>
                    Yes. It adheres to accessibility standards.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}