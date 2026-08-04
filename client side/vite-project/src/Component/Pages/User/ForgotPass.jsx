import { useNavigate } from "react-router-dom";


export default function ForgotPass(){

    const navigate = useNavigate();


    return(<>
        <h1>Forgot Pass</h1>

        <div className="container-fluid d-flex justify-content-center align-items-center">

            <div className="shadow-lg p-4 bg-white"
            style={{
                width: "400px", borderRadius: "15px"
            }}>
                <form >
                    <h2 className="mb-4 text-center">Forgot Passwod</h2>

                    <div className="mb-4">
                        <input type="email" className="form-control" placeholder="Enter email..." />
                    </div>

                    <div className="mb-4">
                        <button className="btn btn-warning w-50">verify email</button>
                        <button className="btn btn-success w-50" onClick={()=>navigate("/updatepass")}>send otp</button>
                    </div>
                </form>
            </div>

        </div>
    
    </>)
}