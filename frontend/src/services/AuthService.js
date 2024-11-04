import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      username,
      password,
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.error || "An error occurred on the server.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response from the server. Please try again later.",
      };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const register = async (user) => {
  const { username, first_name, last_name, email, phone, password } = user;

  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      username,
      first_name,
      last_name,
      email,
      phone,
      password,
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.error || "An error occurred on the server.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response from the server. Please try again later.",
      };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};


export const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("No token found");
    }

    await axios.post(`${apiUrl}/api/auth/logout`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem('authToken');
    window.location.href = '/login';
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Failed to logout. Please try again."); 
  }
};