import React from 'react';
import { useStyles } from './useStyles';

function Okay({ show, title, message, onConfirm }) {
    const classes = useStyles();

    return (
        <div className={show ? classes.noticePopup : classes.noticePopupClose}>
            <div>
                {title}
            </div>
            <div>{message}</div>
            <div>
                <button id="Okay_Btn" onClick={onConfirm}>확인</button>
            </div>
        </div>
    );

}

export default Okay;