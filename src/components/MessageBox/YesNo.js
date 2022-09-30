import React from 'react';
import { useStyles } from './useStyles';

function YesNo({ show, message, onConfirmYes, onConfirmNo }) {
    const classes = useStyles();

    return (
        <div className={show ? classes.promptPopup : classes.promptPopupClose}>
            <div>알림</div>
            <div>{message}</div>
            <div>
                <button onClick={onConfirmNo}>취소</button>
                <button onClick={onConfirmYes}>확인</button>
            </div>
        </div>
    );

}

export default YesNo;