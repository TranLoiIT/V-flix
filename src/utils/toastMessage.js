const { toast } = require("react-toastify");

export const toastMessage = ({type = 'success', message = '', time = 5000}) => {
    toast[type](message, {
      position: "top-right",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
}

export const test = () => {};