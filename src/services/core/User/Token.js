import jwtDecode from 'jwt-decode';

const TOKEN = 'userToken';

export const setItem = (token) => {
    localStorage.setItem(TOKEN, token);
}
export const getItem = () => {
    return localStorage.getItem(TOKEN);
}

export const getDecoded = () => {
    if (getItem()) {
        return jwtDecode(getItem());
    }

    return null;
};

export const isValid = () => {
    return true;
}

export const remove = () => localStorage.removeItem(TOKEN);
