import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
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

import { remove } from '../../../../services/core/User/Token';
import { useGetAccidentTotalMutation, useGetImprovementListMutation, useGetLeaderImprovementListMutation, useGetLoginInfoMutation, useGetSafeWorkHistoryListMutation, useGetNoticeListMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetCompanyInfoMutation, useGetDayInfoMutation, useGetEssentialRateMutation, useGetAccidentsPreventionMutation, useGetImprovementLawOrderMutation, useGetRelatedLawRateMutation, useGetDutyDetailListMutation, useGetInspectiondocsMutation, useGetDutyCycleMutation, useGetDutyAssignedMutation, useGetRelatedArticleMutation, useGetGuideLineMutation, useGetWorkplaceListMutation, useGetWeatherMutation, useGetNoticeHotListMutation, useUpdateUserCompanyMutation, useCloseMutation, useInsertBaseLineDataCopyMutation, useInsertBaseLineDataUpdateMutation, useInsertBaselineMutation, useGetTitleReportMutation, useGetBaseLineReportMutation, useUpdateSafetyFileMutation, useUpdateScoreMutation, useUpdateRelatedArticleMutation, useGetBaseLineReportGraphMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useUserToken } from '../../../../hooks/core/UserToken';
import moment from 'moment'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';

import { setWorkplaceId, selectWorkplaceId, selectBaselineId, setBaselineId } from '../../../../slices/selections/MainSelection';
import { useDispatch, useSelector } from 'react-redux';

import icoFile from '../../../../assets/images/ic_file.png';
import { OnlyUploadDialog, UploadDialog, UploadEmployeeDialog } from '../../../../dialogs/Upload';
import { Overlay } from '../../../../components/Overlay';
import Ok from '../../../../components/MessageBox/Ok';
import { useFileUploadMutation, useGetFileInfoMutation, useUpdateDocumentFileIdMutation, useGetSafetyFileIdMutation } from '../../../../hooks/api/FileManagement/FIleManagement';

import Chart from 'react-apexcharts';
import YesNo from '../../../../components/MessageBox/YesNo';
import Okay from '../../../../components/MessageBox/Okay';
import Loading from '../../../../pages/Loading';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
            width: '70%',
            height: '70%',
            borderRadius: '50%',
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
            padding: '0'
        },
        '&.secondList': {
            padding: '0px',
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
    const [defaultPage, setDefaultPage] = useState("0101");
    const { MainKey } = useParams(1)

    const [num, setNum] = React.useState("");
    const [userPopup, setUserPopup] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [chartPop, setChartPop] = useState(false)
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [hoverContainer, setHoverContainer] = useState(false)
    const [clickedEssentialRate, setClickedEssentialRate] = useState(1)
    const [clickedEssentialRateForClass, setClickedEssentialRateForClass] = useState("rate1")
    const [clickedDuty, setClickedDuty] = useState(null)
    //하위목록초기화
    const [SubEventExe, setSubEventExe] = useState(null)
    const [getBaselineList] = useGetBaselineListMutation()
    const [getBaseline] = useGetBaselineMutation()
    const [baselineList, setBaselineList] = useState([])
    // const [baselineId, setBaselineId] = useState(6)
    const [baselineData, setBaselineData] = useState({})
    const [improvmentList, setImprovmentList] = useState([]);
    const [leaderImprovementList, setLeaderImprovementList] = useState([]);
    const [safeWorkHistoryList, setSafeWorkHistoryList] = useState([]);
    const [accidentTotal, setAccidentTotal] = useState({});
    const [noticesList, setNoticesList] = useState([]);
    const [dayInfo, setDayInfo] = useState(null);
    const [toggleGrid, setToggleGrid] = useState(false);

    const [userToken] = useUserToken()
    const [getSafeWorkHistoryList] = useGetSafeWorkHistoryListMutation();
    const [getAccidentTotal] = useGetAccidentTotalMutation();
    const [getImprovementList] = useGetImprovementListMutation();
    const [getLeaderImprovementList] = useGetLeaderImprovementListMutation();
    const [getDayInfo] = useGetDayInfoMutation();
    const [getNoticeList] = useGetNoticeListMutation();
    const [getCompanyInfo] = useGetCompanyInfoMutation()
    const [companyInfo, setCompanyInfo] = useState({})
    const companyId = userToken.getUserCompanyId()
    const [hours, setHours] = useState("")
    const [minutes, setMinutes] = useState("")
    const [getEssentialRate] = useGetEssentialRateMutation()
    const [essentialRates, setEssentialRates] = useState([])
    const [getAccidentsPrevention] = useGetAccidentsPreventionMutation()
    const [accidentsPreventionPercentage, setAccidentsPreventionPercentage] = useState({})
    const [getImprovementLawOrder] = useGetImprovementLawOrderMutation()
    const [lawOrderPercentage, setLawOrderPercentage] = useState({})
    const [getRelatedLawRate] = useGetRelatedLawRateMutation()
    const [relatedLawRatePercentage, setRelatedLawRatePercentage] = useState({})
    const [getDutyDetailList] = useGetDutyDetailListMutation()
    const [dutyDetailList, setDutyDetailList] = useState([])
    const [getInspectionsDocs] = useGetInspectiondocsMutation()
    const [inspectionsDocs, setInspectionsDocs] = useState([])
    const [getDutyCycle] = useGetDutyCycleMutation()
    const [dutyCycle, setDutyCycle] = useState([])
    const [getDutyAssigned] = useGetDutyAssignedMutation()
    const [dutyAssigned, setDutyAssigned] = useState([])
    const [getRelatedArticle] = useGetRelatedArticleMutation()
    const [relatedArticle, setRelatedArticle] = useState([])
    const [getGuideLine] = useGetGuideLineMutation()
    const [guideLine, setGuideLine] = useState([])
    const [getWorkplaceList] = useGetWorkplaceListMutation()
    const [workplaceList, setWorkplaceList] = useState([])
    // const currentWorkplaceId = useSelector(selectWorkplaceId);
    const [baselineStart, setBaselineStart] = useState("")
    const currentBaselineId = useSelector(selectBaselineId);
    const [baselineIdForSelect, setBaselineIdForSelect] = useState(currentBaselineId)
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [getWeather] = useGetWeatherMutation()
    const [weatherData, setWeatherData] = useState({})
    const [insertBaseline] = useInsertBaselineMutation();
    const [insertBaseLineDataCopy] = useInsertBaseLineDataCopyMutation();
    const [insertBaseLineDataUpdate] = useInsertBaseLineDataUpdateMutation();
    const [close] = useCloseMutation();
    const [updateUserCompany] = useUpdateUserCompanyMutation();
    const [inspectionDocsPopup, setInspectionDocsPopup] = useState(false);
    const [baselineInfo, setBaselineInfo] = useState({
        "baselineName": "",
        "baselineStart": null,
        "baselineEnd": null
    });
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [safetyGoal, setSafetyGoal] = useState("");
    const [missionStatement, setMissionStatement] = useState("");
    // treba da se menja
    const [attachedFileId, setAttachedFileId] = useState(1);
    const [targetBaselineId, setTargetBaselineId] = useState("");
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({
        userCompanyId: userToken.getUserCompanyId(),
        userWorkplaceId: userToken.getUserWorkplaceId(),
        userRoleCode: userToken.getUserRoleCd()
    });
    const [noticeHotList, setNoticeHotList] = useState([]);
    const [getNoticeHotList] = useGetNoticeHotListMutation();

    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupShowClose, setYesNoPopupShowClose] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogEmployee, setOpenDialogEmployee] = useState(false)
    const [openSafetyDialog, setOpenSafetyDialog] = useState(false)
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [selectedFile, setSelectedFile] = useState(null);
    const [inspectionFileId, setInspectionFileId] = useState(null)
    const [articleNoForInspection, setArticleNoForInspection] = useState(null)
    const [uploadFlag, setUploadFlag] = useState(false)
    const [evaluation, setEvaluation] = useState("")
    const [evaluationPopup, setEvaluationPopup] = useState(false)
    const [getTitleReport] = useGetTitleReportMutation();
    const [getBaseLineReport] = useGetBaseLineReportMutation();
    const [condition, setCondition] = useState("1");
    const [openDialogOnly, setOpenDialogOnly] = useState(false);
    const labelObjectOnly = {
        upperLabel: "로고 등록",
        middleLabel: "등록할 파일을 업로드 합니다."
    }
    const [selectedFileName, setSelectedFileName] = useState("")
    const [labelObject, setLabelObject] = useState({
        upperLabel: "",
        middleLabel: "",
    })
    const [reportList, setReportList] = useState([]);
    const [reportTitle, setReportTitle] = useState([]);
    const [getBaseLineReportGraph] = useGetBaseLineReportGraphMutation();
    const [chartSeries, setChartSeries] = useState([{ name: 'name', data: [] }]);
    const [chartInfo, setChartInfo] = useState({
        options: {
            chart: {
                type: 'bar',
                height: '100%',
                width: '100%',
                stackType: 'normal'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                type: 'category',
                categories: [],
                position: 'bottom',
                labels: {
                    show: true,
                    rotate: 0,
                },
            },
            fill: {
                opacity: 1
            },          
        },

    });

    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "performBeforeId": "",
        "performAfterId": ""
    })
    const [employeeFiles, setEmployeeFiles] = useState({
        "safetyFileUpload": "",
        "logoImgUpload": "",
        "documentFileUpload": "",
        "inspectionFile": ""
    })
    const [fileUpload] = useFileUploadMutation();
    const [getFileInfo] = useGetFileInfoMutation()
    const [updateSafetyFile] = useUpdateSafetyFileMutation()
    const [updateDocumentFileId] = useUpdateDocumentFileIdMutation()
    const [updateScore] = useUpdateScoreMutation()
    const [evaluationIndex, setEvaluationIndex] = useState(null)
    const [updateRelatedArticle] = useUpdateRelatedArticleMutation()

    const { userCompanyId, userWorkplaceId, userRoleCode } = userInfo;

    const [wrongCredentialsPopup, setWrongCredentialsPopup] = useState(false);

    const handleChartCategoriesDisplay = (chartCategories) => {
        
        if(condition==="5" || condition==="6"){            
            setChartInfo({ ...chartInfo, options: { ...chartInfo.options, xaxis: { categories: chartCategories ,labels: {show: true,rotate: 0}} , yaxis: {title: {text: '발생건수'}}, tooltip: {y: {formatter: function (val) {return val + "건"}}}} });    
        }else if(condition==="3"){                     
            setChartInfo({ ...chartInfo, options: { ...chartInfo.options, xaxis: { categories: chartCategories ,labels: {show: true,rotate: -45}} , yaxis: {title: {text: '% rate'}}, tooltip: {y: {formatter: function (val) {return val + "% rate"}}}} });
        }else{    
            setChartInfo({ ...chartInfo, options: { ...chartInfo.options, xaxis: { categories: chartCategories ,labels: {show: true,rotate: 0}} , yaxis: {title: {text: '% rate'}}, tooltip: {y: {formatter: function (val) {return val + "% rate"}}}} });    
        }
        
    }
    const handleNotificationPopupsShow = (notificationIndex) => {
        const notificationPopupList = noticeHotList?.filter((noticeHotItem, index) => notificationIndex != index);
        setNoticeHotList(notificationPopupList);
    }

    const [getSafetyFileId] = useGetSafetyFileIdMutation()
    const [safetyFileId, setSafetyFileId] = useState("");  

    const getSafetyFile = async () => {
        const response = await getSafetyFileId({});
        setSafetyFileId(response.data.RET_DATA?.safetyPermitFileId);
    }

    //로딩바추가
    const [loading, setLoading] = useState(true);

    //설정창 아코디언 선언
    const [expanded, setExpanded] = React.useState('');

    const panelhandleChange = (panel) => (event, newExpanded) => {
      if(panel === 'panel3') {
        setTargetBaselineId('');
      }
      setExpanded(newExpanded ? panel : false);
    };
    
    
    //관리차수 마감
    const handleClose = async () => {
        //const response = await close({});
        setYesNoPopupMessage('선택한 해당차수를 마감 하시겠습니까?');
        setYesNoPopupShowClose(true);
    }
    
    
    const handleInsertBaseline = async () => {
        if (baselineInfo.baselineName.length <= 0) {
            setOkayPopupMessage("'관리차수'를 입력해주세요.");
            setOkayPopupShow(true);                    
            return false;
        }

        if (baselineInfo.baselineStart === null || baselineInfo.baselineStart.length <= 0) {
            setOkayPopupMessage("'관리차수 시작일자'를 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }

        if (baselineInfo.baselineEnd === null || baselineInfo.baselineEnd.length <= 0) {
            setOkayPopupMessage("'관리차수 종료일자'를 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }

        const response = await insertBaseline(baselineInfo);
        if (response?.data?.RET_CODE === "0000" || response?.data?.RET_CODE === "0201") {
            setYesNoPopupShow(false);
            setOkayPopupMessage('신규차수를 등록하였습니다.');
            setOkayPopupShow(true);
            setDefaultPage(response?.data?.RET_CODE);
        } else {
            setOkayPopupMessage(`${response?.data?.RET_DESC}`);
            setOkayPopupShow(true);
        }
        fetchBaselineList();        
        setBaselineInfo({ "baselineName": "", "baselineStart": null, "baselineEnd": null })
        const responseSaferyFile = await updateSafetyFile({ "attachFileId": employeeFiles.safetyFileUpload, })
    }

    const handleInsertBaseLineDataCopy = async () => {
        if((targetBaselineId === '') || (targetBaselineId === null)){
            setOkayPopupMessage("'복사할 관리차수'를 선택하세요.");
            setOkayPopupShow(true);
        } else {
            setLoading(true);
            const response = await insertBaseLineDataCopy({
                "baselineId": targetBaselineId,
                "targetBaselineId": currentBaselineId
            });
            setLoading(false);
            if (response?.data?.RET_CODE === "0000" || response?.data?.RET_CODE === "0201") {
                setOkayPopupMessage("'차수 복사'가 완료되었습니다");
                setOkayPopupShow(true);
                setDefaultPage(response?.data?.RET_CODE);
            } else {
                setOkayPopupMessage(`${response?.data?.RET_DESC}`);
                setOkayPopupShow(true);
            }
        }
    }

    //관리차수 마감처리
    const handlecloseUpdate = async () => {
        const response = await close({"baselineId" : currentBaselineId});
        if (response?.data?.RET_CODE === "0000" || response?.data?.RET_CODE === "0201") {
            setYesNoPopupShowClose(false);
            setOkayPopupMessage('선택한 해당차수의 마감을 처리하였습니다.');
            setOkayPopupShow(true);
            setDefaultPage(response?.data?.RET_CODE);
        } else {
            setOkayPopupMessage(`${response?.data?.RET_DESC}`);
            setOkayPopupShow(true);
        }
    }

    //안전보건관리체계의 구축 및 이행 항목 업데이트
    const handleInsertBaseLineDataUpdate = async () => {
        setLoading(true);
        const response = await insertBaseLineDataUpdate({"baselineId" : currentBaselineId});
        setLoading(false);
        if (response?.data?.RET_CODE === "0000" || response?.data?.RET_CODE === "0201") {
            setYesNoPopupShow(false);
            setOkayPopupMessage('업데이트를 완료하였습니다.');
            setOkayPopupShow(true);
            setDefaultPage(response?.data?.RET_CODE);

        } else {
            setOkayPopupMessage(`${response?.data?.RET_DESC}` `${response?.data?.RET_CODE}`);
            setOkayPopupShow(true);
        }
    }    

    const handleUpdateUserCompany = async () => {

        if(companyInfo?.missionStatements.length > 16){ 
            setYesNoPopupShow(false);
            setOkayPopupMessage('경영방침은 16자 이내입니다.');
            setOkayPopupShow(true);
            return false;
        }
        
        if(companyInfo?.shGoal.length > 16){
            setYesNoPopupShow(false);
            setOkayPopupMessage('안전보건목표는 16자 이내입니다.');
            setOkayPopupShow(true);
            return false;
        }
        
        const response = await updateUserCompany({
            "attachFileId": employeeFiles.logoImgUpload,
            "missionStatements": companyInfo?.missionStatements,
            "safetyGoal": companyInfo?.shGoal
        });
        setOkayPopupMessage(response.data.RET_DESC);
        setOkayPopupShow(true);
        fetchCompanyInfo();
        setMissionStatement("");
        setSafetyGoal("");
    }
    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }
    const handleLogOut = () => {
        remove();
        window.sessionStorage.removeItem('firstLoad');
        navigate('/');
    }

    const handleChange = (event) => {
        setNum(event.target.value);
    }

    const fetchNoticeList = async () => {
        const response = await getNoticeList({});
        setNoticesList(response?.data?.RET_DATA);
    }

    const fetchImprovementList = async () => {
        const response = await getImprovementList({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        });
        setImprovmentList(!!(response.data.RET_DATA) && !!(response.data.RET_DATA) && response?.data?.RET_DATA[0]);
    }

    const fetchLeaderImprovementList = async () => {
        const response = await getLeaderImprovementList({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        });
        setLeaderImprovementList(!!(response.data.RET_DATA) && response?.data?.RET_DATA[0]);
    }

    const fetchBaselineList = async () => {
        const response = await getBaselineList({})
        setBaselineList(response.data.RET_DATA)
        setBaselineStart(!!response.data.RET_DATA && response.data.RET_DATA.baselineStart)
    }

    // 이동 처리
    const fetchBaseline = async (baselineId) => {
        if(baselineId != null) {
            dispatch(setBaselineId(baselineId))        
        }

        //if(baselineId.length < 1) {
            //dispatch(setBaselineId(baselineId))
            //console.log("baselineId 체크:", baselineId===null);
        //}

        const response = await getBaseline({
            "baselineId": baselineId
        })
        setBaselineData(!!response.data.RET_DATA && response.data.RET_DATA)                
    }

    const fetchCompanyInfo = async () => {
        const response = await getCompanyInfo({
            "companyId": userCompanyId,
            "workplaceId": userWorkplaceId
        })
        setCompanyInfo(response?.data?.RET_DATA);
    }

    const fetchAccidentTotalList = async () => {
        const response = await getAccidentTotal({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        });
        setAccidentTotal(response?.data?.RET_DATA);
    }

    const fetchSafeWorkHistoryList = async () => {
        const response = await getSafeWorkHistoryList({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        });
        setSafeWorkHistoryList(response?.data?.RET_DATA);
    }

    const fetchDayInfo = async () => {
        const response = await getDayInfo({
            "baselineStart": baselineData.baselineStart
        })
        setDayInfo(!!response.data.RET_DATA && response?.data?.RET_DATA)
    }

    const refreshClock = () => {
        const now = moment()
        setHours(now.format("hh"))
        setMinutes(now.format("mm"))
    }

    const fetchEssentialRates = async () => {
        const response = await getEssentialRate({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        })
        setEssentialRates(response?.data?.RET_DATA)
    }

    const [locale] = React.useState('ko');

    const handleSlickCircleColor = (percentage) => {
        if (!percentage && percentage != '%') {
            return ' risk';
        } else {
            const percentageNumber = percentage && parseFloat(percentage?.split('%')[0])

            if (percentageNumber < 70) return ' risk';
            else if (percentageNumber >= 70 && percentageNumber <= 79) return ' warning';
            else if (percentageNumber >= 80 && percentageNumber < 90) return ' caution';
            else if (percentageNumber >= 90) return ' normal';
        }
    }

    const fetchAccidentsPreventionPercentage = async () => {
        const response = await getAccidentsPrevention({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        })
        setAccidentsPreventionPercentage(response?.data?.RET_DATA)
    }
    const fetchImprovementLawOrderPercentage = async () => {
        const response = await getImprovementLawOrder({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        })
        setLawOrderPercentage(response?.data?.RET_DATA)
    }

    const fetchRelatedLawRatePercentage = async () => {
        const response = await getRelatedLawRate({
            "baselineId": currentBaselineId,
            "workplaceId": userWorkplaceId
        })
        setRelatedLawRatePercentage(response?.data?.RET_DATA)
    }

    const fetchDutyDetailList = async () => {
        const response = await getDutyDetailList({
            "baselineId": currentBaselineId,
            "groupId": clickedEssentialRate,
            "workplaceId": userWorkplaceId
        })
        
        setDutyDetailList(response?.data?.RET_DATA)
        setClickedDuty(!!(response.data.RET_DATA) && !!(response.data.RET_DATA) && response?.data?.RET_DATA[0]?.articleNo)

        if(response?.data?.RET_DATA?.length > 0){
            setSubEventExe(true)    
        }else{
            setSubEventExe(false)
        }        
    }

    const handleEssentailRateMeasure = () => {
        const essentialRateMeasureScore = essentialRates?.topScore;

        if (essentialRateMeasureScore === 'danger') return 75;
        else if (essentialRateMeasureScore === 'warning') return 25;
        else if (essentialRateMeasureScore === 'caution') return -25;
        else if (essentialRateMeasureScore === 'normal') return -75;
    }

    const fetchInspectionDocs = async () => {
        if (clickedDuty && setSubEventExe) {
            const response = await getInspectionsDocs({
                "articleNo": clickedDuty
            })
            setInspectionsDocs(response?.data?.RET_DATA)
        }else{
            setInspectionsDocs(null)
        }
    }

    const fetchDutyCycle = async () => {
        if (clickedDuty && setSubEventExe) {
            const response = await getDutyCycle({
                'articleNo': clickedDuty
            })
            setDutyCycle(response?.data?.RET_DATA)
        }else{
            setDutyCycle(null)
        }
    }

    const fetchDutyAssigned = async () => {
        if (clickedDuty && setSubEventExe) {
            const response = await getDutyAssigned({
                'articleNo': clickedDuty
            })
            setDutyAssigned(response?.data?.RET_DATA)
        }else{
            setDutyAssigned(null)
        }
    }

    const fetchRelatedArticle = async () => {
        if (clickedDuty && setSubEventExe) {
            const response = await getRelatedArticle({
                'articleNo': clickedDuty
            })
            setRelatedArticle(response?.data?.RET_DATA)
        }else{
            setRelatedArticle(null)
        }
    }

    const fetchGuideLine = async () => {
        if (clickedDuty && setSubEventExe) {
            const response = await getGuideLine({
                'articleNo': clickedDuty
            })
            setGuideLine(response?.data?.RET_DATA)
        }else{
            setGuideLine(null)
        }
    }

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList()
        setWorkplaceList(response?.data?.RET_DATA)
    }

    function handleFactoryChange(props) {
        setUserInfo(props);
        dispatch(setWorkplaceId(props.userWorkplaceId));
    }

    const fetchWeather = async () => {
        const response = await getWeather({
            "latitude": latitude,
            "longitude": longitude,
        })
        setWeatherData(response?.data?.RET_DATA)
    }

    const fetchNoticeHotList = async () => {
        const response = await getNoticeHotList({});
        setNoticeHotList(response?.data?.RET_DATA);
    }

    const [inspectionIndex, setInspectionIndex] = useState(null)

    const handleDialogFileUpload = async () => {
        if (dialogId === "logoImgUpload" || dialogId === "documentFileUpload") {
            if((selectedFileName === "") || (selectedFileName === null) || (selectedFile === "")) {
                setOkayPopupMessage("업로드할 파일을 선택하세요.");
                setOkayPopupShow(true);   
            } else {
                setLoading(true);
                let formData = new FormData();
                formData.append("files", selectedFile)
                handleDialogClose()
                handleDialogCloseOnly()
                handleDialogCloseEmployee()
                const response = await fileUpload(formData);
                setLoading(false);
                if(response.data.RET_CODE === "0000") {
                    setOkayPopupMessage("등록 되었습니다.");
                    setOkayPopupShow(true);

                    const fileId = response.data.RET_DATA[0].atchFileId
                    setEmployeeFiles({ ...employeeFiles, [dialogId]: parseInt(fileId) })
                    if (dialogId === "logoImgUpload") {
                        setFilePath({ ...filePath, [dialogId]: (response.data.RET_DATA[0].filePath + "/" + response.data.RET_DATA[0].saveFileName) })
                    } else {
                        setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })
                    }

                } else if(response.data.RET_CODE === '0433'){
                    setOkayPopupMessage("파일확장자 오류");
                    setOkayPopupShow(true);
                } else {
                    setOkayPopupMessage("시스템 오류");
                    setOkayPopupShow(true);
                }
                
            }
        } else if (dialogId === "safetyFileUpload") {
            if((selectedFileName === "") || (selectedFileName === null) || (selectedFile === "")) {
                setOkayPopupMessage("업로드할 파일을 선택하세요.");
                setOkayPopupShow(true);   
            } else {
                setLoading(true);
                let formData = new FormData();
                formData.append("files", selectedFile)
                //handleDialogCloseSf()
                handleDialogCloseSafety()
                const response = await fileUpload(formData);
                setLoading(false);
                if(response.data.RET_CODE === "0000") {
                    setOkayPopupMessage("등록 되었습니다.");
                    setOkayPopupShow(true);

                    const fileId = response.data.RET_DATA[0].atchFileId
                    setEmployeeFiles({ ...employeeFiles, [dialogId]: parseInt(fileId) })
                    if (dialogId === "logoImgUpload") {
                        setFilePath({ ...filePath, [dialogId]: (response.data.RET_DATA[0].filePath + "/" + response.data.RET_DATA[0].saveFileName) })
                    } else {
                        setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })
                    }

                    const responseSaferyFile = await updateSafetyFile({ "attachFileId": fileId, });
                    console.log("responseSaferyFile:", responseSaferyFile);
                    setSafetyFileId(fileId);
                } else if(response.data.RET_CODE === '0433'){
                    setOkayPopupMessage("파일확장자 오류");
                    setOkayPopupShow(true);
                } else {
                    setOkayPopupMessage("시스템 오류");
                    setOkayPopupShow(true);
                }
            }
        } else if (dialogId === "inspectionFile") {
            if((selectedFileName === "") || (selectedFileName === null) || (selectedFile === "")) {
                setOkayPopupMessage("업로드할 파일을 선택하세요.");
                setOkayPopupShow(true);
            } else {
                setLoading(true);
                let formData = new FormData();
                formData.append("files", selectedFile)
                handleDialogClose()
                handleDialogCloseEmployee()
                const response = await fileUpload(formData)
                setLoading(false);
                if(response.data.RET_CODE === "0000") {
                    setOkayPopupMessage("등록 되었습니다.");
                    setOkayPopupShow(true);
                    
                    const fileId = response.data.RET_DATA[0].atchFileId
                    setEmployeeFiles({ ...employeeFiles, [dialogId]: parseInt(fileId) })
                    setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })
                    const deepCopyObj = JSON.parse(JSON.stringify(inspectionsDocs))
                    const updatedArray = deepCopyObj.map((obj, index) => {
                        if (index === inspectionIndex) {
                            return { "fileId": fileId }
                        } else {
                            return {
                                fileId: obj["fileId"]
                            }
                        }
                    })
                    const responseDocumentFile = await updateDocumentFileId({
                        "updateList": updatedArray,
                        "articleNo": articleNoForInspection
                    })
                    setUploadFlag(!uploadFlag)
                } else if(response.data.RET_CODE === '0433'){
                    setOkayPopupMessage("파일확장자 오류");
                    setOkayPopupShow(true);
                } else {
                    setOkayPopupMessage("시스템 오류");
                    setOkayPopupShow(true);
                }
            }
        setSelectedFileName("");
        }
    }
    
    async function handleSafetyFileId() {
        console.log('안전작업허가서')
        if ((safetyFileId === "") || (safetyFileId === undefined) || (safetyFileId === null)) {
            setWrongCredentialsPopup(true);
            setOkayPopupMessage("업로드된 파일이 없습니다");
            setOkayPopupShow(true);
        } else {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${safetyFileId}&fileSn=1`;
        }
    }

    async function handleDialogFileDownload() {
        const fileId = employeeFiles[dialogId]

        if ((inspectionFileId === "") || (inspectionFileId === undefined) || (inspectionFileId === null)) {
            setWrongCredentialsPopup(true);
            setOkayPopupMessage("업로드된 파일이 없습니다");
        } else {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${inspectionFileId}&fileSn=1`;
        }
    }

    const handleDialogOpen = (event, articleNo, fileId, index) => {

        setOpenDialog(true);
        setDialogId((event.target.id).toString());
        setArticleNoForInspection(articleNo)
        setInspectionFileId(fileId)
        setInspectionIndex(index)
        setSelectedFileName("");
        if (event.target.id === "safetyFileUpload") {
            setLabelObject({
                ...labelObject,
                upperLabel: "안전작업허가서 양식 관리",
                middleLabel: "등록된 양식을 다운로드 합니다.",
            })
        } else if (event.target.id === "inspectionFile") {
            setLabelObject({
                ...labelObject,
                upperLabel: "보고서",
                middleLabel: "등록된 양식을 다운로드 합니다.",
            })
        }
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogCloseSf = () => {
        setOpenSafetyDialog(false);
    }    

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const handleDialogCloseOnly = () => {
        setOpenDialogOnly(false);
    }

    const handleDialogOpenOnly = (event) => {
        setOpenDialogOnly(true);
        setDialogId(event.target.id);
        setSelectedFileName("");
    }

    const handleDialogCloseEmployee = () => {
        setOpenDialogEmployee(false);
    }

    const handleDialogCloseSafety = () => {
        setOpenSafetyDialog(false);
    }    

    // 점검서류 등록, 안전작업허가서 양식
    const handleDialogOpenEmployee = (event, articleNo, fileId, index) => {
        
        setDialogId((event.target.id).toString());
        setArticleNoForInspection(articleNo)
        setInspectionFileId(fileId)
        setInspectionIndex(index)
        setSelectedFileName("");
        if (event.target.id === "safetyFileUpload") {
            setOpenSafetyDialog(true);
            setLabelObject({
                ...labelObject,
                upperLabel: "안전작업허가서 양식 관리",
                middleLabel: "등록된 양식을 다운로드 합니다.",
            })
        } else if (event.target.id === "inspectionFile") {
            setOpenDialogEmployee(true);
            setLabelObject({
                ...labelObject,
                upperLabel: "보고서",
                middleLabel: "등록된 양식을 다운로드 합니다.",
            })
        }
    }

    const handleDialogInputChangeOnly = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const handleUpdateScore = async () => {
        const deepCopyObj = JSON.parse(JSON.stringify(inspectionsDocs))
        const updatedArray = deepCopyObj.map((obj, index) => {
            if (index === evaluationIndex) {
                return { "evaluation": evaluation }
            } else {
                return {
                    evaluation: obj["evaluation"]
                }
            }
        })
        const response = await updateScore({
            "updateList": updatedArray,
            "articleNo": articleNoForInspection
        })
        setEvaluationPopup(false)
        setUploadFlag(!uploadFlag)
    }

    const handleManagerChecked = async (checkedStatus, checkedIndex, articleNo) => {
        const deepCopyObj = JSON.parse(JSON.stringify(inspectionsDocs))
        const updatedArray = deepCopyObj.map((obj, index) => {
            if (index === checkedIndex && checkedStatus === "1") {
                return ({ "managerChecked": "0" })
            } else if (index === checkedIndex && (checkedStatus === "0" || checkedStatus === null || checkedStatus === "null" || checkedStatus === "")) {
                return ({ "managerChecked": "1" })
            } else {
                return ({
                    managerChecked: obj["managerChecked"]
                })
            }
        })
        const response = await updateRelatedArticle({
            "updateList": updatedArray,
            "articleNo": articleNo
        })
        setUploadFlag(!uploadFlag)
        navigate("/dashboard/employee/improvement-measures/list");
    }

    const fetchTitleReport = async () => {
        const response = await getTitleReport({
            "condition": condition
        });
        setReportTitle(response.data.RET_DATA);
    }

    const fetchBaseLineReportList = async () => {
        const response = await getBaseLineReport({
            "baselineId": currentBaselineId,
            "condition": condition
        });
        setReportList(response.data.RET_DATA);
    }

    const fetchBaseLineReportGraph = async () => {
        const response = await getBaseLineReportGraph({
            "baselineId": currentBaselineId,
            "condition": condition
        });

        console.log("response?.data?.RET_DATA:", response?.data?.RET_DATA)

        if(response?.data?.RET_DATA?.series.length>0){
            handleChartCategoriesDisplay(response?.data?.RET_DATA?.categories);
            setChartSeries(response?.data?.RET_DATA?.series);
        }else{
            handleChartCategoriesDisplay([]);
            setChartSeries([]);            
        }
    }

    const DateChange = name => (date) => {
        setBaselineInfo({ ...baselineInfo, [name]: date});
    };

    useEffect(() => {
        setLoading(true);
        fetchBaseline(baselineIdForSelect);
        setLoading(false);
    }, [currentBaselineId])

    useEffect(() => {
        setLoading(true);
        fetchDayInfo()
        fetchWeather()
        setLoading(false);
    }, [baselineData])

    useEffect(() => {
        setLoading(true);
        getSafetyFile();
        fetchLoginInfo();
        fetchCompanyInfo()
        fetchWorkplaceList();
        fetchBaselineList()
        fetchEssentialRates()
        fetchImprovementLawOrderPercentage()
        fetchRelatedLawRatePercentage()
        fetchLeaderImprovementList();
        fetchAccidentTotalList();
        fetchSafeWorkHistoryList();
        fetchAccidentsPreventionPercentage()
        fetchNoticeList();
        fetchImprovementList();
        fetchDutyDetailList();
        setLoading(false);    
    }, [baselineIdForSelect, baselineData, defaultPage]);

    useEffect(() => {
        setLoading(true);
        if (toggleGrid) {
            fetchTitleReport();
            fetchBaseLineReportList();
        } else {
            fetchBaseLineReportGraph();
        }
        setLoading(false);
    }, [condition, currentBaselineId, toggleGrid]);

    useEffect(() => {
        setLoading(true);
        fetchDutyDetailList()
        setLoading(false);
    }, [clickedEssentialRate])

    useEffect(() => {
        setLoading(true);
        fetchInspectionDocs()
        fetchDutyCycle()
        fetchDutyAssigned()
        fetchRelatedArticle()
        fetchGuideLine()
        setLoading(false);
    }, [clickedDuty])

    useEffect(() => {
        setLoading(true);
        fetchInspectionDocs()
        setLoading(false);
    }, [uploadFlag])

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, [])

    useEffect(() => {

        //대표이사 메인 버튼클릭시 해당 항목으로 이동 및 선택
        if(MainKey) {
            setClickedEssentialRateForClass(`rate${MainKey}`)
            setClickedEssentialRate(MainKey)
        }


        if (window.sessionStorage.getItem('firstLoad') === null) {
            fetchNoticeHotList();
            window.sessionStorage.setItem('firstLoad', 1);
        }

        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, []);

    return (
        <WideLayout>

            <Grid className={classes.dashboardWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            <img src={logo} alt="logo" onClick={() => navigate("/dashboard/employee")} />
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
                                                {!!(companyInfo) && !!companyInfo.logoImg && (<img height={50} src={`${BASE_URL}/file/getImg?imgPath=${companyInfo?.logoImg}`} alt="logo" />)}
                                            </div>
                                            <div className={classes.userName}>
                                                {companyInfo?.companyName}
                                            </div>
                                            <div className={classes.userInfo}>
                                                아래의 기업정보를 등록하신 후 이용하시기 바랍니다
                                            </div>
                                        </div>
                                        <span>
                                            <span>기업정보 등록</span>
                                        </span>
                                        <TextField
                                            id="standard-basic"
                                            placeholder='안전보건 목표 등록 (띄어쓰기 포함 16자 이내)'
                                            value={companyInfo?.shGoal}
                                            variant="outlined"
                                            sx={{ width: 370 }}
                                            className={classes.popupTextField}
                                            onChange={(event) => setCompanyInfo({ ...companyInfo, "shGoal": event.target.value })}
                                            inputProps={{ maxLength: 16 }}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            placeholder='경영방침 등록 (띄어쓰기 포함 16자 이내)'
                                            value={companyInfo?.missionStatements}
                                            onChange={(event) => setCompanyInfo({ ...companyInfo, "missionStatements": event.target.value })}
                                            variant="outlined"
                                            sx={{ width: 370 }}
                                            className={classes.popupTextField}
                                            inputProps={{ maxLength: 16 }}                                          
                                        />
                                        <div className={classes.preFootPop}>
                                            <div>
                                                {filePath.logoImgUpload ? (<img height={60} src={`${BASE_URL}/file/getImg?imgPath=${filePath.logoImgUpload}`} alt="logo" />) : (<span>로고등록</span>)}
                                            </div>
                                            <div>
                                                <UploadImageButton id={"logoImgUpload"} onClick={handleDialogOpenOnly}>찾아보기</UploadImageButton>
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
                                        <PopupFootButton onClick={() => handleUpdateUserCompany()}>저장하기</PopupFootButton>
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
                                        <MenuItem value="">{companyInfo?.scale}</MenuItem>
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
                                        <MenuItem value="">{companyInfo?.sector}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.rightMenu}>
                                <div className={classes.userInformation}>
                                    <div>{loginInfo?.loginId} / <span>{loginInfo?.roleName}</span></div>
                                    <div>계약기간 : {companyInfo?.contractStartDate} ~ {companyInfo?.contractEndDate}</div>
                                </div>
                                <LogButton className={classes.mainMenuButton} onClick={handleLogOut}></LogButton>

                                {/* 설정 팝업창 */}
                                <SettingsButton className={classes.mainMenuButton} onClick={() => setSettingsPopup(true)}></SettingsButton>
                                <div className={settingsPopup ? (classes.headerPopup + ' settings_popup') : (classes.headerPopup + ' settings_popupClose')}>
                                    <div className={classes.popHeader}>
                                        중대재해 자체점검 등록 차수 설정
                                        <ButtonClosePop onClick={() => setSettingsPopup(false)}></ButtonClosePop>
                                    </div>
                                    <div className={classes.headerPopList}>
                                        <Accordion expanded={expanded === 'panel1'} onChange={panelhandleChange('panel1')} className={classes.popupAccord}>
                                            <AccordionSummary
                                                expandIcon={<img src={arrowDown} alt="arrow down" />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <Typography>관리차수 신규등록</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={{ alignItems: 'center' }}>
                                                <TextField
                                                    id="standard-basic"
                                                    placeholder="관리차수"
                                                    value={baselineInfo.baselineName}
                                                    variant="outlined"
                                                    sx={{ width: 80 }}
                                                    className={classes.popupTextField}
                                                    onChange={(event) => setBaselineInfo({ ...baselineInfo, "baselineName": event.target.value })}
                                                />
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                                    <DesktopDatePicker
                                                        className={classes.selectMenuDate}
                                                        label=' '
                                                        inputFormat="YYYY-MM-DD"
                                                        value={baselineInfo.baselineStart}
                                                        onChange={DateChange('baselineStart')}
                                                        // onChange={(newDate) => {
                                                        //     const date = new Date(newDate.$d);
                                                        //     setBaselineInfo({ ...baselineInfo, "baselineStart": moment(date).format("YYYY-MM-DD") })
                                                        // }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: 130 }} />}
                                                    />
                                                </LocalizationProvider>
                                                ~
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                                    <DesktopDatePicker
                                                        className={classes.selectMenuDate}
                                                        label=" "
                                                        inputFormat="YYYY-MM-DD"
                                                        value={baselineInfo.baselineEnd}
                                                        onChange={DateChange('baselineEnd')}
                                                        // onChange={(newDate) => {
                                                        //     const date = new Date(newDate.$d);
                                                        //     setBaselineInfo({ ...baselineInfo, "baselineEnd": moment(date).format("YYYY-MM-DD") })
                                                        // }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: 130 }} />}
                                                    />
                                                </LocalizationProvider>

                                               {/* <div style={{width: '100%', height: '70px'}}>
                                                    <div className={classes.headerPopFooter} >
                                                        <PopupFootButton onClick={() => handleInsertBaseline()}>저장하기</PopupFootButton>
                                                    </div>
                                                </div> */}

                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={classes.popupAccord} expanded={expanded === 'panel2'} onChange={panelhandleChange('panel2')}>
                                            <AccordionSummary
                                                expandIcon={<img src={arrowDown} alt="arrow down" />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>관리차수 조회</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className={classes.readonlyTextWrapper}>
                                                    {baselineList?.length > 0 ? baselineList?.map(baselineItem => (
                                                        <div className={classes.readonlyText}><span>{baselineItem.baselineName}</span> <span>{baselineItem.baselineStart}~{baselineItem.baselineEnd}</span></div>
                                                    )) : <div className={classes.readonlyText}>관리차수</div>}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={classes.popupAccord} expanded={expanded === 'panel3'} onChange={panelhandleChange('panel3')}>
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
                                                    value={targetBaselineId}
                                                    onChange={(event) => setTargetBaselineId(event.target.value)}
                                                >
                                                    {!!baselineList && !!baselineList?.length && baselineList?.map(baselineItem =>
                                                        <MenuItem value={baselineItem.baselineId}>{baselineItem.baselineName}</MenuItem>)}
                                                </Select>
                                                {!!baselineList && !!baselineList?.length
                                                    && baselineList?.filter(baselineItem => baselineItem.baselineId === targetBaselineId)
                                                        ?.map(item => <span>{item.baselineStart}~{item.baselineEnd}</span>)}
                                                <div className={classes.popupPrompt}>
                                                    <Alert
                                                        icon={<img src={alertIcon} alt="alert icon" />}
                                                        severity="error">
                                                        <strong>선택한 차수의 DATA</strong>
                                                        를 현재 차수에 복사 하시겠습니까
                                                    </Alert>
                                                    <PromptButtonBlue onClick={() => handleInsertBaseLineDataCopy()}>예</PromptButtonBlue>
                                                    <PromptButtonWhite onClick={panelhandleChange('panel3')}>아니오</PromptButtonWhite>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <span></span>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => handleClose()}>관리차수 마감<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"/dashboard/employee/notifications/list"} underline="none">전사 공지사항 등록<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" id="safetyFileUpload" onClick={handleDialogOpenEmployee}>안전작업허가서 양식 업/다운로드​<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => { setYesNoPopupShow(true); setYesNoPopupMessage("업데이트 하시겠습니까?") }}>안전보건관리체계의 구축 및 이행 항목 업데이트​<img src={arrowDown} alt="arrow down" /></Link>
                                    </div>
                                    <div className={classes.headerPopFooter}>
                                        <PopupFootButton onClick={() => handleInsertBaseline()}>저장하기</PopupFootButton>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            <AdminButton className={classes.mainMenuButton} style={{ display: 'none' }}></AdminButton>
                            <div className={classes.weatherSection}>
                                <span>
                                    <img src={`${BASE_URL}/file/getImg?imgPath=${weatherData?.weatherImgUrl}`} alt="weather icon" />
                                </span>
                                <span>{weatherData?.temperature} °</span>
                                <span>{weatherData?.address}</span>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid className={classes.headerWorkplace} item xs={12} sx={{ marginTop: '-45px' }}>
                        <div className={classes.adminField + ' ' + classes.adminFieldLeft}>
                            <div className={classes.adminFieldText}>안전보건목표</div>
                            <div className={classes.adminFieldText}>{companyInfo?.shGoal}</div>
                        </div>
                        <div className={classes.adminLogo}>
                            {!!(companyInfo) && !!companyInfo.logoImg && (<img height={60} src={`${BASE_URL}/file/getImg?imgPath=${companyInfo?.logoImg}`} alt="logo" />)}
                        </div>
                        <div className={classes.adminField + ' ' + classes.adminFieldRight}>
                            <div className={classes.adminFieldText}>경영방침</div>
                            <div className={classes.adminFieldText}>{companyInfo?.missionStatements}</div>
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
                                    <div className={condition === "1" ? classes.PopListItem + ' active' : classes.PopListItem} onClick={() => setCondition("1")}>차수별 대응수준 현황 (통합)</div>
                                    <div className={condition === "2" ? classes.PopListItem + ' active' : classes.PopListItem} onClick={() => setCondition("2")}>차수별 대응수준 현황 (사업장별)</div>
                                    <div className={condition === "3" ? classes.PopListItem + ' active' : classes.PopListItem} onClick={() => setCondition("3")}>항목별 대응수준 현황 (통합)</div>
                                    <div className={condition === "4" ? classes.PopListItem + ' active' : classes.PopListItem} onClick={() => setCondition("4")}>항목별 대응수준 현황 (사업장별)</div>
                                    <div className={condition === "5" ? classes.PopListItem + ' active' : classes.PopListItem} onClick={() => setCondition("5")}>사업장별 재해발생 통계</div>
                                    <div className={condition === "6" ? classes.PopListItem + ' active' : classes.PopListItem} onClick={() => setCondition("6")}>개선.시정명령 조치내역 통계</div>
                                    <div className={classes.PopListItem}>안전보건 법정교육 실시내역 통계</div>
                                </div>
                            </div>
                            <div className={classes.chartPopGraph}>
                                <div className={classes.graphHeader}>
                                    <div>
                                        <ButtonGrid onClick={() => setToggleGrid(!toggleGrid)}>{toggleGrid ? "Graph" : "Grid"}</ButtonGrid>
                                    </div>
                                    <div>
                                        <ButtonGraphPrev
                                            onClick={() => {
                                                if (parseInt(baselineData.prevBaseline)) {
                                                    setBaselineIdForSelect(parseInt(baselineData.prevBaseline));
                                                    dispatch(setBaselineId(parseInt(baselineData.prevBaseline)));
                                                }
                                            }}
                                            style={{ display: parseInt(baselineData.prevBaseline) ? "block" : "none" }}
                                        ></ButtonGraphPrev>
                                        <div>
                                            <span>중대대해처벌법 대응수준 현황</span>
                                            <span>{baselineData && (baselineData?.baselineName + ' : ' + baselineData?.baselineStart + ' ~ ' + baselineData?.baselineEnd)}</span>
                                        </div>
                                        <ButtonGraphNext
                                            onClick={() => {
                                                if (parseInt(baselineData.nextBaseline)) {
                                                    setBaselineIdForSelect(parseInt(baselineData.nextBaseline));
                                                    dispatch(setBaselineId(parseInt(baselineData.nextBaseline)));
                                                }
                                            }}
                                            style={{ display: parseInt(baselineData.nextBaseline) ? "block" : "none" }}
                                        ></ButtonGraphNext>
                                    </div>
                                </div>
                                <div className={toggleGrid ? classes.graphImageNone : classes.graphImage}>
                                    <Chart options={chartInfo.options} series={chartSeries} type="bar" />
                                </div>
                                <Grid item xs={12} className={toggleGrid ? classes.boxTableHeader : classes.boxTableNone}>
                                    <div className={classes.tableHead}>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>구분</div>
                                            {!!reportTitle && !!(reportTitle?.length) && reportTitle?.map(reportTitleItem =>
                                                <div className={classes.tableData}>{reportTitleItem.menuTitle}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={classes.tableBody}>
                                        {!!reportList && !!(reportList?.length) && (condition === "1" || condition === "2"|| condition === "3"|| condition === "4")
                                            ? reportList?.map((reportItem) =>
                                            (<div className={classes.tableRow}>
                                                <div className={classes.tableData}>{reportItem[0]?.workplaceName}</div>
                                                {reportTitle?.map((reportTitleItem) => {
                                                    const element = reportItem?.find(item => item.groupId === reportTitleItem.groupId);
                                                    return <div className={classes.tableData}>{element?.evaluationRate ? `${element.evaluationRate}%` : "0%"}</div>;
                                                })}
                                            </div>))
                                            : !!reportList && !!(reportList?.length) && condition === "5"
                                                ? reportList?.map((reportItem) =>
                                                (<div className={classes.tableRow}>
                                                    {reportItem?.map((item) =>
                                                        <>
                                                            <div className={classes.tableData}>{item?.workplaceName}</div>
                                                            <div className={classes.tableData}>{item?.accType001 ? `${item?.accType001}건` : "0건"}</div>
                                                            <div className={classes.tableData}>{item?.accType001 ? `${item?.accType002}건` : "0건"}</div>
                                                            <div className={classes.tableData}>{item?.accType001 ? `${item?.accType003}건` : "0건"}</div>
                                                            <div className={classes.tableData}>{item?.accType001 ? `${item?.accType004}건` : "0건"}</div>
                                                            <div className={classes.tableData}>{item?.accType001 ? `${item?.accType005}건` : "0건"}</div>
                                                            <div className={classes.tableData}>{item?.accType001 ? `${item?.accType006}건` : "0건"}</div>
                                                        </>
                                                    )}
                                                </div>))
                                                : !!reportList && !!(reportList?.length) && condition === "6"
                                                    ? reportList?.map((reportItem) =>
                                                    (<div className={classes.tableRow}>
                                                        {reportItem?.map((item) =>
                                                            <>
                                                                <div className={classes.tableData}>{item?.workplaceName}</div>
                                                                <div className={classes.tableData}>{item?.cmmdOrgCd001 ? `${item?.cmmdOrgCd001}건` : "0건"}</div>
                                                                <div className={classes.tableData}>{item?.cmmdOrgCd001 ? `${item?.cmmdOrgCd002}건` : "0건"}</div>
                                                                <div className={classes.tableData}>{item?.cmmdOrgCd001 ? `${item?.cmmdOrgCd003}건` : "0건"}</div>
                                                                <div className={classes.tableData}>{item?.cmmdOrgCd001 ? `${item?.cmmdOrgCd004}건` : "0건"}</div>
                                                            </>
                                                        )}
                                                    </div>))
                                                    : reportList?.map((reportItem) =>
                                                    (<div className={classes.tableRow}>
                                                        <div className={classes.tableData}>{reportItem[0]?.workplaceName}</div>
                                                        {reportTitle?.map((reportTitleItem) => {
                                                            const element = reportItem?.find(item => item.groupId === reportTitleItem.groupId);
                                                            return <div className={classes.tableData}>{element?.evaluationRate ? `${element.evaluationRate}건` : "0건"}</div>;
                                                        })}
                                                    </div>))
                                        }                                    
                                    </div>
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.navSlider}>
                            <Slider {...headerSlider}>
                                {/* {/* <MainNavButton className={currentWorkplaceId === null ? "active" : ""} onClick={
                                    () => handleFactoryChange({ ...userInfo, userWorkplaceId: null })
                                }>전체사업장</MainNavButton> */}

                                { /* Data: 2022.10.03 author:Jimmy Edit */}
                                {!!(workplaceList) && workplaceList?.map((workplaceItem, index) => (
                                    <MainNavButton key={index} className={workplaceItem.workplaceId === parseFloat(userWorkplaceId) ? "active" : ""}>{workplaceItem.workplaceName}</MainNavButton>
                                ))}
                            </Slider>
                        </div>
                    </Grid>

                </Grid>

                <div className={userRoleCode === '000' ? classes.pageOverlay : classes.pageOverlayInactive}></div>

                <Grid className={classes.pageBody} item xs={10.7}>
                    <div className={showUploadPopup ? classes.uploadPopup : classes.uploadPopupClose}>
                        <ClosePopupButton2 onClick={() => setShowUploadPopup(false)}></ClosePopupButton2>
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
                    <div className={evaluationPopup ? classes.uploadedPopup : classes.uploadedPopupClose}>
                        <FormControl className={classes.searchRadio} onChange={(e) => {
                                                                                        setEvaluation(e.target.value)
                                                                                        fetchEssentialRates()
                                                                                      }}>
                            <RadioGroup row value={evaluation ?? ""}>
                                <FormControlLabel
                                    value="10"
                                    label="상"
                                    control={
                                        <Radio
                                            icon={<img src={radioIcon} alt="radio icon" />}
                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    value="7"
                                    label="중"
                                    control={
                                        <Radio
                                            icon={<img src={radioIcon} alt="radio icon" />}
                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    value="5"
                                    label="하"
                                    control={
                                        <Radio
                                            icon={<img src={radioIcon} alt="radio icon" />}
                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                        />
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                        <SubmitButton onClick={handleUpdateScore}>확인</SubmitButton>
                    </div>
                    <div className={classes.managementOrder}>
                        {/* 관리차수<strong>11</strong> 차 :<strong>22.01.01 ~ 22.04.30</strong> */}
                        {baselineData && <>{baselineData?.baselineName} :<strong>{baselineData?.baselineStart} ~ {baselineData?.baselineEnd}</strong></>}
                    </div>
                    <div className={classes.managementSide}>
                        <FormControl sx={{ width: 130 }} className={classes.dropMenu + ' page_drop_menu'}>
                            <Select
                                className={classes.selectMenu}
                                value={"" || baselineIdForSelect}
                                onChange={(e) => setBaselineIdForSelect(e.target.value)}
                                inputProps={{ 'aria-label': 'Without label' }}>
                                {!!baselineList && !!baselineList.length && baselineList?.slice(0).reverse().map((baseline, index) => (
                                    <MenuItem key={index} value={"" || baseline.baselineId}>{baseline.baselineName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div><PageSideButton onClick={() => fetchBaseline(baselineIdForSelect)}>이동</PageSideButton></div>
                    </div>
                </Grid>

                <Grid className={classes.pageContent} item container rowSpacing={0} columnSpacing={1} xs={12}>
                    <Grid item xs={2.7}>
                        <div className={classes.contentList}>
                            <div className={classes.listTitle}>필수 의무조치 내역 <span>시행율</span></div>
                            <ul className={classes.menuList + ' parentList'}>
                                <li>
                                    <p className={classes.listLink + ' parentLink'} to={"#none"} underline="none">안전보건관리체계의 구축 및 이행</p>
                                    <span className={'normal'}>
                                        {essentialRates && essentialRates?.topRate}
                                    </span>
                                    <ul className={classes.menuList + ' nestedList'}>
                                        {essentialRates && Object.entries(essentialRates).length > 0 && Object.keys(essentialRates)?.map(function (property) {
                                            if (property.includes("rate")) {
                                                return (
                                                    <><li>
                                                        <Link className={(clickedEssentialRateForClass == property ? classes.listLinkClicked : classes.listLink)} onClick={() => {
                                                            setClickedEssentialRateForClass(property)
                                                            setClickedEssentialRate(!!essentialRates[property].groupId && essentialRates[property].groupId)
                                                        }} to={"#none"} underline="none">{!!essentialRates[property].title && essentialRates[property].title}</Link>
                                                        <span className={handleSlickCircleColor(!!essentialRates[property].score && essentialRates[property].score)}>{!!essentialRates[property].score && essentialRates[property].score}</span>
                                                    </li></>
                                                )
                                            }
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/accident-countermeasures-implementation/list"} underline="none">재해발생 방지대책 및 이행현황</Link>
                                    <span className={'caution'}>{accidentsPreventionPercentage?.enforceRate}</span>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/order-for-improvement-and-correction-under-related-law/list"} underline="none">관계법령에 따른 개선.시정명령 조치</Link>
                                    <span className={'warning'}>{lawOrderPercentage?.improvemetRate}</span>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/measure-to-manage-performance-od-duties-law/list"} underline="none">관계법령에 의무이행의 관리의 조치</Link>
                                    <span className={'risk'}>{relatedLawRatePercentage?.relatedLawRate}</span>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={2.7}>
                        <div className={classes.contentList}>
                            <div className={classes.listTitle}>의무조치별 상세 점검 항목  <span>총 <strong>{!!(dutyDetailList) && !!(dutyDetailList.length) && dutyDetailList[0]?.totalCount}</strong> 건</span></div>
                            <ul className={classes.menuList + ' secondList'}>
                                {dutyDetailList?.map((element) => {
                                    return (<li>
                                        <Link className={clickedDuty !== element.articleNo ? classes.listLink : classes.listLinkClicked} to={"#none"} underline="none" onClick={() => setClickedDuty(element.articleNo)}>{element.detailedItems}</Link>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </Grid>
                    <Grid item container xs={6.6}>
                        <Grid item xs={12} sx={{ height: '50%' }}>
                            <div className={classes.contentList + ' moreContent'}>
                                <div>
                                    <div className={classes.listTitle}>점검서류 등 목록</div>
                                    <ul className={classes.menuList}>
                                        {inspectionsDocs?.map((inspection) => (
                                            <li>
                                                <Link className={classes.listLink} to={"#none"} underline="none">{inspection?.shGoal}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}><strong>{!!(inspectionsDocs) && inspectionsDocs[0]?.fileCount}</strong>건 /{!!(inspectionsDocs) && !!(inspectionsDocs.length) && inspectionsDocs[0].totalCount}건</div>
                                    <ul className={classes.menuList + ' buttonList'}>
                                        {inspectionsDocs?.map((inspection, index) => (<><li>
                                            <div>{(inspection.fileId === null || inspection.fileId === "null" || inspection.fileId === "") ? 
                                                    <FileButtonNone id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonNone>
                                                    : 
                                                    <FileButtonExis id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonExis>
                                                }
                                                {(loginInfo.roleCd === "003") ?
                                                    inspection.fileId && ((inspection.evaluation === "10" && <span className={'green'}>상</span>) 
                                                        || (inspection.evaluation === "7" && <span className={'orange'}>중</span>) 
                                                            || (inspection.evaluation === "5" && <span className={'red'}>하</span>)
                                                            || (inspection.evaluation === "" && <span>평가</span>))
                                                    :
                                                    inspection.fileId && ((inspection.evaluation === "10" && <span className={'green'}
                                                        onClick={() => { setEvaluation(inspection.evaluation); setEvaluationPopup(!evaluationPopup); setArticleNoForInspection(inspection.articleNo); setEvaluationIndex(index) }}>상</span>) 
                                                        || (inspection.evaluation === "7" && <span className={'orange'}
                                                            onClick={() => { setEvaluation(inspection.evaluation); setEvaluationPopup(!evaluationPopup); setArticleNoForInspection(inspection.articleNo); setEvaluationIndex(index) }}>중</span>) 
                                                            || (inspection.evaluation === "5" && <span className={'red'}
                                                                onClick={() => { setEvaluation(inspection.evaluation); setEvaluationPopup(!evaluationPopup); setArticleNoForInspection(inspection.articleNo); setEvaluationIndex(index) }}>하</span>) 
                                                                || ((inspection.evaluation === null || inspection.evaluation === "0" || inspection.evaluation === "null" || inspection.evaluation === "") 
                                                                    && <span className={'empty'}
                                                                    onClick={() => { setEvaluation(inspection.evaluation); setEvaluationPopup(!evaluationPopup); setArticleNoForInspection(inspection.articleNo); setEvaluationIndex(index) }}>평가</span>))
                                                }
                                            </div>
                                        </li>
                                        </>))}
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>이행주기</div>
                                    <ul className={classes.menuList}>
                                        {dutyCycle?.map((cycle) => (
                                            <li className={'bulletList'}>{cycle.dutyCycle}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>준수대상</div>
                                    <ul className={classes.menuList}>
                                        {dutyAssigned?.map((duty) => (
                                            <li className={'bulletList'}>{duty.dutyAssigned}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>관계법령</div>
                                    <ul className={classes.menuList}>
                                        {relatedArticle?.map(article => (
                                            <li className={'bulletList'}>{article.relatedArticle}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className={classes.listTitle}>Check</div>
                                    <ul className={classes.menuList + ' checkList'}>
                                        {inspectionsDocs?.map((checkBtn, index) => (
                                            <>
                                                <li>{((checkBtn.managerChecked === "0" || checkBtn.managerChecked == null || checkBtn.managerChecked === "null" || checkBtn.managerChecked === "") &&
                                                    (<Link className={classes.listLink + ' check'} to={"#none"} underline="none" onClick={() => handleManagerChecked(checkBtn.managerChecked, index, checkBtn.articleNo)}></Link>)) || ((checkBtn.managerChecked === "1") &&
                                                        (<Link className={classes.listLink + ' check-blue'} to={"#none"} underline="none" onClick={(e) => handleManagerChecked(checkBtn.managerChecked, index, checkBtn.articleNo)}></Link>))}
                                                </li>
                                            </>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1, height: 'calc(50% - 8px)' }}>
                            <div className={classes.contentList}>
                                <div className={classes.listTitle}>현장 작동성 평가 작성 지침서</div>
                                <ul className={classes.menuList + ' fourthList'}>
                                    {guideLine?.map((guideline) => (
                                        <li style={{"white-space": "pre-line"}}>
                                            {guideline.guideline}
                                        </li>
                                    ))}
                                    {/* <li>
                                        <div className={'bulletList'}>이행 참고사항</div>
                                        <ol>
                                            <li>① 사업장 안전보건 확보를 위한 충분한 인력이 있는지 확인하고, 부족한 경우 추가 확보</li>
                                        </ol>
                                    </li> */}
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid className={classes.lowerDashboard} container item xs={12}>
                    <div className={classes.dashTrigger} >
                        <DashTrigButton onMouseOver={() => setHoverContainer(!hoverContainer)}></DashTrigButton>
                    </div>
                    <Grid container item xs={12} className={hoverContainer ? classes.wrap_hover : classes.hoverWrap} onMouseLeave={() => setHoverContainer(false)}>
                        <Grid className={classes.gageWrap} item xs={2}>
                            <div className={classes.gageArrow}>
                                <div className={classes.needleImg} style={{ transform: `rotate(${handleEssentailRateMeasure()}deg)` }}></div>
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
                                                <div><strong>{(improvmentList && improvmentList?.instruction) ?? "0"}</strong>건</div>
                                            </div>
                                            <div>
                                                <div>진행</div>
                                                <div><strong>{(improvmentList && improvmentList?.progress) ?? "0"}</strong>건</div>
                                            </div>
                                            <div>
                                                <div>완료</div>
                                                <div><strong>{(improvmentList && improvmentList?.complete) ?? "0"}</strong>건</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link className={classes.footLink} to={"/dashboard/employee/improvement-measures/list"} underline="none">안전보건팀장</Link>
                                        <div className={classes.bottomBox}>
                                            <div>
                                                <div>지시</div>
                                                <div><strong>{(leaderImprovementList && leaderImprovementList?.instruction) ?? "0"}</strong>건</div>
                                            </div>
                                            <div>
                                                <div>진행</div>
                                                <div><strong>{(leaderImprovementList && leaderImprovementList?.progress) ?? "0"}</strong>건</div>
                                            </div>
                                            <div>
                                                <div>완료</div>
                                                <div><strong>{(leaderImprovementList && leaderImprovementList?.complete) ?? "0"}</strong>건</div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid className={classes.footBox + ' boxUp'} item xs={5}>
                                    <Link className={classes.footLink} to="/dashboard/employee/accident-countermeasures-implementation/list" underline="none">산업재해 누적 집계</Link>
                                    <div className={classes.bottomBox}>
                                        <div>
                                            <div>사망</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.deathTollCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>동일사고</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.sameAccidentInjuryCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>직업질환</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.jobDeseaseTollCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>추락</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.fallCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>끼임</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.caughtCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>화재</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.fireCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>전기</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.electCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>밀폐</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.confinedCnt) ?? "0"}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>중량물</div>
                                            <div><strong>{(accidentTotal && accidentTotal?.heavyCnt) ?? "0"}</strong>건</div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid className={classes.footBox + ' boxUp'} item xs={3}>
                                    <Link className={classes.footLink} to={"/dashboard/employee/security-work-content"} underline="none">{safeWorkHistoryList?.nowDate}({safeWorkHistoryList?.nowDay}) - 안전작업허가 공사내역</Link>
                                    <div className={classes.bottomBox}>
                                        <div>
                                            <div>화기</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.fire}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>밀폐</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.closeness}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>정전</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.blackout}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>굴착</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.excavation}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>방사선</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.radiation}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>고소</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.sue}</strong>건</div>
                                        </div>
                                        <div>
                                            <div>중장비</div>
                                            <div><strong>{safeWorkHistoryList && safeWorkHistoryList?.heavy}</strong>건</div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} sx={{ marginBottom: '3px' }}>
                                <Grid className={classes.footBox + ' boxDown'} item xs={8.75}>
                                    <Slider className={classes.footSlider} {...footerSlider}>
                                        {noticesList?.map((notice) => (
                                            <div>
                                                <div>{notice?.insertDate}</div>
                                                {notice?.importCd === "001" && <span className={classes.slideLabelHot}>HOT</span>}
                                                <Link to={`/dashboard/employee/notifications/view/${notice?.noticeId}`} className={classes.linkBtn}>{notice?.title}</Link>
                                            </div>
                                        ))}
                                    </Slider>
                                    <Link className={classes.sliderLink} to={"/dashboard/employee/notifications/list"} underline="none"></Link>
                                </Grid>
                                <Grid className={classes.footBox + ' boxDown ' + classes.footDate} item xs={3}>
                                    <div className={classes.footDay + ' dateBox'}>
                                        <div>DAY</div>
                                        <div className={classes.dayNums}>
                                            {!!dayInfo && dayInfo.day}
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
                {/* NOTIFICATION POPUP */}
                {!!noticeHotList && noticeHotList?.length && noticeHotList?.map((noticeHotItem, index) => (<>
                    <div className={classes.notificationPopup}>
                        <ClosePopupButton2 onClick={() => handleNotificationPopupsShow(index)}></ClosePopupButton2>
                        <div><span className={classes.slideLabelHot}>HOT</span> {noticeHotItem.title}</div>
                        <div className={classes.popNews}>
                            <p>
                                {noticeHotItem.content}
                            </p>
                        </div>
                        <div>{noticeHotItem.attachId && <img src={icoFile} alt="file icon" />} {noticeHotItem.fileName}</div>
                    </div>
                </>))}
            </Grid >
            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                selectedFileName={selectedFileName}
            />
            <UploadEmployeeDialog
                open={openDialogEmployee}
                onClose={handleDialogCloseEmployee}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                label={labelObject}
                selectedFileName={selectedFileName}
            />            
            <UploadEmployeeDialog
                open={openSafetyDialog}
                onClose={handleDialogCloseSf}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleSafetyFileId}
                enableDownload={true}
                label={labelObject}
                selectedFileName={selectedFileName}
            />
            <OnlyUploadDialog
                open={openDialogOnly}
                onClose={handleDialogCloseOnly}
                onInputChange={handleDialogInputChangeOnly}
                onUpload={handleDialogFileUpload}
                label={labelObjectOnly}
                selectedFileName={selectedFileName}
            />
            <Overlay show={okayPopupShow}>
                <Okay
                    show={okayPopupShow}
                    message={okayPopupMessage}
                    title={okayPopupTitle}
                    onConfirm={() => setOkayPopupShow(false) } />
            </Overlay>
            
            
            {/* 관리차수 마감 처리 */}
            <Overlay show={yesNoPopupShowClose}>
                <YesNo
                    show={yesNoPopupShowClose}
                    message={yesNoPopupMessage}
                    onConfirmYes={handlecloseUpdate}
                    onConfirmNo={() => setYesNoPopupShowClose(false)}
                />
            </Overlay>

            <Overlay show={yesNoPopupShow}>
                <YesNo
                    show={yesNoPopupShow}
                    message={yesNoPopupMessage}
                    onConfirmYes={handleInsertBaseLineDataUpdate}
                    onConfirmNo={() => setYesNoPopupShow(false)}
                    //onConfirm={() => setWrongCredentialsPopup(false)}
                />
            </Overlay>
            {loading && <Loading/>}
        </WideLayout >
        
    );
};

export default Employee;
