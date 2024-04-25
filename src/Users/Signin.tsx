import React, { useState } from "react";
import { useNavigate } from "react-router";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
  // ----------------- 1 -----------------
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const navigate = useNavigate();
  //   sign in button
  const signin = async () => {
    try {
      const existingUser = await client.signin(credentials);
      console.log(existingUser);
      navigate("/Kanbas/Account/Profile");
    } catch (e) {
      console.log(e);
    }
  };
  const handleSignup = async () => {
    navigate(`/Kanbas/Account/Signup`);
  };

  return (
    <div>
      <h1>Signin</h1>
      <input
        className="form-control"
        placeholder="user name"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        className="form-control "
        placeholder="user password"
        value={credentials.password}
        // type={"password"}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="btn btn-primary mb-2 mt-2" onClick={signin}>
        Signin
      </button>
      <br />
      <button className="btn btn-primary " onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}
