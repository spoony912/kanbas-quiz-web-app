import React, { useState } from "react";
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
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        className="form-control"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        className="form-control"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="btn btn-primary" onClick={signup}>
        Signup
      </button>
    </div>
  );
}
