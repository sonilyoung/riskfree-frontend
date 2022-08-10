import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { DashboardDirectorPage, DashboardEmployeePage } from '../pages/Dashboard';
import { ImprovementMeasuresPage } from '../pages/Dashboard/pages/Employee/pages/ImprovementMeasures';
import { IMStatusPage, NoticeListPage, NoticeDetailsPage, NoticeRegistrationPage, ACIStatusPage, ACIRegistrationPage, OICLawPage, OICRegistrationPage } from '../pages/Dashoard/pages';
import { ForgottenPasswordPage } from '../pages/Login/pages/ForgottenPassword';

const DefaultRoutes = () => (
    <Routes>
        <Route path="/dashboard/director" element={<DashboardDirectorPage />} />
        <Route path="/dashboard/director/improvement-measure-status" element={<IMStatusPage />} />
        <Route path="/dashboard/director/notice-list" element={<NoticeListPage />} />
        <Route path="/dashboard/director/notice-details" element={<NoticeDetailsPage />} />
        <Route path="/dashboard/director/notice-registration" element={<NoticeRegistrationPage />} />
        <Route path="/dashboard/director/accident-countermeasures-implementation-status" element={<ACIStatusPage />} />
        <Route path="/dashboard/director/accident-countermeasures-implementation-registration" element={<ACIRegistrationPage />} />
        <Route path="/dashboard/director/order-for-improvement-and-correction-under-related-law" element={<OICLawPage />} />
        <Route path="/dashboard/director/order-for-improvement-and-correction-registration" element={<OICRegistrationPage />} />
        <Route path="/dashboard/employee" element={<DashboardEmployeePage />} />
        <Route path="/dashboard/employee/improvement-measures/:page" element={<ImprovementMeasuresPage />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
    </Routes>
);

export default DefaultRoutes;
