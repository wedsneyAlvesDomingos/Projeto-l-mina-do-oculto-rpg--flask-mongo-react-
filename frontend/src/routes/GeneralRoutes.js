import HomePage from "../pages/Home/HomePage";
import { userRoles as ur } from "../data/userRole";
import ResponsiveAppBar from "../componentes/Navbar/Navbar";
import WikiPage from "../pages/Wiki/Wikipage";
import CharPage from "../pages/Character/Character";
import HowToMakeCharPage from "../pages/HomeLinks/HowToChar";
import WhatIsLDO from "../pages/HomeLinks/LDOPresentation";
import HowToMakeYourOwnGames from "../pages/HomeLinks/HowToMakeYourOwnGames";
import StoryPage from "../pages/HomeLinks/HowToMakeStories";
import ClassesPage from "../pages/Wiki/classes/classes";
import EquipmentPage from "../pages/Wiki/equipment/equipment";
import AntecendetesPage from "../pages/Wiki/backgrounds/backgrounds";
import Actionspage from "../pages/Wiki/actions/actions";
import HabilidadesPage from "../pages/Wiki/habilidadesProenfiencias/habilidades";
import EspeciesPage from "../pages/Wiki/especies/especies";
import JobsPage from "../pages/Wiki/jobs/jobs";
import ConditionsPage from "../pages/Wiki/conditions/conditions";
import GeneralRulesPage from "../pages/Wiki/GeneralRules/generalRules";
import CombatRulesPage from "../pages/Wiki/CombatRules/CombateRules";

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
    {
        path: "/HowToMakeYourOwnGames",
        ele: <>
            <ResponsiveAppBar />
            <HowToMakeYourOwnGames />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/HowToMakeStories",
        ele: <>
            <ResponsiveAppBar />
            <StoryPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes",
        ele: <>
            <ResponsiveAppBar />
            <ClassesPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/equipment",
        ele: <>
            <ResponsiveAppBar />
            <EquipmentPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/antecedentes",
        ele: <>
            <ResponsiveAppBar />
            <AntecendetesPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/acoes",
        ele: <>
            <ResponsiveAppBar />
            <Actionspage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/habilidades",
        ele: <>
            <ResponsiveAppBar />
            <HabilidadesPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/especies",
        ele: <>
            <ResponsiveAppBar />
            <EspeciesPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/profissoes",
        ele: <>
            <ResponsiveAppBar />
            <JobsPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/condicoes",
        ele: <>
            <ResponsiveAppBar />
            <ConditionsPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/regrasGerais",
        ele: <>
            <ResponsiveAppBar />
            <GeneralRulesPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/regrasCombate",
        ele: <>
            <ResponsiveAppBar />
            <CombatRulesPage />

        </>,
        availability: [ur.admin]
    },
]