import React from 'react';
import { useStyles } from './useStyles';
import checkIconOn from '../../assets/images/ic_chk2_on.png';

function Ok({ show, message, onConfirm }) {
    const classes = useStyles();

    return (
        // <div>
        //     { message }
        // </div>
        <div className={classes.noticePopup}>
            <div>알림​</div>
            {/* <div><img src={checkIconOn} alt="check icon on" /></div> */}
            <div>등록 되었습니다.</div>
            <div>
                <button>확인</button>
            </div>
        </div>
    );

}

export default Ok;