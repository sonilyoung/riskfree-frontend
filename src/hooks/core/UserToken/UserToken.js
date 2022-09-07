import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const TOKEN = 'userToken';

function useUserToken(props)
{
    const setItem = (token) => 
    {
        localStorage.setItem(TOKEN, token);
    }

    const getItem = () => 
    {
        return localStorage.getItem(TOKEN);
    }
    
    const getDecoded = () => 
    {
        if (getItem()) {
            return jwtDecode(getItem());
        }
    
        return null;
    };

    const isValid = () => 
    {
        const token = getDecoded();
        if (token && token.exp > Math.floor(Date.now() / 1000)) {
            return true;
        }
    
        return false;
    };

    return [{setItem, getItem, getDecoded, isValid}];
}

export default useUserToken;