import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { removeUser } from "../../Redux Store/Slice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);

    const isAuthenticate = useSelector(state => state.user.isAuthenticate);
    const dispatch = useDispatch();

    const getProfile = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/user/getuser", {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            return res.data;
        }
        catch (err) {
            console.log(err.response.message);
        }
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["getProfile"],
        queryFn: getProfile
    });

    // console.log("get Profile : ", data);

    const handleLogOut = async () => {
        const res = await axios.get("http://localhost:3000/api/user/logout",
            { withCredentials: true });
        console.log(res.data);
        toast.success(res.data.message);
        setShowDropdown(!showDropdown)
        dispatch(removeUser());
        navigate("/");

    }

    // const handleLogOut = async () => {
        
    //     try{
    //         const res = await axios.get("http://localhost:3000/api/user/logout",
    //             { withCredentials: true}
    //         )

    //         toast.success(res.data.message);
    //         navigate("/home");
    //     }
    //     catch(err){
    //         toast.error(err.response?.data?.message || "Something is error")
    //     }
    // }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">

                <div className="position-relative">

                    <img
                        src={data?.isUser?.profilePhoto ? data.isUser.profilePhoto : "https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"}
                        // src="https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"
                        alt="profile"
                        className="rounded-circle border shadow"
                        style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "conatin"
                        }}
                        alt="Profile"

                        onClick={() => setShowDropdown(!showDropdown)}
                    />

                    {/* {showDropdown 
                } */}

                    {showDropdown && <div className="card position-absolute top-100 end-0 shadow"
                    onClick={()=>setShowDropdown(!showDropdown)}
                        style={{
                            width: "200px",
                            zIndex: 1000,
                            marginTop: "-50px"
                        }}>

                        <div className="card-body text-center">
                            <img
                                className="rounded-circle mb-2"
                                src={data?.isUser?.profilePhoto ? data.isUser.profilePhoto : "https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"}
                                style={{
                                    height: "70px",
                                    width: "70px",
                                    objectFit: "cover"
                                }}
                                alt="profile"
                            />

                            <h6>{data?.isUser.fullName}</h6>
                            <small>{data?.isUser?.email}</small>

                            <hr />

                            <button className="btn btn-outline-primary w-100 mb-2" onClick={()=>navigate("/myprofile")}>My Profile</button>
                            <button className="btn btn-danger w-100 mb-2" onClick={() => navigate("/updateprofile")}>Update</button>
                            <button className="btn btn-danger w-100 mb-2" onClick={handleLogOut}>Logout</button>

                        </div>

                    </div>}

                </div>
            </div>
        </>
    )
}