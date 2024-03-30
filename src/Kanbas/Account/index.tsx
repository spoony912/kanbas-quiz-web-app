import {Navigate, Route, Routes} from "react-router";
import RegisterScreen from "../Users/register";
import Profile from "../Users/profile";

function Account() {
    return (
        <div className = "container-fluid">
            <h1>Account</h1>
            <Routes>
                <Route path = "/register" element = {<RegisterScreen/>}/>
                <Route path = "/profile" element = {<Profile/>}/>
                <Route path = "/" element = {<Navigate to = "register"/>}/>
            </Routes>
        
        
        
        </div>
    )
}
export default Account;