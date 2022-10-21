import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

const useStyles = makeStyles(() => ({
    pageWrap: {
        '& >div:not($listTitle, $footerButtons)': {
            display: 'flex',
            borderRadius: '6px',
            background: '#fff',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgb(189 203 203 / 50%)'
        }
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
    },
    /* === Data: 2022.10.03 author:Jimmy edit === */
    boxReception: {
        display: 'flex',
        marginBottom: '16px !important',
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '160px',
        },
        '& $boxRow:first-of-type $rowInfo': {
            width: '306px'
        },
        '& $boxRow:first-of-type $rowInfo:last-of-type': {
            width: 'auto'
        },
        '& $boxRow:last-of-type $rowInfo': {
            width: '170px',
            '&:first-of-type': {
                width: '702px',
                height: '60px'
            }
        },
        '& $boxContent $boxRow:first-of-type': {
            height: '60px'
        },
        '& $boxContent $boxRow:nth-of-type(2) $rowTitle': {
            borderTop: 'none'
        },
        '& $boxContent $boxRow:nth-of-type(2) $rowTitle:first-of-type': {
            borderTop: '1px solid #fff'
        }
    },
    /* ========================================= */
    boxTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100px',
        background: '#8098c9',
        borderRight: '1px solid #fff',
        color: '#fff',
        fontSize: '17px',
        fontWeight: '500',
        '& span': {
            width: '100%',
            textAlign: 'center'
        }
    },
    boxContent: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'calc(100% - 100px)',
        '& $boxRow:first-of-type': {
            '& $rowContent': {
                borderTop: 'none'
            },
            '& $rowTitle:first-of-type': {
                borderTop: 'none'
            }
        },
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        '& $rowTitle': {
            borderBottom: 'none'
        }
    },
    promptPopup: {
        position: 'absolute',
        top: '70%',
        left: '70%',
        width: '300px',
        height: '200px',
        borderRadius: '18px',
        border: '2px solid #018de7',
        background: 'white',
        color: '#333',
        overflow: 'hidden',
        zIndex: '6',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            '&:first-of-type': {
                fontSize: '20px',
                fontWeight: 'bold',
                paddingTop: '10px',
            },
            '&:last-of-type': {
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                '& button': {
                    width: '50%',
                    height: '100%',
                    border: 'none',
                    background: '#eeeff7',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: '.2s',
                    '&:last-of-type': {
                        borderLeft: '1px solid #fff',
                        background: '#018de7',
                        color: '#fff',
                        '&:hover': {
                            background: '#0355b0',
                            color: '#fff'
                        }
                    },
                    '&:hover': {
                        background: '#bdcbe9',
                        color: '#333',
                    }
                }
            },
        }
    },
    promptPopupClose: {
        display: 'none',
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9',
        borderTop: '1px solid #fff',
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }
    },
    rowContent: {
        height: '100%',
        width: 'calc(100% - 100px)',
        borderTop: '1px solid #d5dae2',
        display: 'flex',
        '& >div[class=*row]': {
            height: '100%'
        },
    },
    rowInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        boxSizing: 'border-box',
    },
    /* === Data: 2022.10.03 author:Jimmy edit === */
    boxRegistration: {
        height: '100%',
        '& $boxRow:first-of-type $rowTitle': {
            width: '128px'
        },
        '& $boxRow:first-of-type $rowContent:last-of-type': {
            width: '321px',
        },

        '& $boxRow $rowContent $rowInfo': {
            width: '100%',
            height: '60px'
        },
        /* ========================================= */

        '& $boxRow:last-of-type $rowContent': {
            display: 'flex',
            '& >div': {
                width: '50%',
                borderLeft: '1px solid #d5dae2',
                '& >div': {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    borderBottom: '1px solid #d5dae2',
                    minHeight: '40px',
                    maxHeight: '640px',
                    height: '100%',
                    padding: '10px',
                    '&:first-of-type': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#eff2f6',
                        fontWeight: '500',
                        height: '50px',
                        padding: '0'
                    },
                    '& .Mui-disabled input': {
                        '-webkit-text-fill-color': '#333'
                    }
                }
            }
        }
    },
    searchRadio: {
        '& [role=radiogroup]': {
            flexWrap: 'nowrap',
        },
        '& [class*=body1]': {
            fontSize: '16px'
        },
        '& input': {
            cursor: 'default'
        },
        '& label': {
            marginRight: '10px'
        }
    },
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            height: '49px !important',
            fontSize: '16px'
        }
    },
    selectMenu: {
        height: '39px',
        overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
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
    imgPreview: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            padding: '20px 20px 10px 20px',
        }
    }

}));

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

export { useStyles, BlueButton, WhiteButton };