import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (user) => {
  const { username, first_name, last_name, email, password } = user;

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        first_name,
        last_name,
        email,
        password,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
