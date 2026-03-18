import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "../utils/RequireAuth";
import RedirectIfLoggedIn from "../utils/RedirectIfLoggedIn";
import { Box, CircularProgress } from "@mui/material";

// unprotectedRoutes
import { auth_routes } from "./UnProtectedRoutes";
// protectedRoutes
import { general_routes } from "./GeneralRoutes";

const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#2F3C29' }} />
    </Box>
);

const AppRoutes = () => {
    const protectedRoutes = [
        ...general_routes
    ];

    const unprotectedRoutes = [...auth_routes];

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
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
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRoutes;
