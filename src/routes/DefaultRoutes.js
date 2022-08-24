import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { DashboardDirectorPage, DashboardEmployeePage } from '../pages/Dashboard';
import { ImprovementMeasuresPage } from '../pages/Dashboard/pages/Employee/pages/ImprovementMeasures';
import { NotificationsPage } from '../pages/Dashboard/pages/Employee/pages/Notifications';
import { CountermeasuresForTheOccurrencePage } from '../pages/Dashboard/pages/Employee/pages/CountermeasuresForTheOccurrence';
import { OrdersForImprovementPage } from '../pages/Dashboard/pages/Employee/pages/OrdersForImprovement'
import { MeasureToManageThePerformancePage } from '../pages/Dashboard/pages/Employee/pages/MeasureToManageThePerformance'
import { ContentsOfWorkPage } from '../pages/Dashboard/pages/Employee/pages/ContentsOfWork';
import { IMStatusPage, IMRegistrationPage, NoticeListPage, NoticeDetailsPage, NoticeRegistrationPage, ACIStatusPage, ACIRegistrationPage, OICLawPage, OICRegistrationPage, MPDLawFirstPage, MPDLawSecondPage, MPDLawThirdPage, SecurityWorkContentPage } from '../pages/Dashoard/pages';
import { ForgottenPasswordPage } from '../pages/Login/pages/ForgottenPassword';
import { UserTokenService } from '../services/core/User';

const isUserLoggedIn = () => {
    let isLoggedIn = false;

    const token = UserTokenService.getItem();
    if (token) {
        isLoggedIn = true;
    }

    return isLoggedIn;
};

const PrivateRoute = () => {
    return isUserLoggedIn() ? <Outlet /> : <Navigate to="/" />
};

const DefaultRoutes = () => (

    <Routes>
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard/director" element={<DashboardDirectorPage />} />
            <Route path="/dashboard/director" element={<DashboardDirectorPage />} />
            <Route path="/dashboard/director/improvement-measure-status" element={<IMStatusPage />} />
            <Route path="/dashboard/director/improvement-measure-registration" element={<IMRegistrationPage />} />
            <Route path="/dashboard/director/notice-list" element={<NoticeListPage />} />
            <Route path="/dashboard/director/notice-details" element={<NoticeDetailsPage />} />
            <Route path="/dashboard/director/notice-registration" element={<NoticeRegistrationPage />} />
            <Route path="/dashboard/director/accident-countermeasures-implementation-status" element={<ACIStatusPage />} />
            <Route path="/dashboard/director/accident-countermeasures-implementation-registration" element={<ACIRegistrationPage />} />
            <Route path="/dashboard/director/order-for-improvement-and-correction-under-related-law" element={<OICLawPage />} />
            <Route path="/dashboard/director/order-for-improvement-and-correction-registration" element={<OICRegistrationPage />} />
            <Route path="/dashboard/director/measure-manage-performance-od-duties-law-first" element={<MPDLawFirstPage />} />
            <Route path="/dashboard/director/measure-manage-performance-od-duties-law-second" element={<MPDLawSecondPage />} />
            <Route path="/dashboard/director/measure-manage-performance-od-duties-law-third" element={<MPDLawThirdPage />} />
            {/* <Route path="/dashboard/director/security-work-content" element={<SecurityWorkContentPage />} /> */}
            <Route path="/dashboard/employee" element={<DashboardEmployeePage />} />
            <Route path="/dashboard/employee/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            <Route path="/dashboard/director/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/employee/accident-countermeasures-implementation/:page" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/employee/order-for-improvement-and-correction-under-related-law/:page" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/employee/measure-to-manage-performance-od-duties-law/:page" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/employee/security-work-content" element={<ContentsOfWorkPage />} />
            <Route path="/dashboard/director/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            <Route path="/dashboard/director/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/director/accident-countermeasures-implementation/:page" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/director/order-for-improvement-and-correction-under-related-law/:page" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/director/measure-to-manage-performance-od-duties-law/:page" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/director/security-work-content" element={<ContentsOfWorkPage />} />
        </Route>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/forgotten-password/:step" element={<ForgottenPasswordPage />} />
    </Routes>
);

export default DefaultRoutes;
