import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (user) => {
  const { username, first_name, last_name, email, phone, password } = user;

  try {
    const response = await axios.post(
      `${apiUrl}/api/auth/register`,
      {
        username,
        first_name,
        last_name,
        email,
        phone,
        password,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
