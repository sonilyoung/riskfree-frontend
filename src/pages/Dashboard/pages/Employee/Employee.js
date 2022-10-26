import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { WideLayout } from '../../../../layouts/Wide';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { useStyles, UserButton, LogButton, SettingsButton, AdminButton, ChartButton, MainNavButton, PageSideButton, DashTrigButton, FileButtonExis, FileButtonExisEm, FileButtonNone,
    ButtonClosePop, ButtonGraphNext, ButtonGraphPrev, ButtonGrid, PopupFootButton,UploadImageButton, PromptButtonBlue, PromptButtonWhite,UnknownButton1, UnknownButton2, 
    SearchButton, ClosePopupButton2, SubmitButton } from './useStyles';

import arrowDown from '../../../../assets/images/ic_down.png';
import logo from '../../../../assets/images/logo.png';
import alertIcon from '../../../../assets/images/ic_refer.png';
import radioIcon from '../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../assets/images/ic_radio_on.png';
import { remove } from '../../../../services/core/User/Token';
import { useGetAccidentTotalMutation, useGetImprovementListMutation, useGetLeaderImprovementListMutation, useGetLoginInfoMutation, useGetSafeWorkHistoryListMutation, useGetNoticeListMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetCompanyInfoMutation, useGetDayInfoMutation, useGetEssentialRateMutation, useGetAccidentsPreventionMutation, useGetImprovementLawOrderMutation, useGetRelatedLawRateMutation, useGetDutyDetailListMutation, useGetInspectiondocsMutation, useGetDutyCycleMutation, useGetDutyAssignedMutation, useGetRelatedArticleMutation, useGetGuideLineMutation, useGetWorkplaceListMutation, useGetWeatherMutation, useGetNoticeHotListMutation, useUpdateUserCompanyMutation, useCloseMutation, useInsertBaseLineDataCopyMutation, useInsertBaseLineDataUpdateMutation, useInsertBaselineMutation, useGetTitleReportMutation, useGetBaseLineReportMutation, useUpdateSafetyFileMutation, useUpdateScoreMutation, useUpdateRelatedArticleMutation, useGetBaseLineReportGraphMutation ,useGetUserDutyUploadMutation} from '../../../../hooks/api/MainManagement/MainManagement';
import { useUserToken } from '../../../../hooks/core/UserToken';
import moment from 'moment'
import 'dayjs/locale/ko';
import { setWorkplaceId, selectBaselineId, selectIsClose, setBaselineId, setIsClose } from '../../../../slices/selections/MainSelection';
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
import * as Cookie from '../../../../pages/Cookie';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    const [defaultPage, setDefaultPage] = useState("");
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
    const [baselineStart, setBaselineStart] = useState("")
    const currentBaselineId = useSelector(selectBaselineId);
    const currentIsClose = useSelector(selectIsClose);

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
    const [targetBaselineName, setTargetBaselineName] = useState("");
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

    const [yesNoPopupShowLogOut, setYesNoPopupShowLogOut] = useState(false);
    const [yesNoPopupMessageLogOut, setYesNoPopupMessageLogOut] = useState("");

    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogEmployee, setOpenDialogEmployee] = useState(false)
    const [openSafetyDialog, setOpenSafetyDialog] = useState(false)
    const [openDutyDialog, setOpenDutyDialog] = useState(false)
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [selectedFile, setSelectedFile] = useState(null);
    const [inspectionFileId, setInspectionFileId] = useState(null)
    const [inspectionUpdateFileId, setInspectionUpdateFileId] = useState(null)
    const [articleNoForInspection, setArticleNoForInspection] = useState(null)
    const [uploadFlag, setUploadFlag] = useState(false)
    const [evaluation, setEvaluation] = useState("")
    const [evaluationPopup, setEvaluationPopup] = useState(false)
    const [getTitleReport] = useGetTitleReportMutation();
    const [getBaseLineReport] = useGetBaseLineReportMutation();
    const [condition, setCondition] = useState("1");
    const [openDialogOnly, setOpenDialogOnly] = useState(false);
    //const [rdom, setRdom] = useState("")
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
    const [getUserDutyUpload] = useGetUserDutyUploadMutation()
    
    const [updateDocumentFileId] = useUpdateDocumentFileIdMutation()
    const [updateScore] = useUpdateScoreMutation()
    const [evaluationIndex, setEvaluationIndex] = useState(null)
    const [updateRelatedArticle] = useUpdateRelatedArticleMutation()
    const { userCompanyId, userWorkplaceId, userRoleCode } = userInfo;
    const [ workplaceChange, setWorkplaceChange] = useState(false);
    const [wrongCredentialsPopup, setWrongCredentialsPopup] = useState(false);
    const [getSafetyFileId] = useGetSafetyFileIdMutation()
    const [safetyFileId, setSafetyFileId] = useState("");

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
        setTargetBaselineName('');
      }
      setExpanded(newExpanded ? panel : false);
    };
        
    //관리차수 마감
    const handleClose = async () => {
        setYesNoPopupMessage(`선택한 "${baselineData?.baselineName}"를 마감 하시겠습니까?`);
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
        setLoading(true);
        const response = await insertBaseline(baselineInfo);
        setLoading(false);
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
                "baselineId": currentBaselineId,
                "targetBaselineId": targetBaselineId
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
        setDefaultPage("");
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

        const response = await getBaseline({
            "baselineId": baselineId
        })
        setBaselineData(!!response.data.RET_DATA && response.data.RET_DATA)
        dispatch(setIsClose(response.data.RET_DATA.isClose))   
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
        setWorkplaceChange(true);
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
        if(baselineData.isClose==='1'){
            setOkayPopupMessage("마감된 차수는 업로드를 할 수 없습니다.");
            setOkayPopupShow(true);               
            return false;
        }

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
                    setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })

                    const responseSaferyFile = await updateSafetyFile({ "attachFileId": fileId, });
                    setSafetyFileId(fileId);
                } else if(response.data.RET_CODE === '0433'){
                    setOkayPopupMessage("파일확장자 오류");
                    setOkayPopupShow(true);
                } else {
                    setOkayPopupMessage("시스템 오류");
                    setOkayPopupShow(true);
                }
            }
        } else if (dialogId === "userDutyExcelUpload") {
            if((selectedFileName === "") || (selectedFileName === null) || (selectedFile === "")) {
                setOkayPopupMessage("업로드할 파일을 선택하세요.");
                setOkayPopupShow(true);   
            } else {
                setLoading(true);
                let formData = new FormData();
                formData.append("excelFile", selectedFile)
                console.log("userWorkplaceId:"+userWorkplaceId)
                console.log("currentBaselineId:"+currentBaselineId)
                const params = { workplaceId: userWorkplaceId, baselineId: currentBaselineId }
                formData.append('params', new Blob([JSON.stringify(params)], { type: 'application/json' }))                
                const response = await getUserDutyUpload(formData);                

                handleDialogCloseDuty()
                setLoading(false);
                if(response.data.RET_CODE === "0000" || response.data.RET_CODE === "0201") {
                    setOkayPopupMessage("등록 되었습니다.");
                    setOkayPopupShow(true);
                    //const getRandom = () => Math.random();
                    //setRdom(getRandom);
                    setDefaultPage(response?.data?.RET_CODE);
                } else if(response.data.RET_CODE === '0433'){
                    setOkayPopupMessage("파일확장자 오류");
                    setOkayPopupShow(true);
                } else {
                    setOkayPopupMessage(response.data.RET_DESC);
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
        if ((safetyFileId === "") || (safetyFileId === undefined) || (safetyFileId === null)) {
            setWrongCredentialsPopup(true);
            setOkayPopupMessage("업로드된 파일이 없습니다");
            setOkayPopupShow(true);
        } else {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${safetyFileId}&fileSn=1`;
        }
    }

    async function handleDialogFileDownload() {
        const fileId = employeeFiles[dialogId]
        if ((inspectionFileId === "") || (inspectionFileId === undefined) || (inspectionFileId === null)) {
            setWrongCredentialsPopup(true);
            setOkayPopupMessage("업로드된 파일이 없습니다");
        } else {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${inspectionFileId}&fileSn=1`;
        }
    }

    function handleDutyExcelDownload() {
        setLoading(true);
        window.location = `${BASE_URL}common/excel/getUserDutyExcel?workplaceId=${userWorkplaceId}&baselineId=${currentBaselineId}`;
        const FILEDOWNLOAD_INTERVAL = setInterval(function() {
            var donToken = Cookie.getCookie('fileDownloadToken');
            if (donToken === 'Y') { 
                clearInterval(FILEDOWNLOAD_INTERVAL);
                setLoading(false);
                Cookie.setCookie('fileDownloadToken', "N", 1);                
                setOkayPopupShow(true); 
                setOkayPopupMessage('파일다운로드가 완료되었습니다.');
            }
        }, 500);            
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

    const handleDialogCloseDuty = () => {
        setOpenDutyDialog(false);
    }    

    // 점검서류 등록, 안전작업허가서 양식
    const handleDialogOpenEmployee = (event, articleNo, fileId, index) => {
        setDialogId((event.target.id).toString());
        setArticleNoForInspection(articleNo)
        setInspectionFileId(fileId)
        setInspectionUpdateFileId(fileId)
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
        } else if (event.target.id === "userDutyExcelUpload") {
            setOpenDutyDialog(true);
            setLabelObject({
                ...labelObject,
                upperLabel: "안전보건 이행항목 관리",
                middleLabel: "엑셀양식의 안전보건관리체계의 구축 및 이행항목 데이터를 업/다운로드 합니다.",
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
        if(response?.data?.RET_DATA?.series.length>0){
            handleChartCategoriesDisplay(response?.data?.RET_DATA?.categories);
            setChartSeries(response?.data?.RET_DATA?.series);
        }else{
            handleChartCategoriesDisplay([]);
            setChartSeries([]);            
        }
    }

    const DateChange = name => (date) => {
        if((date === "") || (date === null)){
            setBaselineInfo({ ...baselineInfo, [name]: null})
        } else {
            setBaselineInfo({ ...baselineInfo, [name]: date.format('YYYY-MM-DD')});
        }
    };

    const handelOnlyNumber = (str) => {
        const onlyNumber = str.replace(/[^0-9]/g, '')
        return onlyNumber
    }
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
        fetchInspectionDocs();
        fetchNoticeList();
        fetchImprovementList();
        fetchDutyDetailList();
        setWorkplaceChange(false);
        setLoading(false);
    }, [baselineIdForSelect, baselineData, defaultPage, workplaceChange]);  

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
        fetchEssentialRates()
        fetchDutyDetailList()
        setLoading(false);
    }, [clickedEssentialRate])

    useEffect(() => {
        setLoading(true);
        fetchEssentialRates()
        fetchInspectionDocs()
        fetchDutyCycle()
        fetchDutyAssigned()
        fetchRelatedArticle()
        fetchGuideLine()
        setLoading(false);
    }, [clickedDuty])

    useEffect(() => {
        setLoading(true);
        fetchEssentialRates()
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
                            <Link to={(loginInfo?.roleCd === "001") ? "/dashboard/director" : (loginInfo?.roleCd === "002") ? "/dashboard/employee" : (loginInfo?.roleCd === "003") ? "/dashboard/employee" : "/"}>
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
                                                {!!(companyInfo) && !!companyInfo.logoImg && (<img src={`${BASE_URL}file/getImg?imgPath=${companyInfo?.logoImg}`} alt="logo" />)}
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
                                            value={companyInfo?.shGoal || ""}
                                            variant="outlined"
                                            sx={{ width: 370 }}
                                            className={classes.popupTextField}
                                            onChange={(event) => setCompanyInfo({ ...companyInfo, "shGoal": event.target.value })}
                                            inputProps={{ maxLength: 16 }}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            placeholder='경영방침 등록 (띄어쓰기 포함 16자 이내)'
                                            value={companyInfo?.missionStatements || ""}
                                            onChange={(event) => setCompanyInfo({ ...companyInfo, "missionStatements": event.target.value })}
                                            variant="outlined"
                                            sx={{ width: 370 }}
                                            className={classes.popupTextField}
                                            inputProps={{ maxLength: 16 }}                                          
                                        />
                                        <div className={classes.preFootPop}>
                                            <div>
                                                {filePath.logoImgUpload ? (<img height={60} src={`${BASE_URL}file/getImg?imgPath=${filePath.logoImgUpload}`} alt="logo" />) : (<span>로고등록</span>)}
                                            </div>
                                            <div>
                                                <UploadImageButton id={"logoImgUpload"} onClick={handleDialogOpenOnly}>찾아보기</UploadImageButton>
                                                <Alert
                                                    icon={<img src={alertIcon} alt="alert icon" />}
                                                    severity="error">
                                                    사이즈 83px*67px
                                                    <br />
                                                    (gif, jpg, png 파일허용)
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
                                        value={num || ""}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled
                                    >
                                        <MenuItem value=""> {companyInfo?.scale} 이하</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: 150, marginLeft: '8px' }} className={classes.dropMenu}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num || ""}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled
                                    >
                                        <MenuItem value=""> {companyInfo?.sector}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.rightMenu}>
                                <div className={classes.userInformation}>
                                    <div>{loginInfo?.loginId} / <span>{loginInfo?.roleName}</span></div>
                                    <div>계약기간 : {companyInfo?.contractStartDate} ~ {companyInfo?.contractEndDate}</div>
                                </div>
                                <LogButton className={classes.mainMenuButton} onClick={() => {setYesNoPopupShowLogOut(true); setYesNoPopupMessageLogOut("로그아웃 하시겠습니까?") }}></LogButton>
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
                                                    value={baselineInfo.baselineName || ""}
                                                    variant="outlined"
                                                    sx={{ width: 80 }}
                                                    className={classes.popupTextField}
                                                    onChange={(event) => setBaselineInfo({ ...baselineInfo, "baselineName": handelOnlyNumber(event.target.value) })}
                                                />차
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                                    <DesktopDatePicker
                                                        className={classes.selectMenuDate}
                                                        label=' '
                                                        inputFormat="YYYY-MM-DD"
                                                        value={baselineInfo.baselineStart || ""}
                                                        onChange={DateChange('baselineStart')}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: 120 }} />}
                                                    />
                                                </LocalizationProvider>
                                                ~
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                                    <DesktopDatePicker
                                                        className={classes.selectMenuDate}
                                                        label=" "
                                                        inputFormat="YYYY-MM-DD"
                                                        value={baselineInfo.baselineEnd || ""}
                                                        onChange={DateChange('baselineEnd')}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: 120 }} />}
                                                    />
                                                </LocalizationProvider>
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
                                                {baselineData.isClose === "1" ? <span style={{color:'red'}}>※ 마감된 차수는 복사할 수 없습니다.</span>
                                                :
                                                <>
                                                <Select
                                                    className={classes.popupTextField}
                                                    sx={{ width: 150, marginBottom: '25px !important' }}
                                                    value={targetBaselineId+'/'+targetBaselineName}                                                    
                                                    onChange={(event) => {
                                                        setTargetBaselineName(event.target.value.split("/")[1])
                                                        setTargetBaselineId(event.target.value.split("/")[0])
                                                    }}
                                                >
                                                    {baselineList?.map(baselineItem => 
                                                        parseInt(currentBaselineId) === baselineItem.baselineId ? 
                                                            <></>
                                                         :
                                                            <MenuItem value={baselineItem.baselineId+'/'+baselineItem.baselineName}>{baselineItem.baselineName}</MenuItem>
                                                        )}
                                                </Select>
                                                {!!baselineList && !!baselineList?.length
                                                    && baselineList?.filter(baselineItem => baselineItem.baselineId === targetBaselineId)
                                                        ?.map(item => <span>{item.baselineStart}~{item.baselineEnd}</span>)}
                                                <div className={classes.popupPrompt}>
                                                    <Alert
                                                        icon={<img src={alertIcon} alt="alert icon" />}
                                                        severity="error">
                                                        <div style={{letterSpacing: '-0.1px', justifyContent: 'center'}}>
                                                            <strong>"{targetBaselineName}"</strong>의 DATA를
                                                            <strong>"{baselineData.baselineName}"</strong>에 복사 하시겠습니까?
                                                        </div>
                                                    </Alert>
                                                    <PromptButtonBlue onClick={() => handleInsertBaseLineDataCopy()}>예</PromptButtonBlue>
                                                    <PromptButtonWhite onClick={panelhandleChange('panel3')}>아니오</PromptButtonWhite>
                                                </div>
                                                </>
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                        <span></span>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => handleClose()}>관리차수 마감<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"/dashboard/employee/notifications/list"} underline="none">전사 공지사항 등록<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" id="safetyFileUpload" onClick={handleDialogOpenEmployee}>안전작업허가서 양식 업/다운로드​<img src={arrowDown} alt="arrow down" /></Link>
                                        
                                        {baselineData.isClose==='1' ? 
                                            <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => {setOkayPopupShow(true); setOkayPopupMessage('마감된 차수는 업데이트할 수 없습니다.')}}>안전보건관리체계의 구축 및 이행 항목 업데이트​<img src={arrowDown} alt="arrow down" /></Link>
                                        :
                                            <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => {setYesNoPopupShow(true); setYesNoPopupMessage("데이터가 초기화 됩니다.업데이트 하시겠습니까?") }}>안전보건관리체계의 구축 및 이행 항목 업데이트​<img src={arrowDown} alt="arrow down" /></Link>
                                        }
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" id="userDutyExcelUpload" onClick={handleDialogOpenEmployee}>안전보건관리체계의 구축 및 이행 항목 업/다운로드<img src={arrowDown} alt="arrow down" /></Link>

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
                                    <img src={`${BASE_URL}file/getImg?imgPath=${weatherData?.weatherImgUrl}`} alt="weather icon" />
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
                            {!!(companyInfo) && !!companyInfo.logoImg && (<img src={`${BASE_URL}file/getImg?imgPath=${companyInfo?.logoImg}`} alt="logo" />)}
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
                                { /* 사업장 */}
                                {!!(workplaceList) && workplaceList?.map((workplaceItem, index) => (
                                    userRoleCode === "001" ?
                                    <MainNavButton key={index} className={workplaceItem.workplaceId === parseFloat(userWorkplaceId) ? "active" : ""}
                                    onClick={() => handleFactoryChange({ ...userInfo, userCompanyId: workplaceItem.companyId, userWorkplaceId: workplaceItem.workplaceId })}>{workplaceItem.workplaceName}</MainNavButton>
                                    :
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
                            }}>
                            <RadioGroup row value={evaluation || ""}>
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
                                    <p className={classes.listLink + ' parentLink'} to={"#none"} underline="none" style={{fontSize: '19px'}}>안전보건관리체계의 구축 및 이행</p>
                                    <span className={'normal'}>
                                        {essentialRates && essentialRates?.topRate}
                                    </span>
                                    <ul className={classes.menuList + ' nestedList'}>
                                        {essentialRates && Object.entries(essentialRates).length > 0 && Object.keys(essentialRates)?.map(function (property) {
                                            if (property.includes("rate")) {
                                                return (
                                                    <><li>
                                                        <Link className={(clickedEssentialRateForClass === property ? classes.listLinkClicked : classes.listLink)} onClick={() => {
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
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/accident-countermeasures-implementation/list"} underline="none" style={{fontSize: '19px'}}>재해발생 방지대책 및 이행현황</Link>
                                    <span className={'caution'}>{accidentsPreventionPercentage?.enforceRate}</span>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/order-for-improvement-and-correction-under-related-law/list"} underline="none" style={{fontSize: '19px'}}>관계법령에 따른 개선.시정명령 조치</Link>
                                    <span className={'warning'}>{lawOrderPercentage?.improvemetRate}</span>
                                </li>
                                <li>
                                    <Link className={classes.listLink + ' parentLink'} to={"/dashboard/employee/measure-to-manage-performance-od-duties-law/list"} underline="none" style={{fontSize: '19px'}}>관계법령에 의무이행의 관리의 조치</Link>
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
                                            <div>
                                                {
                                                    currentIsClose === "1" ?
                                                        (inspection.fileId === null || inspection.fileId === "null" || inspection.fileId === "") ? 
                                                            <FileButtonNone></FileButtonNone>
                                                        : 
                                                            <>
                                                            {(inspection.updateFileId === null || inspection.updateFileId === "null" || inspection.updateFileId === "") ? 
                                                            <FileButtonExis></FileButtonExis>
                                                            :
                                                            <FileButtonExisEm></FileButtonExisEm>
                                                            }
                                                        {((inspection.evaluation === "10" && <span className={'green'}>상</span>) 
                                                            || (inspection.evaluation === "7" && <span className={'orange'}>중</span>) 
                                                                || (inspection.evaluation === "5" && <span className={'red'}>하</span>)
                                                                    || (inspection.evaluation === "" && <span>평가</span>))}
                                                            </>
                                                :                                            
                                                    (inspection.fileId === null || inspection.fileId === "null" || inspection.fileId === "") ? 
                                                        <FileButtonNone id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonNone>
                                                        : 
                                                        <>
                                                        {(inspection.updateFileId === null || inspection.updateFileId === "null" || inspection.updateFileId === "") ?
                                                        <FileButtonExis id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonExis>
                                                        :
                                                        <FileButtonExisEm id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonExisEm>
                                                        }
                                                        {(loginInfo.roleCd === "003") ?
                                                            inspection.fileId && ((inspection.evaluation === "10" && <span className={'green'}>상</span>) 
                                                                || (inspection.evaluation === "7" && <span className={'orange'}>중</span>) 
                                                                    || (inspection.evaluation === "5" && <span className={'red'}>하</span>)
                                                                    || (inspection.evaluation === "0" && <span>평가</span>))
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
                                                        </>
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
                                            currentIsClose === "1" ?
                                            <>
                                                <li>{((checkBtn.managerChecked === "0" || checkBtn.managerChecked == null || checkBtn.managerChecked === "null" || checkBtn.managerChecked === "") &&
                                                    (<Link className={classes.listLink + ' check'} to={"#none"} underline="none"></Link>)) || ((checkBtn.managerChecked === "1") &&
                                                        (<Link className={classes.listLink + ' check-blue'} to={"#none"} underline="none" ></Link>))}
                                                </li>
                                            </>
                                            :
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
                                                {notice?.importCd === "001" ? <span className={classes.slideLabelHot}>HOT</span> : ""}
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
                    <div className={classes.notificationPopup} style={{marginTop: `${index*3 + '0'}px`, marginLeft: `${index*3 + '0'}px`}} >
                    <ClosePopupButton2 onClick={() => handleNotificationPopupsShow(index)}></ClosePopupButton2>
                        {noticeHotItem.importCd === '001' ?
                            <div><span className={classes.slideLabelHot}>HOT</span> {noticeHotItem.title}</div>
                        :
                        <div>{noticeHotItem.title}</div>
                        }
                        
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
            <UploadEmployeeDialog
                open={openDutyDialog}
                onClose={handleDialogCloseDuty}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDutyExcelDownload}
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
                        
            {/* 로그아웃 처리 */}
            <Overlay show={yesNoPopupShowLogOut}>
                <YesNo
                    show={yesNoPopupShowLogOut}
                    message={yesNoPopupMessageLogOut}
                    onConfirmYes={handleLogOut}
                    onConfirmNo={() => setYesNoPopupShowLogOut(false)}
                />
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