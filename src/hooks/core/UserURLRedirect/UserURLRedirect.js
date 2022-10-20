import React from 'react';
import { useUserRole } from '../UserRole';

function useUserURLRedirect(props) {
    const [userRoleCodes] = useUserRole();
    const getPath = (roleCode) => {
        switch (roleCode) {
            case userRoleCodes.admin : return '/dashboard/system-administrator'
            case userRoleCodes.director : return '/dashboard/director'
            case userRoleCodes.employee : return '/dashboard/employee'
            case userRoleCodes.worker : return '/dashboard/employee'
        }
        return false;
    };
    return getPath;
}
export default useUserURLRedirect;