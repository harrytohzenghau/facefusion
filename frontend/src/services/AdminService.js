import axios from "axios";

export const getAllUsers = async (user) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/users",
      user
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
