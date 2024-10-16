import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
const RequireAuth = ({ children, userroles }) => {
    let user;
    if (localStorage.getItem("user")) {
        user = JSON.parse(localStorage.getItem("user"));
    }
    const location = useLocation();
    if (user) {

        return children

    } else {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }
}
export default RequireAuth
