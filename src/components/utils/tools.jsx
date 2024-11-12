import { toast } from "react-toastify";

export const showToast = (type, message = "Sorry, try again") => {
  switch (type) {
    case "SUCCESS":
      toast.success(message, {
        position: "bottom-center",
      });
      break;
    case "ERROR":
      toast.error(message, {
        position: "top-left",
      });
      break;
    default:
      return false;
  }
};
