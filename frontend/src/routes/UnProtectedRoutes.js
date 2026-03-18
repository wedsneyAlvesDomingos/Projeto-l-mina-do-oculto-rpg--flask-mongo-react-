import React from "react";

const ConfirmEmailPage = React.lazy(() => import("../pages/Login/confirm_email"));
const LoginPage = React.lazy(() => import("../pages/Login/LoginPage"));
const SignUpPage = React.lazy(() => import("../pages/Login/SignupPage"));
const ForgotPasswordPage = React.lazy(() => import("../pages/Login/ForgotPasswordPage"));
const ResetPasswordPage = React.lazy(() => import("../pages/Login/ResetPasswordPage"));

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