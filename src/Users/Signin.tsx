import {useState} from 'react';
import {User} from "./client";
import {useNavigate, Link} from "react-router-dom";
import * as client from "./client";
export default function Signin() {
    const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });


    const navigate = useNavigate();
    const signin = async () =>{
        try{
            const existingUser = await client.signin(credentials);
            console.log(existingUser);
            navigate("/Kanbas/Account/Profile");
        } catch(e){
            console.log(e);
        }
    };

    return (
        <div>
            <h1>Signin</h1>
            <input value={credentials.username} className="form-control"
                placeholder="Username" onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })}/> <br/>
            <input value={credentials.password} className="form-control"
                placeholder="Password" onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })}/> <br/>
            <button className = "btn-primary btn mt-2" onClick={signin}> Signin </button> &nbsp;
            <Link to="/Kanbas/Account/Register" className="btn btn-primary mt-2">Register</Link>
        </div>
    )
}