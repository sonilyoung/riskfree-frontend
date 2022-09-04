import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { DashboardDirectorPage, DashboardEmployeePage } from '../pages/Dashboard';
import { ImprovementMeasuresPage } from '../pages/Dashboard/pages/Employee/pages/ImprovementMeasures';
import { NotificationsPage } from '../pages/Dashboard/pages/Employee/pages/Notifications';
import { CountermeasuresForTheOccurrencePage } from '../pages/Dashboard/pages/Employee/pages/CountermeasuresForTheOccurrence';
import { OrdersForImprovementPage } from '../pages/Dashboard/pages/Employee/pages/OrdersForImprovement'
import { MeasureToManageThePerformancePage } from '../pages/Dashboard/pages/Employee/pages/MeasureToManageThePerformance'
import { ContentsOfWorkPage } from '../pages/Dashboard/pages/Employee/pages/ContentsOfWork';
import { IMStatusPage, IMRegistrationPage, NoticeListPage, NoticeDetailsPage, NoticeRegistrationPage, ACIStatusPage, ACIRegistrationPage, OICLawPage, OICRegistrationPage, MPDLawFirstPage, MPDLawSecondPage, MPDLawThirdPage, SecurityWorkContentPage, MembersManagementPage, WorkHistoryListPage } from '../pages/Dashoard/pages';
import { ForgottenPasswordPage } from '../pages/Login/pages/ForgottenPassword';
import { UserTokenService } from '../services/core/User';

import { getDecoded, getItem, isValid } from "../services/core/User/Token";
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/User';


const ForbiddenPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Forbidden Page</h1>
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}

const PrivateRoute = ({ allowedRoles }) => {
    const roleName = localStorage.getItem('ROLE_NAME');

    let auth = false;
    if (allowedRoles === '000' && roleName.includes('admin')) {
        auth = true;
    } else if ((allowedRoles === '001' || allowedRoles === '002') && roleName.includes('director')) {
        auth = true;
    } else if (allowedRoles === '002' && roleName.includes('employee')) {
        auth = true;
    }

    return auth ? <Outlet /> : isValid() && !auth ? <ForbiddenPage /> : <Navigate to="/" />;
};

const PublicRoute = () => {
    const roleName = localStorage.getItem('ROLE_NAME');

    return !isValid() ? <Outlet /> : <Navigate to={`/dashboard/${roleName}`} />;
};

const DefaultRoutes = () => (

    <Routes>
        {/* ADMIN */}
        <Route element={<PrivateRoute allowedRoles={'000'} />}>
            <Route path="/dashboard/admin" element={<MembersManagementPage />} />
        </Route>
        {/* CEO */}
        <Route element={<PrivateRoute allowedRoles={'001'} />}>
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
            <Route path="/dashboard/director/work-history-list" element={<WorkHistoryListPage />} />
            <Route path="/dashboard/director/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/director/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            {/* <Route path="/dashboard/director/security-work-content" element={<SecurityWorkContentPage />} /> */}
            <Route path="/dashboard/director/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/director/accident-countermeasures-implementation/*" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/director/order-for-improvement-and-correction-under-related-law/*" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/director/measure-to-manage-performance-od-duties-law/:page" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/director/security-work-content" element={<ContentsOfWorkPage />} />
            <Route path="/dashboard/employee" element={<DashboardEmployeePage />} />
            <Route path="/dashboard/employee/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/employee/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            <Route path="/dashboard/employee/accident-countermeasures-implementation/*" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/employee/order-for-improvement-and-correction-under-related-law/*" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/employee/measure-to-manage-performance-od-duties-law/:page" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/employee/security-work-content" element={<ContentsOfWorkPage />} />
        </Route>
        {/* EMPLOYEE  */}
        <Route element={<PrivateRoute allowedRoles={'002'} />}>
            <Route path="/dashboard/employee" element={<DashboardEmployeePage />} />
            <Route path="/dashboard/employee/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/employee/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            <Route path="/dashboard/employee/accident-countermeasures-implementation/*" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/employee/order-for-improvement-and-correction-under-related-law/*" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/employee/measure-to-manage-performance-od-duties-law/:page" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/employee/security-work-content" element={<ContentsOfWorkPage />} />

        </Route>


        <Route element={<PublicRoute />}>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/forgotten-password/*" element={<ForgottenPasswordPage />} />
        </Route>
    </Routes>
);

export default DefaultRoutes;


