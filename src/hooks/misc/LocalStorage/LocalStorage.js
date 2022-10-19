const DEFAULT_BASELINE_ID = 'defaultBaselineId';
const DEFAULT_ISCLOSE = 'defaultIsClose';

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

    const setDefaultIsClose = (defaultIsClose) => {
        setItem(DEFAULT_ISCLOSE, defaultIsClose);
    }

    const getDefaultBaselineId = () => {
        return getItem(DEFAULT_BASELINE_ID);
    }

    const getDefaultIsClose = () => {
        return getItem(DEFAULT_ISCLOSE);
    }


    return { setItem, getItem, setDefaultBaselineId, getDefaultBaselineId, setDefaultIsClose, getDefaultIsClose };
}

export default useLocalStorage;