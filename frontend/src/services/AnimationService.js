import axios from "axios";
import store from "../store/store";
const apiUrl = import.meta.env.VITE_API_URL;

export const generateExpression = async (image, expression) => {
  const token = store.getState().auth.token;
  const userId = store.getState().auth.user.id; // Get user ID from Redux store
  const formData = new FormData();

  try {
    if (!image || !expression) {
      console.error("Image or expression is missing.");
      return { success: false, message: "Invalid input." };
    }
    // Append the image file, expression, and user ID to form data
    formData.append("s3_url", image); // Ensure image is a valid File object
    formData.append("expression", expression); // Append the expression string
    formData.append("user_id", userId); // Append the user ID

    // Call the new API that uploads the image and generates animation
    const response = await axios.post(
      `${apiUrl}/api/animation/upload-image-expression`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response.data);

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      console.log(error);
      return {
        success: false,
        message:
          error.response.data.message || "An error occurred on the server.",
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

export const generateTextToSpeech = async (message, gender) => {
  const token = store.getState().auth.token;
  const userId = store.getState().auth.user.id; // Get user ID from Redux store

  try {
    if (!message || !gender) {
      console.error("Message or gender is missing.");
      return { success: false, message: "Invalid input." };
    }

    // Call the backend API to generate the text-to-speech audio
    const response = await axios.post(
      `${apiUrl}/api/animation/textToSpeech`,
      { message, gender }, // Send the message and gender to the backend
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      }
    );

    // Check for success in the response
    if (response.data.s3Url) {
    
      return { success: true, audioUrl: response.data.s3Url };
    } else {
      throw new Error("Text-to-speech generation failed.");
    }
  } catch (error) {
    if (error.response) {
      console.log(error);
      return {
        success: false,
        message:
          error.response.data.message || "An error occurred on the server.",
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

export const generateLipSync = async (face, audio, type) => {
  const token = store.getState().auth.token;
  const formData = new FormData();

  try {
    if (!face || !audio) {
      console.error("Face video or audio is missing.");
      return { success: false, message: "Invalid input." };
    }
    
    formData.append("face", face); // ensure face is a valid File object
    if (type === "file") {
      const response = await fetch(audio);
      const audioBlob = await response.blob();
      const audioFile = new File([audioBlob], "audio.mp3", { type: "audio/mpeg" });
      formData.append("audio", audioFile); // Append the actual audio file
    } else {
      formData.append("audio", audio); // If `type` is "url", add the URL directly
    }
    formData.append("type", type); 

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
          error.response.data.message || "An error occurred on the server.",
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

export const updateContentBank = async (name, file_type, file_s3_key) => {
  const token = store.getState().auth.token;

  
  const contentData = {
    name,
    file_type,
    file_s3_key,
    status: "completed", // Set the status or any other fields you need
  };

  try {
    const response = await axios.post(
      `${apiUrl}/api/contentBank/updateContentBank`,
      contentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "An error occurred on the server.",
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


export const uploadImage = async (name, file_type, file) => {
  const token = store.getState().auth.token;
  const user_id = store.getState().auth.user.id;

  const formData = new FormData();

  formData.append("name", name);
  formData.append("user_id", user_id);
  formData.append("file_type", file_type);
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${apiUrl}/api/contentBank/createContent`,
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
      return {
        success: false,
        message:
          error.response.data.message || "An error occurred on the server.",
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

export const getImagesAndVideos = async () => {
  const token = store.getState().auth.token;
  const user_id = store.getState().auth.user.id;

  try {
    const response = await axios.get(`${apiUrl}/api/contentBank/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "An error occurred on the server.",
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

export const deleteImage = async (contentId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.delete(`${apiUrl}/api/contentBank/${contentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "An error occurred on the server.",
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
