import Login from "../../components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    return (
        <div className="h-[calc(100vh-60px)] bg-base-300 w-full flex flex-col justify-center items-center space-y-9">
            <div className="font-mono text-m text-center">Log in to your EM-STYTCH account</div>
            <Login />
            <ToastContainer />
        </div>
    )
}

export default LoginPage;