

export default function UpdatePass(){


    return(<>

        <div className="container-fluid d-flex justify-content-center align-items-center">

            <div className="shadow-lg p-4 bg-white"
            style={{
                width: "400px", borderRadius: "15px"
            }}>
                <form >
                    <h2 className="mb-4 text-center">Update Passwod</h2>

                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Enter new password..." />
                    </div>

                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="conform password..." />
                    </div>

                    <div className="mb-4">
                        <button className="btn btn-primary w-100">submit</button>
                    </div>
                </form>
            </div>

        </div>
    
    </>)
}