import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';

import pageFirst from '../../../../../../assets/images/btn_first.png';
import pageLast from '../../../../../../assets/images/btn_last.png';
import pageNext from '../../../../../../assets/images/btn_nxt.png';
import pagePrev from '../../../../../../assets/images/btn_pre.png';
import popupClose2 from '../../../../../../assets/images/btn_popClose2.png';

const useStyles = makeStyles(() => ({
    pageWrap: {

    },
    headerButtons: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px !important',
    },
    stepBox: {
        '& .MuiStepLabel-label': {
            fontSize: '18px'
        },
        '& .MuiStepper-root': {
            marginTop: '40px',
            marginBottom: '20px'
        }
    },
    activeStep: {
        '& .MuiStepLabel-label.Mui-active': {
            color: '#018de7'
        }
    },
    buttonLink: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        height: '68px',
        textDecoration: "none",
        width: '165px',
        marginLeft: '10px !important',
        background: '#3a5298',
        borderRadius: '5px',
        letterSpacing: '-1.08px',
        '&:first-of-type': {
            marginLeft: '0 !important'
        },
        '&.current, &:hover': {
            backgroundImage: 'linear-gradient(#04b9fb, #017dfa)'
        },
        '& span': {
            width: '100%',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '500',
            color: '#fff',
            padding: '0 20px'
        }
    },
    buttonLinkactive: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        height: '68px',
        textDecoration: "none",
        width: '165px',
        marginLeft: '10px !important',
        borderRadius: '5px',
        letterSpacing: '-1.08px',
        backgroundImage: 'linear-gradient(#04b9fb, #017dfa)',
        '& span': {
            width: '100%',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '500',
            color: '#fff',
            padding: '0 20px'
        }
    },    
    buttonPlus: {
        width: '45px',
        height: '45px',
        color: '#fff',
        fontSize: '30px',
        marginLeft: '10px !important',
        background: '#3a5298',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        '&:hover': {
            backgroundImage: 'linear-gradient(#04b9fb, #017dfa)',
        }
    },
    boxTable: {
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        marginBottom: '20px',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    tableHead: {
        width: '100%',
        background: '#bdcbe9',
        '& $tableDataOne': {
            height: '100px',
            borderRight: '1px solid #fff',
            textAlign: 'center',
            justifyContent: 'center',
            '& >div': {
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:first-of-type': {
                    borderBottom: '1px solid #fff'
                },
                '&:last-of-type span': {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:first-of-type': {
                        width: '135px',
                        borderRight: '1px solid #fff'
                    },
                    '&:last-of-type': {
                        width: '175px'
                    }
                }
            },
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '310px',
                padding: '0'
            },
            '&:nth-of-type(2)': {
                width: '240px',
            },
            '&:nth-of-type(3)': {
                width: '144px',
            },
            '&:nth-of-type(4)': {
                width: '322px',
            },
            '&:nth-of-type(5)': {
                width: '322px',
            },
            '&:nth-of-type(6)': {
                width: '322px',
            },
            '&:nth-of-type(7)': {
                width: '135px',
            },
        },
    },
    tableHeadTwo: {
        width: '100%',
        background: '#bdcbe9',
        '& $tableDataTwo': {
            height: '100px',
            borderRight: '1px solid #fff',
            justifyContent: 'center',
            textAlign: 'center',
            '&:first-of-type >div': {
                '&:last-of-type span': {
                    '&:first-of-type': {
                        width: '135px',
                        borderRight: '1px solid #fff'
                    },
                    '&:last-of-type': {
                        width: '175px'
                    }
                }
            },
            '&:last-of-type >div': {
                '&:last-of-type span': {
                    width: '100%',
                    borderRight: '1px solid #fff',
                    '&:last-of-type': {
                        borderRight: 'none'
                    }
                }
            },
            '& >div': {
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:first-of-type': {
                    borderBottom: '1px solid #fff'
                },
                '&:last-of-type span': {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }

            },
            '&:last-of-type': {
                borderRight: 'none',
                padding: '0'
            },
            '&:first-of-type': {
                width: '310px',
                padding: '0'
            },
            '&:nth-of-type(2)': {
                width: '240px',
            },
            '&:nth-of-type(3)': {
                width: '144px',
            },
            '&:nth-of-type(4)': {
                width: '322px',
            },
            '&:nth-of-type(5)': {
                width: '322px',
            },
            '&:nth-of-type(6)': {
                width: '456px',
            },
        }
    },
    tableHeadThree: {
        width: '100%',
        background: '#bdcbe9',
        '& $tableDataThree': {
            height: '100px',
            borderRight: '1px solid #fff',
            textAlign: 'center',
            justifyContent: 'center',
            '& >div': {
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:first-of-type': {
                    borderBottom: '1px solid #fff'
                },
                '&:last-of-type span': {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:first-of-type': {
                        width: '135px',
                        borderRight: '1px solid #fff'
                    },
                    '&:last-of-type': {
                        width: '175px'
                    }
                }
            },
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '310px',
                padding: '0'
            },
            '&:nth-of-type(2)': {
                width: '240px',
            },
            '&:nth-of-type(3)': {
                width: '144px',
            },
            '&:nth-of-type(4)': {
                width: '368px',
            },
            '&:nth-of-type(5)': {
                width: '368px',
            },
            '&:nth-of-type(6)': {
                width: '368px',
            },
        }
    },
    tableBody: {
        width: '100%',
        '& $tableDataOne,$tableDataTwo,$tableDataThree': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '135px'
            },
            '&:nth-of-type(2)': {
                width: '175px'
            },
        },
        '& $tableRow': {
            transition: 'background .2s',
            '&:hover': {
                background: '#eff2f9'
            }
        }
    },
    tableRow: {
        display: 'flex',
        '&:last-of-type': {
            '&  $tableDataOne,$tableDataTwo,$tableDataThree': {
                borderBottom: 'none'
            },
        },
    },
    tableDataOne: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '& >span': {
            color: '#fc4b07'
        },
        '&:nth-of-type(3)': {
            width: '240px',
        },
        '&:nth-of-type(4)': {
            width: '144px',
        },
        '&:nth-of-type(5)': {
            width: '322px',
        },
        '&:nth-of-type(6)': {
            width: '322px',
        },
        '&:nth-of-type(7)': {
            width: '322px',
        },
        '&:nth-of-type(8)': {
            width: '135px',
        },
    },
    tableDataTwo: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '& >span': {
            color: '#fc4b07'
        },
        '&:nth-of-type(3)': {
            width: '240px',
        },
        '&:nth-of-type(4)': {
            width: '144px',
        },
        '&:nth-of-type(5)': {
            width: '322px',
        },
        '&:nth-of-type(6)': {
            width: '322px',
        },
        '&:nth-of-type(7)': {
            width: '152px',
        },
        '&:nth-of-type(8)': {
            width: '152px',
        },
        '&:nth-of-type(9)': {
            width: '152px',
        },
    },
    tableDataThree: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '& >span': {
            color: '#fc4b07'
        },
        '&:nth-of-type(3)': {
            width: '240px',
        },
        '&:nth-of-type(4)': {
            width: '144px',
        },
        '&:nth-of-type(5)': {
            width: '368px',
        },
        '&:nth-of-type(6)': {
            width: '368px',
        },
        '&:nth-of-type(7)': {
            width: '368px',
        },
    },
    footerButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px !important',
        '& button': {
            marginLeft: '10px'
        }
    },
    textAreaWrap: {
        width: '100%'
    },
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            fontSize: '16px'
        }
    },
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        boxShadow: '0px 0px 10px 10000px rgba(0,0,0,0.4)',
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
    uploadPlusPopup: {
        position: 'absolute',
        zIndex: '1',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        // height: '250px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 10px 10000px rgba(0,0,0,0.4)',
        '& > h3': {
            margin: '0 0 10px',
        },
        '& >button': {
            position: 'absolute',
            top: '0px',
            right: '-65px'
        }
    },
    uploadPopupHide: {
        display: 'none !important',
    },
    uploadInfo: {
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
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& button:first-of-type': {
            marginLeft: '10px'
        }
    },
    linkBtn: {
        textDecoration: "none",
        color: "#adb0b2",
    },
    activeLinkBtn: {
        textDecoration: "none",
        color: '#018de7'
    },
    pagingBox: {
        position: 'relative',
        top: '20px',
        height: '40px',
        '& .MuiPagination-root': {
            display: 'flex',
            justifyContent: 'center'
        },
        '& >div:first-of-type': {
            position: 'absolute',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            top: '0',
            left: '0',
            '& strong': {
                color: '#018de7'
            }
        },
        '& >div:last-of-type': {
            position: 'absolute',
            top: '0',
            right: '0'
        },
        '& .MuiPagination-ul button': {
            width: '40px',
            height: '40px',
            margin: '0',
            borderRadius: '0',
            fontSize: '14px',
            color: '#666',
            '&:hover': {
                background: 'transparent'
            },
            '&.Mui-selected': {
                background: '#6e7884',
                color: '#fff',
                cursor: 'default',
            },
            '&[aria-label$=page]': {
                '& svg': {
                    display: 'none'
                }
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=first]': {
                background: 'url(' + pageFirst + ')',
                marginRight: '-1px'
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=last]': {
                background: 'url(' + pageLast + ')',
                marginLeft: '-1px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=next]': {
                background: 'url(' + pageNext + ')',
                marginLeft: '8px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=previous]': {
                background: 'url(' + pagePrev + ')',
                marginRight: '8px'
            }
        }
    },
    pageBody: {
        position: 'relative',
        display: 'flex',
        backgroundImage: 'linear-gradient(#424762, #33374f)',
        borderRadius: '32px 32px 0 0',
        width: '1720px'
    },
    popupTextField: {
        marginBottom: '10px !important',
        overflow: 'hidden',
        height: '40px',
        borderRadius: ' 46px',
        // '& .Mui-focused': {
        //     border: '2px solid #00adef',
        // },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            background: '#eff2f9',
        }
    }
}));

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background:url(${popupClose2}) no-repeat 50% 50%;
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

const BlueButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    background: #018de7;
    color: #fff;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #0355b0;
    }
`;

const WhiteButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    border: 2px solid #018de7;
    background: #fff;
    color: inherit;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

export { useStyles, ClosePopupButton2, UnknownButton1, BlueButton, WhiteButton };