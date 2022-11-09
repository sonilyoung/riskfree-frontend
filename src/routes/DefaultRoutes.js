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
import { SystemAdministratorPage } from '../pages/Dashboard/pages/SystemAdministrator';
import { ForgottenPasswordPage } from '../pages/Login/pages/ForgottenPassword';

import { useUserStatus } from '../hooks/core/UserStatus';
import { useUserToken } from '../hooks/core/UserToken';
import useUserURLRedirect from '../hooks/core/UserURLRedirect/UserURLRedirect';


{/* DEPRECATED IMPORT PAGES */}
// import { IMStatus_deprecatedPage, IMRegistration_deprecatedPage, NoticeList_deprecatedPage, NoticeDetails_deprecatedPage, NoticeRegistration_deprecatedPage, ACIStatus_deprecatedPage, ACIRegistration_deprecatedPage, OICLaw_deprecatedPage, OICRegistration_deprecatedPage, MPDLawFirst_deprecatedPage, MPDLawSecond_deprecatedPage, MPDLawThird_deprecatedPage, SecurityWorkContent_deprecatedPage, MembersManagement_deprecatedPage, WorkHistoryList_deprecatedPage } from '../pages/Dashoard/pages';

const PrivateRoute = () => {
    const isLoggedIn = useUserStatus();

    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

const PublicRoute = () => {
    const isLoggedIn = useUserStatus();
    const [userToken] = useUserToken();
    const getPath = useUserURLRedirect();

    const userLoggedInRoleCd = isLoggedIn && userToken.getUserRoleCd();
    const redirectPath = isLoggedIn && getPath(userLoggedInRoleCd);

    return isLoggedIn ? <Navigate to={redirectPath} /> : <Outlet />;
};

const DefaultRoutes = () => (

    <Routes>
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard/system-administrator" element={<SystemAdministratorPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard/director" element={<DashboardDirectorPage />} />
            {/* <Route path="/dashboard/director" element={<DashboardDirectorPage />} /> */}
            <Route path="/dashboard/director/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/director/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            <Route path="/dashboard/director/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/director/accident-countermeasures-implementation/*" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/director/order-for-improvement-and-correction-under-related-law/*" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/director/measure-to-manage-performance-od-duties-law/:page" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/director/security-work-content" element={<ContentsOfWorkPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard/employee" element={<DashboardEmployeePage />} />
            <Route path="/dashboard/employee/:MainKey" element={<DashboardEmployeePage />} />
            <Route path="/dashboard/employee/notifications/*" element={<NotificationsPage />} />
            <Route path="/dashboard/employee/improvement-measures/*" element={<ImprovementMeasuresPage />} />
            <Route path="/dashboard/employee/accident-countermeasures-implementation/*" element={<CountermeasuresForTheOccurrencePage />} />
            <Route path="/dashboard/employee/order-for-improvement-and-correction-under-related-law/*" element={<OrdersForImprovementPage />} />
            <Route path="/dashboard/employee/measure-to-manage-performance-od-duties-law/*" element={<MeasureToManageThePerformancePage />} />
            <Route path="/dashboard/employee/security-work-content" element={<ContentsOfWorkPage />} />
        </Route>
        <Route element={<PublicRoute />}>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/forgotten-password/*" element={<ForgottenPasswordPage />} />
        </Route>

        {/* DEPRECATED ROUTES */}
        <Route element={<PrivateRoute />}>
            {/* <Route path="/dashboard/director/improvement-measure-status" element={<IMStatus_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/improvement-measure-registration" element={<IMRegistration_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/notice-list" element={<NoticeList_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/notice-details" element={<NoticeDetails_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/notice-registration" element={<NoticeRegistration_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/accident-countermeasures-implementation-status" element={<ACIStatus_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/accident-countermeasures-implementation-registration" element={<ACIRegistration_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/order-for-improvement-and-correction-under-related-law" element={<OICLaw_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/order-for-improvement-and-correction-registration" element={<OICRegistration_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/measure-manage-performance-od-duties-law-first" element={<MPDLawFirst_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/measure-manage-performance-od-duties-law-second" element={<MPDLawSecond_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/measure-manage-performance-od-duties-law-third" element={<MPDLawThird_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/work-history-list" element={<WorkHistoryList_deprecatedPage />} /> */}
            {/* <Route path="/dashboard/director/security-work-content" element={<SecurityWorkContent_deprecatedPage />} /> */}
        </Route>
    </Routes>
);

export default DefaultRoutes;


