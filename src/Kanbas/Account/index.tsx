import Signin from "../../Users/Signin";
import {Routes, Route, Navigate} from "react-router-dom";
import Profile from "../../Users/Profile";
import RegisterScreen from "../../Users/register";
import UserTable from "../../Users/Table";
function Account() {
    return (
        <div className = "container-fluid">

            <Routes>
                <Route path = "/Signin" element = {<Signin/>}/>
                <Route path = "/Profile" element = {<Profile/>}/>
                <Route path = "/Register" element = {<RegisterScreen/>}/>
                <Route path = "/Admin/Users" element = {<UserTable/>}/>
                <Route path = "/" element = {<Navigate to = "/Kanbas/Account/Signin"/>}/>
            </Routes>
         
        
        
        </div>
    )
}
export default Account;