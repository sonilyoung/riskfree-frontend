import React from 'react';
import { useUserToken } from '../UserToken';

function useUserStatus(props) {
    let isLoggedIn = false;
    const [userToken] = useUserToken();

    if (userToken.isValid()) {

        isLoggedIn = true;
    }

    return isLoggedIn;
}

export default useUserStatus;