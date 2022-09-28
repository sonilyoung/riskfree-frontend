import React from 'react';
import { useStyles } from './useStyles';
import checkIconOn from '../../assets/images/ic_chk2_on.png';

function YesNo({ show, message, onConfirmYes, onConfirmNo }) {
    const classes = useStyles();

    return (
        <div className={show ? classes.promptPopup : classes.promptPopupClose}>
            <div>알림</div>
            <div>삭제 하시겠습니까?</div>
            <div>
                <button onClick={onConfirmYes}>취소</button>
                <button onClick={onConfirmNo}>확인</button>
            </div>
        </div>
    );

}

export default YesNo;