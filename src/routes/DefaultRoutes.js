import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { DashboardPage } from '../pages/Dashoard';
import { ForgottenPasswordPage } from '../pages/Login/pages/ForgottenPassword';

const DefaultRoutes = () => (
    <Routes>
        <Route path="/" element={ <DashboardPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/registration" element={ <RegistrationPage /> } />
        <Route path="/forgotten-password" element={ <ForgottenPasswordPage /> } />
    </Routes>
);

export default DefaultRoutes;
