import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import alertIcon from '../../assets/images/ic_refer.png';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import searchIcon from '../../assets/images/ic_search.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';
import { useStyles } from './useStyles';



const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
`;

const UnknownButton1 = styled(ButtonUnstyled)`
    width: 150px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 46px;
    background: #00adef;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298;
    }   
`;

const UnknownButton2 = styled(ButtonUnstyled)`
    width: 200px;
    height: 46px;
    color: #000;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 46px;
    background: #eff2f9;
    border: 2px solid #00adef;
    cursor: pointer;
    transition: border-color .2s;
    &:hover {
        border-color: #3a5298;
    }  
`;

const SearchButton = styled(ButtonUnstyled)`
    width: 46px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 50%;
    background: #00adef url(${searchIcon}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298 url(${searchIcon}) no-repeat 50% 50%;
    }   
`;

function Dialog({ handleClose, open }) {
    const classes = useStyles();

    return (
        <div className={open ? classes.uploadPopup : classes.uploadPopupClose}>
            <ClosePopupButton2 onClick={handleClose}></ClosePopupButton2>
            <div className={classes.uploadInfo}>
                <img src={alertIcon} alt="alert icon" />
                <span>재해예방과 쾌적한 작업환경을 조성함으로써 근로자 및 이해관계자의 안전과 보건을 유지.</span>
                <UnknownButton2>전체사업장</UnknownButton2>
            </div>
            <span></span>
            <span>의무조치별 상세 점검</span>
            <span></span>
            <div className={classes.uploadSearch}>
                <TextField
                    id="standard-basic"
                    placeholder="여수공장 시정조치요청 파일.hwp"
                    variant="outlined"
                    sx={{ width: 250 }}
                    className={classes.popupTextField}
                    type="file"
                />
                <SearchButton></SearchButton>
                <UnknownButton1>전체사업장</UnknownButton1>
            </div>
        </div>
    );


}

export default Dialog;