// utils/toast.ts
import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export const showError = (message: string) => {
  toast.error(message, defaultOptions);
};

export const showSuccess = (message: string) => {
  toast.success(message, defaultOptions);
};

export const showWarning = (message: string) => {
  toast.warning(message, defaultOptions);
};

export const showInfo = (message: string) => {
  toast.info(message, defaultOptions);
};

export const authErrorMessages = {
  sessionExpired: "Your session has expired. Please sign in again.",
  unauthorized: "You don't have permission to perform this action.",
  networkError: "Unable to connect to the server. Please check your internet connection.",
  default: "Something went wrong. Please try again later."
};