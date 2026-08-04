import AiQuestion from "../AiQuestion";


export default function SessionDetails(){

    return(<>
    
    <div className="conatiner">

        <div className="text-center d-flex flex-column m-auto my-4 shadow-lg"
        style={{
            width : "800px",
            borderRadius: "15px"
        }}>
            <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                <h1>Role :</h1>
                <h1>FrontEnd Developer</h1>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                <h1>Topics to Focus :</h1>
                <h1>React</h1>
            </div>

            <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                <h1>Experience :</h1>
                <h1>2 year</h1>
            </div>
        </div>

        <div>
            <AiQuestion />
        </div>
    </div>
    
    </>)
}