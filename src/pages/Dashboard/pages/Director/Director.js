import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import Checkbox from '@mui/material/Checkbox';
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import checkIcon from '../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../assets/images/ic_chk3_on.png';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import { remove } from '../../../../services/core/User/Token';
import { useGetAccidentsPreventionMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetCompanyInfoMutation, useGetDayInfoMutation, useGetEssentialRateMutation, useGetImprovementLawOrderMutation, useGetLoginInfoMutation, useGetNoticeListMutation, useGetRelatedLawRateMutation, useGetWorkplaceListMutation, useGetWeatherMutation, useGetNoticeHotListMutation, useGetBaseLineReportMutation, useGetTitleReportMutation, useGetAccidentsPreventionReportMutation, useGetImprovemetLawOrderReportMutation, useGetBaseLineReportGraphMutation } from '../../../../hooks/api/MainManagement/MainManagement';
import { useGetLeaderImprovementListMutation,  useGetImprovementListMutation} from '../../../../hooks/api/MainManagement/MainManagement';
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

import { Overlay } from '../../../../components/Overlay';
import Okay from '../../../../components/MessageBox/Okay';
import YesNo from '../../../../components/MessageBox/YesNo';

import adminIcon from '../../../../assets/images/btn_admin.png';
import adminIconHover from '../../../../assets/images/btn_admin_ov.png';
import icoFile from '../../../../assets/images/ic_file.png';
import popupClose2 from '../../../../assets/images/btn_popClose2.png';
import popupClose3 from '../../../../assets/images/btn_popClose3.png';
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
    margin-top: 18px;
    margin-right: 70px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: url(${popupClose3}) no-repeat 50% 50%;
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
    const [uniKey, setUniKey] = React.useState(null);
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

    const onClose = useState(false);

    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("");

    const [noticesList, setNoticesList] = useState([]);
    const [userPopup, setUserPopup] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [chartPop, setChartPop] = useState(false)
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [num, setNum] = React.useState('');
    const [getLeaderImprovementList] = useGetLeaderImprovementListMutation()
    const [getImprovementList] = useGetImprovementListMutation()
    
    
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
                tickPlacement: 'on',
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
    const workplaceIdFromToken = userToken.getUserWorkplaceId();
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
        const notificationPopupList = noticeHotList?.filter((noticeHotItem, index) => notificationIndex === index);
        setNoticeHotList(notificationPopupList);
    }

    const handleSlickCircleColor = (percentage) => {
        if (!percentage && percentage !== '%') {
            return ' red';
        } else {
            const percentageNumber = percentage && parseFloat(percentage?.split('%')[0])

            if (percentageNumber < 70) return ' red';
            else if (percentageNumber >= 70 && percentageNumber <= 79) return ' orange';
            else if (percentageNumber >= 80 && percentageNumber < 90) return ' yellow';
            else if (percentageNumber >= 90) return ' green';
        }
    }

    const handleEssentailRateMeasure = (e) => {
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
        const response = await getImprovementList({
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
    }

    const fetchBaseLineReportList = async () => {
        const response = await getBaseLineReport({
            "baselineId": currentBaselineId,
            "condition": condition
        });
        setReportList(response.data.RET_DATA);
    }

    const refreshClock = () => {
        const now = moment()
        setHours(now.format("hh"))
        setMinutes(now.format("mm"))
    }

    const [date, setDate] = React.useState(null);

    const [locale] = React.useState('ko');
    
    const afterChange = (prev, next) => {
        setUniKey(randomNumberInRange(1, 5));
    };    

    const beforeChange = (prev, next) => {
        setUniKey(randomNumberInRange(6, 10));
    }

    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }   

    const dashboardSlider = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange,
        beforeChange,        
        accessibility: true,
        adaptiveHeight: false,
        arrows: true,
        asNavFor: null,
        autoplay: false,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.7,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        useCSS:false,
        waitForAnimate: true,
    }



    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: parseInt(baselineData?.nextBaseline) ? "block" : "none" }}
                onClick={() => {
                    if (parseInt(baselineData?.nextBaseline)) {
                        dispatch(setBaselineId(parseInt(baselineData?.nextBaseline)))
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
                style={{ ...style, display: parseInt(baselineData?.prevBaseline) ? "block" : "none" }}
                onClick={() => {
                    if (parseInt(baselineData?.prevBaseline)) {
                        dispatch(setBaselineId(parseInt(baselineData?.prevBaseline)))
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

    const fetchBaseLineReportGraph = async () => {
        const response = await getBaseLineReportGraph({
            "baselineId": currentBaselineId,
            "condition": condition
        });
        
        if(response?.data?.RET_DATA?.series.length>0){
            handleChartCategoriesDisplay(response?.data?.RET_DATA?.categories);
            setChartSeries(response?.data?.RET_DATA?.series);
        }else{
            handleChartCategoriesDisplay([]);
            setChartSeries([]);            
        }
    }

    const VISITED_NOW_DATE = moment(new Date()).format('YYYY-MM-DD');    // 현재 날짜

    const today = new Date();
    const newDay = new Date();

    // 하루동안 보지않기
    const Dayclose = (DayNum) => {
        // +1일 계산
        const expiryDate = moment(newDay.setDate(today.getDate() + 1 )).format('YYYY-MM-DD');
        // 로컬스토리지 저장
        localStorage.setItem(DayNum, expiryDate, DayNum);
        handleNotificationPopupsShow(DayNum);
    }

    useEffect(() => {
        fetchDayInfo()
        fetchWeather()
    }, [baselineData])

    useEffect(() => {
        fetchBaseline();
        fetchEssentialRateList();
        fetchImprovementLawOrderRate();
        fetchRelatedLawRate();
        fetchLeadersImproveList();
        fetchAccidentTotal();
        fetchSafeWorkHistoryList();
        fetchAccidentsPrevention()
    }, [currentBaselineId, userWorkplaceId]);

    useEffect(() => {
        if (toggleGrid) {
            fetchTitleReport();
            fetchBaseLineReportList();
        } else {
            fetchBaseLineReportGraph();
        }
    }, [condition, currentBaselineId, toggleGrid]);

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
                                <LogButton className={classes.mainMenuButton} onClick={() => {setYesNoPopupShow(true); setYesNoPopupMessage("로그아웃 하시겠습니까?") }}></LogButton>
                                <SettingsButton className={classes.mainMenuButton} onClick={() => {
                                    if (userRoleCode === "000") { navigate("/dashboard/system-administrator") }
                                }}></SettingsButton>

                            </div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            <AdminButton className={classes.mainMenuButton} style={{ display: 'none' }}></AdminButton>
                            <div className={classes.weatherSection}>
                                <span>
                                    <img src={`${BASE_URL}file/getImg?imgPath=${weatherData?.weatherImgUrl}`} alt="weather icon" />
                                </span>
                                <span>{weatherData?.temperature} °C</span>
                                <span>{weatherData?.address}</span>
                            </div>
                        </Grid>
                    </Grid>

                    <div className={userRoleCode === '000' ? classes.pageOverlay : classes.pageOverlayInactive}>
                        {<SettingsButton className={classes.mainMenuButtonSettings} onClick={() => {
                            setSettingsPopup(true)
                            if (userRoleCode === "000") { navigate("/dashboard/system-administrator") }
                        }}></SettingsButton>}
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
                                                if (parseInt(baselineData?.prevBaseline)) {
                                                    dispatch(setBaselineId(parseInt(baselineData.prevBaseline)))
                                                }
                                            }}
                                            style={{ display: parseInt(baselineData?.prevBaseline) ? "block" : "none" }}
                                        ></ButtonGraphPrev>
                                        <div>
                                            <span>중대대해처벌법 대응수준 현황</span>
                                            <span>({baselineData?.baselineName} : {baselineData?.baselineStart} ~ {baselineData?.baselineEnd})</span>
                                        </div>
                                        <ButtonGraphNext
                                            onClick={() => {
                                                if (parseInt(baselineData?.nextBaseline)) {
                                                    dispatch(setBaselineId(parseInt(baselineData?.nextBaseline)))
                                                }
                                            }}
                                            style={{ display: parseInt(baselineData?.nextBaseline) ? "block" : "none" }}
                                        ></ButtonGraphNext>
                                    </div>
                                </div>
                                <div className={toggleGrid ? classes.graphImageNone : classes.graphImage}>
                                    <Chart options={chartInfo.options} series={chartSeries} type="bar" />
                                </div>
                                <Grid item xs={12} className={toggleGrid ? classes.boxTableGrid : classes.boxTableNone}>
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
                                {workplaceList?.RET_DATA?.length <= 1 ? "" :                                
                                    <div>
                                        <MainNavButton className={currentWorkplaceId === null ? "active" : ""} onClick={
                                            () => {handleFactoryChange({ ...userInfo, userWorkplaceId: null });afterChange();}
                                        }>전체사업장</MainNavButton>
                                    </div>
                                }
                                {workplaceList && workplaceList?.RET_DATA?.map(workplaceItem =>
                                    <div>
                                        <MainNavButton
                                            className={currentWorkplaceId === workplaceItem.workplaceId ? "active" : workplaceList?.RET_DATA?.length <= 1 ? "active" : workplaceIdFromToken === workplaceItem.workplaceId ? "current" : ""}
                                            // className={(currentWorkplaceId === workplaceItem.workplaceId && currentWorkplaceId === workplaceIdFromToken) || currentWorkplaceId === workplaceItem.workplaceId ? "active" : workplaceIdFromToken === workplaceItem.workplaceId ? "current" : ""}
                                            onClick={() => {handleFactoryChange({ ...userInfo, userCompanyId: workplaceItem.companyId, userWorkplaceId: workplaceItem.workplaceId });beforeChange();}}
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
                    <Slider className={classes.dashSlider} {...dashboardSlider} key={uniKey}>
                        <div className={classes.dashboardSlide}>
                            <div id="slick_1" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate1?.score)}>
                                <Link to="/dashboard/employee/4" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate1?.score ? essentialRateList?.RET_DATA?.rate1?.score : "0%"}</strong></div>
                                    <div>안전보건 목표 및<br /> 경영방침</div>
                                </Link>
                            </div>
                            <div id="slick_2" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate2?.score)}>
                                <Link to="/dashboard/employee/1" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate2?.score ? essentialRateList?.RET_DATA?.rate2?.score : "0%"}</strong></div>
                                    <div>안전보건 총괄관리<br /> 전담조직</div>
                                </Link>
                            </div>
                            <div id="slick_3" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate3?.score)}>
                                <Link to="/dashboard/employee/5" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate3?.score ? essentialRateList?.RET_DATA?.rate3?.score : "0%"}</strong></div>
                                    <div>유해요인개선<br /> 업무절차</div>
                                </Link>
                            </div>
                            <div id="slick_4" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate4?.score)}>
                                <Link to="/dashboard/employee/7" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate4?.score ? essentialRateList?.RET_DATA?.rate4?.score : "0%"}</strong></div>
                                    <div>예산편성 및<br /> 집행관리</div>
                                </Link>
                            </div>
                            <div id="slick_5" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate5?.score)}>
                                <Link to="/dashboard/employee/3" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate5?.score ? essentialRateList?.RET_DATA?.rate5?.score : "0%"}</strong></div>
                                    <div>업무수행 권한<br /> 및 책임</div>
                                </Link>
                            </div>
                            <div id="slick_6" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate6?.score)}>
                                <Link to="/dashboard/employee/6" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate6?.score ? essentialRateList?.RET_DATA?.rate6?.score : "0%"}</strong></div>
                                    <div>안전보건 전문인력<br /> 배치</div>
                                </Link>
                            </div>
                            <div id="slick_7" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate7?.score)}>
                                <Link to="/dashboard/employee/8" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate7?.score ? essentialRateList?.RET_DATA?.rate7?.score : "0%"}</strong></div>
                                    <div>종사자 개선<br /> 의견수렴</div>
                                </Link>
                            </div>
                            <div id="slick_8" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate8?.score)}>
                                <Link to="/dashboard/employee/9" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate8?.score ? essentialRateList?.RET_DATA?.rate8?.score : "0%"}</strong></div>
                                    <div>비상대응<br /> 절차마련</div>
                                </Link>
                            </div>
                            <div id="slick_9" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate9?.score)}>
                                <Link to="/dashboard/employee/2" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate9?.score ? essentialRateList?.RET_DATA?.rate9?.score : "0%"}</strong></div>
                                    <div>도급/용역 위탁 시<br /> 안전보건 확보</div>
                                </Link>
                            </div>
                            <div id="slick_10" className={classes.slickCircle + handleSlickCircleColor(accidentsPrevention?.RET_DATA?.enforceRate)}>
                                <Link to="/dashboard/employee/accident-countermeasures-implementation/list" className={classes.slickLink} underline="none">
                                    <div><strong>{accidentsPrevention?.RET_DATA?.enforceRate ? accidentsPrevention?.RET_DATA?.enforceRate : "0%"}</strong></div>
                                    <div>재발방지<br /> 대책</div>
                                </Link>
                            </div>
                            <div id="slick_11" className={classes.slickCircle + handleSlickCircleColor(improvementLawOrderRate?.RET_DATA?.improvemetRate)}>
                                <Link to="/dashboard/employee/order-for-improvement-and-correction-under-related-law/list" className={classes.slickLink} underline="none">
                                    <div><strong>{improvementLawOrderRate?.RET_DATA?.improvemetRate ? improvementLawOrderRate?.RET_DATA?.improvemetRate : "0%"}</strong></div>
                                    <div>개선/시정<br /> 명령</div>
                                </Link>
                            </div>
                            <div id="slick_12" className={classes.slickCircle + handleSlickCircleColor('0%')}>
                                <Link to="/dashboard/employee/measure-to-manage-performance-od-duties-law/list" className={classes.slickLink} underline="none">
                                    <div><strong>{relatedLawRate?.RET_DATA?.relatedLawRate ? relatedLawRate?.RET_DATA?.relatedLawRate : "0%"}</strong></div>
                                    <div>관계법령에 따른<br /> 의무이행</div>
                                </Link>
                            </div>
                        </div>

                        <div className={classes.dashboardSlide}>
                            <div id="slick_13" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate1?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate1?.score ? essentialRateList?.RET_DATA?.rate1?.score : "0%"}</strong></div>
                                    <div>안전보건 목표 및<br /> 경영방침</div>
                                </Link>
                            </div>
                            <div id="slick_14" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate2?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate2?.score ? essentialRateList?.RET_DATA?.rate2?.score : "0%"}</strong></div>
                                    <div>안전보건 총괄관리<br /> 전담조직</div>
                                </Link>
                            </div>
                            <div id="slick_15" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate3?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate3?.score ? essentialRateList?.RET_DATA?.rate3?.score : "0%"}</strong></div>
                                    <div>유해요인개선<br /> 업무절차</div>
                                </Link>
                            </div>
                            <div id="slick_16" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate4?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate4?.score ? essentialRateList?.RET_DATA?.rate4?.score : "0%"}</strong></div>
                                    <div>예산편성 및<br /> 집행관리</div>
                                </Link>
                            </div>
                            <div id="slick_17" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate5?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate5?.score ? essentialRateList?.RET_DATA?.rate5?.score : "0%"}</strong></div>
                                    <div>업무수행 권한<br /> 및 책임</div>
                                </Link>
                            </div>
                            <div id="slick_18" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate6?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate6?.score ? essentialRateList?.RET_DATA?.rate6?.score : "0%"}</strong></div>
                                    <div>안전보건 전문인력<br /> 배치</div>
                                </Link>
                            </div>
                            <div id="slick_19" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate7?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate7?.score ? essentialRateList?.RET_DATA?.rate7?.score : "0%"}</strong></div>
                                    <div>종사자 개선<br /> 의견수렴</div>
                                </Link>
                            </div>
                            <div id="slick_20" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate8?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate8?.score ? essentialRateList?.RET_DATA?.rate8?.score : "0%"}</strong></div>
                                    <div>비상대응<br /> 절차마련</div>
                                </Link>
                            </div>
                            <div id="slick_21" className={classes.slickCircle + handleSlickCircleColor(essentialRateList?.RET_DATA?.rate9?.score)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{essentialRateList?.RET_DATA?.rate9?.score ? essentialRateList?.RET_DATA?.rate9?.score : "0%"}</strong></div>
                                    <div>도급/용역 위탁 시<br /> 안전보건 확보</div>
                                </Link>
                            </div>
                            <div id="slick_22" className={classes.slickCircle + handleSlickCircleColor(accidentsPrevention?.RET_DATA?.enforceRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{accidentsPrevention?.RET_DATA?.enforceRate ? accidentsPrevention?.RET_DATA?.enforceRate : "0%"}</strong></div>
                                    <div>재발방지<br /> 대책</div>
                                </Link>
                            </div>
                            <div id="slick_23" className={classes.slickCircle + handleSlickCircleColor(improvementLawOrderRate?.RET_DATA?.improvemetRate)}>
                                <Link to="#" className={classes.slickLink} underline="none">
                                    <div><strong>{improvementLawOrderRate?.RET_DATA?.improvemetRate ? improvementLawOrderRate?.RET_DATA?.improvemetRate : "0%"}</strong></div>
                                    <div>개선/시정<br /> 명령</div>
                                </Link>
                            </div>
                            <div id="slick_24" className={classes.slickCircle + handleSlickCircleColor('0%')}>
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
                                        <div><strong>{accidentTotal ? accidentTotal?.fallCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>끼임</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.caughtCnt : 0}</strong>건</div>
                                    </div>
                                    <div>
                                        <div>화재</div>
                                        <div><strong>{accidentTotal ? accidentTotal?.fireCnt : 0}</strong>건</div>
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
                                    <div>
                                        <div>중장비</div>
                                        <div><strong>{safeWorkHistoryList ? safeWorkHistoryList?.heavy : 0}</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} sx={{ marginBottom: '3px' }}>
                            <Grid className={classes.footBox + ' boxDown'} item xs={8.75}>
                                <Slider className={classes.footSlider} {...footerSlider}>
                                    {noticesList?.length && noticesList?.map((notice) =>
                                    (<div>
                                        <div>{notice.insertDate}</div>
                                        {notice?.importCd === "001" ? <span className={classes.slideLabelHot}>HOT</span> : ""}
                                        {notice?.importCd === "001" ?  
                                            <Link to={`/dashboard/director/notifications/view/${notice.noticeId}`} className={classes.hotlinkBtn}>{notice.title}</Link>
                                            :
                                            <Link to={`/dashboard/director/notifications/view/${notice.noticeId}`} className={classes.linkBtn}>{notice.title}</Link>
                                        }
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
                    {
                    localStorage.getItem(noticeHotItem.noticeId) >= VISITED_NOW_DATE ?
                        (<></>)
                    :
                        (
                        <div className={classes.notificationPopup} style={{marginTop: `${index*3 + '0'}px`, marginLeft: `${index*3 + '0'}px`}} >
                            <ClosePopupButton2 onClick={() => handleNotificationPopupsShow(index)}></ClosePopupButton2>
                            <div><span className={classes.slideLabelHot}>HOT</span> {noticeHotItem.title}</div>
                            <div className={classes.popNews}>
                                <p>
                                    {noticeHotItem.content}
                                </p>
                            </div>
                            <div style={{ float: 'left', width: '100%'}}>
                                <div style={{ width:'80%' }}>{noticeHotItem.attachId ? <img src={icoFile} alt="file icon" /> : null}{noticeHotItem.fileName}</div>
                                <div style={{ float: 'right' }}>
                                    <div className={classes.userInformation}>
                                        <div style={{ backgroundColor:'#fff', cursor: 'pointer' }} onClick={() => Dayclose(noticeHotItem.noticeId)}><span>하루동안 보지않기 X</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) 
                    }
                </>))
                }
            </Grid >

            {/* 로그아웃 처리 */}
            <Overlay show={yesNoPopupShow}>
            <YesNo
                show={yesNoPopupShow}
                message={yesNoPopupMessage}
                onConfirmYes={handleLogOut}
                onConfirmNo={() => setYesNoPopupShow(false)}
            />
        </Overlay>

        </WideLayout >
        
    );
};
export default Director;