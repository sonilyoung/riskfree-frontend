import React from 'react';
import jwtDecode from 'jwt-decode';

const TOKEN = 'userToken';

function useUserToken(props) {

    const setItem = (token) => {
        localStorage.setItem(TOKEN, token);
    }

    const getItem = () => {
        return localStorage.getItem(TOKEN);
    }

    const getDecoded = () => {
        if (getItem()) {
            return jwtDecode(getItem());
        }

        return null;
    };

    const isValid = () => {
        const token = getDecoded();
        if (token && token.exp > Math.floor(Date.now() / 1000)) {
            return true;
        }

        return false;
    };

    const getDecodedTokenPayload = () => {
        const decodedToken = getDecoded();
        const decodedTokenPayload = decodedToken?.sub?.split('|');

        return decodedTokenPayload;
    };

    const getUserRoleCd = () => {
        const decodedTokenPayload = getDecodedTokenPayload();
        return decodedTokenPayload[7];
    };

    const getUserLoginId = () => {
        const decodedTokenPayload = getDecodedTokenPayload();
        return decodedTokenPayload[1];
    };

    const getUserCompanyId = () => {
        const decodedTokenPayload = getDecodedTokenPayload();
        return decodedTokenPayload[9];
    }



    return [{ setItem, getItem, getDecoded, isValid, getUserRoleCd, getUserLoginId, getUserCompanyId }];
}

export default useUserToken;