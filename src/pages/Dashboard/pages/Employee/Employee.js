import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { WideLayout } from '../../../../layouts/Wide';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import logo from '../../../../assets/images/logo.png';
import dashboardPattern from '../../../../assets/images/dashboard_pattern.png';
import workplaceBackground from '../../../../assets/images/bg_workplace.png';
import adminLogo from '../../../../assets/images/admin_logo.png';
import userIcon from '../../../../assets/images/btn_user.png';
import userIconHover from '../../../../assets/images/btn_user_ov.png';
import logIcon from '../../../../assets/images/btn_log.png';
import logIconHover from '../../../../assets/images/btn_log_ov.png';
import setIcon from '../../../../assets/images/btn_set.png';
import setIconHover from '../../../../assets/images/btn_set_ov.png';
import adminIcon from '../../../../assets/images/btn_admin.png';
import adminIconHover from '../../../../assets/images/btn_admin_ov.png';
import weatherIcon from '../../../../assets/images/weather_icon.png';
import chartIcon from '../../../../assets/images/btn_chart.png';
import orderBackground from '../../../../assets/images/bg_body_order.png';
import dashBtnUp from '../../../../assets/images/btn_up.png';
import dashBtnDown from '../../../../assets/images/btn_down.png';
import checkIcon from '../../../../assets/images/ic_chk.png';
import checkIconHover from '../../../../assets/images/ic_chk_hover.png';
import fileExis from '../../../../assets/images/file_exis.png';
import fileNone from '../../../../assets/images/file_none.png';

import graphNext from '../../../../assets/images/next_report.png';
import graphPrev from '../../../../assets/images/prev_report.png';
import graphNextHov from '../../../../assets/images/next_report_ov.png';
import graphPrevHov from '../../../../assets/images/prev_report_ov.png';
import imageGraph from '../../../../assets/images/graph.jpg';
import popupClose from '../../../../assets/images/btn_popClose.png';
import popupClose2 from '../../../../assets/images/btn_popClose2.png';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import alertIcon from '../../../../assets/images/ic_refer.png';

import numOne from '../../../../assets/images/num1.png';
import numTwo from '../../../../assets/images/num2.png';
import numThree from '../../../../assets/images/num3.png';
import numFour from '../../../../assets/images/num4.png';
import numFive from '../../../../assets/images/num5.png';
import numNine from '../../../../assets/images/num9.png';

import btnNext from '../../../../assets/images/btn_next.png';
import btnPrev from '../../../../assets/images/btn_prev.png';
import arrowUp from '../../../../assets/images/ic_up.png';
import arrowDown from '../../../../assets/images/ic_down.png';

import gageImg from '../../../../assets/images/bg_gage.png';
import needleImg from '../../../../assets/images/img_needle.png';
import gageState from '../../../../assets/images/txt_warning.png';
import searchIcon from '../../../../assets/images/ic_search.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Link from '@mui/material/Link';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import radioIcon from '../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../assets/images/ic_radio_on.png';

import { useNoticesSelectMutation } from '../../../../hooks/api/NoticesManagement/NoticesManagement';
import { remove } from '../../../../services/core/User/Token';
import { useGetLoginInfoMutation } from '../../../../hooks/api/MainManagement/MainManagement';



const useStyles = makeStyles(() => ({
    dashboardWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center',
        minWidth: '1900px !important',
        height: '100vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            border: '6px solid #1e2132'
        },
        '&::-webkit-scrollbar-track': {
            background: '#1e2132',
            borderRadius: '10px',
            boxShadow: 'inset 0 0 4px rgb(0 0 0 / 20%)'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '50px',
            width: '6px',
            background: '#3f4d72',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 4px rgb(0 0 0 / 10%)'
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
        color: '#d5d5d8',
        '& div:first-of-type': {
            fontSize: '17px'
        },
        '& div:first-of-type span': {
            color: '#00adef',
            letterSpacing: '-2.08px'
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
        letterSpacing: '-2.08px'
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
            letterSpacing: '-2.08px'
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
        height: '135px'
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
        letterSpacing: '-2.08px'
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
        display: 'none !important',
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
            '& .slick-slide:first-of-type button': {
                background: 'linear-gradient(#04b9fb, #017dfa)'
            },
        },
        '& .slick-slide': {
            boxSizing: 'border-box',
            padding: '7px'
        },
        '& .slick-disabled': {
            // display: 'none !important'
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
        padding: '10px 20px 5px 10px',
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
            '& [class*=listTitle]': {
                justifyContent: 'flex-start',
                borderRight: '1px solid #17191c'
            },
            '& :last-of-type [class*=listTitle]': {
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
            '& [class*=menuList]': {
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
                '& [class*=listLink]': {
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
        fontSize: '17px',
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
            lineHeight: '24px',
            '& p, & a': {
                width: 'calc(100% - 110px)',
                paddingLeft: '20px',
                margin: '0'
            },
        },
        '&.parentList': {
            '& span': {
                width: '90px',
                height: '40px',
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
                    color: '#fc4b07'
                },
                '&.risk': {
                    color: '#fe9c05'
                },
            },
            '& li .parentLink': {
                height: '40px',
                background: '#333542',
                color: '#00adef',
                borderBottom: '1px solid #1e2132',
                '& +span': {
                    background: 'linear-gradient(#275dc6, #263781)',
                    fontSize: '20px',
                }
            },
        },
        '& .nestedList li': {
            padding: '0'
        },
        '&.secondList': {
            padding: '0 10px 0 0',
            boxSizing: 'border-box',
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
                    '&.green': {
                        color: '#22e004'
                    },
                    '&.orange': {
                        color: '#fe9c05'
                    },
                    '&.red': {
                        color: '#fc4b07'
                    },
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
            borderRadius: '10px',
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
        position: 'relative',
        top: '39px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '8px 0px 25px 0px',
        background: 'linear-gradient(#097ef5, #266aa9)',
        zIndex: '1',
        '&:hover': {

        }
    },
    dashTrigger: {
        display: 'flex',
        justifyContent: 'center',
        width: '90%',
        margin: '-39px auto',
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
        '&:nth-of-type(2) div[class*=bottomBox] div:first-of-type div:last-of-type': {
            color: '#fdcb05'
        },
        '&.multiBox': {
            flexDirection: 'column',
            '& >div:not([class*=tiltBox])': {
                display: 'flex',
                flexWrap: 'wrap',
                width: 'calc(50% - 20px)',
                '& a': {
                    borderLeft: '1px solid #1e2132'
                }
            },
            '& div[class*=bottomBox] div:first-of-type div strong': {
                color: '#fdcb05'
            },
            '& div[class*=bottomBox] div:last-of-type div strong': {
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
        textDecoration: "none"
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
        width: '397px',
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
            left: '-80px'
        },
        '&.settings_popupClose': {
            display: "none"
        },
        '& [class*=popupAccord]': {
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
                '& [class*=popupTextField]': {
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
        '& [class*=popupLink]': {
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
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
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
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '0px',
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
        display: 'none !important',
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
    dropMenu: {
        '& .MuiOutlinedInput-root': {
            border: '1px solid #777b91',
            background: '#26283d',
            color: '#ddd',
            fontSize: '17px',
            '& svg': {
                color: '#ddd'
            }
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
    uploadedPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '120px',
        right: '440px',
        width: '140px',
        height: '240px',
        background: '#fff',
        borderRadius: '30px',
        padding: '25px 25px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        display: 'none !important',
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
    tableHead: {
        background: '#bdcbe9',
        '& [class*=tableData]': {
            borderRight: '1px solid #fff',
            '&:last-of-type': {
                borderRight: 'none',
            },
        }
    },
    tableBody: {
        width: '100%',
        '& [class*=tableData]': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:first-of-type': {
                background: '#EFF2F7'
            }
        },
        '& [class*=tableRow]': {
            transition: 'background .2s',
            '&:hover': {
                '& [class*=tableData]': {
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
    }
}));

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
    letter-spacing: -2.08px;
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
    width: 80px;
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

const PromptButtonWhite = styled(ButtonUnstyled)`
    width: 80px;
    height: 34px;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #6e7884;
    font-size: 16px;
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
    letter-spacing: -2.08px;
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
    letter-spacing: -2.08px;
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
    letter-spacing: -2.08px;
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
    width: 150px;
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


const headerSlider = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1
}

const footerSlider = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
}


const Employee = () => {
    const classes = useStyles();

    const navigate = useNavigate();

    const [num, setNum] = React.useState('');
    const [userPopup, setUserPopup] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [chartPop, setChartPop] = useState(false)
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})

    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const handleLogOut = () => {
        remove();
        navigate('/');
    }

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const [noticesSelect] = useNoticesSelectMutation()
    const [noticesList, setNoticesList] = useState()


    const handleFetchList = async () => {
        const response = await noticesSelect({
            "col": "",
            "countPerPage": null,
            "pageNum": null,
            "param": ""
        })
        setNoticesList(response)
    }

    useEffect(() => {
        handleFetchList()
        handleLoginInfo()
    }, [])

    return (
        <WideLayout>

            <Grid className={classes.dashboardWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                                <UserButton className={classes.mainMenuButton} onClick={() => setUserPopup(true)}></UserButton>
                                <div className={userPopup ? (classes.headerPopup + ' user_popup') : (classes.headerPopup + ' user_popupClose')}>
                                    <div className={classes.popHeader}>
                                        최초 사용자 설정
                                        <ButtonClosePop onClick={() => setUserPopup(!userPopup)}></ButtonClosePop>
                                    </div>
                                    <div className={classes.headerPopList}>
                                        <div className={classes.userTab}>
                                            <div className={classes.userImage}>
                                                <img />
                                            </div>
                                            <div className={classes.userName}>
                                                Lorem ipsum
                                            </div>
                                            <div className={classes.userInfo}>
                                                Lorem ipsum dolor sit amet
                                            </div>
                                        </div>
                                        <span>
                                            <span>Lorem ipsum</span>
                                        </span>
                                        <TextField
                                            id="standard-basic"
                                            placeholder="안전보건 목표 등록 (띠어쓰기 포함 16자 이내)"
                                            variant="outlined"
                                            sx={{ width: 350 }}
                                            className={classes.popupTextField}
                                        />
                                        <Select
                                            className={classes.popupTextField}
                                            sx={{ width: 350 }}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value="">경영방침 등록 (띠어쓰기 포함 16자 이내)</MenuItem>
                                        </Select>
                                        <div className={classes.preFootPop}>
                                            <div>
                                                <span>로고등록</span>
                                            </div>
                                            <div>
                                                <UploadImageButton>찾아보기</UploadImageButton>
                                                <Alert
                                                    icon={<img src={alertIcon} alt="alert icon" />}
                                                    severity="error">
                                                    사이즈 83px*67px
                                                    <br />
                                                    (   gif, jpg, png 파일허용)
                                                </Alert>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.headerPopFooter}>
                                        <PopupFootButton>저장하기</PopupFootButton>
                                    </div>
                                </div>
                                <FormControl sx={{ width: 180 }}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">550~300인 이하</MenuItem>
                                        <MenuItem value={2}>300~500인 이하</MenuItem>
                                        <MenuItem value={3}>500~1000인 이하</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: 150, marginLeft: '8px' }}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">건설업</MenuItem>
                                        <MenuItem value={2}>제조업</MenuItem>
                                        <MenuItem value={3}>IT</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.rightMenu}>
                                <div className={classes.userInformation}>
                                    <div>{loginInfo.loginId} / <span>{loginInfo.roleName}</span></div>
                                    <div>계약기간 : 22.07.01 ~ 23.06.31</div>
                                </div>
                                <LogButton className={classes.mainMenuButton} onClick={handleLogOut}></LogButton>
                                <SettingsButton className={classes.mainMenuButton}></SettingsButton>
                                <div className={classes.headerPopup + ' settings_popup'}>
                                    <div className={classes.popHeader}>
                                        중대재해 자체점검 등록 차수 설정
                                        <ButtonClosePop onClick={() => setSettingsPopup(false)}></ButtonClosePop>
                                    </div>
                                    <div className={classes.headerPopList}>
                                        <Accordion className={classes.popupAccord}>
                                            <AccordionSummary
                                                expandIcon={<img src={arrowDown} alt="arrow down" />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>관리차수 신규등록</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TextField
                                                    id="standard-basic"
                                                    placeholder="관리차수"
                                                    variant="outlined"
                                                    sx={{ width: 115 }}
                                                    className={classes.popupTextField}
                                                />
                                                <TextField
                                                    sx={{ width: 220 }}
                                                    id="date"
                                                    className={classes.popupTextField}
                                                    type="date"
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={classes.popupAccord}>
                                            <AccordionSummary
                                                expandIcon={<img src={arrowDown} alt="arrow down" />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>관리차수 조회</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TextField
                                                    id="standard-basic"
                                                    placeholder="관리차수 조회"
                                                    variant="outlined"
                                                    sx={{ width: 350 }}
                                                    className={classes.popupTextField}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={classes.popupAccord}>
                                            <AccordionSummary
                                                expandIcon={<img src={arrowDown} alt="arrow down" />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>관리차수 복사</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Select
                                                    className={classes.popupTextField}
                                                    sx={{ width: 150, marginBottom: '25px !important' }}
                                                    value={num}
                                                    onChange={handleChange}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="">복사할 차수</MenuItem>
                                                </Select>
                                                <span>2022-07-01 ~ 2022-12-31</span>
                                                <div className={classes.popupPrompt}>
                                                    <Alert
                                                        icon={<img src={alertIcon} alt="alert icon" />}
                                                        severity="error">
                                                        <strong>2차 차수의 DATA</strong>
                                                        를 현재 차수에 복사 하시겠습니까
                                                    </Alert>
                                                    <PromptButtonBlue>예</PromptButtonBlue>
                                                    <PromptButtonWhite>예</PromptButtonWhite>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <span></span>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none">관리차수 마감<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none">전사 공지사항 등록<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none">안전작업허가 공사현황<img src={arrowDown} alt="arrow down" /></Link>
                                    </div>
                                    <div className={classes.headerPopFooter}>
                                        <PopupFootButton>저장하기</PopupFootButton>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            <AdminButton className={classes.mainMenuButton}></AdminButton>
                            <div className={classes.weatherSection}>
                                <span>
                                    <img src={weatherIcon} alt="weather icon" />
                                </span>
                                <span>18.0</span>
                                <span>서울시 구로구 구로동</span>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid className={classes.headerWorkplace} item xs={12} sx={{ marginTop: '-45px' }}>
                        <div className={classes.adminField + ' ' + classes.adminFieldLeft}>
                            <div className={classes.adminFieldText}>안전보건목표</div>
                            <div className={classes.adminFieldText}>안전사고 무재해 2배수 달성!</div>
                        </div>
                        <div className={classes.adminLogo}>
                            <img src={adminLogo} alt="admin logo" />
                        </div>
                        <div className={classes.adminField + ' ' + classes.adminFieldRight}>
                            <div className={classes.adminFieldText}>경영방침</div>
                            <div className={classes.adminFieldText}>신뢰받는 세계 NO1. 사업장 구축</div>
                        </div>
                    </Grid>
                    <Grid className={classes.headerNavigation} item xs={5.8}>
                        <ChartButton onClick={() => setChartPop(true)}></ChartButton>
                        <div className={chartPop ? classes.chartPopup : classes.chartPopupClose}>
                            <div className={classes.chartPopList}>
                                <div className={classes.popHeader}>
                                    중대재해 대응수준 Report
                                    <ButtonClosePop onClick={() => setChartPop(false)}></ButtonClosePop>
                                </div>
                                <div className={classes.popList}>
                                    <div className={classes.PopListItem + ' active'}>차수별 대응수준 현황 (통합)</div>
                                    <div className={classes.PopListItem}>차수별 대응수준 현황 (사업장별)</div>
                                    <div className={classes.PopListItem}>항목별 대응수준 현황 (통합)</div>
                                    <div className={classes.PopListItem}>항목별 대응수준 현황 (사업장별)</div>
                                    <div className={classes.PopListItem}>사업장별 재해발생 통계</div>
                                    <div className={classes.PopListItem}>개선.시정명령 조치내역 통계</div>
                                    <div className={classes.PopListItem}>안전보건 법정교육 실시내역 통계</div>
                                </div>
                            </div>
                            <div className={classes.chartPopGraph}>
                                <div className={classes.graphHeader}>
                                    <div>
                                        <ButtonGrid>Grid</ButtonGrid>
                                    </div>
                                    <div>
                                        <ButtonGraphPrev></ButtonGraphPrev>
                                        <div>
                                            <span>중대대해처벌법 대응수준 현황</span>
                                            <span>(3차 : 22/01/01 ~ 22/04/30)</span>
                                        </div>
                                        <ButtonGraphNext></ButtonGraphNext>
                                    </div>
                                </div>
                                <div className={classes.graphImage}>
                                    <img src={imageGraph} alt="graph" />
                                    <div className={classes.graphLabel}>
                                        <div className={classes.labelItem}>
                                            <span></span>
                                            <span>여수사업장</span>
                                        </div>
                                        <div className={classes.labelItem}>
                                            <span></span>
                                            <span>인천사업장</span>
                                        </div>
                                        <div className={classes.labelItem}>
                                            <span></span>
                                            <span>울산사업장</span>
                                        </div>
                                        <div className={classes.labelItem}>
                                            <span></span>
                                            <span>서산사업장</span>
                                        </div>
                                        <div className={classes.labelItem}>
                                            <span></span>
                                            <span>춘천사업장</span>
                                        </div>
                                        <div className={classes.labelItem}>
                                            <span></span>
                                            <span>세종사업장</span>
                                        </div>
                                    </div>
                                </div>
                                <Grid item xs={12} className={classes.boxTable}>
                                    <div className={classes.tableHead}>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>구분</div>
                                            <div className={classes.tableData}>인천사업장</div>
                                            <div className={classes.tableData}>여수사업장</div>
                                            <div className={classes.tableData}>울산사업장</div>
                                            <div className={classes.tableData}>세종사업장</div>
                                        </div>
                                    </div>
                                    <div className={classes.tableBody}>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>안전보건 목표 및 경영방침</div>
                                            <div className={classes.tableData}>98</div>
                                            <div className={classes.tableData}>98</div>
                                            <div className={classes.tableData}>98</div>
                                            <div className={classes.tableData}>98</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>안전보건업무 종괄관리</div>
                                            <div className={classes.tableData}>96</div>
                                            <div className={classes.tableData}>96</div>
                                            <div className={classes.tableData}>96</div>
                                            <div className={classes.tableData}>96</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>유해.위혐요인 개선절차</div>
                                            <div className={classes.tableData}>80</div>
                                            <div className={classes.tableData}>80</div>
                                            <div className={classes.tableData}>80</div>
                                            <div className={classes.tableData}>80</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>유해.위험요인 개선절차</div>
                                            <div className={classes.tableData}>82</div>
                                            <div className={classes.tableData}>82</div>
                                            <div className={classes.tableData}>82</div>
                                            <div className={classes.tableData}>82</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>안전보건관리책임자권한</div>
                                            <div className={classes.tableData}>76</div>
                                            <div className={classes.tableData}>76</div>
                                            <div className={classes.tableData}>76</div>
                                            <div className={classes.tableData}>76</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>안전|보건관련 필요예산편성</div>
                                            <div className={classes.tableData}>90</div>
                                            <div className={classes.tableData}>90</div>
                                            <div className={classes.tableData}>90</div>
                                            <div className={classes.tableData}>90</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>안전보건 전문인력 배치</div>
                                            <div className={classes.tableData}>89</div>
                                            <div className={classes.tableData}>89</div>
                                            <div className={classes.tableData}>89</div>
                                            <div className={classes.tableData}>89</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>종사자의견수렴</div>
                                            <div className={classes.tableData}>87</div>
                                            <div className={classes.tableData}>87</div>
                                            <div className={classes.tableData}>87</div>
                                            <div className={classes.tableData}>87</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>중대재해발생 비상대응 매뉴얼</div>
                                            <div className={classes.tableData}>96</div>
                                            <div className={classes.tableData}>96</div>
                                            <div className={classes.tableData}>96</div>
                                            <div className={classes.tableData}>96</div>
                                        </div>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>도급용역위탁시 평가기준</div>
                                            <div className={classes.tableData}>100</div>
                                            <div className={classes.tableData}>100</div>
                                            <div className={classes.tableData}>100</div>
                                            <div className={classes.tableData}>100</div>
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.navSlider}>
                            <Slider {...headerSlider}>
                                <div><MainNavButton>전체사업장</MainNavButton></div>
                                <div><MainNavButton>여수사업장</MainNavButton></div>
                                <div><MainNavButton>울산사업장</MainNavButton></div>
                                <div><MainNavButton>서산사업장</MainNavButton></div>
                                <div><MainNavButton>인천사업장</MainNavButton></div>
                                <div><MainNavButton>광주사업장</MainNavButton></div>
                                <div><MainNavButton>인천사업장</MainNavButton></div>
                                <div><MainNavButton>대전사업장</MainNavButton></div>
                            </Slider>
                        </div>
                    </Grid>

                </Grid>
                <Grid className={classes.pageBody} item xs={10.7}>
                    <div className={classes.uploadPopup}>
                        <ClosePopupButton2></ClosePopupButton2>
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
                            />
                            <SearchButton></SearchButton>
                            <UnknownButton1>전체사업장</UnknownButton1>
                        </div>
                    </div>
                    <div className={classes.uploadedPopup}>
                        <FormControl className={classes.searchRadio}>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="Opt1"
                                    label="Opt1"
                                    control={
                                        <Radio
                                            icon={<img src={radioIcon} alt="radio icon" />}
                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    value="Opt2"
                                    label="Opt2"
                                    control={
                                        <Radio
                                            icon={<img src={radioIcon} alt="radio icon" />}
                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    value="Opt3"
                                    label="Opt3"
                                    control={
                                        <Radio
                                            icon={<img src={radioIcon} alt="radio icon" />}
                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                        />
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                        <SubmitButton>Submit</SubmitButton>
                    </div>
                    <div className={classes.managementOrder}>
                        관리차수<strong>11</strong>차 :<strong>22.01.01 ~ 22.04.30</strong>
                    </div>
                    <div className={classes.managementSide}>
                        <FormControl sx={{ width: 130 }}>
                            <Select
                                className={classes.selectMenu}
                                value={num}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">차수선택</MenuItem>
                                <MenuItem value={2}>88차</MenuItem>
                                <MenuItem value={3}>87차</MenuItem>
                            </Select>
                        </FormControl>
                        <div><PageSideButton>이동</PageSideButton></div>
                    </div>
                </Grid>

                <Grid className={classes.pageContent} item container rowSpacing={0} columnSpacing={1} xs={12}>
                    <Grid item xs={2.7}>
                        <div className={classes.contentList}>
                            <div className={classes.listTitle}>필수 의무조치 내역 <span>시행율</span></div>
                            <ul className={classes.menuList + ' parentList'}>
                                <li>
                                    <p className={classes.listLink + ' parentLink'} to={"#none"} underline="none">안전보건관리체계의 구축 및 이행</p>
                                    <span className={'normal'}>93%</span>
                                    <ul className={classes.menuList + ' nestedList'}>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">안전보건 목표 및 경영방침 설정</Link>
                                            <span className={'normal'}>100%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink + ' activeLink'} to={"#none"} underline="none">유해.위험 요인 개선 업무절차 마련 및 점검</Link>
                                            <span className={'caution'}>87%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">안전보건업무 총괄관리 전담조직 구축</Link>
                                            <span className={'warning'}>32%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">안전보건관리책임자 권한 부여 및 집행 점검</Link>
                                            <span className={'risk'}>60%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">안전.보건관련 필요예산 편성 및 집행</Link>
                                            <span className={'risk'}>32%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">안전보건 전문인력 배치 및 업무시간 보장</Link>
                                            <span className={'caution'}>87%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">종사자 의견수렴 및 개선방안 이행점검</Link>
                                            <span className={'warning'}>32%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">중대재해발생 비상대응 매뉴얼 마련&점검</Link>
                                            <span className={'caution'}>87%</span>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">도급용역 위탁시 평가기준 및 절차 점검</Link>
                                            <span className={'normal'}>97%</span>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/accident-countermeasures-implementation/list"} underline="none">재해발생 방지대책 및 이행현황</Link>
                                    <span className={'caution'}>86%</span>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/order-for-improvement-and-correction-under-related-law/list"} underline="none">관계법령에 따른 개선.시정명령 조치</Link>
                                    <span className={'warning'}>32%</span>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/measure-to-manage-performance-od-duties-law/list"} underline="none">관계법령에 의무이행의 관리의 조치</Link>
                                    <span className={'risk'}>76%</span>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={2.7}>
                        <div className={classes.contentList}>
                            <div className={classes.listTitle}>의무조치별 상세 점검 항목  <span>총 <strong>40</strong> 건</span></div>
                            <ul className={classes.menuList + ' secondList'}>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">재해예방과 쾌적한 작업환경을 조성함으로써 근로자 및 이해관계자의 안전과 보건을 유지·증진하기 위한 책임과 책무를 다하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' activeLink'} to={"#none"} underline="none">안전보건방침과 이에 따른 목표가 수립되고 이들이 조직의 전략적 방향과 조화되도록 하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">안전보건경영시스템의 구축, 실행, 유지, 개선에 필요한 자원(물적, 인적)을 제공하고 안전보건경영시스템의 효과성에 기여하도록 인원을 지휘하여야 한다. </Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">효과적인 안전보건경영의 중요성과 안전보건경영시스템 요구사항 이행의 중요성에 대한 의사소통이 되도록 하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">안전보건경영시스템이 의도된 결과를 달성할 수 있도록 하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">지속적인 개선을 보장하고 촉진하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">안전보건경영시스템의 의도된 결과를 지원하는 조직 문화의 개발, 실행 및 촉진하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">안전보건경영시스템의 구축, 실행, 유지, 개선에 필요한 자원(물적, 인적)을 제공하고 안전보건경영시스템의 효과성에 기여하도록 인원을 지휘하여야 한다.</Link>
                                </li>
                                <li>
                                    <Link className={classes.listLink} to={"#none"} underline="none">효과적인 안전보건경영의 중요성과 안전보건경영시스템</Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item container xs={6.6}>
                        <Grid item xs={12} sx={{ height: '50%' }}>
                            <div className={classes.contentList + ' moreContent'}>
                                <div>
                                    <div className={classes.listTitle}>점검서류 등 목록</div>
                                    <ul className={classes.menuList}>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">안전보건이사회 발표자료</Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">경영목표 및 방침 내역 및 실행내역서</Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">산업안전보건위원회 회의록</Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">사내 협력사 회의록</Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">교육계획서 및 교육결과서</Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink} to={"#none"} underline="none">사내.외 경영방침 게시내역</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}><strong>3</strong>건 / 6건</div>
                                    <ul className={classes.menuList + ' buttonList'}>
                                        <li>
                                            <FileButtonNone></FileButtonNone>
                                        </li>
                                        <li>
                                            <FileButtonExis><span className={'orange'}>중</span></FileButtonExis>

                                        </li>
                                        <li>
                                            <FileButtonExis><span className={'green'}>상</span></FileButtonExis>
                                        </li>
                                        <li>
                                            <FileButtonNone></FileButtonNone>
                                        </li>
                                        <li>
                                            <FileButtonExis><span className={'red'}>하</span></FileButtonExis>
                                        </li>
                                        <li>
                                            <FileButtonNone></FileButtonNone>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>이행주기</div>
                                    <ul className={classes.menuList}>
                                        <li className={'bulletList'}>반기 1회</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>준수대상</div>
                                    <ul className={classes.menuList}>
                                        <li className={'bulletList'}>경영책임자</li>
                                        <li className={'bulletList'}>안전보건관리책임자</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>관계법령</div>
                                    <ul className={classes.menuList}>
                                        <li className={'bulletList'}>산업안전보건법 제4조</li>
                                        <li className={'bulletList'}>산업안전보건밥 시행령 제3조 2항1호</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>Check</div>
                                    <ul className={classes.menuList + ' checkList'}>
                                        <li>
                                            <Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>
                                        </li>
                                        <li>
                                            <Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1, height: 'calc(50% - 8px)' }}>
                            <div className={classes.contentList}>
                                <div className={classes.listTitle}>현장 작동성 평가 작성 지침서</div>
                                <ul className={classes.menuList + ' fourthList'}>
                                    <li>
                                        <div className={'bulletList'}>안전보건관리규정] 작성 가이드</div>
                                        <ol>
                                            <li>(1) 최고경영자는 공표한 안전보건방침, 목표를 달성할 수 있도록 모든 부서에서 안전보건경영시스템이 이 기준의 요구사항에 적합하게 실행 및 운영되고 있는가에 대하여 주기적으로 확인하여야 한다.</li>
                                            <li>(2) 최고경영자는 안전보건경영시스템의 의도한 결과를 달성할 수 있도록 모든 계층별, 부서별로 안전보건활동에 대한 책임과 권한을 부여하고 문서화하여 공유되도록 하여야 한다.</li>
                                        </ol>
                                    </li>
                                    <li>
                                        <div className={'bulletList'}>이행 참고사항</div>
                                        <ol>
                                            <li>① 사업장 안전보건 확보를 위한 충분한 인력이 있는지 확인하고, 부족한 경우 추가 확보</li>
                                        </ol>
                                    </li>
                                    <li>
                                        <div className={'bulletList'}>안전보건관리규정] 작성 가이드</div>
                                        <ol>
                                            <li>최고경영자는 공표한 안전보건방침, 목표를 달성할 수 있도록 모든 부서에서 안전보건경영시스템이 이 기준의 요구사항에 적합하게 실행 및 운영되고 있는가에 대하여 주기적으로 확인하여야 한다.</li>
                                        </ol>
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid className={classes.lowerDashboard} container item xs={12}>
                    <div className={classes.dashTrigger}>
                        <DashTrigButton></DashTrigButton>
                    </div>

                    <Grid className={classes.gageWrap} item xs={2}>
                        <div className={classes.gageArrow}>
                            <div className={classes.needleImg} style={{ transform: 'rotate(25deg)' }}></div>
                            <div className={classes.gageState}></div>
                        </div>
                    </Grid>

                    <Grid className={classes.boxWrap} item xs={10}>

                        <Grid container item xs={12}>
                            <Grid className={classes.footBox + ' boxUp multiBox'} item xs={3.7}>
                                <div className={classes.tiltBox}>
                                    <span>개</span>
                                    <span>선</span>
                                    <span>/</span>
                                    <span>조</span>
                                    <span>치</span>
                                </div>
                                <div>
                                    <Link className={classes.footLink} to={"/dashboard/employee/improvement-measures/list"} underline="none">대표이사</Link>
                                    <div className={classes.bottomBox}>
                                        <div>
                                            <div>지시</div>
                                            <div><strong>3</strong>건</div>
                                        </div>
                                        <div>
                                            <div>진행</div>
                                            <div><strong>1</strong>건</div>
                                        </div>
                                        <div>
                                            <div>완료</div>
                                            <div><strong>12</strong>건</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link className={classes.footLink} to={"#none"} underline="none">안전보건팀장</Link>
                                    <div className={classes.bottomBox}>
                                        <div>
                                            <div>지시</div>
                                            <div><strong>3</strong>건</div>
                                        </div>
                                        <div>
                                            <div>진행</div>
                                            <div><strong>1</strong>건</div>
                                        </div>
                                        <div>
                                            <div>완료</div>
                                            <div><strong>12</strong>건</div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid className={classes.footBox + ' boxUp'} item xs={5}>
                                <Link className={classes.footLink} to="/dashboard/employee/accident-countermeasures-implementation/list" underline="none">산업재해 누적 집계</Link>
                                <div className={classes.bottomBox}>
                                    <div>
                                        <div>사망</div>
                                        <div><strong>0</strong>건</div>
                                    </div>
                                    <div>
                                        <div>추락</div>
                                        <div><strong>1</strong>건</div>
                                    </div>
                                    <div>
                                        <div>화재</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                    <div>
                                        <div>충돌</div>
                                        <div><strong>2</strong>건</div>
                                    </div>
                                    <div>
                                        <div>전기</div>
                                        <div><strong>3</strong>건</div>
                                    </div>
                                    <div>
                                        <div>고소</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                    <div>
                                        <div>급성독성</div>
                                        <div><strong>6</strong>건</div>
                                    </div>
                                    <div>
                                        <div>끼임</div>
                                        <div><strong>12</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid className={classes.footBox + ' boxUp'} item xs={3}>
                                <Link className={classes.footLink} to={"/dashboard/employee/security-work-content"} underline="none">11/27(화) - 안전작업허가 공사내역</Link>
                                <div className={classes.bottomBox}>
                                    <div>
                                        <div>고소</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                    <div>
                                        <div>화학물</div>
                                        <div><strong>1</strong>건</div>
                                    </div>
                                    <div>
                                        <div>밀폐</div>
                                        <div><strong>2</strong>건</div>
                                    </div>
                                    <div>
                                        <div>굴착</div>
                                        <div><strong>3</strong>건</div>
                                    </div>
                                    <div>
                                        <div>기타</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} sx={{ marginBottom: '3px' }}>
                            <Grid className={classes.footBox + ' boxDown'} item xs={8.75}>
                                <Slider className={classes.footSlider} {...footerSlider}>
                                    {noticesList?.data.RET_DATA.map((notice) => (
                                        <div>
                                            <div>{notice.insertDate}</div>
                                            {notice.importCd === "001" && <span className={classes.slideLabelHot}>HOT</span>}
                                            <Link to={`/dashboard/employee/notifications/view/${notice.noticeId}`} className={classes.linkBtn}>{notice.title}</Link>
                                        </div>
                                    ))}
                                </Slider>
                                <Link className={classes.sliderLink} to={"/dashboard/employee/notifications/list"} underline="none"></Link>
                            </Grid>
                            <Grid className={classes.footBox + ' boxDown ' + classes.footDate} item xs={3}>
                                <div className={classes.footDay + ' dateBox'}>
                                    <div>DAY</div>
                                    <div className={classes.dayNums}>
                                        <div><img src={numThree} alt="number three" /></div>
                                        <div><img src={numTwo} alt="number two" /></div>
                                        <div><img src={numFour} alt="number four" /></div>
                                        <div><img src={numFive} alt="number five" /></div>
                                    </div>
                                </div>
                                <div className={classes.footTime + ' dateBox'}>
                                    <div>TIME</div>
                                    <div className={classes.timeNums}>
                                        <div><img src={numTwo} alt="number two" /></div>
                                        <div><img src={numOne} alt="number one" /></div>
                                        <span>:</span>
                                        <div><img src={numThree} alt="number three" /></div>
                                        <div><img src={numNine} alt="number nine" /></div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>

        </WideLayout>
    );
};

export default Employee;
