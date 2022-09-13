import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBaselineId, setBaselineId } from '../../slices/selections/MainSelection';
import { useLocalStorage } from '../../hooks/misc/LocalStorage';

const Wide = ({ children }) => {
    const dispatch = useDispatch();
    const localStorage = useLocalStorage();
    const currentBaseline = useSelector(selectBaselineId);

    useEffect(() => {
        if (currentBaseline === null) {
            dispatch(setBaselineId(localStorage.getDefaultBaselineId()));
        }
    }, [])

    return (
        <div>
            { children }
        </div>
    );
};

export default Wide;