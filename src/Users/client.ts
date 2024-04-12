import axios from "axios";
// axios.defaults.withCredentials = true;

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;

export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

const request = axios.create({ withCredentials: true });

// sign in
export const signin = async (credentials: User) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

// profile
// original:
export const profile = async () => {
  // console.log("response");
  const response = await request.post(`${USERS_API}/profile`); // not post
  // console.log("response", response.data);
  return response.data;
};

// export const profile = async () => {
//   try {
//     const response = await axios.get(`${USERS_API}/profile`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch profile:", error);
//     // Optionally, return a default state or handle the error as needed
//     throw error; // or handle differently
//   }
// };

// export const profile = async () => {
//   try {
//     const response = await axios.get(`${USERS_API}/profile`, {
//       withCredentials: true, // Include this option
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch profile:", error);
//     throw error;
//   }
// };

// update
export const updateUser = async (user: any) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  console.log(response.data);
  return response.data;
};
// find all users
export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
// register
export const registerUser = async (user: any) => {
  const response = await request.post(`${USERS_API}/register`, user);
  return response.data;
};
// create
export const createUser = async (user: any) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};
// delete
export const deleteUser = async (user: any) => {
  const response = await request.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
// sign up
export const signup = async (user: any) => {
  const response = await request.post(`${USERS_API}/signup`, user);
  return response.data;
};

// sign out
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

// find user by role
// original
// export const findUsersByRole = async (role: string) => {
//   const response = await axios.get(`${USERS_API}?role=${role}`);
//   console.log(`${USERS_API}?role=${role}`);
//   return response.data;
// };

export const findUsersByRole = async (role: string) => {
  const url = `${USERS_API}?role=${role}`;
  console.log("Making request to URL:", url);
  try {
    const response = await request.get(url);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by role:", error);
  }
};
