import { makeStyles } from '@mui/styles';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import { styled } from '@mui/system';
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
            width: '100%',
        },
    },
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
            height: '100px',
            '& $rowContent': {
                borderTop: 'none'
            },
            '& $rowTitle': {
                borderTop: 'none'
            }
        },
        '& $boxRow:nth-of-type(2) $rowContent': {
            '& $rowInfo:first-of-type': {
                marginRight: '334px'
            },
            
            '& $rowInfo:last-of-type': {
                marginRight: '0px'
            },

            '& $rowInfo:nth-of-type(3)': {
                marginRight: '66px'
            },
            '& $rowTitle': {
                borderTop: 'none'
            }
        }
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        minHeight: '60px',
        '& $rowTitle': {
            borderBottom: 'none'
        }
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
//        alignItems: 'center',
        textAlign: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9',
        borderTop: '1px solid #fff',
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        },
        '& text': {
            position: 'absolute',
            marginTop: '5px',
            marginLeft: '8px',
            textAlign: 'left',
            color: '#fc4b07',
            zoom: '1.1'
        }
    },
    rowContent: {
        height: '100%',
        width: 'calc(100% - 100px)',
        borderTop: '1px solid #d5dae2',
        display: 'flex',
        '& >div[class=*row]': {
            height: '100%'
        }
    },
    rowInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        boxSizing: 'border-box'
    },
    boxRegistration: {
        '& $boxRow': {
            '&:nth-of-type(2)': {
                height: '60px'
            },
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '160px',
        },
        '& $boxRow:first-of-type $rowInfo': {
            width: '340px'
        },
        '& $boxRow:first-of-type $rowContent $rowInfo:nth-of-type(5)': {
            width: '260px'
        },
        '& $boxRow:first-of-type $rowContent $rowInfo:nth-of-type(3)': {
            width: '520px'
        },
        '& $boxRow:nth-of-type(3) $rowContent $rowInfo:first-of-type': {
            width: '100%'
        },
        '& $boxRow:nth-of-type(3) $rowContent $rowInfo:last-of-type': {
            paddingLeft: '0px'
        },
        '& $boxRow:nth-of-type(4) $rowContent $rowInfo': {
            width: '100%'
        },
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
            height: '150px !important',
            fontSize: '16px',
        }
    },
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
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
    },
    selectMenuDate: {
        height: '40px',
        '& div': {
            height: 'inherit',
            background: '#fff',
        },
        '& input': {
            paddingLeft: '10px',
        },
        '& legend': {
            width: '0'
        },
        '& button': {
            paddingLeft: '0',
        }
    },
    activeReportBtn: {
        backgroundColor: "#989898 !important",
        '&:hover': {
            backgroundColor: "#7b7b7b !important",
        }
    }
}));

const AccidentReportButton = styled(ButtonUnstyled)`
    width: 90px;
    height: 80px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #6e7884;
    background: #e8ebf4;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #d2dcf3;
    }
`;

const UploadButton = styled(ButtonUnstyled)`
    width: 140px;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #6e7884;
    background: #e8ebf4;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #d2dcf3;
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

export { useStyles, AccidentReportButton, UploadButton, BlueButton, WhiteButton };