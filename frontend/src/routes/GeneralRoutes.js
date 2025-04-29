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
import PaginaNaoEncontrada from "../pages/404Page/pageNotFound";
import AprendizPage from "../pages/Wiki/classes/aprendiz";
import CombatentePage from "../pages/Wiki/classes/combatente";
import IniciadoPage from "../pages/Wiki/classes/iniciado";
import NovicoPage from "../pages/Wiki/classes/novico";
import FeiticeiroPage from "../pages/Wiki/classes/feiticeiro";
import CavaleiroPage from "../pages/Wiki/classes/cavaleiro";
import CacadorPage from "../pages/Wiki/classes/cacador";
import BarbaroPage from "../pages/Wiki/classes/barbaro";
import AssassinoPage from "../pages/Wiki/classes/assassino";
import SarcedotePage from "../pages/Wiki/classes/sarcedote";
import ExorcistaPage from "../pages/Wiki/classes/exorcista";
import MagoPage from "../pages/Wiki/classes/mago";
import ProfessorPage from "../pages/Wiki/classes/professor";



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
        path: "/classes/aprendiz",
        ele: <>
            <ResponsiveAppBar />
            <AprendizPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/combatente",
        ele: <>
            <ResponsiveAppBar />
            <CombatentePage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/iniciado",
        ele: <>
            <ResponsiveAppBar />
            <IniciadoPage />

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/novico",
        ele: <>
            <ResponsiveAppBar />
            <NovicoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/feiticeiro",
        ele: <>
            <ResponsiveAppBar />
            <FeiticeiroPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/cavaleiro",
        ele: <>
            <ResponsiveAppBar />
            <CavaleiroPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/cacador",
        ele: <>
            <ResponsiveAppBar />
            <CacadorPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/assassino",
        ele: <>
            <ResponsiveAppBar />
            <AssassinoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/barbaro",
        ele: <>
            <ResponsiveAppBar />
            <BarbaroPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/sarcedote",
        ele: <>
            <ResponsiveAppBar />
            <SarcedotePage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/exorcista",
        ele: <>
            <ResponsiveAppBar />
            <ExorcistaPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/mago",
        ele: <>
            <ResponsiveAppBar />
            <MagoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/professor",
        ele: <>
            <ResponsiveAppBar />
            <ProfessorPage/>

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

    {
        path: "/*",
        ele: <>
            <ResponsiveAppBar />
            <PaginaNaoEncontrada />
        </>,
        availability: [ur.admin]
    }
]