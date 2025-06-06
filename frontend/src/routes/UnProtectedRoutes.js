import ConfirmEmailPage from "../pages/Login/confirm_email";
import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/Login/SignupPage";

export const auth_routes = [
    { 
        path: "/", 
        ele: <LoginPage></LoginPage>, 
    },
    { 
        path: "/login", 
        ele: <LoginPage></LoginPage>, 
    },
    {
        path: "/signup",
        ele: <>
            <SignUpPage />
        </>
    },
    {
        path: "/confirmarEmail",
        ele: <>
            <ConfirmEmailPage />
        </>
    },
    {
        path: "/confirmarEmail/:token",
        ele: <>
            <ConfirmEmailPage />
        </>
    },

]