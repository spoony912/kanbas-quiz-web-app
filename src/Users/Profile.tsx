import * as client from "./client";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
      console.log(account);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      navigate("/Kanbas/Account/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  },[]);

  const save = async () => {
    await client.updateUser(profile);
  };
  // sign out
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  // format mangodb date for input field
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedDob = formatDateForInput(profile.dob);

  return (
    <div>
      <h1>Profile</h1>

      {profile && (
        <div>
          <input
            placeholder="user name"
            className="form-control"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            placeholder="user password"
            className="form-control"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            placeholder="user first name"
            className="form-control"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            placeholder="user last name"
            className="form-control"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            className="form-control"
            value={formattedDob}
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            placeholder="user email"
            className="form-control"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button className="btn btn-primary mt-2 mb-2" onClick={save}>
            Save
          </button>
          <br />
          <button className="btn btn-danger mb-2" onClick={signout}>
            Signout
          </button>
          <br />
          <Link
            to="/Kanbas/Account/Admin/Users"
            className="btn btn-warning w-20"
          >
            Users
          </Link>
        </div>
      )}
    </div>
  );
}
