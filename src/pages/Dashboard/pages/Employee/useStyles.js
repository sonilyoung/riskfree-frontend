import { makeStyles } from '@mui/styles';
import dashboardPattern from '../../../../assets/images/dashboard_pattern.png';
import workplaceBackground from '../../../../assets/images/bg_workplace.png';
import orderBackground from '../../../../assets/images/bg_body_order.png';
import checkIcon from '../../../../assets/images/ic_chk.png';
import checkIconHover from '../../../../assets/images/ic_chk_hover.png';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import userIcon from '../../../../assets/images/btn_user.png';
import userIconHover from '../../../../assets/images/btn_user_ov.png';
import logIcon from '../../../../assets/images/btn_log.png';
import logIconHover from '../../../../assets/images/btn_log_ov.png';
import setIcon from '../../../../assets/images/btn_set.png';
import setIconHover from '../../../../assets/images/btn_set_ov.png';
import adminIcon from '../../../../assets/images/btn_admin.png';
import adminIconHover from '../../../../assets/images/btn_admin_ov.png';
import chartIcon from '../../../../assets/images/btn_chart.png';
import dashBtnUp from '../../../../assets/images/btn_up.png';
import dashBtnDown from '../../../../assets/images/btn_down.png';
import fileExis from '../../../../assets/images/file_exis.png';
import fileExisEm from '../../../../assets/images/file_exis_em.png';

import fileNone from '../../../../assets/images/file_none.png';
import popupClose from '../../../../assets/images/btn_popClose.png';
import graphNext from '../../../../assets/images/next_report.png';
import graphNextHov from '../../../../assets/images/next_report_ov.png';
import graphPrev from '../../../../assets/images/prev_report.png';
import graphPrevHov from '../../../../assets/images/prev_report_ov.png';
import searchIcon from '../../../../assets/images/ic_search.png';
import popupClose2 from '../../../../assets/images/btn_popClose2.png';

import imageGraph from '../../../../assets/images/graph.jpg';
import btnNext from '../../../../assets/images/btn_next.png';
import btnPrev from '../../../../assets/images/btn_prev.png';
import arrowUp from '../../../../assets/images/ic_up.png';
import arrowDown from '../../../../assets/images/ic_down.png';
import gageImg from '../../../../assets/images/bg_gage.png';
import needleImg from '../../../../assets/images/img_needle.png';
import gageState from '../../../../assets/images/txt_warning.png';

import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';

const UserButton = styled(ButtonUnstyled)`
    background: transparent url(${userIcon});
    &:hover {
        background-image: url(${userIconHover});
    }
`;

const LogButton = styled(ButtonUnstyled)`
    background: transparent url(${logIcon});
    &:hover {
        background-image: url(${logIconHover});
    }
`;

const SettingsButton = styled(ButtonUnstyled)`
    background: transparent url(${setIcon});
    &:hover {
        background-image: url(${setIconHover});
    }
`;

const AdminButton = styled(ButtonUnstyled)`
    background: transparent url(${adminIcon});
    &:hover {
        background-image: url(${adminIconHover});
    }
`;

const ChartButton = styled(ButtonUnstyled)`
    background: transparent url(${chartIcon});
    background-repeat: no-repeat;
    position: absolute;
    top: -15px;
    left: -245px;
    width: 80px;
    height: 72px;
    border: none;
    cursor: pointer;
    transition: transform .2s;
    &:hover {
        transform: scale(1.08);
    }
`;

const MainNavButton = styled(ButtonUnstyled)`
    width: 100%;
    height: 46px;
    font-weight: 200;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 6px;
    background: #3a5298;
    border: none;
    cursor: pointer;
    &:hover {
        background-image: linear-gradient(#04b9fb, #017dfa);
    }   
`;

const PageSideButton = styled(ButtonUnstyled)`
    width: 90px;
    height: 40px;
    border-radius: 6px;
    font-size: 17px;
    font-weight: 500;
    color: #fff;
    margin-left: 14px;
    background: linear-gradient(to right, #1482f4, #0565c8);
    transition: background .2s;
    border: none;
    cursor: pointer;
    &:hover {
        background: linear-gradient(to right, #0565c8, #0565c8);
    }   
`;

const DashTrigButton = styled(ButtonUnstyled)`
    width: 89px;
    height: 31px;
    font-size: 0;
    background: url(${dashBtnUp}) no-repeat 50% 50%;
    transition: background .3s;
    border: none;
    cursor: pointer;
    &:hover {
        background: url(${dashBtnDown}) no-repeat 50% 50%;
    }   
`;

const FileButtonExis = styled(ButtonUnstyled)`
    width: 16px;
    height: 21px;
    background: url(${fileExis}) no-repeat 50% 50%;
    transition: background .3s;
    border: none;
    cursor: pointer;
`;

const FileButtonExisEm = styled(ButtonUnstyled)`
    width: 16px;
    height: 21px;
    background: url(${fileExisEm}) no-repeat 50% 50%;
    transition: background .3s;
    border: none;
    cursor: pointer;
`;



const FileButtonNone = styled(ButtonUnstyled)`
    width: 16px;
    height: 21px;
    background: url(${fileNone}) no-repeat 50% 50%;
    transition: background .3s;
    border: none;
    cursor: pointer;
`;

const ButtonClosePop = styled(ButtonUnstyled)`
    width: 24px;
    height: 24px;
    background: url(${popupClose}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
`;

const ButtonGraphNext = styled(ButtonUnstyled)`
    width: 88px;
    height: 50px;
    background: url(${graphNext}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: url(${graphNextHov}) no-repeat 50% 50%;
    }   
`;

const ButtonGraphPrev = styled(ButtonUnstyled)`
    width: 88px;
    height: 50px;
    background: url(${graphPrev}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: url(${graphPrevHov}) no-repeat 50% 50%;
    }   
`;

const ButtonGrid = styled(ButtonUnstyled)`
    width: 105px;
    height: 50px;
    background: #6682c1;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #355aae;
    } 
`;

const PopupFootButton = styled(ButtonUnstyled)`
    width: 100%;
    height: 100%;
    background: #018de7;
    color: #fff;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #0355b0;
    } 
`;

const UploadImageButton = styled(ButtonUnstyled)`
    width: 145px;
    height: 34px;
    background: #3f4c72;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #192b5e;
    } 
`;

const PromptButtonBlue = styled(ButtonUnstyled)`
    width: 90px;
    height: 34px;
    background: #3f4c72;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #192b5e;
    } 
`;

const PromptButtonWhite = styled(ButtonUnstyled)`
    width: 90px;
    height: 34px;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #6e7884;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border: 1px solid #6e7884;
    transition: background .2s;
    &:hover {
        border-color: #222;
    } 
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

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
`;

const SubmitButton = styled(ButtonUnstyled)`
    width: 84px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    border-radius: 46px;
    background: #00adef;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298;
    }   
`;

const useStyles = makeStyles(() => ({
    dashboardWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center',
        minWidth: '1919px !important',
        minHeight: '100vh',
        '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            border: '6px solid #1e2132'
        },
        '&::-webkit-scrollbar-track': {
            background: '#1e2132',
            borderRadius: '0px',
            boxShadow: 'inset 0 0 4px rgb(0 0 0 / 20%)'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '50px',
            width: '6px',
            background: '#3f4d72',
            borderRadius: '8px',
            boxShadow: 'inset 0px 10px 0px 0px #1e2132, inset 0px -10px 0px 0px #1e2132'
        },
    },
    pageHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundImage: 'url(' + dashboardPattern + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
    },
    mainHeader: {
        display: 'flex',
        zIndex: 1
    },
    mainLogo: {
        '& img': {
            transform: 'translate(20px, 10px)'
        }
    },
    mainMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        color: '#d5d5d8',
        '& div:first-of-type': {
            fontSize: '17px'
        },
        '& div:first-of-type span': {
            color: '#00adef',
            letterSpacing: '-1.08px'
        },
        '& div:last-of-type': {
            fontSize: '15px',
            fontWeight: '200',
            background: '#12141e',
            padding: '3px 8px',
            borderRadius: '4px'
        }
    },
    mainAsside: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#d5d5d8',
        letterSpacing: '-1.08px'
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
    headerWorkplace: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(' + workplaceBackground + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
    },
    adminLogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '135px',
        height: '135px',
        borderRadius: '50%',
        overflow: 'hidden',
        '& img': {
            width: '60%',
            overflow: 'hidden',
            //width: '70%',
            //height: '70%',
            //borderRadius: '50%',
        }


    },
    adminField: {
        marginTop: '20px',
        width: '650px',
        '& :first-of-type': {
            width: '200px',
            color: '#fbe027',
            fontWeight: '700',
            textShadow: '2px 2px 1px rgb(0 0 0 / 20%)',
            textAlign: 'center'
        },
        '& :last-of-type': {
            width: '450px'
        },
        '& *': {
            boxSizing: 'border-box',
            padding: '15px',
        }
    },
    adminFieldLeft: {
        display: 'flex',
        '& :last-of-type': {
            justifyContent: 'flex-start'
        }
    },
    adminFieldRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
        '& :last-of-type': {
            justifyContent: 'flex-end'
        }
    },
    adminFieldText: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '500',
        fontSize: '28px',
        color: '#fff',
        letterSpacing: '-1.08px'
    },
    headerNavigation: {
        position: 'relative',
        height: '64px'
    },
    chartPopup: {
        zIndex: '1000',
        position: 'absolute',
        top: '-20px',
        left: '-140px',
        display: 'flex',
    },
    chartPopupClose: {
        display: "none !important"
    },
    chartPopList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '345px',
        height: 'fit-content',
        border: '2px solid #018de7',
        borderRadius: '5px',
        overflow: 'hidden',
        '& >div': {
            width: '100%',
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
    chartPopGraph: {
        width: '1024px',
        border: '2px solid #018de7',
        padding: '34px',
        borderRadius: '12px',
        background: '#d3e1fb',
        marginLeft: '5px'
    },
    graphHeader: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        '& >div:first-of-type': {
            position: 'absolute',
            left: '0'
        },
        '& >div:last-of-type': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '700px',
            '& >div': {
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexWrap: 'wrap',
                width: '450px',
                '& span': {
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: '500',
                    '&:first-of-type': {
                        fontSize: '30px',
                        fontWeight: '700'
                    }
                }
            }
        },

    },
    graphImage: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '34px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 0 10px rgb(0 0 0 / 30%)',
        display: 'block',
    },
    graphImageNone: {
        display: "none !important"
    },
    graphLabel: {
        display: 'flex',
        marginTop: '30px',
        height: '50px',
        border: '1px solid #bbbdc0',
        borderRadius: '6px',
        padding: '0 14px',
    },
    labelItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 14px',
        fontSize: '15px',
        '& span:first-of-type': {
            width: '15px',
            height: '10px',
            borderRadius: '6px',
            marginRight: '4px',
            backgroundColor: '#018ce7'
        },
        '&:nth-of-type(2) span:first-of-type': {
            backgroundColor: '#1b969e'
        },
        '&:nth-of-type(3) span:first-of-type': {
            backgroundColor: '#ffba5a'
        },
        '&:nth-of-type(4) span:first-of-type': {
            backgroundColor: '#898ddd'
        },
        '&:nth-of-type(5) span:first-of-type': {
            backgroundColor: '#b9d581'
        },
        '&:nth-of-type(6) span:first-of-type': {
            backgroundColor: '#d28cbd'
        },

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
        border: 'none',
        cursor: 'pointer',
        transition: 'background .3s'
    },
    navSlider: {
        '& .slick-list': {
            width: '98%',
            margin: '0 auto'
        },
        '& .slick-track': {
            '& .slick-slide button.active': {
                background: 'linear-gradient(#04b9fb, #017dfa)'
            },
        },
        '& .slick-slide': {
            boxSizing: 'border-box',
            padding: '7px'
        },
        '& .slick-disabled': {
            display: 'none !important'
        },
        '& .slick-arrow': {
            width: '23px',
            height: '38px'
        },
        '& .slick-next': {
            backgroundImage: 'url(' + btnNext + ')',
            '&:before': {
                display: 'none'
            }
        },
        '& .slick-prev': {
            backgroundImage: 'url(' + btnPrev + ')',
            '&:before': {
                display: 'none'
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
    managementOrder: {
        display: 'flex',
        justifyContent: 'center',
        height: '66px',
        width: '100%',
        marginTop: '1px',
        backgroundImage: 'url(' + orderBackground + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        fontSize: '28px',
        lineHeight: '66px',
        color: '#fff',
        '& strong': {
            color: '#00adef',
            fontWeight: '700',
            margin: '0 10px'
        }
    },
    managementSide: {
        position: 'absolute',
        top: '16px',
        right: '40px',
        display: 'flex'
    },
    pageContent: {
        display: 'flex',
        height: 'calc(100vh - 333px)',
        padding: '0px 20px 30px 10px',
        '& >.MuiGrid-root': {
            height: '100%'
        }
    },
    contentList: {
        height: '100%',
        borderRadius: '6px 6px 0 0',
        background: '#1e2132',
        overflow: 'hidden',
        '&.moreContent': {
            display: 'flex',
            '& $listTitle': {
                justifyContent: 'flex-start',
                borderRight: '1px solid #17191c'
            },
            '& :last-of-type $listTitle': {
                borderRight: 'none'
            },
            '& >div:first-of-type': {
                width: '28%'
            },
            '& >div:nth-of-type(2)': {
                width: '12%'
            },
            '& >div:nth-of-type(3)': {
                width: '12%'
            },
            '& >div:nth-of-type(4)': {
                width: '18%'
            },
            '& >div:nth-of-type(5)': {
                width: '22%'
            },
            '& >div:last-of-type': {
                width: '8%'
            },
            '& >div:nth-of-type(3), >div:nth-of-type(4), >div:nth-of-type(5)': {
                '& ul': {
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    boxSizing: 'border-box'
                }
            },
            '& $menuList': {
                borderRight: '1px solid #4d5867',
                '& li, a': {
                    height: '40px',
                    width: '100%',
                    transition: 'background .2s',
                    '& a:hover': {
                        background: '#2e3b65'
                    }
                }
            },
            '& .checkList': {
                '& li': {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& $listLink': {
                    justifyContent: 'center',
                    padding: '0',
                    '&.check': {
                        width: '18px',
                        height: '18px',
                        backgroundImage: 'url(' + checkIcon + ')',
                        '&:hover': {
                            backgroundImage: 'url(' + checkIconHover + ')',
                            backgroundColor: 'transparent'
                        }
                    },
                    '&.check-blue': {
                        width: '18px',
                        height: '18px',
                        backgroundImage: 'url(' + checkIconHover + ')',
                    }
                },
            },
        },
    },
    listTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        lineHeight: '40px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#e7e7e9',
        background: '#3f4d72',
        '& strong': {
            color: '#00adef'
        }

    },
    menuList: {
        width: '100%',
        overflow: 'hidden auto',
        height: 'calc(100% - 39px)',
        padding: '0',
        margin: '0',
        listStyle: 'none',
        color: '#fff',
        letterSpacing: '-1.08px',
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
            wordBreak: 'keep-all',
            lineHeight: '25px',
            '& p, & a': {
                width: 'calc(100% - 110px)',
                paddingLeft: '20px',
                margin: '0'
            },
        },
        '&.parentList': {
            '& span': {
                width: '90px',
                height: '41px',
                lineHeight: '40px',
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'center',
                letterSpacing: '0px',
                '&.normal': {
                    color: '#22e004'
                },
                '&.caution': {
                    color: '#f6db28'
                },
                '&.warning': {
                    color: '#fe9c05'
                },
                '&.risk': {
                    color: '#fc4b07'
                },
            },
            '& li .parentLink': {
                height: '43.5px',
                background: '#333542',
                color: '#00adef',
                borderBottom: '0px solid #1e2132',
                '& +span': {
                    padding: "1.5px 0",
                    background: 'linear-gradient(#275dc6, #263781)',
                    fontSize: '20px',
                }
            },
        },
        '& .nestedList li': {
            padding: '0',
            fontSize: '15px',
            
        },
        '&.secondList': {
            padding: '0px',
            boxSizing: 'border-box',
            fontSize: '15px',
            '& li': {
                marginRight: '10px',
                borderBottom: '1px solid #363c4c',
                '& a': {
                    padding: '22px',
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
        '&.fourthList': {
            padding: '22px',
            boxSizing: 'border-box',
            '& .bulletList': {
                marginBottom: '12px',
                color: '#00adef',
            },
            '& ol': {
                padding: '0',
                marginLeft: '12px',
                '& li': {
                    boxSizing: 'border-box',
                    marginBottom: '6px',
                    paddingLeft: '22px',
                    textIndent: '-22px',
                    lineHeight: '24px',
                    flexDirection: 'column',
                }
            },
            '& li': {
                marginBottom: '24px',
                flexDirection: 'column',
                '&:last-of-type': {
                    margin: '0'
                }
            },
            '& >li:last-of-type li': {
                textIndent: 'unset',
                paddingLeft: 'unset'
            }
        },
        '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            border: '6px solid #1e2132'
        },
        '&::-webkit-scrollbar-track': {
            background: '#1e2132',
            borderRadius: '0px',
            boxShadow: 'inset 0 0 4px rgb(0 0 0 / 20%)'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '50px',
            width: '6px',
            background: '#3f4d72',
            borderRadius: '8px',
            boxShadow: 'inset 0px 10px 0px 0px #1e2132, inset 0px -10px 0px 0px #1e2132'
        },
    },
    listLink: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        textDecoration: "none"        
    },
    listLinkClicked: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        textDecoration: "none",
        backgroundColor: "#2e3b65"
    },

    gageWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '147px',
        backgroundImage: 'url(' + gageImg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    lowerDashboard: {
        position: 'absolute',
        bottom: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: 'linear-gradient(#097ef5, #266aa9)',
        zIndex: '1',
        minWidth: '1920px',
    },
    dashTrigger: {
        display: 'flex',
        justifyContent: 'center',
        width: '90%',
        margin: '-31px auto',
    },
    gageArrow: {
        position: 'relative',
        width: '69px',
        height: '123px',
        bottom: '-27px',
        '& div': {
            position: 'absolute',
            width: 'inherit',
            height: 'inherit',
            backgroundRepeat: 'no-repeat',
        },
    },
    needleImg: {
        position: 'absolute',
        backgroundImage: 'url(' + needleImg + ')',
        backgroundPosition: 'center',
        transformOrigin: '35px 87px'
    },
    gageState: {
        backgroundImage: 'url(' + gageState + ')',
        backgroundPosition: 'center 58px',
    },
    boxWrap: {
        height: '180px',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
    },
    footBox: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #1e2132',
        background: '#1e2132',
        color: '#fff',
        marginLeft: '7px !important',
        overflow: 'hidden',
        '&.boxUp': {
            height: '120px'
        },
        '&.boxDown': {
            position: 'relative',
            height: '50px',
            borderRadius: '8px'
        },
        '&:nth-of-type(2) $bottomBox div:first-of-type div:last-of-type': {
            color: '#fdcb05'
        },
        '&.multiBox': {
            flexDirection: 'column',
            '& >div:not($tiltBox)': {
                display: 'flex',
                flexWrap: 'wrap',
                width: 'calc(50% - 20px)',
                '& a': {
                    borderLeft: '1px solid #1e2132'
                }
            },
            '& $bottomBox div:first-of-type div strong': {
                color: '#fdcb05'
            },
            '& $bottomBox div:last-of-type div strong': {
                color: '#00adef'
            }
        },
    },
    tiltBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '100%',
        background: '#3a5298'
    },
    footLink: {
        width: '100%',
        lineHeight: '43px',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '500',
        background: '#3a5298',
        letterSpacing: '-1.08px',
        '&:visited': {
            color: "#ffffff"
        },
        textDecoration: "none",
        color: "white"
    },
    bottomBox: {
        display: 'flex',
        width: '100%',
        height: '77px',
        '& div': {
            width: '100%',
            color: '#e7e7e9',
            boxSizing: 'content-box',
            textAlign: 'center',
            '& div:first-of-type': {
                backgroundColor: '#4d5867',
                borderTop: '1px solid #1e2132',
                borderLeft: '1px solid #1e2132',
                lineHeight: '29px',
            },
            '& div:last-of-type': {
                borderRight: '1px solid #556478',
                lineHeight: '46px',
                '& strong': {
                    fontSize: '30px',
                    fontWeight: '500',
                    marginRight: '3px'
                },
            }
        },
        '& div:last-of-type div:last-of-type': {
            // border: '0'
        }
    },
    footDate: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        '& .dateBox': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            color: '#d5d5d8'
        }
    },
    dayNums: {
        display: 'flex',
        marginLeft: '15px',
        '& div': {
            width: '19px',
        }
    },
    timeNums: {
        display: 'flex',
        color: '#FBA325',
        marginLeft: '7px',
        '& div': {
            display: 'flex',
            marginLeft: '4px',
            padding: '4px 8px',
            background: 'linear-gradient(0deg, rgba(0,0,0,1) 40%, rgba(98,98,98,1) 100%)',
            borderRadius: '4px'
        },
        '& span': {
            fontSize: '32px',
            height: '32px',
            padding: '0px 2px 0px 6px',
            textAlign: 'center',
            lineHeight: '23px'
        }
    },
    footSlider: {
        width: '100% !important',
        '& .slick-track .slick-slide': {
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            padding: '0px 110px 0px 40px',
            boxSizing: 'border-box',
            '& div': {
                display: 'flex !important',
                alignItems: 'center',
                marginRight: '25px'
            },
        },
        '& .slick-arrow': {
            width: '25px',
            height: '25px',
            right: '51px',
            zIndex: '1',
            transition: 'background-color .2s',
            '&:hover': {
                backgroundColor: '#3f4d72'
            },
        },
        '& .slick-next': {
            background: 'url(' + arrowDown + ') no-repeat 50% 50% #3a5298',
            top: '37px',
            '&:before': {
                display: 'none'
            }
        },
        '& .slick-prev': {
            background: 'url(' + arrowUp + ') no-repeat 50% 50% #3a5298',
            left: 'unset',
            top: '11px',
            '&:before': {
                display: 'none'
            }
        }
    },
    sliderLink: {
        position: 'absolute',
        right: '0',
        width: '50px',
        height: '50px',
        background: '#3a5298',
        cursor: 'pointer',
        transition: 'background-color .2s',
        '&:hover': {
            backgroundColor: '#3f4d72'
        },
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            background: '#979dad',
            pointerEvents: 'none',
        },
        '&:before': {
            width: '25px',
            height: '2px'
        },
        '&:after': {
            width: '2px',
            height: '25px',
        }
    },
    slideLabel: {
        width: '34px',
        height: '18px',
        lineHeight: '18px',
        marginRight: '10px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '12px',
        background: '#fd4b05',
        borderRadius: '2px',
        fontWeight: '500'
    },
    slideLabelHot: {
        width: '34px',
        height: '18px',
        lineHeight: '18px',
        marginRight: '10px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '12px',
        background: '#fd4b05',
        borderRadius: '2px',
        fontWeight: '500'
    },
    linkBtn: {
        textDecoration: "none",
        color: "white",
        '&:visited': {
            color: '#ffffff'
        }
    },
    headerPopup: {
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '420px',
        height: '700px',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
        '&.user_popup': {
            top: '60px',
            left: '5px',
            height: '535px'
        },
        '&.user_popupClose': {
            display: "none"
        },
        '&.settings_popup': {
            top: '65px',
            left: '-30px'
        },
        '&.settings_popupClose': {
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
        //marginBottom: '10px !important',
        //overflow: 'hidden',
        height: '40px',
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
        },
        '& label': {
            fontSize: '16px',
            marginTop: '-8px'            
        }
    },
    preFootPop: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '& >div': {
            '&:first-of-type': {
                width: '215px',
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
        width: '375px',
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
    popupPromptClose: {
        display: 'none !important',
    },
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '0px',
        left: '40%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
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
    uploadPopupClose: {
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
        },
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
        },
        '&.page_drop_menu': {
            '& svg': {
                color: '#ddd',
                display: 'block !important'
            },
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
        background: '#FFFFFF',
        marginBottom: '20px',
        boxShadow: '1px 2px 8px -2px rgb(0 0 0 / 40%)',
        '& img': {
            width: '100%',
            //height: '100%'
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
    uploadedPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '120px',
        right: '440px',
        width: '140px',
        height: '220px',
        background: '#fff',
        borderRadius: '30px',
        padding: '25px 25px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        display: 'block',
        '& button': {
            marginTop: '15px'
        }
    },
    searchRadio: {
        '& [role=radiogroup]': {
            flexWrap: 'wrap',
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
    uploadedPopupClose: {
        display: "none !important"
    },
    boxTable: {
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        padding: '34px',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    boxTableHeader: {
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        padding: '34px',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px'
        }
    },    
    boxTableNone: {
        display: "none !important"
    },
    tableHead: {
        background: '#bdcbe9',
        '& $tableData': {
            borderRight: '1px solid #fff',
            '&:last-of-type': {
                borderRight: 'none',
            },
        }
    },
    tableBody: {
        width: '100%',
        '& $tableData': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:first-of-type': {
                background: '#EFF2F7'
            }
        },
        '& $tableRow': {
            transition: 'background .2s',
            '&:hover': {
                '& $tableData': {
                    background: '#e1e8f7'
                }
            }
        }
    },
    tableRow: {
        display: 'flex',
    },
    tableData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 10px',
        width: '100%',
        '&:last-of-type': {
            borderRight: 'none',
        },
        '&:first-of-type': {
            width: '150%'
        }
    },
    hoverWrap: {
        paddingTop: '2px',
        height: '0px',
        maxHeight: '0px',
        overflow: 'hidden',
        transition: '.2s'

    },
    'wrap_hover': {
        paddingTop: '12px',
        height: '200px',
        maxHeight: '200px',
        overflow: 'visible',
        transition: '.2s',
    },
    selectMenu: {
        height: '40px'
    },
    baseLineselectMenu: {
        '& > div': {
            background: '#fff',
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
        },
        '& label': {
            fontSize: '16px',
            marginTop: '-8px',
        }
    },
    pageOverlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: '1',
    },
    textArea: {
        '& .MuiOutlinedInput-root': {
            background: '#fff',
            '& textarea': {
                height: '74px !important',
                fontSize: '16px',
            }
        }
    },
    notificationPopup: {
        // display: 'none',
        '--border_radius': '15px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '850px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
        borderRadius: 'var(--border_radius)',
        background: 'white',
        '& >button': {
            position: 'absolute',
            top: '-8px',
            right: '-60px'
        },
        '& >div:first-of-type': {
            height: '60px',
            padding: '20px',
            boxSizing: 'border-box',
            background: '#EFF2F9',
            borderTopLeftRadius: 'var(--border_radius)',
            borderTopRightRadius: 'var(--border_radius)',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        '& >div:last-of-type': {
            position: 'absolute',
            bottom: '0px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            '& img': {
                marginRight: '10px',
            }
        },
        '& $slideLabelHot': {
            padding: '2px 10px',
        },
        '& p': {
            padding: '20px',
            margin: '0px',
            lineHeight: '25px',
        }
    },
    popNews: {
        height: '280px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            border: '8px solid #1e2132',
        },
        '&::-webkit-scrollbar-track': {
            background: '#fff',
            borderRadius: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
            height: '50px',
            width: '8px',
            background: '#C3C6CD',
            borderRadius: '8px',
            boxShadow: 'inset 0px 10px 0px 0px #fff, inset 0px -10px 0px 0px #fff'
        },
    },
    pageOverlayInactive: {
        display: 'none',
    },
    readonlyTextWrapper: {
        width: '100%',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        backgroundColor: '#fff',
        color: '#888',
        borderRadius: '8px',
        border: '1px solid #bbb'
    },
    readonlyText: {
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

export { useStyles, 
    UserButton, 
    LogButton, 
    SettingsButton, 
    AdminButton, 
    ChartButton, 
    MainNavButton, 
    PageSideButton, 
    DashTrigButton, 
    FileButtonExis, 
    FileButtonExisEm,
    FileButtonNone,
    ButtonClosePop, 
    ButtonGraphNext, 
    ButtonGraphPrev, 
    ButtonGrid, 
    PopupFootButton,
    UploadImageButton, 
    PromptButtonBlue, 
    PromptButtonWhite,
    UnknownButton1, 
    UnknownButton2, 
    SearchButton, 
    ClosePopupButton2, 
    SubmitButton };