import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { DashboardDirectorPage, DashboardEmployeePage } from '../pages/Dashoard';
import { IMStatusPage } from '../pages/Dashoard/pages';
import { ForgottenPasswordPage } from '../pages/Login/pages/ForgottenPassword';

const DefaultRoutes = () => (
    <Routes>
        <Route path="/dashboard/director" element={ <DashboardDirectorPage /> } />
        <Route path="/dashboard/director/improvement-measure-status" element={ <IMStatusPage /> } />
        <Route path="/dashboard/employee" element={ <DashboardEmployeePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/registration" element={ <RegistrationPage /> } />
        <Route path="/forgotten-password" element={ <ForgottenPasswordPage /> } />
    </Routes>
);

export default DefaultRoutes;
