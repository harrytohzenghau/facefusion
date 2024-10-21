import axios from "axios";
import store from "../store/store";
const apiUrl = import.meta.env.VITE_API_URL;

export const generateExpression = async (image, expression) => {
  const token = store.getState().auth.token;
  const formData = new FormData();

  try {
    if (!image || !expression) {
      console.error("Image or expression is missing.");
      return { success: false, message: "Invalid input." };
    }

    formData.append("face", image); // Ensure image is a valid File object
    formData.append("expression", expression); // Append the expression string

    const response = await axios.post(
      `${apiUrl}/api/animation/expression`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data)

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      console.log(error);
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

export const generateLipSync = async (face, audio) => {
  const token = store.getState().auth.token;
  const formData = new FormData();

  try {
    if (!face || !audio) {
      console.error("Face video or audio is missing.");
      return { success: false, message: "Invalid input." };
    }

    formData.append("face", face); // ensure face is a valid File object
    formData.append("audio", audio); // append the audio file

    const response = await axios.post(
      `${apiUrl}/api/animation/lipSync`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      console.log(error);
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
