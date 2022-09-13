import React from 'react';

const DEFAULT_BASELINE_ID = 'defaultBaselineId';

function useLocalStorage(props) {

    const setItem = (key, value) => {
        localStorage.setItem(key, value);
    }

    const getItem = (key) => {
        return localStorage.getItem(key);
    }

    const setDefaultBaselineId = (defaultBaselineId) => {
        setItem(DEFAULT_BASELINE_ID, defaultBaselineId);
    }

    const getDefaultBaselineId = () => {
        return getItem(DEFAULT_BASELINE_ID);
    }

    return { setItem, getItem, setDefaultBaselineId, getDefaultBaselineId };
}

export default useLocalStorage;