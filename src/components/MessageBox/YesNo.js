import React from 'react';
import { useStyles } from './useStyles';
import checkIconOn from '../../assets/images/ic_chk2_on.png';

function YesNo({ show, message, onConfirmYes,  onConfirmNo }) {
    const classes = useStyles();

    return (
        // <div>
        //     { message }
        // </div>
        <div className={classes.promptPopup}>
            <div>알림</div>
            {/* <div><img src={checkIconOn} alt="check icon on" /></div> */}
            <div>삭제 하시겠습니까?</div>
            <div>
                <button>취소</button>
                <button>확인</button>
            </div>
        </div>
    );

}

export default YesNo;