import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Error401 from '../../pages/Errors/401';
import Error404 from '../../pages/Errors/404';
import ProtectedRoute from '../../utils/ProtectRoute';
import Root from '../../root/';

import routes from '../../routes';
import Login from '../../pages/Login';

function App() {
    return (
        <Routes>
            {/* Teacher routes */}
            <Route element={<Root />}>
                {routes.map((route) => {
                    if (route.role?.includes('teacher')) {
                        const ElementRoute = route.element;
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={route.role}>
                                        <ElementRoute />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    }
                    return null;
                })}
            </Route>

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/not-authorized" element={<Error401 />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;
