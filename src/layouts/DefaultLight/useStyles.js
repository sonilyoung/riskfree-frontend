import { makeStyles } from '@mui/styles';
import '../../assets/fonts/Pretendard-Regular.otf';
import proba from '../../assets/fonts/Pretendard-Regular.otf';
const useStyles = makeStyles(() => ({
    bodyWrap: {
        backgroundColor: '#fff',
        minWidth: '1900px !important',
        height: '100%',
        fontFamily: proba,
    },
    headerWrap: {
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    sectionWrap: {
        minHeight: 'calc(100vh - 94px)',
        margin: '0 auto',
        // marginLeft: '20px',
        // marginRight: '20px',
        boxSizing: 'border-box',
        padding: '37px 40px 40px',
        backgroundColor: '#eff2f9',
        borderRadius: '24px 24px 0 0',
        width: '1875px',
    },
    pageHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    mainHeader: {
        display: 'flex',
        zIndex: 1,
        height: '95px',
    },
    mainLogo: {
        '& img': {
            transform: 'translate(20px, 10px)',
            width: "30%"
        }
    },
    mainMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0px 14px'
    },
    selectMenu: {
        height: '40px'
    },
    leftMenu: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    rightMenu: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#fff'
    },
    userInformation: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#333',
        marginRight: '20px',
        marginLeft: '10px',
        '& >div': {
            fontSize: '17px',
            '& span': {
                color: '#00adef',
                letterSpacing: '-1.08px'
            }
        },
    },
    mainAsside: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#d5d5d8',
        letterSpacing: '-1.08px',
        '& >button': {
            '&:first-of-type': {
                marginRight: '20px',
            },
            '&:last-of-type': {
                marginRight: '20px',
            }
        }
    },
    weatherSection: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
        '& span': {
            display: 'flex',
            marginLeft: '10px'
        },
        '& :nth-child(2)': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '5px',
            fontSize: '28px',
            color: '#fba325',
            fontWeight: '400'
        },
        '& :last-of-type': {
            letterSpacing: '-1.08px'
        }
    },
    circleButton: {
        height: '60px',
        width: '60px',
        borderRadius: '50%'
    },
    mainMenuButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        marginTop: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background .3s'
    },
    dropMenu: {
        '& .MuiOutlinedInput-root': {
            border: '1px solid #777b91',
            background: '#26283d',
            color: '#ddd',
            fontSize: '17px',
            '& svg': {
                color: '#ddd',
                display: 'none'
            },
        },
        '& .Mui-disabled': {
            color: '#ddd !important',
            '-webkit-text-fill-color': 'unset !important',
        }
    },
    headerPopup: {
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '397px',
        height: '280px',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
        '&.user_popup': {
            top: '70px',
            left: '5px',
            height: '435px'
        },
        '&.user_popupClose': {
            display: "none"
        },
        '&.settings_popup': {
            top: '80px',
            left: '-195px'
        },
        '&.settings_popupClose': {
            display: "none"
        
        },
        '&.fileupload_popup': {
            backgroundColor: '#ffffff',
            width: '1224px',
            height: '550px',
            top: '80px',
            left: '-1124px'
        },
        '&.fileupload_popupClose': {
            display: "none"
        
        },
        '&.admincenter_popup': {
            width: '1024px',
            height: '870px',
            top: '30px',
            left: '-1024px'
        },
        '&.admincenter_popupClose': {
            display: "none"
        },
        '& $popupAccord': {
            background: 'transparent',
            boxShadow: 'none',
            '& .MuiButtonBase-root': {
                padding: '0',
            },
            '& .MuiAccordionDetails-root': {
                padding: '0',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                '& >span': {
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#018de7'
                },
                '& $popupTextField': {
                    marginBottom: '0 !important'
                }
            },
            '& p': {
                fontSize: '16px'
            },
            '& +span': {
                margin: '0',
                padding: '0'
            }
        },
        '& $popupLink': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#333',
            width: '100%',
            padding: '16px 0',
            boxSizing: 'border-box',
            borderBottom: '1px solid #c1c6d0',
        },
        '& .MuiAlert-message': {
            fontSize: '14px',
            letterSpacing: '-1.6px',
            overflow: 'visible'
        }
    },
    headerPopList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        '& >span': {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            borderTop: '1px solid #c1c6d0',
            marginTop: '9px',
            paddingTop: '19px',
            '& >span': {
                position: 'absolute',
                top: '-15px',
                background: '#eeeff7',
                padding: '0 10px',
                fontWeight: '700'
            }
        }
    },
    headerPopFooter: {
        position: 'absolute',
        bottom: '0px',
        height: '52px',
        width: '100%'
    },
    settingPopup: {

    },
    popupTextField: {
        marginBottom: '10px !important',
        overflow: 'hidden',
        height: '40px',
        borderRadius: ' 46px',
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
    },
    userTab: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '30px',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    userImage: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '4px solid #fff',
        overflow: 'hidden',
        background: '#C3C4C9',
        marginBottom: '20px',
        boxShadow: '1px 2px 8px -2px rgb(0 0 0 / 40%)',
        '& img': {
            width: '100%',
            height: '100%'
        }
    },
    userName: {
        width: '100%',
        marginBottom: '10px',
        fontWeight: '700'
    },
    userInfo: {
        width: '100%'
    },
    uploadPopup: {
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        color: 'black',
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
    buttonCenter: {
        width: '100%',
        justifyContent: 'center',
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
    popHeader: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '54px',
        paddingLeft: '20px',
        backgroundImage: 'linear-gradient(#0943c3, #0481d8)',
        color: '#fff',
        fontSize: '20px',
        '& button': {
            position: 'absolute',
            right: '0px',
            marginRight: '20px'
        }
    },
    popList: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    PopListItem: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '46px',
        background: '#1e2132',
        color: '#fff',
        fontSize: '17px',
        letterSpacing: '-1.08px',
        paddingLeft: '24px',
        borderBottom: '1px solid #4d5867',
        cursor: 'pointer',
        '&:last-of-type': {
            borderBottom: 'none'
        },
        '&.active': {
            background: '#2e3b65',
            color: '#5fdefe'
        }
    },
    preFootPop: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '& >div': {
            '&:first-of-type': {
                width: '194px',
                marginRight: '10px',
                border: '1px solid #bbbdc0',
                borderRadius: '5px',
                background: '#fff',
                boxSizing: 'border-box',
                padding: '10px'
            },
            '&:last-of-type': {
                width: '145px',
                '& button': {
                    marginBottom: '10px'
                },
            }
        }
    },
    popupAccord: {
        width: '350px',
        '& .MuiAccordionDetails-root': {

        },
    },
    popupLink: {
        '& >img': {
            transform: 'rotate(-90deg)'
        }
    },
    popupPrompt: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        border: '1px solid #bbbdc0',
        background: '#fff',
        borderRadius: '5px',
        marginTop: '20px',
        marginBottom: '25px',
        width: '100%',
        height: '130px',
        '& >div': {
            width: '75%',
            textAlign: 'center',
            marginBottom: '10px'
        },
        '& button': {
            marginLeft: '10px'
        }
    },
    listLink: {
        display: 'flex',
        alignItems: 'center',
        color: '#333333',
        textDecoration: "none"
    },
    listLinkClicked: {
        display: 'flex',
        alignItems: 'center',
        color: '#333333',
        textDecoration: "none",
        backgroundColor: "#d5ddf0"
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
    pageOverlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vw',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: '1',
        display: 'none',
    },
    pageContent: {
        display: 'flex',
        height: '430px',
        padding: '5px',
        
        background: '#ffffff',
        '& >.MuiGrid-root': {
            height: '100%'
        }
    },
    listTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        lineHeight: '50px',
        fontSize: '17px',
        fontWeight: '500',
        color: '#ffffff',
        background: '#9cb1de',
        '& strong': {
            color: '#00adef'
        }

    },
    menuList: {
        fontSize: '15px',
        width: '100%',
        overflow: 'hidden auto',
        padding: '0',
        margin: '0',
        listStyle: 'none',
        color: '#333333',
        letterSpacing: '-1.08px',
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
            wordBreak: 'keep-all',
            lineHeight: '38px',
            '& p, & a': {
                width: 'calc(100% - 10px)',
                paddingLeft: '10px',
                margin: '0'
            },
        },
        '& .nestedList li': {
            padding: '0'
        },
        '&.secondList': {
            padding: '0px',
            boxSizing: 'border-box',
            height: '88%',
            paddingBottom: '0px',
            '& li': {
                marginRight: '10px',
                //borderBottom: '1px solid #363c4c',
                '& a': {
                    //padding: '22px',
                    lineHeight: '38px',
                    width: '100%'
                },
                '&.activeLink': {
                    background: '#2e3b65'
                }
            },
        },
        '& .bulletList': {
            position: 'relative',
            paddingLeft: '10px',
            display: 'flex',
            alignItems: 'center',
            '&:before': {
                content: '""',
                position: 'absolute',
                left: '0',
                width: '4px',
                height: '4px',
                background: '#d4d4d6'
            }
        },
        '&.buttonList': {
            '& li': {
                paddingLeft: '20px',
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                height: '38px',
                '& span': {
                    fontSize: '16px',
                    marginLeft: '25px',
                    cursor: "pointer",
                    '&.green': {
                        color: '#22e004'
                    },
                    '&.orange': {
                        color: '#fe9c05'
                    },
                    '&.red': {
                        color: '#fc4b07'
                    },
                    '&.empty': {
                        width: "40px",
                        height: "20px"
                    },
                },
                '& >div': {
                    display: "flex",
                    alignItems: "center"
                }
            }
        },
        '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            border: '6px solid #dee0eb'
        },
        '&::-webkit-scrollbar-track': {
            background: '#d4d4d6',
            borderRadius: '0px',
            boxShadow: 'inset 0 0 4px rgb(0 0 0 / 30%)'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '50px',
            width: '6px',
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: 'inset 0px 10px 0px 0px #c0c0c0, inset 0px -10px 0px 0px #c0c0c0'
        },
    },
    contentList: {
        background: '#ffffff',
        height: '400px',
        border: '1px solid #1e2132',
        color: '#333333',
        overflow: 'hidden',
        '&.moreContent': {
            display: 'flex',
            border: '0px',
            width: '100%',          
            border: '1px solid #1e2132',  
            '& $listTitle': {
                justifyContent: 'flex-start',
            },
            '& :last-of-type $listTitle': {
                borderRight: 'none'
            }
        },
    },
    listdoteLine: {
        borderBottom : '1px dotted #17191c'
    }
}));

export { useStyles };