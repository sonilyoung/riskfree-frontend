import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import logo from '../../assets/images/logo.png';
import userIcon from '../../assets/images/btn_user.png';
import userIconHover from '../../assets/images/btn_user_ov.png';
import logIcon from '../../assets/images/btn_log.png';
import logIconHover from '../../assets/images/btn_log_ov.png';
import setIcon from '../../assets/images/btn_set.png';
import setIconHover from '../../assets/images/btn_set_ov.png';
import adminIcon from '../../assets/images/btn_admin.png';
import adminIconHover from '../../assets/images/btn_admin_ov.png';
import weatherIcon from '../../assets/images/weather_icon.png';
import backButton from '../../assets/images/btn_back.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { useGetLoginInfoMutation, useGetCompanyInfoMutation, useGetWeatherMutation } from '../../hooks/api/MainManagement/MainManagement';
import { remove } from '../../services/core/User/Token';
import { useUserToken } from '../../hooks/core/UserToken';

import '../../assets/fonts/Pretendard-Regular.otf';
import proba from '../../assets/fonts/Pretendard-Regular.otf';
import popupClose from '../../assets/images/btn_popClose.png';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import alertIcon from '../../assets/images/ic_refer.png';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import arrowDown from '../../assets/images/ic_down.png';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';

import { useSelector, useDispatch } from 'react-redux';
import { selectBaselineId, setBaselineId } from '../../slices/selections/MainSelection';
import { useLocalStorage } from '../../hooks/misc/LocalStorage';


const useStyles = makeStyles(() => ({
    bodyWrap: {
        backgroundColor: '#33374f',
        minWidth: '1900px !important',
        height: '100%',
        fontFamily: proba,
    },
    headerWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center'
    },
    sectionWrap: {
        minHeight: 'calc(100vh - 94px)',
        marginLeft: '40px',
        boxSizing: 'border-box',
        padding: '37px 40px 40px',
        backgroundColor: '#eff2f9',
        borderRadius: '24px 0 0 0'
    },
    pageHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    mainHeader: {
        display: 'flex',
        zIndex: 1
    },
    mainLogo: {
        '& img': {
            transform: 'translate(20px, 15px)'
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
        height: '700px',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
        '&.user_popup': {
            top: '70px',
            left: '5px',
            height: '535px'
        },
        '&.user_popupClose': {
            display: "none"
        },
        '&.settings_popup': {
            top: '70px',
            left: '-80px'
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
        color: '#fff',
        textDecoration: "none"
    },
    listLinkClicked: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        textDecoration: "none",
        backgroundColor: "grey"
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
        display: 'none',
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

const BackButton = styled(ButtonUnstyled)`
    position: absolute;
    top: 130px;
    left: 6px;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent url(${backButton});
    cursor: pointer;
`;

const ButtonClosePop = styled(ButtonUnstyled)`
    width: 24px;
    height: 24px;
    background: url(${popupClose}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
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

const Default = ({ children }) => {
    const classes = useStyles();
    const location = useLocation()
    const navigate = useNavigate()
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [userPopup, setUserPopup] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [userToken] = useUserToken()
    const [companyInfo, setCompanyInfo] = useState({})
    const companyId = userToken.getUserCompanyId()
    const [getCompanyInfo] = useGetCompanyInfoMutation()

    const dispatch = useDispatch();
    const localStorage = useLocalStorage();
    const currentBaseline = useSelector(selectBaselineId);

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [getWeather] = useGetWeatherMutation()
    const [weatherData, setWeatherData] = useState({})


    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const [num, setNum] = React.useState('');

    const handleLogOut = () => {
        remove();
        navigate('/');
    }

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const handleRedirect = () => {
        navigate(-1)
    }

    const fetchCompanyInfo = async () => {
        const response = await getCompanyInfo({
            "companyId": companyId
        })
        setCompanyInfo(response.data.RET_DATA)
    }

    const fetchWeather = async () => {
        const response = await getWeather({
            "latitude": latitude,
            "longitude": longitude,
        })
        setWeatherData(response.data.RET_DATA)
    }

    useEffect(() => {
        if (currentBaseline === null) {
            dispatch(setBaselineId(localStorage.getDefaultBaselineId()));
        }
        handleLoginInfo()
        fetchCompanyInfo()
    }, [])

    const [date, setDate] = React.useState(null);

    const [locale] = React.useState('ko');

    useEffect(() => {
        fetchWeather()
    }, [loginInfo])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

    return (
        <div className={classes.bodyWrap}>
            <Grid className={classes.headerWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            <Link to={(loginInfo?.roleCd === "001" && "/dashboard/director") || (loginInfo?.roleCd === "002" ? "/dashboard/employee" : "#none")}>
                                <img src={logo} alt="logo" />
                            </Link>
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
                                                삼성전자 주식회사
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
                                    {weatherData && <img src={`http://tbs-a.thebridgesoft.com:8102/riskfree-backend/file/getImg?imgPath=${weatherData?.weatherImgUrl}`} alt="weather icon" />}
                                </span>
                                <span>{weatherData?.temperature} °</span>
                                <span>{weatherData?.address}</span>
                            </div>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
            <BackButton onClick={() => handleRedirect()}></BackButton>
            <div className={classes.pageOverlay}></div>
            <div className={classes.sectionWrap}>
                {children}
            </div>
        </div >
    );
};

export default Default;