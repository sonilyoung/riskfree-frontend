import React, { useEffect, useState } from 'react';
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
import arrowNext from '../../../../assets/images/arrow_next.png';
import arrowPrev from '../../../../assets/images/arrow_prev.png';
import arrowUp from '../../../../assets/images/ic_up.png';
import arrowDown from '../../../../assets/images/ic_down.png';

import circleGreen from '../../../../assets/images/bg_circle_green.png';
import circleYellow from '../../../../assets/images/bg_circle_yellow.png';
import circleOrange from '../../../../assets/images/bg_circle_orange.png';
import circleRed from '../../../../assets/images/bg_circle_red.png';
import gageImg from '../../../../assets/images/bg_gage.png';
import needleImg from '../../../../assets/images/img_needle.png';
import gageState from '../../../../assets/images/txt_warning.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Link from '@mui/material/Link';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import { remove } from '../../../../services/core/User/Token';
import { useGetAccidentsPreventionMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetCompanyInfoMutation, useGetDayInfoMutation, useGetEssentialRateMutation, useGetImprovementLawOrderMutation, useGetLoginInfoMutation, useGetNoticeListMutation, useGetRelatedRawRateMutation, useGetWorkplaceListMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetLeaderImprovementListMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetAccidentTotalMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetSafeWorkHistoryListMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import moment from 'moment'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import useUserToken from '../../../../hooks/core/UserToken/UserToken';

const useStyles = makeStyles(() => ({
    dashboardWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center',
        minWidth: '1920px !important',
        minHeight: '100vh',
        overflowY: 'scroll',
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
        display: 'none !important'
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
        boxShadow: '0 0 10px rgb(0 0 0 / 30%)'
    },
    graphImageNone: {
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
    boxTableNone: {
        display: "none !important"
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
        backgroundImage: 'linear-gradient(#424762, #1e2130)',
        borderRadius: '32px',
        width: '1720px',
        height: '545px',
        padding: '0 165px'
    },
    slickCircle: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '210px',
        height: '210px',
        margin: '1% .6% 0',
        backgroundRepeat: 'no-repeat',
        transition: 'transform .3s',
        '&:hover': {
            transform: 'scale(1.08)'
        },
        '&.green': {
            backgroundImage: 'url(' + circleGreen + ')',
        },
        '&.red': {
            backgroundImage: 'url(' + circleRed + ')',
        },
        '&.orange': {
            backgroundImage: 'url(' + circleOrange + ')',
        },
        '&.yellow': {
            backgroundImage: 'url(' + circleYellow + ')',
        }
    },
    slickLink: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10%',
        boxSizing: 'border-box',
        borderRadius: '50%',
        '& div:first-of-type': {
            fontSize: '52px',
            fontWeight: '700',
            color: '#fff'
        },
        '& div:last-of-type': {
            fontSize: '22px',
            fontWeight: '400',
            color: '#202231',
            letterSpacing: '-1.08px',
            textAlign: 'center'
        },
        textDecoration: "none"
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
    dashSlider: {
        // '& .slick-slide [class*=slickCircle]': {
        //     transition: '.5s',
        //     transform: 'scale(0.5)'
        // },
        // '& .slick-active [class*=slickCircle]': {
        //     transition: '.5s',
        //     transform: 'scale(1)'
        // },
        '& .slick-list': {
            padding: '1px 0 20px 0',
            marginTop: '8px',
        },
        '--arrow_offset': '-240px',
        '& .slick-arrow': {
            top: '42%',
            width: '50px',
            height: '111px'
        },
        '& .slick-next': {
            backgroundImage: 'url(' + arrowNext + ')',
            right: 'var(--arrow_offset)',
            '&:before': {
                display: 'none'
            }
        },
        '& .slick-prev': {
            backgroundImage: 'url(' + arrowPrev + ')',
            left: 'var(--arrow_offset)',
            '&:before': {
                display: 'none'
            }
        }
    },
    dashboardSlide: {
        display: 'flex !important',
        flexWrap: 'wrap',
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '8px 20px',
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
        '&:nth-of-type(2) .rightBox div:first-of-type div:last-of-type': {
            color: '#fdcb05'
        }
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
            color: "#fff"
        },
        textDecoration: "none",
        color: "white"
    },
    bottomBox: {
        display: 'flex',
        width: '100%',
        height: '77px',
        '&.leftBox': {
            justifyContent: 'space-around',
            '& div': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& *': {
                    margin: '0 5px'
                },
                '& strong': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50px',
                    height: '50px',
                    fontSize: '30px',
                    fontWeight: '500',
                    background: '#556478',
                    borderRadius: '50%',
                }
            },
            '& div:first-of-type strong': {
                color: '#fdcb05',
            },
            '& div:last-of-type strong': {
                color: '#00adef',
            }
        },
        '&.rightBox': {
            display: 'flex',
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
                border: '0'
            }
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
        color: "#fff",
        '&:visited': {
            color: '#fff'
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
            display: "block",
            top: '60px',
            left: '5px',
        },
        '&.user_popupClose': {
            display: "none"
        },
        '&.settings_popup': {
            display: "block",
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
            width: '100%',
            borderTop: '1px solid #c1c6d0',
            marginTop: '9px',
            paddingTop: '19px'
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
                color: '#ddd',
                display: 'none'
            },
        },
        '& .Mui-disabled': {
            color: '#ddd !important',
            '-webkit-text-fill-color': 'unset !important',
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

// const AdminButton = styled(ButtonUnstyled)`
//     background: transparent url(${adminIcon});
//     &:hover {
//         background-image: url(${adminIconHover});
//     }
// `;

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


const Director = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [userToken] = useUserToken();
    const [getDayInfo] = useGetDayInfoMutation();
    const [getNoticeList] = useGetNoticeListMutation();
    const [getEssentialRate] = useGetEssentialRateMutation();
    const [getAccidentsPrevention] = useGetAccidentsPreventionMutation();
    const [getImprovementLawOrder] = useGetImprovementLawOrderMutation();
    const [getRelatedRawRate] = useGetRelatedRawRateMutation();
    const [getCompanyInfo] = useGetCompanyInfoMutation();
    const [getWorkplaceList] = useGetWorkplaceListMutation();
    const [getBaseline] = useGetBaselineMutation();
    const [getBaselineList] = useGetBaselineListMutation();

    const [noticesList, setNoticesList] = useState([]);
    const [userPopup, setUserPopup] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [chartPop, setChartPop] = useState(false)
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [num, setNum] = React.useState('');
    const [getLeaderImprovementList] = useGetLeaderImprovementListMutation()
    const [leadersImproveList, setLeadersImproveList] = useState([])
    const [getAccidentTotal] = useGetAccidentTotalMutation()
    const [accidentTotal, setAccidentTotal] = useState({})
    const [getSafeWorkHistoryList] = useGetSafeWorkHistoryListMutation()
    const [safeWorkHistoryList, setSafeWorkHistoryList] = useState({})
    const [hours, setHours] = useState("")
    const [minutes, setMinutes] = useState("")
    const [toggleGrid, setToggleGrid] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({});
    const [workplaceList, setWorkplaceList] = useState([]);
    const [essentialRateList, setEssentialRateList] = useState([]);
    const [accidentsPrevention, setAccidentsPrevention] = useState({});
    const [improvementLawOrderRate, setImprovementLawOrderRate] = useState({});
    const [relatedRawRate, setRelatedRawRate] = useState({});
    const [baselineData, setBaselineData] = useState({});
    const [baselineList, setBaselineList] = useState([]);
    const [baselineId, setBaselineId] = useState(12);
    const [baselineStart, setBaselineStart] = useState("2022-09-08");
    const [dayInfo, setDayInfo] = useState({});

    // izmeniti ovo
    const [userInfo, setUserInfo] = useState({
        userCompanyId: userToken.getUserCompanyId(),
        userWorkplaceId: userToken.getUserWorkplaceId(),
    });

    const { userCompanyId, userWorkplaceId } = userInfo;

    const handleLogOut = () => {
        remove();
        navigate('/');
    }

    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const handleSlickCircleColor = (percentage) => {
        if (!percentage && percentage != '%') {
            return ' red';
        } else {
            const percentageNumber = percentage && parseFloat(percentage?.split('%')[0])

            if (percentageNumber < 70) return ' red';
            else if (percentageNumber >= 70 && percentageNumber <= 79) return ' orange';
            else if (percentageNumber >= 80 && percentageNumber < 90) return ' yellow';
            else if (percentageNumber >= 90) return ' green';
        }
    }

    const handleEssentailRateMeasure = () => {
        const essentialRateMeasureScore = essentialRateList?.RET_DATA?.topScore;

        if (essentialRateMeasureScore === 'danger') return 75;
        else if (essentialRateMeasureScore === 'warning') return 25;
        else if (essentialRateMeasureScore === 'caution') return -25;
        else if (essentialRateMeasureScore === 'normal') return -75;
    }


    const fetchBaselineList = async () => {
        const response = await getBaselineList({});
        setBaselineList(response.data.RET_DATA);
        console.log(response);
    }

    const fetchBaseline = async () => {
        const response = await getBaseline({
            "baselineId": baselineId
        })
        setBaselineData(response.data.RET_DATA);
    }

    const fetchNoticeList = async () => {
        const response = await getNoticeList({});
        setNoticesList(response.data.RET_DATA);
    }

    const fetchCompanyInfo = async () => {
        const response = await getCompanyInfo({
            "companyId": userCompanyId,
            "workplaceId": userWorkplaceId
        });
        setCompanyInfo(response);
    }

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList();
        setWorkplaceList(response.data);
    }

    const fetchEssentialRateList = async () => {
        const response = await getEssentialRate({
            "baselineId": baselineId,
            "workplaceId": userWorkplaceId
        });
        setEssentialRateList(response.data);
    }

    const fetchAccidentsPrevention = async () => {
        const response = await getAccidentsPrevention({
            "baselineId": baselineId,
            "workplaceId": userWorkplaceId
        });
        setAccidentsPrevention(response.data);
    }

    const fetchImprovementLawOrderRate = async () => {
        const response = await getImprovementLawOrder({
            "baselineId": baselineId,
            "workplaceId": userWorkplaceId
        });
        setImprovementLawOrderRate(response.data);
    }

    const fetchRelatedRawRate = async () => {
        const response = await getRelatedRawRate({
            "baselineId": baselineId,
            "workplaceId": userWorkplaceId
        });
        setRelatedRawRate(response.data);
    }

    const fetchLeadersImproveList = async () => {
        const response = await getLeaderImprovementList({
            "baselineId": baselineId,
            "companyId": userCompanyId,
            "instruction": 1,
            "workplaceId": userWorkplaceId
        });
        setLeadersImproveList(response.data.RET_DATA);
    }

    const fetchAccidentTotal = async () => {
        const response = await getAccidentTotal({
            "baselineId": baselineId,
            "caughtCnt": 0,
            "companyId": userCompanyId,
            "workplaceId": userWorkplaceId
        })
        setAccidentTotal(response.data.RET_DATA);
    }

    const fetchSafeWorkHistoryList = async () => {
        const response = await getSafeWorkHistoryList({
            "baselineId": 12,
            "companyId": userCompanyId,
            "workplaceId": userWorkplaceId
        })
        setSafeWorkHistoryList(response.data.RET_DATA);
    }

    const fetchDayInfo = async () => {
        const response = await getDayInfo({
            "baselineStart": baselineStart
        })
        setDayInfo(response.data.RET_DATA);

    }

    const refreshClock = () => {
        const now = moment()
        setHours(now.format("hh"))
        setMinutes(now.format("mm"))
    }

    const [date, setDate] = React.useState(null);

    const [locale] = React.useState('ko');

    const dashboardSlider = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={() => {
                    let baselineIdIndex = baselineId && baselineList.length ? baselineList.findIndex(baselineItem => baselineItem.baselineId === baselineId) + 1 : 0;
                    if (baselineIdIndex >= baselineList.length) {
                        baselineIdIndex = 0;
                    }
                    setBaselineStart(baselineList.at(baselineIdIndex).baselineStart);
                    setBaselineId(baselineList.at(baselineIdIndex).baselineId);
                    onClick();
                }}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={() => {
                    const baselineIdIndex = baselineId && baselineList.length ? baselineList.findIndex(baselineItem => baselineItem.baselineId === baselineId) - 1 : 0;
                    setBaselineStart(baselineList.at(baselineIdIndex).baselineStart);
                    setBaselineId(baselineList.at(baselineIdIndex).baselineId);
                    onClick();
                }}
            />
        );
    }


    useEffect(() => {
        fetchBaseline();
        fetchCompanyInfo();
        fetchEssentialRateList();
        fetchImprovementLawOrderRate();
        fetchRelatedRawRate();
        fetchLeadersImproveList();
        fetchAccidentTotal();
        fetchSafeWorkHistoryList();
        // fetchAccidentsPrevention();
        fetchDayInfo();

    }, [baselineId, userWorkplaceId]);

    useEffect(() => {
        fetchBaselineList();
        handleLoginInfo();
        fetchWorkplaceList();
        fetchNoticeList();

        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);


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
                                        <TextField
                                            id="standard-basic"
                                            placeholder="회사 상호명"
                                            variant="outlined"
                                            sx={{ width: 350 }}
                                            className={classes.popupTextField}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            placeholder="사업장 명칭"
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
                                            <MenuItem value="">업종선택</MenuItem>
                                        </Select>
                                        <Select
                                            className={classes.popupTextField}
                                            sx={{ width: 350 }}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value="">규모선택</MenuItem>
                                        </Select>
                                        <span></span>
                                        <TextField
                                            id="standard-basic"
                                            placeholder="사용자 성명"
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
                                            <MenuItem value="">직책 선택</MenuItem>
                                        </Select>
                                        <span></span>
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
                                <FormControl sx={{ width: 180 }} className={classes.dropMenu}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled
                                    >
                                        <MenuItem value=""> {companyInfo.data?.RET_DATA?.scale} 이하</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: 150, marginLeft: '8px' }} className={classes.dropMenu}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled
                                    >
                                        <MenuItem value=""> {companyInfo.data?.RET_DATA?.sector}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.rightMenu}>
                                <div className={classes.userInformation}>
                                    <div>{loginInfo?.loginId} / <span>{loginInfo?.roleName}</span></div>
                                    <div>계약기간 : {companyInfo.data?.RET_DATA?.contractStartDate} ~  {companyInfo.data?.RET_DATA?.contractEndDate}</div>
                                </div>
                                <LogButton className={classes.mainMenuButton} onClick={handleLogOut}></LogButton>
                                <SettingsButton className={classes.mainMenuButton} onClick={() => setSettingsPopup(true)}></SettingsButton>
                                <div className={settingsPopup ? (classes.headerPopup + ' settings_popup') : (classes.headerPopup + ' settings_popupClose')}>
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
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                                    <DesktopDatePicker
                                                        className={classes.selectMenuDate}
                                                        label=" "
                                                        inputFormat="YYYY-MM-DD"
                                                        value={date}
                                                        onChange={setDate}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: 220 }} />}
                                                    />
                                                </LocalizationProvider>
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
                            {/* <AdminButton className={classes.mainMenuButton}></AdminButton> */}
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
                            <div className={classes.adminFieldText}> {companyInfo.data?.RET_DATA?.shGoal}</div>
                        </div>
                        <div className={classes.adminLogo}>
                            <img src={adminLogo} alt="admin logo" />
                        </div>
                        <div className={classes.adminField + ' ' + classes.adminFieldRight}>
                            <div className={classes.adminFieldText}>경영방침</div>
                            <div className={classes.adminFieldText}>{companyInfo.data?.RET_DATA?.missionStatements}</div>
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
                                        <ButtonGrid onClick={() => setToggleGrid(!toggleGrid)}>{toggleGrid ? "Graph" : "Grid"}</ButtonGrid>
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
                                <div className={toggleGrid ? classes.graphImageNone : classes.graphImage}>
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
                                <Grid item xs={12} className={toggleGrid ? classes.boxTable : classes.boxTableNone}>
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
                            {/* WORKPLACE LIST */}
                            <Slider {...headerSlider}>
                                <div><MainNavButton onClick={() => setUserInfo({ ...userInfo, userWorkplaceId: null })}>전체사업장</MainNavButton></div>
                                {workplaceList.length != 0 && workplaceList?.RET_DATA?.map(workplaceItem =>
                                    <div><MainNavButton onClick={() => setUserInfo({ ...userInfo, userCompanyId: workplaceItem.companyId, userWorkplaceId: workplaceItem.workplaceId })}>{workplaceItem.workplaceName}</MainNavButton></div>
                                )}
                            </Slider>
                        </div>
                    </Grid>

                </Grid>
                <Grid className={classes.pageBody} item xs={10.7}>
                    <div className={classes.managementOrder}>
                        {baselineData && <>{baselineData?.baselineName} 차 :<strong>{baselineData?.baselineStart} ~ {baselineData?.baselineEnd}</strong></>}
                    </div>
                    <Slider className={classes.dashSlider} {...dashboardSlider} >
                        <div className={classes.dashboardSlide}>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate1?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate1?.score}</strong></div>
                                    <div>안전보건 목표 및<br /> 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate2?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate2?.score}</strong></div>
                                    <div>안전보건 총괄관리<br /> 전담조직</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate3?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate3?.score}</strong></div>
                                    <div>유해요인개선<br /> 업무절차</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate4?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate4?.score}</strong></div>
                                    <div>예산편성 및<br /> 집행관리</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate5?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate5?.score}</strong></div>
                                    <div>업무수행 권한<br /> 및 책임</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate6?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate6?.score}</strong></div>
                                    <div>안전보건 전문인력<br /> 배치</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate7?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate7?.score}</strong></div>
                                    <div>종사자 개선<br /> 의견수렴</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate8?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate8?.score}</strong></div>
                                    <div>비상대응<br /> 절차마련</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate9?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate9?.score}</strong></div>
                                    <div>도급/용역 위탁 시<br /> 안전보건 확보</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor('100%')}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{accidentsPrevention?.RET_DATA?.enforceRate}10</strong>%</div>
                                    <div>재발방지<br /> 대책</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(improvementLawOrderRate?.RET_DATA?.improvemetRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{improvementLawOrderRate?.RET_DATA?.improvemetRate}</strong></div>
                                    <div>개선/시정<br /> 명령</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor('0%')}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{relatedRawRate?.RET_DATA?.relatedLawRate}</strong></div>
                                    <div>관계법령에 따른<br /> 의무이행</div>
                                </Link>
                            </div>
                        </div>

                        <div className={classes.dashboardSlide}>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate1?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate1?.score}</strong></div>
                                    <div>안전보건 목표 및<br /> 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate2?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate2?.score}</strong></div>
                                    <div>안전보건 총괄관리<br /> 전담조직</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate3?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate3?.score}</strong></div>
                                    <div>유해요인개선<br /> 업무절차</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate4?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate4?.score}</strong></div>
                                    <div>예산편성 및<br /> 집행관리</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate5?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate5?.score}</strong></div>
                                    <div>업무수행 권한<br /> 및 책임</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate6?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate6?.score}</strong></div>
                                    <div>안전보건 전문인력<br /> 배치</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate7?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate7?.score}</strong></div>
                                    <div>종사자 개선<br /> 의견수렴</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate8?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate8?.score}</strong></div>
                                    <div>비상대응<br /> 절차마련</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate9?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate9?.score}</strong></div>
                                    <div>도급/용역 위탁 시<br /> 안전보건 확보</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor('100%')}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{accidentsPrevention?.RET_DATA?.enforceRate}10</strong>%</div>
                                    <div>재발방지<br /> 대책</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(improvementLawOrderRate?.RET_DATA?.improvemetRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{improvementLawOrderRate?.RET_DATA?.improvemetRate}</strong></div>
                                    <div>개선/시정<br /> 명령</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor('0%')}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{relatedRawRate?.RET_DATA?.relatedLawRate}</strong></div>
                                    <div>관계법령에 따른<br /> 의무이행</div>
                                </Link>
                            </div>
                        </div>
                    </Slider>
                </Grid>
                <Grid className={classes.lowerDashboard} container item xs={12}>

                    <Grid className={classes.gageWrap} item xs={2}>
                        <div className={classes.gageArrow}>
                            <div className={classes.needleImg} style={{ transform: `rotate(${handleEssentailRateMeasure()}deg)` }}></div>
                            <div className={classes.gageState}></div>
                        </div>
                    </Grid>

                    <Grid className={classes.boxWrap} item xs={10}>

                        <Grid container item xs={12}>
                            <Grid className={classes.footBox + ' boxUp'} item xs={3}>
                                <Link className={classes.footLink} to="/dashboard/employee/improvement-measures/list" underline="none">대표이사 개선조치</Link>
                                <div className={classes.bottomBox + ' leftBox'}>
                                    <div>
                                        <div>지시</div>
                                        <strong>{leadersImproveList && leadersImproveList[0] ? leadersImproveList[0]?.instruction : 0}</strong>
                                        <div>건</div>
                                    </div>
                                    <div>
                                        <div>진행</div>
                                        <strong>{leadersImproveList && leadersImproveList[0] ? leadersImproveList[0]?.progress : 0}</strong>
                                        <div>건</div>
                                    </div>
                                    <div>
                                        <div>완료</div>
                                        <strong>{leadersImproveList && leadersImproveList[0] ? leadersImproveList[0]?.complete : 0}</strong>
                                        <div>건</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid className={classes.footBox + ' boxUp'} item xs={5.7}>
                                <Link className={classes.footLink} to="/dashboard/employee/accident-countermeasures-implementation/list" underline="none">산업재해 누적 집계</Link>
                                <div className={classes.bottomBox + ' rightBox'}>
                                    <div>
                                        <div>사망</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.deathTollCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>동일사고</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.sameAccidentInjuryCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>직업질환</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.jobDeseaseTollCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>추락</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.caughtCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>끼임</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.fireCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>화재</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.fallCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>전기</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.electCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>밀폐</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.confinedCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>중량물</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.heavyCnt : 0}</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid className={classes.footBox + ' boxUp'} item xs={3}>
                                <Link className={classes.footLink} to="/dashboard/director/security-work-content" underline="none">{safeWorkHistoryList && safeWorkHistoryList?.nowDate}({safeWorkHistoryList && safeWorkHistoryList?.nowDay}) - 안전작업허가 공사내역</Link>
                                <div className={classes.bottomBox + ' rightBox'}>
                                    <div>
                                        <div>화기</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.fire : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>밀폐</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.closeness : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>정전</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.blackout : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>굴착</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.excavation : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>방사선</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.radiation : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>고소</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.sue : 0}</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} sx={{ marginBottom: '3px' }}>
                            <Grid className={classes.footBox + ' boxDown'} item xs={8.75}>
                                <Slider className={classes.footSlider} {...footerSlider}>
                                    {noticesList.length && noticesList.map((notice) =>
                                    (<div>
                                        <div>{notice.insertDate}</div>
                                        {notice.importCd === "001" && <span className={classes.slideLabelHot}>HOT</span>}
                                        <Link to={`/dashboard/director/notifications/view/${notice.noticeId}`} className={classes.linkBtn}>{notice.title}</Link>
                                    </div>)
                                    )}
                                </Slider>
                                <Link className={classes.sliderLink} to="/dashboard/director/notifications/list" underline="none"></Link>
                            </Grid>
                            <Grid className={classes.footBox + ' boxDown ' + classes.footDate} item xs={3}>
                                <div className={classes.footDay + ' dateBox'}>
                                    <div>DAY</div>
                                    <div className={classes.dayNums}>
                                        {dayInfo?.day}
                                        {/* <div><img src={numThree} alt="number three" /></div>
                                        <div><img src={numTwo} alt="number two" /></div>
                                        <div><img src={numFour} alt="number four" /></div>
                                        <div><img src={numFive} alt="number five" /></div> */}
                                    </div>
                                </div>
                                <div className={classes.footTime + ' dateBox'}>
                                    <div>TIME</div>
                                    <div className={classes.timeNums}>
                                        {hours?.split("").map((e) => (<div>{e}</div>
                                        ))}
                                        <span>:</span>
                                        {minutes?.split("").map((e) => (<div>{e}</div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>

        </WideLayout >
    );
};

export default Director;
