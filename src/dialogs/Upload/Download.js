import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import alertIcon from '../../assets/images/ic_refer.png';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import searchIcon from '../../assets/images/ic_search.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';
import { Overlay } from '../../components/Overlay';

const useStyles = makeStyles(() => ({
    downloadPopup: {
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '250px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        // display: 'none !important',
        '& >span': {
            width: '20%',
            height: '20px',
            borderBottom: '1px solid #bdcbe9',
            transform: 'translateY(-5px)',
            '&:nth-of-type(2)': {
                width: '60%',
                border: 'none',
                padding: '0 10px',
                boxSizing: 'border-box',
                textAlign: 'center',
                transform: 'unset',
            }
        },
        '& >button': {
            position: 'absolute',
            top: '0px',
            right: '-65px'
        }
    },
    popupClose: {
        display: 'none !important',
    },
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& label:first-of-type': {
            marginLeft: '10px',
        }
    },
    downloadInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50%',
        '& >*': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '& img': {
            width: '30px',
            height: '30px',
        }
    },
    popupTextField: {
        width: '100%',
        marginBottom: '10px !important',
        height: '45px',
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            padding: '10px',
            '&::-webkit-file-upload-button': {
                top: '0px',
                left: '270px',
                position: 'absolute',
                width: '45px',
                height: '45px',
                color: '#fff',
                fontSize: '20px',
                letterSpacing: '-1.08px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background .2s',
                fontSize: '0px',
                color: 'transparent',
                userSelect: 'none',
                background: '#00adef url(' + searchIcon + ') no-repeat 50% 50%',
                '&:hover': {
                    background: '#3a5298 url(' + searchIcon + ') no-repeat 50% 50%',
                }
            },
        },
        '& fieldset': {
            marginRight: '70px',
        }
    },
    popupOverlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: '1',
        display: 'block',
    },
    popupOverlayClose: {
        display: 'none'
    },
    middleSpan: {
        margin: '30px 0'
    },
    topSpan: {
        fontSize: '28px'
    }
}))

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
`;

const UnknownButton2 = styled(ButtonUnstyled)`
    width: 200px;
    height: 46px;
    color: #000;
    font-size: 17px;
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

function Download({ open, onClose, enableDownload, onDownload }) {
    const classes = useStyles();

    return (
        <Overlay show={open}>
            <div className={open ? classes.downloadPopup : classes.popupClose}>
                <div className={classes.downloadPopup}>
                    <ClosePopupButton2 onClick={() => onClose('openDialog')}></ClosePopupButton2>
                    <div className={classes.downloadInfo}>
                        <span className={classes.topSpan}>신청서 다운로드</span>
                        <span className={classes.middleSpan}>등록된 파일을 다운로드 합니다.</span>
                        <UnknownButton2 onClick={() => {
                            if (enableDownload) {
                                onDownload()
                            }
                        }}>다운로드</UnknownButton2>
                    </div>
                </div>
            </div>
        </Overlay >
    );


}

export default Download;