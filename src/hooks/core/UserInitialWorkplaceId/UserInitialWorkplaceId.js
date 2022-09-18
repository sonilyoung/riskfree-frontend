import React from 'react'
import { useSelector } from 'react-redux';
import { selectWorkplaceId } from '../../../slices/selections/MainSelection';
import { useUserRole } from '../UserRole';
import { useUserToken } from '../UserToken';

const useUserInitialWorkplaceId = () => {
    const [userToken] = useUserToken();
    const [userRoleCodes] = useUserRole();
    const userRoleCd = userToken.getUserRoleCd();
    const userWorkplaceId = userToken.getUserWorkplaceId();
    const currentWorkplaceId = useSelector(selectWorkplaceId);

    const getInitialWorkplaceId = () => {
        switch (userRoleCd) {
            case userRoleCodes.employee:
                return userWorkplaceId;

            case userRoleCodes.director:
                return currentWorkplaceId;
        }

        return "";
    }

    return getInitialWorkplaceId;
}

export default useUserInitialWorkplaceId;