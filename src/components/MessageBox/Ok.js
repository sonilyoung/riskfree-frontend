import React from 'react';
import { useStyles } from './useStyles';
import checkIconOn from '../../assets/images/ic_chk2_on.png';

const actionSuccessful = '0201';

function Ok({ show, message, onConfirm }) {
    const classes = useStyles();

    return (
        <div className={show ? classes.noticePopup : classes.noticePopupClose}>
            <div>{message.RET_CODE === actionSuccessful ? <img src={checkIconOn} alt="check icon on" /> : "알림"}</div>
            <div>{message.RET_DESC}.</div>
            <div>
                <button onClick={onConfirm}>확인</button>
            </div>
        </div>
    );

}

export default Ok;