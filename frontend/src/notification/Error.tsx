import { toast, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Error = (text : any) => {
  toast.error(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
