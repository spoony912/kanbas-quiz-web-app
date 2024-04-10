import * as client from "./client";
import{useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";

export default function Profile() {

    const [profile, setProfile] = useState({username:"", password:"", role:"USER", firstName:"", lastName:"", dob:"",email:""});
    const navigate = useNavigate();
    // const fetchProfile = async() => {
    //   const account = await client.profile();
    //   setProfile(account);
    // };

    const fetchProfile = async () => {
      try {
        const profile = await client.profile();
        setProfile(profile);
        console.log(profile);
      } catch (e) {
        console.log(e);
        navigate("/Kanbas/Account/Signin");
      }
    };

    const signout = async () => {
      await client.signoutUser();
      navigate("/Kanbas/Account/Signin");
    };

    const save = async() => {
      await client.updateUser(profile);
    };

    useEffect(()=>{
      fetchProfile();
    },[]);

    return (
      <div>
        <h1>Profile</h1>
        {profile && (
          <div>
            <h5>Username: </h5>
            <input value = {profile.username} onChange = {(e) => 
              setProfile({...profile, username: e.target.value})}/> <br/>
            <h5>Password: </h5>  
            <input value={profile.password} onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })}/>  <br/>
            <h5>FirstName: </h5>  
            <input value={profile.firstName} onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })}/>  <br/>
            <h5>LastName: </h5>  
            <input value={profile.lastName} onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })}/>  <br/>
            <h5>Date of birth: </h5>
            <input value={profile.dob} type="date" onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })}/>  <br/>
            <h5>Profile: </h5>  
            <input value={profile.email} onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })}/>  <br/>
            <h5>Role: </h5>  
            <select onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>

            <div>
                <button className = "btn btn-primary mt-2" onClick={save}>Save</button> &nbsp;&nbsp;

                <button className = "btn btn-danger mt-2" onClick={signout}>Signout</button>
                <br/>

                <Link to = "/Kanbas/Account/Admin/Users" className="btn btn-warning w-100">Users</Link>
            </div>
  
            
          </div>
        )}
      </div>
    );
  }