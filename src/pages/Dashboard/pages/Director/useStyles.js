import { makeStyles } from '@mui/styles';

import dashboardPattern from '../../../../assets/images/dashboard_pattern.png';
import workplaceBackground from '../../../../assets/images/bg_workplace.png';
import btnNext from '../../../../assets/images/btn_next.png';
import btnPrev from '../../../../assets/images/btn_prev.png';
import arrowNext from '../../../../assets/images/arrow_next.png';
import arrowPrev from '../../../../assets/images/arrow_prev.png';
import arrowUp from '../../../../assets/images/ic_up.png';
import orderBackground from '../../../../assets/images/bg_body_order.png';
import arrowDown from '../../../../assets/images/ic_down.png';
import circleGreen from '../../../../assets/images/bg_circle_green.png';
import circleYellow from '../../../../assets/images/bg_circle_yellow.png';
import circleOrange from '../../../../assets/images/bg_circle_orange.png';
import circleRed from '../../../../assets/images/bg_circle_red.png';
import gageImg from '../../../../assets/images/bg_gage.png';
import needleImg from '../../../../assets/images/img_needle.png';
import gageState from '../../../../assets/images/txt_warning.png';
import {keyframes} from "styled-components";

const useStyles = makeStyles(() => ({
    dashboardWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center',
        minWidth: '1900px !important',
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
        height: '135px',
        borderRadius: '50%',
        overflow: 'hidden',
        '& img': {
            width: '60%',
            overflow: 'hidden',
            // width: '70%',
            // height: '70%',
            // borderRadius: '50%',
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
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        padding: '34px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 0 10px rgb(0 0 0 / 30%)',
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
    mainMenuButtonSettings: {
        display: 'block',
        position: "relative",
        top: "0px",
        rigth: "0px",
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
            '& .slick-slide button.current': {
                background: 'linear-gradient(#0186d8, #347dfa)'
            },
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
        height: 'calc(100vh - 420px)',
        backgroundImage: 'linear-gradient(#424762, #1e2130)',
        borderRadius: '32px',
        maxWidth: '1700px !important',
        minHeight: '545px',
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
        transition: 'all 3s ease-in-out',
        animationDuration:'3s',
        animationFillMode:'both',
        '&:hover': {
            transform: 'scale(1.08)',
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
        },
        '&#slick_1': {
            animation : `$listHOver 0.5s 0.03s`,
        },
        '&#slick_2': {
            animation : `$listHOver 0.5s 0.08s`,
        },
        '&#slick_3': {
            animation : `$listHOver 0.5s 0.13s`,
        },
        '&#slick_4': {
            animation : `$listHOver 0.5s 0.18s`,
        },
        '&#slick_5': {
            animation : `$listHOver 0.5s 0.23s`,
        },
        '&#slick_6': {
            animation : `$listHOver 0.5s 0.28s`,
        },
        '&#slick_7': {
            animation : `$listHOver 0.5s 0.31s`,
        },
        '&#slick_8': {
            animation : `$listHOver 0.5s 0.36s`,
        },
        '&#slick_9': {
            animation : `$listHOver 0.5s 0.41s`,
        },
        '&#slick_10': {
            animation : `$listHOver 0.5s 0.46s`,
        },
        '&#slick_11': {
            animation : `$listHOver 0.5s 0.51s`,
        },
        '&#slick_12': {
            animation : `$listHOver 0.5s 0.56s`,
        },

        '&#slick_13': {
            animation : `$listHOver 0.5s 0.03s`,
        },
        '&#slick_14': {
            animation : `$listHOver 0.5s 0.08s`,
        },
        '&#slick_15': {
            animation : `$listHOver 0.5s 0.13s`,
        },
        '&#slick_16': {
            animation : `$listHOver 0.5s 0.18s`,
        },
        '&#slick_17': {
            animation : `$listHOver 0.5s 0.23s`,
        },
        '&#slick_18': {
            animation : `$listHOver 0.5s 0.28s`,
        },
        '&#slick_19': {
            animation : `$listHOver 0.5s 0.31s`,
        },
        '&#slick_20': {
            animation : `$listHOver 0.5s 0.36s`,
        },
        '&#slick_21': {
            animation : `$listHOver 0.5s 0.41s`,
        },
        '&#slick_22': {
            animation : `$listHOver 0.5s 0.46s`,
        },
        '&#slick_23': {
            animation : `$listHOver 0.5s 0.51s`,
        },
        '&#slick_24': {
            animation : `$listHOver 0.5s 0.56s`,
        },                                                                                              
    },
    "@keyframes listHOver": {
        "0%" : { opacity: "0", transform: "translateY(0) scale(1.16)" },
        "30%" : { transform: "translateY(-5px)" },
        "60%" : { opacity: "1", transform: "translateY(5px)" },
        "100%" : { opacity: "1", transform: "translateY(0%)  scale(1)" }        
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
        top: '40%',
        transform: 'translateY(-45%)',
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
    notificationPopup: {
        // display: 'none',
        '--border_radius': '15px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '850px',
        height: '400px',
        border: '3px solid #0183da',
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
    pageOverlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, .1)',
        zIndex: '9999',
        // display: 'none',
    },
    pageOverlayInactive: {
        display: 'none',
    },
    searchRadio: {
        height: '40px',
        justifyContent: 'center',
        boxSizing: 'border-box',
        '& [class*=body1]': {
            fontSize: '16px'
        },
        '& input': {
            cursor: 'default'
        },
        '& label': {
            marginRight: '14px'
        }
    }
}));

export { useStyles };