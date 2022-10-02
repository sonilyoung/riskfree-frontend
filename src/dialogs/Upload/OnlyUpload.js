import React, { useState, useRef } from "react";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import alertIcon from '../../assets/images/ic_refer.png';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import searchIcon from '../../assets/images/ic_search.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';
import { Overlay } from '../../components/Overlay';

const useStyles = makeStyles(() => ({
    onlyUploadPopup: {
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '300px',
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
    onlyUploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& label:first-of-type': {
            marginLeft: '10px',
        },
        '& $popupTextField:not($zeroOpacity):last-of-type': {
            top: '-55px',
            left: '-35px',
            height: '40px',
            width: '250px',
            background: '#fff',
            '& >div': {
                background: 'transparent',
            },
            '& input': {

            },
            '& fieldset': {
                margin: '0 !important',
            }
        },
        '& $zeroOpacity': {
            overflow: 'hidden'
        },
        '& button': {
            position: 'relative',
            top: '-55px',
        },
    },
    onlyUploadInfo: {
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
    },
    zeroOpacity: {
        opacity: 1,
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
    margin-top: 10px;
    transition: background .2s;
    &:hover {
        background: #3a5298;
    }   
`;

function OnlyUpload({ open, onClose, onInputChange, onUpload, label, selectedFileName }) {
    const classes = useStyles();
    const inputRef = useRef(null);

    const handleChooseFile = () => {
        inputRef.current.click();
    }

    return (
        <Overlay show={open}>
            <div className={open ? classes.onlyUploadPopup : classes.popupClose}>
                <div className={classes.onlyUploadPopup}>
                    <ClosePopupButton2 onClick={() => onClose('openDialog')}></ClosePopupButton2>
                    <div className={classes.onlyUploadInfo}>
                        <span className={classes.topSpan}>{label.upperLabel}</span>
                        <span className={classes.middleSpan}>{label.middleLabel}</span>
                        <span></span>
                        <div className={classes.onlyUploadSearch}>
                            <TextField
                                id="standard-basic"
                                variant="outlined"
                                className={[classes.popupTextField, classes.zeroOpacity]}
                                type="file"
                                onChange={onInputChange}
                            />
                            <TextField
                                id="upload-field-real"
                                variant="outlined"
                                className={classes.popupTextField}
                                onChange={onInputChange}
                                onClick={handleChooseFile}
                                value={selectedFileName}
                                readOnly={true}
                            />
                            <UnknownButton1 onClick={() => onUpload('openDialog')}>파일 업로드</UnknownButton1>
                        </div>
                    </div>
                </div>
            </div>
        </Overlay >
    );


}

export default OnlyUpload;