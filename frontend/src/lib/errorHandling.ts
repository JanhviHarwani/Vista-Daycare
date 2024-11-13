// utils/errorHandling.ts

interface APIError {
  response?: {
    status?: number;
    data?: {
      error?: string;
    };
  };
  request?: unknown;
  message?: string;
}

export const getErrorMessage = (error: unknown): string => {
  const err = error as APIError;
  
  if (err?.response) {
    switch (err.response.status) {
      case 401:
        return "Your session has expired. Please log in again to continue.";
      case 403:
        return "You don't have permission to perform this action. Please log in again.";
      case 404:
        return "The requested resource could not be found.";
      case 500:
        return "An internal server error occurred. Please try again later.";
      default:
        return err.response.data?.error || "Something went wrong. Please try again.";
    }
  } else if (err?.request) {
    return "Network error. Please check your connection.";
  }
  return "An unexpected error occurred. Please try again.";
};

export const handleAuthError = (error: unknown, logout: () => void, navigate: () => void) => {
  const err = error as APIError;
  
  if (err?.response?.status === 401 || err?.response?.status === 403) {
    logout();
    navigate();
  }
};

// Optional: Add more specific error helpers
export const isAuthError = (error: unknown): boolean => {
  const err = error as APIError;
  return err?.response?.status === 401 || err?.response?.status === 403;
};

export const isNetworkError = (error: unknown): boolean => {
  const err = error as APIError;
  return !!err?.request && !err?.response;
};

// Add auth error messages object for consistency
export const authErrorMessages = {
  sessionExpired: "Your session has expired. Please log in again to continue.",
  unauthorized: "You don't have permission to perform this action.",
  networkError: "Unable to connect to the server. Please check your internet connection.",
  default: "Something went wrong. Please try again later."
};