import HomePage from "../pages/Home/HomePage";
import { userRoles as ur } from "../data/userRole";
import ResponsiveAppBar from "../componentes/Navbar/Navbar";
import WikiPage from "../pages/Wiki/Wikipage";
import CharPage from "../pages/Character/Character";
import HowToMakeCharPage from "../pages/HomeLinks/HowToChar";
import WhatIsLDO from "../pages/HomeLinks/LDOPresentation";

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
    {
        path: "/character",
        ele: <>
            <ResponsiveAppBar />
            <CharPage />
        </>,
        availability: [ur.admin]
    },
    {
        path: "/howtomakeacharacter",
        ele: <>
            <ResponsiveAppBar />
            <HowToMakeCharPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/whatisLDO",
        ele: <>
            <ResponsiveAppBar />
            <WhatIsLDO />

        </>,
        availability: [ur.admin]
    },
]