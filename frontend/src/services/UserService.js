import axios from "axios";
import store from "../store/store";
import { loadStripe } from "@stripe/stripe-js";
const apiUrl = import.meta.env.VITE_API_URL;
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const getOwnProfile = async (userId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
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

export const editOwnProfile = async (userId, userData) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.put(
      `${apiUrl}/api/users/${userId}`,
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

export const postRating = async (ratingData) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.post(`${apiUrl}/api/ratings`, ratingData, {
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

export const subscribePlan = async (stripe_customer_id) => {
  //   const token = store.getState().auth.token;

  const stripePromise = loadStripe(publishableKey);

  const body = {
    priceId: "price_1PubTMP7UBtaU2ylyQTbH8IT",
    stripe_customer_id,
  };
  try {
    const response = await axios.post(
      `${apiUrl}/api/stripe/create-checkout-session`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    const { sessionId } = data;

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId });
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

export const getPlanUsageDetails = async (userId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/plans/${userId}`, {
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

export const deleteProfile = async (userId) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.delete(`${apiUrl}/api/users/${userId}`, {
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

export const cancelSubscription = async (subscriptionId) => {
  const token = store.getState().auth.token;

  const body = {
    subscriptionId,
  };

  try {
    const response = await axios.post(
      `${apiUrl}/api/stripe/cancel-subscription`,
      body,
      {
        headers: {
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

export const getPublishedRating = async () => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`${apiUrl}/api/ratings/published`, {
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
