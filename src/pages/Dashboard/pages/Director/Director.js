import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { WideLayout } from '../../../../layouts/Wide';
import Grid from '@mui/material/Grid';

import logo from '../../../../assets/images/logo.png';
import adminLogo from '../../../../assets/images/admin_logo.png';
import userIcon from '../../../../assets/images/btn_user.png';
import userIconHover from '../../../../assets/images/btn_user_ov.png';
import logIcon from '../../../../assets/images/btn_log.png';
import logIconHover from '../../../../assets/images/btn_log_ov.png';
import setIcon from '../../../../assets/images/btn_set.png';
import setIconHover from '../../../../assets/images/btn_set_ov.png';
import weatherIcon from '../../../../assets/images/weather_icon.png';
import chartIcon from '../../../../assets/images/btn_chart.png';

import graphNext from '../../../../assets/images/next_report.png';
import graphPrev from '../../../../assets/images/prev_report.png';
import graphNextHov from '../../../../assets/images/next_report_ov.png';
import graphPrevHov from '../../../../assets/images/prev_report_ov.png';
import imageGraph from '../../../../assets/images/graph.jpg';
import popupClose from '../../../../assets/images/btn_popClose.png';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import alertIcon from '../../../../assets/images/ic_refer.png';
import arrowDown from '../../../../assets/images/ic_down.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import { remove } from '../../../../services/core/User/Token';
import { useGetAccidentsPreventionMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetCompanyInfoMutation, useGetDayInfoMutation, useGetEssentialRateMutation, useGetImprovementLawOrderMutation, useGetLoginInfoMutation, useGetNoticeListMutation, useGetRelatedLawRateMutation, useGetWorkplaceListMutation, useGetWeatherMutation, useGetNoticeHotListMutation, useGetBaseLineReportMutation, useGetTitleReportMutation, useGetAccidentsPreventionReportMutation, useGetImprovemetLawOrderReportMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetLeaderImprovementListMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetAccidentTotalMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetSafeWorkHistoryListMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import moment from 'moment'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import useUserToken from '../../../../hooks/core/UserToken/UserToken';
import { setWorkplaceId, selectWorkplaceId, selectBaselineId, setBaselineId } from '../../../../slices/selections/MainSelection';
import { useStyles } from './useStyles';

import adminIcon from '../../../../assets/images/btn_admin.png';
import adminIconHover from '../../../../assets/images/btn_admin_ov.png';
import icoFile from '../../../../assets/images/ic_file.png';
import popupClose2 from '../../../../assets/images/btn_popClose2.png';
import Chart from 'react-apexcharts';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const UserButton = styled(ButtonUnstyled)`
    background: transparent url(${userIcon});
`;

const LogButton = styled(ButtonUnstyled)`
    background: transparent url(${logIcon});
    &:hover {
        background-image: url(${logIconHover});
    }
`;

const SettingsButton = styled(ButtonUnstyled)`
    background: transparent url(${setIcon});
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

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
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
    const dispatch = useDispatch();

    const [userToken] = useUserToken();
    const [getDayInfo] = useGetDayInfoMutation();
    const [getNoticeList] = useGetNoticeListMutation();
    const [getEssentialRate] = useGetEssentialRateMutation();
    const [getAccidentsPrevention] = useGetAccidentsPreventionMutation();
    const [getImprovementLawOrder] = useGetImprovementLawOrderMutation();
    const [getRelatedLawRate] = useGetRelatedLawRateMutation();
    const [getCompanyInfo] = useGetCompanyInfoMutation();
    const [getWorkplaceList] = useGetWorkplaceListMutation();
    const [getBaseline] = useGetBaselineMutation();
    const [getBaselineList] = useGetBaselineListMutation();
    const [getNoticeHotList] = useGetNoticeHotListMutation();
    const [getBaseLineReport] = useGetBaseLineReportMutation();
    const [getTitleReport] = useGetTitleReportMutation();

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
    const [relatedLawRate, setRelatedLawRate] = useState({});
    const [baselineData, setBaselineData] = useState({});
    const [baselineList, setBaselineList] = useState([]);
    // const [baselineId, setBaselineId] = useState(6);
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [getWeather] = useGetWeatherMutation()
    const [weatherData, setWeatherData] = useState({})
    const [dayInfo, setDayInfo] = useState({});
    const currentWorkplaceId = useSelector(selectWorkplaceId);
    const currentBaselineId = useSelector(selectBaselineId);
    const [noticeHotList, setNoticeHotList] = useState([]);
    const [condition, setCondition] = useState("1");
    // grid report 
    const [reportList, setReportList] = useState([]);
    const [reportTitle, setReportTitle] = useState([]);
    // grid graph
    const [chartCategories, setChartCategories] = useState([]);
    const [chartSeries, setChartSeries] = useState([{ name: 'name', data: [] }]);
    const [chartInfo, setChartInfo] = useState({
        series: chartSeries,
        options: {
            chart: {
                type: 'bar',
                height: '100%',
                width: '100%'
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
                width: 15,
                colors: ['transparent']
            },
            xaxis: {
                categories: chartCategories
                // categories: ['안전보건관리체계의 구축 및 이행', '유해,위험 요인 개선 업무절차 마련 및 점검', '안전보건업무 총괄관리 전담조직 구축', '안전보건관리책임자 권한 부여 및 집행 점검', '안전,보건관련 필요예산 편성 및 집행', '안전보건 전문 인력 배치 및 업무시간 보장', '종사자 의견수렴 및 개선방안 이행점검', '중대재해발생 비상대응 메뉴얼 마련&점검', '도급용역 위탁시 평가기준 및 절차 점검', '재해발생 방지대책 및 이행현황', '관계법령에 따른 개선,시정명령 조치', '관계법령에 의무이행의 관리의 조치'],
            },
            yaxis: {
                title: {
                    text: '% rate'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "% rate"
                    }
                }
            }
        },
    });

    const [userInfo, setUserInfo] = useState({
        userCompanyId: userToken.getUserCompanyId(),
        userWorkplaceId: userToken.getUserWorkplaceId(),
        userRoleCode: userToken.getUserRoleCd()
    });

    const { userCompanyId, userWorkplaceId, userRoleCode } = userInfo;

    const handleLogOut = () => {
        remove();
        window.sessionStorage.removeItem('firstLoad');
        navigate('/');
    }

    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const handleNotificationPopupsShow = (notificationIndex) => {
        const notificationPopupList = noticeHotList?.filter((noticeHotItem, index) => notificationIndex != index);
        setNoticeHotList(notificationPopupList);
    }

    const reduceAPIResponse = (array) => {
        const chartParametars = array?.length > 0 && array?.map((arrayItem, index) => {
            if (index === 0) {
                return !!(arrayItem?.length) && arrayItem?.reduce(function
                    (filteredObj, item) {
                    if (item.workplaceName in filteredObj) {
                        filteredObj[item.workplaceName] = { ...filteredObj[item.workplaceName], data: [...filteredObj[item.workplaceName].data, item.evaluationRate] };
                    }
                    else {
                        filteredObj[item.workplaceName] = { name: item.workplaceName, data: [item.evaluationRate] };
                    }


                    return filteredObj;

                }, {});
            }
        });
        // console.log(chartParametars);
        // console.log(Object.values(chartParametars));
        // console.log(Object.keys(chartParametars));
        setChartSeries(Object.values(chartParametars));
        setChartCategories(Object.keys(chartParametars));
    }

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
    }

    const fetchBaseline = async () => {
        const response = await getBaseline({
            "baselineId": currentBaselineId
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
            "workplaceId": currentWorkplaceId
        });
        setCompanyInfo(response);
    }

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList();
        setWorkplaceList(response.data);
    }

    const fetchEssentialRateList = async () => {
        const response = await getEssentialRate({
            "baselineId": currentBaselineId,
            "workplaceId": currentWorkplaceId
        });
        setEssentialRateList(response.data);
    }

    const fetchAccidentsPrevention = async () => {
        const response = await getAccidentsPrevention({
            "baselineId": currentBaselineId,
            "workplaceId": currentWorkplaceId
        });
        setAccidentsPrevention(response.data);
    }

    const fetchImprovementLawOrderRate = async () => {
        const response = await getImprovementLawOrder({
            "baselineId": currentBaselineId,
            "workplaceId": currentWorkplaceId
        });
        setImprovementLawOrderRate(response.data);
    }

    const fetchRelatedLawRate = async () => {
        const response = await getRelatedLawRate({
            "baselineId": currentBaselineId,
            "workplaceId": currentWorkplaceId
        });
        setRelatedLawRate(response.data);
    }

    const fetchLeadersImproveList = async () => {
        const response = await getLeaderImprovementList({
            "baselineId": currentBaselineId,
            "companyId": userCompanyId,
            "instruction": 1,
            "workplaceId": currentWorkplaceId
        });
        setLeadersImproveList(response.data.RET_DATA);
    }

    const fetchAccidentTotal = async () => {
        const response = await getAccidentTotal({
            "baselineId": currentBaselineId,
            "caughtCnt": 0,
            "companyId": userCompanyId,
            "workplaceId": currentWorkplaceId
        })
        setAccidentTotal(response.data.RET_DATA);
    }

    const fetchSafeWorkHistoryList = async () => {
        const response = await getSafeWorkHistoryList({
            "baselineId": currentBaselineId,
            "companyId": userCompanyId,
            "workplaceId": currentWorkplaceId
        })
        setSafeWorkHistoryList(response.data.RET_DATA);
    }

    const fetchDayInfo = async () => {
        const response = await getDayInfo({
            "baselineStart": baselineData.baselineStart
        })
        setDayInfo(response.data.RET_DATA);
    }

    const fetchNoticeHotList = async () => {
        const response = await getNoticeHotList({});
        setNoticeHotList(response?.data?.RET_DATA);
    }

    const fetchTitleReport = async () => {
        const response = await getTitleReport({
            "condition": condition
        });
        setReportTitle(response.data.RET_DATA);
        console.log(response);
    }

    const fetchBaseLineReportList = async () => {
        const response = await getBaseLineReport({
            "baselineId": currentBaselineId,
            "condition": condition
        });
        reduceAPIResponse(response.data.RET_DATA);
        setReportList(response.data.RET_DATA);
        console.log(response);
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
        prevArrow: <SamplePrevArrow />,
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: parseInt(baselineData.nextBaseline) ? "block" : "none" }}
                onClick={() => {
                    if (parseInt(baselineData.nextBaseline)) {
                        dispatch(setBaselineId(parseInt(baselineData.nextBaseline)))
                        onClick();
                    }
                }}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: parseInt(baselineData.prevBaseline) ? "block" : "none" }}
                onClick={() => {
                    if (parseInt(baselineData.prevBaseline)) {
                        dispatch(setBaselineId(parseInt(baselineData.prevBaseline)))
                        onClick();
                    }
                }}
            />
        );
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

    useEffect(() => {
        fetchDayInfo()
        fetchWeather()
    }, [baselineData])

    useEffect(() => {
        fetchBaseline();
        // fetchCompanyInfo();
        fetchEssentialRateList();
        fetchImprovementLawOrderRate();
        fetchRelatedLawRate();
        fetchLeadersImproveList();
        fetchAccidentTotal();
        fetchSafeWorkHistoryList();
        fetchAccidentsPrevention()
        // fetchDayInfo();
    }, [currentBaselineId, userWorkplaceId]);

    useEffect(() => {
        fetchBaseLineReportList();
        fetchTitleReport();
    }, [condition, currentBaselineId]);

    useEffect(() => {
        fetchCompanyInfo();
    }, [userWorkplaceId])

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

    useEffect(() => {

        if (window.sessionStorage.getItem('firstLoad') === null) {
            fetchNoticeHotList();
            window.sessionStorage.setItem('firstLoad', 1);
            console.log('firstLoad');
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
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                                <UserButton className={classes.mainMenuButton}></UserButton>
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
                                <SettingsButton className={classes.mainMenuButton} onClick={() => {
                                    if (userRoleCode === "000") { navigate("/dashboard/system-administrator") }
                                }}></SettingsButton>

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

                    <div className={userRoleCode === '000' ? classes.pageOverlay : classes.pageOverlayInactive}>
                        {/* <SettingsButton className={classes.mainMenuButtonSettings} onClick={() => {
                            setSettingsPopup(true)
                            if (userRoleCode === "000") { navigate("/dashboard/system-administrator") }
                        }}></SettingsButton> */}
                    </div>

                    <Grid className={classes.headerWorkplace} item xs={12} sx={{ marginTop: '-45px' }}>
                        <div className={classes.adminField + ' ' + classes.adminFieldLeft}>
                            <div className={classes.adminFieldText}>안전보건목표</div>
                            <div className={classes.adminFieldText}> {companyInfo.data?.RET_DATA?.shGoal}</div>
                        </div>
                        <div className={classes.adminLogo}>
                            {companyInfo.data && !!(companyInfo.data.RET_DATA) && !!companyInfo.data.RET_DATA.logoImg && <img heigth={60} src={`${BASE_URL}/file/getImg?imgPath=${companyInfo?.data?.RET_DATA?.logoImg}`} alt="logo" />}
                        </div>
                        <div className={classes.adminField + ' ' + classes.adminFieldRight}>
                            <div className={classes.adminFieldText}>경영방침</div>
                            <div className={classes.adminFieldText}>{companyInfo.data?.RET_DATA?.missionStatements}</div>
                        </div>
                    </Grid>
                    <Grid className={classes.headerNavigation} item xs={5.8}>
                        <ChartButton onClick={() => setChartPop(true)}></ChartButton>
                        {/* CHART POPUP CEO */}
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
                                                    dispatch(setBaselineId(parseInt(baselineData.prevBaseline)))
                                                }
                                            }}
                                            style={{ display: parseInt(baselineData.prevBaseline) ? "block" : "none" }}
                                        ></ButtonGraphPrev>
                                        <div>
                                            <span>중대대해처벌법 대응수준 현황</span>
                                            <span>({baselineData?.baselineName} : {baselineData?.baselineStart} ~ {baselineData?.baselineEnd})</span>
                                        </div>
                                        <ButtonGraphNext
                                            onClick={() => {
                                                if (parseInt(baselineData.nextBaseline)) {
                                                    dispatch(setBaselineId(parseInt(baselineData.nextBaseline)))
                                                }
                                            }}
                                            style={{ display: parseInt(baselineData.nextBaseline) ? "block" : "none" }}
                                        ></ButtonGraphNext>
                                    </div>
                                </div>
                                {/* Chart deo */}
                                <div className={toggleGrid ? classes.graphImageNone : classes.graphImage}>
                                    {/* <Chart options={chartInfo.options} series={chartSeries} type="bar" height={450} /> */}
                                </div>
                                <Grid item xs={12} className={toggleGrid ? classes.boxTable : classes.boxTableNone}>
                                    {/* <div className={classes.tableHead}>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableData}>구분</div>
                                            {!!reportTitle && !!(reportTitle?.length) && reportTitle?.map(reportTitleItem =>
                                                <div className={classes.tableData}>{reportTitleItem.workplaceName}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={classes.tableBody}>
                                        {!!reportList && !!(reportList?.length) && reportList?.map((reportItem, reportItemIndex) =>
                                            <div className={classes.tableRow}>
                                                <div className={classes.tableData}>{reportItem[0]?.menuTitle}</div>
                                                {reportTitle?.map((reportTitleItem) => {
                                                    const elment = reportItem?.find(item => item.workplaceId === reportTitleItem.workplaceId);
                                                    return <div className={classes.tableData}>{elment?.evaluationRate ?? null}</div>;
                                                })}
                                            </div>)}
                                    </div> */}
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.navSlider}>
                            {/* WORKPLACE LIST */}
                            <Slider {...headerSlider}>
                                <div>
                                    <MainNavButton className={currentWorkplaceId === null ? "active" : ""} onClick={
                                        () => handleFactoryChange({ ...userInfo, userWorkplaceId: null })
                                    }>전체사업장</MainNavButton>
                                </div>
                                {workplaceList.length != 0 && workplaceList?.RET_DATA?.map(workplaceItem =>
                                    <div>
                                        <MainNavButton
                                            className={currentWorkplaceId === workplaceItem.workplaceId ? "active" : ""}
                                            onClick={() => handleFactoryChange({ ...userInfo, userCompanyId: workplaceItem.companyId, userWorkplaceId: workplaceItem.workplaceId })}
                                        >
                                            {workplaceItem.workplaceName}
                                        </MainNavButton>
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </Grid>

                </Grid >
                <Grid className={classes.pageBody} item xs={10.7}>
                    <div className={classes.managementOrder}>
                        {baselineData && <>{baselineData?.baselineName} :<strong>{baselineData?.baselineStart} ~ {baselineData?.baselineEnd}</strong></>}
                    </div>
                    <Slider className={classes.dashSlider} {...dashboardSlider} >
                        <div className={classes.dashboardSlide}>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate1?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate1?.score ? essentialRateList?.RET_DATA?.rate1?.score : "0%"}</strong></div>
                                    <div>안전보건 목표 및<br /> 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate2?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate2?.score ? essentialRateList?.RET_DATA?.rate2?.score : "0%"}</strong></div>
                                    <div>안전보건 총괄관리<br /> 전담조직</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate3?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate3?.score ? essentialRateList?.RET_DATA?.rate3?.score : "0%"}</strong></div>
                                    <div>유해요인개선<br /> 업무절차</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate4?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate4?.score ? essentialRateList?.RET_DATA?.rate4?.score : "0%"}</strong></div>
                                    <div>예산편성 및<br /> 집행관리</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate5?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate5?.score ? essentialRateList?.RET_DATA?.rate5?.score : "0%"}</strong></div>
                                    <div>업무수행 권한<br /> 및 책임</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate6?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate6?.score ? essentialRateList?.RET_DATA?.rate6?.score : "0%"}</strong></div>
                                    <div>안전보건 전문인력<br /> 배치</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate7?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate7?.score ? essentialRateList?.RET_DATA?.rate7?.score : "0%"}</strong></div>
                                    <div>종사자 개선<br /> 의견수렴</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate8?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate8?.score ? essentialRateList?.RET_DATA?.rate8?.score : "0%"}</strong></div>
                                    <div>비상대응<br /> 절차마련</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate9?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate9?.score ? essentialRateList?.RET_DATA?.rate9?.score : "0%"}</strong></div>
                                    <div>도급/용역 위탁 시<br /> 안전보건 확보</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(accidentsPrevention?.RET_DATA?.enforceRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{accidentsPrevention?.RET_DATA?.enforceRate ? accidentsPrevention?.RET_DATA?.enforceRate : "0%"}</strong></div>
                                    <div>재발방지<br /> 대책</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(improvementLawOrderRate?.RET_DATA?.improvemetRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{improvementLawOrderRate?.RET_DATA?.improvemetRate ? improvementLawOrderRate?.RET_DATA?.improvemetRate : "0%"}</strong></div>
                                    <div>개선/시정<br /> 명령</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor('0%')}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{relatedLawRate?.RET_DATA?.relatedLawRate ? relatedLawRate?.RET_DATA?.relatedLawRate : "0%"}</strong></div>
                                    <div>관계법령에 따른<br /> 의무이행</div>
                                </Link>
                            </div>
                        </div>

                        <div className={classes.dashboardSlide}>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate1?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate1?.score ? essentialRateList?.RET_DATA?.rate1?.score : "0%"}</strong></div>
                                    <div>안전보건 목표 및<br /> 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate2?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate2?.score ? essentialRateList?.RET_DATA?.rate2?.score : "0%"}</strong></div>
                                    <div>안전보건 총괄관리<br /> 전담조직</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate3?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate3?.score ? essentialRateList?.RET_DATA?.rate3?.score : "0%"}</strong></div>
                                    <div>유해요인개선<br /> 업무절차</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate4?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate4?.score ? essentialRateList?.RET_DATA?.rate4?.score : "0%"}</strong></div>
                                    <div>예산편성 및<br /> 집행관리</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate5?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate5?.score ? essentialRateList?.RET_DATA?.rate5?.score : "0%"}</strong></div>
                                    <div>업무수행 권한<br /> 및 책임</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate6?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate6?.score ? essentialRateList?.RET_DATA?.rate6?.score : "0%"}</strong></div>
                                    <div>안전보건 전문인력<br /> 배치</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate7?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate7?.score ? essentialRateList?.RET_DATA?.rate7?.score : "0%"}</strong></div>
                                    <div>종사자 개선<br /> 의견수렴</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate8?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate8?.score ? essentialRateList?.RET_DATA?.rate8?.score : "0%"}</strong></div>
                                    <div>비상대응<br /> 절차마련</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate9?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate9?.score ? essentialRateList?.RET_DATA?.rate9?.score : "0%"}</strong></div>
                                    <div>도급/용역 위탁 시<br /> 안전보건 확보</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(accidentsPrevention?.RET_DATA?.enforceRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{accidentsPrevention?.RET_DATA?.enforceRate ? accidentsPrevention?.RET_DATA?.enforceRate : "0%"}</strong></div>
                                    <div>재발방지<br /> 대책</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor(improvementLawOrderRate?.RET_DATA?.improvemetRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{improvementLawOrderRate?.RET_DATA?.improvemetRate ? improvementLawOrderRate?.RET_DATA?.improvemetRate : "0%"}</strong></div>
                                    <div>개선/시정<br /> 명령</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + handleSlickCircleColor('0%')}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{relatedLawRate?.RET_DATA?.relatedLawRate ? relatedLawRate?.RET_DATA?.relatedLawRate : "0%"}</strong></div>
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
                {
                    !!noticeHotList && noticeHotList?.length && noticeHotList?.map((noticeHotItem, index) => (<>
                        <div className={classes.notificationPopup}>
                            <ClosePopupButton2 onClick={() => handleNotificationPopupsShow(index)}></ClosePopupButton2>
                            <div><span className={classes.slideLabelHot}>HOT</span> {noticeHotItem.title}</div>
                            <div className={classes.popNews}>
                                <p>
                                    {noticeHotItem.content}
                                </p>
                            </div>
                            <div>{noticeHotItem.attachId ? <img src={icoFile} alt="file icon" /> : null}{noticeHotItem.fileName}</div>
                        </div>
                    </>))
                }

            </Grid >

        </WideLayout >
    );
};

export default Director;