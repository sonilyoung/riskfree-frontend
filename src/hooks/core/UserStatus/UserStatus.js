import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUserToken } from '../UserToken';
import { selectUser, setUser } from '../../../slices/User';

function useUserStatus(props)
{
    let isLoggedIn = false;
    const user = useSelector(selectUser);
    const [userToken] = useUserToken();

    if (userToken.isValid()) {
        const decodedToken = userToken.getDecoded();
        const decodedTokenPayload = decodedToken.sub.split('|');
        console.log(decodedTokenPayload);
        
        isLoggedIn = true;
    }

    return isLoggedIn;
}

export default useUserStatus;