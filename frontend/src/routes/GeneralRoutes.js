import HomePage from "../pages/Home/HomePage";
import { userRoles as ur } from "../data/userRole";
import ResponsiveAppBar from "../componentes/Navbar/Navbar";
import WikiPage from "../pages/Wiki/Wikipage";

export const general_routes = [
    {
        path: "/home",
        ele: <>
            <ResponsiveAppBar />
            <HomePage />
        </>,
        availability: [ur.admin]
    },
    {
        path: "/wiki",
        ele: <>
            <ResponsiveAppBar />
            <WikiPage />
        </>,
        availability: [ur.admin]
    },

]