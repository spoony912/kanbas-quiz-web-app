import React, { ReactHTMLElement, useState } from "react";
import { useNavigate } from "react-router";
import * as client from "./client";

// Define an interface for the error structure
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const newUser = await client.signup(user);
      console.log(`new user: ${newUser}`);
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      console.log(e);
    }
  };

  const handleSignin = async () => {
    navigate(`/Kanbas/Account/Signin`);
  };

  return (
    <form onSubmit={handleSignup}>
      <h1>Signup</h1>
      <input
        className="form-control"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        className="form-control"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        type="submit"
        className="btn btn-primary mt-2"
        // disabled={user.username === "" || user.password === ""}
      >
        Signup
      </button>
      <br />
      <button className="btn btn-primary mt-2" onClick={handleSignin}>
        Back to Signin
      </button>
      <br />
    </form>
  );
}
