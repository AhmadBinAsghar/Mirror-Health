import AsyncStorage from "@react-native-async-storage/async-storage";
import { appKeys } from "./AppKeys";

export const BASE_URL = "https://api.mirror.health/backend/api/"
// export const BASE_URL = "http://192.168.137.1:8001/backend/api/" /// Local IP
// export const BASE_URL = "https://13.48.111.237:8005/backend/api/"  /// Stagging IP
export const SOCKET_DEV = 'https://api.mirror.health/';
// export const SOCKET_DEV = 'http://192.168.1.46:8001/';


export const API_REQUEST = async (
  method,
  endPoint,
  data,
  onSuccess,
  onFailed
) => {
  try {
    const token = await AsyncStorage.getItem(appKeys?.sessionToken);

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(BASE_URL + endPoint, {
      method: method,
      body: data ? JSON.stringify(data) : null,
      headers,
    });

    // Check for a non-2xx status response
    if (!response.ok) {
      let errorMessage = "Something went wrong"; // Default error message

      // Handle different HTTP response status codes
      if (response.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (response.status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      } else if (response.status === 404) {
        errorMessage = "Not found.";
      } else if (response.status === 400) {
        errorMessage = "Bad request.";
      }

      // Try to parse the error message from the response
      try {
        const jsonData = await response.json();
        errorMessage = jsonData?.message || errorMessage;
      } catch (parseError) {
        // console.log("Failed to parse error response:", parseError);
      }

      // Helper.showToast(errorMessage);
      onFailed(errorMessage);
      return;
    } else {
      // Successfully received response
      const jsonData = await response.json();
      // Helper.showToast(jsonData?.message);
      onSuccess(jsonData);
    }

  } catch (error) {
    // console.log("Error in API_REQUEST:", error);

    let errorMessage = "Something went wrong. Please try again.";

    if (error?.message?.includes("Network request failed")) {
      errorMessage = "Network error. Please check your connection.";
    } else if (error?.message?.includes("Session token not found")) {
      errorMessage = "Session expired. Please log in again.";
    }

    // Helper.showToast(errorMessage);
    onFailed(errorMessage);
  }
};
export async function API_Thunk_REQUEST(method, url, body) {
  const token = await AsyncStorage.getItem(appKeys.sessionToken);
  // console.log(BASE_URL + url, method, token)
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: header
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
}
export async function API_Metrics_REQUEST(method, url, body) {
  const token = await AsyncStorage.getItem(appKeys.sessionToken);
  // console.log("TOKEN FROM BACKEND", token)
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: header
    })
      .then((response) => response)
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
}