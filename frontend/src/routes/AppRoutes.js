import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "../utils/RequireAuth";
import RedirectIfLoggedIn from "../utils/RedirectIfLoggedIn";

// unprotectedRoutes
import { auth_routes } from "./UnProtectedRoutes";
// protectedRoutes
import { general_routes } from "./GeneralRoutes";


const AppRoutes = () => {
    const protectedRoutes = [
        ...general_routes
    ];

    const unprotectedRoutes = [...auth_routes];

    return (
        <BrowserRouter>
            <Routes>
                {
                    unprotectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                exact
                                path={e.path}
                                element={
                                    <RedirectIfLoggedIn>
                                       
                                        {e.ele}
                                    </RedirectIfLoggedIn>
                                }
                                // element={e.ele}
                            />
                        );
                    })
                }

                {
                    protectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                exact
                                path={e.path}
                                element={
                                    <RequireAuth userroles={e?.availability}>
                                        {e.ele}
                                    </RequireAuth>
                                }
                                // element={e.ele}
                            />
                        );
                    })
                }
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
