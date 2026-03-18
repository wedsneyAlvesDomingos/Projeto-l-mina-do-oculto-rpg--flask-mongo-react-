import React from "react";
import { userRoles as ur } from "../data/userRole";
import ResponsiveAppBar from "../componentes/Navbar/Navbar";

const HomePage = React.lazy(() => import("../pages/Home/HomePage"));
const WikiPage = React.lazy(() => import("../pages/Wiki/Wikipage"));
const CharPage = React.lazy(() => import("../pages/Character/Character"));
const HowToMakeCharPage = React.lazy(() => import("../pages/HomeLinks/HowToChar"));
const WhatIsLDO = React.lazy(() => import("../pages/HomeLinks/LDOPresentation"));
const HowToMakeYourOwnGames = React.lazy(() => import("../pages/HomeLinks/HowToMakeYourOwnGames"));
const StoryPage = React.lazy(() => import("../pages/HomeLinks/HowToMakeStories"));
const ClassesPage = React.lazy(() => import("../pages/Wiki/classes/classes"));
const EquipmentPage = React.lazy(() => import("../pages/Wiki/equipment/equipment"));
const AntecendetesPage = React.lazy(() => import("../pages/Wiki/backgrounds/backgrounds"));
const Actionspage = React.lazy(() => import("../pages/Wiki/actions/actions"));
const HabilidadesPage = React.lazy(() => import("../pages/Wiki/habilidadesProenfiencias/habilidades"));
const EspeciesPage = React.lazy(() => import("../pages/Wiki/especies/especies"));
const JobsPage = React.lazy(() => import("../pages/Wiki/jobs/jobs"));
const ConditionsPage = React.lazy(() => import("../pages/Wiki/conditions/conditions"));
const GeneralRulesPage = React.lazy(() => import("../pages/Wiki/GeneralRules/generalRules"));
const CombatRulesPage = React.lazy(() => import("../pages/Wiki/CombatRules/CombateRules"));
const PaginaNaoEncontrada = React.lazy(() => import("../pages/404Page/pageNotFound"));
const AprendizPage = React.lazy(() => import("../pages/Wiki/classes/aprendiz"));
const CombatentePage = React.lazy(() => import("../pages/Wiki/classes/combatente"));
const IniciadoPage = React.lazy(() => import("../pages/Wiki/classes/iniciado"));
const NovicoPage = React.lazy(() => import("../pages/Wiki/classes/novico"));
const FeiticeiroPage = React.lazy(() => import("../pages/Wiki/classes/feiticeiro"));
const CavaleiroPage = React.lazy(() => import("../pages/Wiki/classes/cavaleiro"));
const CacadorPage = React.lazy(() => import("../pages/Wiki/classes/cacador"));
const BarbaroPage = React.lazy(() => import("../pages/Wiki/classes/barbaro"));
const AssassinoPage = React.lazy(() => import("../pages/Wiki/classes/assassino"));
const SarcedotePage = React.lazy(() => import("../pages/Wiki/classes/sarcedote"));
const ExorcistaPage = React.lazy(() => import("../pages/Wiki/classes/exorcista"));
const MagoPage = React.lazy(() => import("../pages/Wiki/classes/mago"));
const ProfessorPage = React.lazy(() => import("../pages/Wiki/classes/professor"));
const XamaPage = React.lazy(() => import("../pages/Wiki/classes/xama"));
const ElementalistaPage = React.lazy(() => import("../pages/Wiki/classes/xama"));
const BruxoPage = React.lazy(() => import("../pages/Wiki/classes/bruxo"));
const MetamorfoPage = React.lazy(() => import("../pages/Wiki/classes/metamorfo"));
const MongePage = React.lazy(() => import("../pages/Wiki/classes/monge"));
const InquisidorPage = React.lazy(() => import("../pages/Wiki/classes/inquisidor"));
const CacadorDeDemonionsPage = React.lazy(() => import("../pages/Wiki/classes/cacadorDeDemonios"));
const CombatenteArcanoPage = React.lazy(() => import("../pages/Wiki/classes/combatenteArcano"));
const EruditoPage = React.lazy(() => import("../pages/Wiki/classes/erudito"));
const ProfanoPage = React.lazy(() => import("../pages/Wiki/classes/profano"));
const InvocadorPage = React.lazy(() => import("../pages/Wiki/classes/invocador"));
const CharacterSheet = React.lazy(() => import("../pages/Character/characterSheet"));
const CharCreationPage = React.lazy(() => import("../pages/Character/criarPersonagem"));
const ProfilePage = React.lazy(() => import("../pages/Profile/ProfilePage"));

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
        path: "/character/fichaDoPersonagem/:id",
        ele: <>
            <ResponsiveAppBar />
            <CharacterSheet />
        </>,
        availability: [ur.admin]
    },
    {
        path: "/criarPersonagem",
        ele: <>
            <ResponsiveAppBar />
            <CharCreationPage />
        </>,
        availability: [ur.admin]
    },
    {
        path: "/perfil",
        ele: <>
            <ResponsiveAppBar />
            <ProfilePage />
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
        path: "/classes/xama",
        ele: <>
            <ResponsiveAppBar />
            <XamaPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/elementalista",
        ele: <>
            <ResponsiveAppBar />
            <ElementalistaPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/bruxo",
        ele: <>
            <ResponsiveAppBar />
            <BruxoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/metamorfo",
        ele: <>
            <ResponsiveAppBar />
            <MetamorfoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/monge",
        ele: <>
            <ResponsiveAppBar />
            <MongePage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/inquisidor",
        ele: <>
            <ResponsiveAppBar />
            <InquisidorPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/combatenteArcano",
        ele: <>
            <ResponsiveAppBar />
            <CombatenteArcanoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/erudito",
        ele: <>
            <ResponsiveAppBar />
            <EruditoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/profano",
        ele: <>
            <ResponsiveAppBar />
            <ProfanoPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/invocador",
        ele: <>
            <ResponsiveAppBar />
            <InvocadorPage/>

        </>,
        availability: [ur.admin]
    },
    {
        path: "/classes/cacadorDeDemonios",
        ele: <>
            <ResponsiveAppBar />
            <CacadorDeDemonionsPage/>

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