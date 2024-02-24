import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = ({ message, display, type }) => {
    toast[type](message, {
        autoClose: 4000,
        display,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
}

export default notify;
