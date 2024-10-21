import axios from "axios";
import store from "../store/store";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/admin/users`, {
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

export const getOneUser = async (userId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/admin/users/${userId}`, {
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

export const createUser = async (userData) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.post(`${apiUrl}/api/admin/users`, userData, {
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

export const editUser = async (userId, userData) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.put(
      `${apiUrl}/api/admin/users/${userId}`,
      userData,
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

export const deleteUser = async (userId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.delete(`${apiUrl}/api/admin/users/${userId}`, {
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

export const getAllRatings = async () => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/ratings`, {
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

export const getOneRating = async (ratingId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/ratings/${ratingId}`, {
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

export const deleteRating = async (ratingId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.delete(`${apiUrl}/api/ratings/${ratingId}`, {
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
