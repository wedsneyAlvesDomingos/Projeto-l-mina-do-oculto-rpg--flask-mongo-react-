import ConfirmEmailPage from "../pages/Login/confirm_email";
import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/Login/SignupPage";
import ForgotPasswordPage from "../pages/Login/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Login/ResetPasswordPage";

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
    {
        path: "/esqueceuSenha",
        ele: <ForgotPasswordPage />
    },
    {
        path: "/redefinirSenha/:token",
        ele: <ResetPasswordPage />
    },
]