import React from 'react';
import { useStyles } from './useStyles';
import checkIconOn from '../../assets/images/ic_chk2_on.png';

const TYPE_SUCCESS = 'success';

function Okay({ show, type, message, onConfirm }) {
    const classes = useStyles();

    return (
        <div className={show ? classes.noticePopup : classes.noticePopupClose}>
            <div>
                { type === TYPE_SUCCESS ? <img src={checkIconOn} alt="check icon on" /> : "알림" }
            </div>
            <div>{ message }</div>
            <div>
                <button onClick={ onConfirm }>확인</button>
            </div>
        </div>
    );

}

export default Okay;