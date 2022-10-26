import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import logo from '../../assets/images/logo_login.png';
import arrowDown from '../../assets/images/ic_down.png';
import userIcon from '../../assets/images/btn_user.png';
import userIconHover from '../../assets/images/btn_user_ov.png';
import adminIcon from '../../assets/images/btn_admin.png';
import adminIconHover from '../../assets/images/btn_admin_ov.png';
import setIcon from '../../assets/images/btn_set.png';
import setIconHover from '../../assets/images/btn_set_ov.png';
import backButton from '../../assets/images/btn_back.png';
import popupClose from '../../assets/images/btn_popClose.png';
import searchIcon from '../../assets/images/ic_search.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';
import fileExis from '../../assets/images/file_exis.png';
import fileNone from '../../assets/images/file_none.png';

import { useGetEssentialDutyVersionMutation, useGetEssentialRateMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetLoginInfoMutation, useUpdateSafetyFileMutation, useGetCompanyInfoMutation, useGetDutyDetailListMutation, useGetWeatherMutation, useGetInspectiondocsMutation } from '../../hooks/api/MainManagement/MainManagement';
import { remove } from '../../services/core/User/Token';
import { useUserToken } from '../../hooks/core/UserToken';

import { useSelector, useDispatch } from 'react-redux';
import { selectBaselineId, setBaselineId } from '../../slices/selections/MainSelection';
import { useLocalStorage } from '../../hooks/misc/LocalStorage';

import LogoutIcon from '@mui/icons-material/Logout';
import { Overlay } from '../../components/Overlay';
import Okay from '../../components/MessageBox/Okay';
import YesNo from '../../components/MessageBox/YesNo';
import { useFileUploadMutation, useUpdateDocumentFileIdMutation } from '../../hooks/api/FileManagement/FIleManagement';
import { UploadDialog, UploadEmployeeDialog } from '../../dialogs/Upload';
import { useExcelUploadMutation } from '../../hooks/api/ExcelController/ExcelController';

import { default as NotifiCenterList } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/List/List'
import { default as NotifiCenterRegistration } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/Registration/Registration'
import { default as NotifiCenterView } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/View/View'
import { default as NotifiCenterUpdate } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/Update/Update'

import Loading from '../../pages/Loading';
import { useStyles } from './useStyles';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserButton = styled(ButtonUnstyled)`
    background: transparent url(${userIcon});
    &:hover {
        background-image: url(${userIconHover});
    }
`;

const AdminButton = styled(ButtonUnstyled)`
    background: transparent url(${adminIcon});
    &:hover {
        background-image: url(${adminIconHover});
    }
`;

const LogButton = styled(ButtonUnstyled)`
    background: transparent;
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
    // position: absolute;
    // top: 130px;
    // left: 6px;
    margin-right: 40px;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent url(${backButton});
    cursor: pointer;
`;

const WhiteButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    border: 2px solid #018de7;
    background: #fff;
    color: #018de7;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
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

const DefaultLight = ({ children }) => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [getLoginInfo] = useGetLoginInfoMutation();
    const [loginInfo, setLoginInfo] = useState({});
    const [userToken] = useUserToken();
    
    const userRoleCode = userToken.getUserRoleCd();
    const userWorkplaceId = userToken.getUserWorkplaceId();
    const [companyInfo, setCompanyInfo] = useState({});
    const companyId = userToken.getUserCompanyId();
    const workplaceId = userToken.getUserWorkplaceId();
    const [getCompanyInfo] = useGetCompanyInfoMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // 세팅팝업
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [fileUploadPopup, setFileUploadPopup] = useState(false);
    const [adminCenterPopup, setAdminCenterPopup] = useState(false);

    const [notifiCenterPage, setNotifiCenterPage] = useState("");

    const [SubEventExe, setSubEventExe] = useState(null)
    const [getBaselineList] = useGetBaselineListMutation() 
    const [getBaseline] = useGetBaselineMutation()
    const [baselineList, setBaselineList] = useState([])
    const [getInspectionsDocs] = useGetInspectiondocsMutation()
    const [inspectionsDocs, setInspectionsDocs] = useState([])

    const [clickedDuty, setClickedDuty] = useState(null)
    const [dutyDetailList, setDutyDetailList] = useState([])
    const [essentialRates, setEssentialRates] = useState([])
    const [baselineStart, setBaselineStart] = useState("")
    const currentBaselineId = useSelector(selectBaselineId);
    const [baselineIdForSelect, setBaselineIdForSelect] = useState(currentBaselineId)
    const [getEssentialRate] = useGetEssentialRateMutation()
    const [clickedEssentialRate, setClickedEssentialRate] = useState(1)
    const [clickedEssentialRateForClass, setClickedEssentialRateForClass] = useState("rate1")
    const [getDutyDetailList] = useGetDutyDetailListMutation()
    const [articleNoForInspection, setArticleNoForInspection] = useState(null)
    const [inspectionFileId, setInspectionFileId] = useState(null)
    const [openSafetyDialog, setOpenSafetyDialog] = useState(false)
    const [openDialogEmployee, setOpenDialogEmployee] = useState(false)
    const [updateSafetyFile] = useUpdateSafetyFileMutation()
    const [updateDocumentFileId] = useUpdateDocumentFileIdMutation()
    const [uploadFlag, setUploadFlag] = useState(false)

    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("");
        
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [openDialogOnly, setOpenDialogOnly] = useState(false);

    const [nId, setNId] = useState(1);

    const [okPopupShow, setOkPopupShow] = useState(false);
    const [okPopupMessage, setOkPopupMessage] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");

    const dispatch = useDispatch();
    const localStorage = useLocalStorage();
    const currentBaseline = useSelector(selectBaselineId);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [getWeather] = useGetWeatherMutation();
    const [weatherData, setWeatherData] = useState({});

    const [excelUpload] = useExcelUploadMutation();
    const [fileUpload] = useFileUploadMutation();
    const [safetyFileId, setSafetyFileId] = useState("");  
    const [dialogId, setDialogId] = useState("");
    
    const [excel, setExcel] = useState({
        "excelFileId": "",
    })

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

    const [labelObject, setLabelObject] = useState("");
    
    const [essentialDutyFileId, setEssentialDutyFileId] = useState(null);
    
    //로딩바추가
    const [loading, setLoading] = useState(true);

    // 업로드창 닫기
    const handleDialogCloseOnly = () => {
        setOpenDialogOnly(false);
    }

    // 점검서류 업로드창 닫기
    const handleDialogCloseEmployee = () => {
        setOpenDialogEmployee(false);
    }

    const handleDialogCloseSafety = () => {
        setOpenSafetyDialog(false);
    }    

    const [getEssentialDutyVersion] = useGetEssentialDutyVersionMutation();
    const fetchEssentialDutyVerision = async () => {
        const response = await getEssentialDutyVersion()
        setEssentialDutyFileId(response?.data?.RET_DATA?.attachFileId)
    }

    // 안전보건관리체계의 구축 및 이행 항목 호출
    const fetchEssentialRates = async () => {
        const response = await getEssentialRate({
        })
        setEssentialRates(response?.data?.RET_DATA)
    }

    // 의무조치별 상세 점검 항목 호출
    const fetchDutyDetailList = async () => {
        console.log(clickedEssentialRate)
        const response = await getDutyDetailList({
            "groupId": clickedEssentialRate
        })        
        setDutyDetailList(response?.data?.RET_DATA)
        setClickedDuty(!!(response.data.RET_DATA) && !!(response.data.RET_DATA) && response?.data?.RET_DATA[0]?.articleNo)

        if(response?.data?.RET_DATA?.length > 0){
            setSubEventExe(true)    
        }else{
            setSubEventExe(false)
        }        
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

    const [inspectionIndex, setInspectionIndex] = useState(null)

    const handleDialogFileUploadDocs = async () => {
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

    const handleDialogOpen = (event) => {
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(event.target.id);
        setLabelObject({
            ...labelObject,
            upperLabel: "안전작업허가서 양식 관리",
            middleLabel: "등록된 양식을 다운로드 합니다.",
        })
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    // 파일 업로드
    const handleDialogFileUpload = async () => {
        if((selectedFileName === "") || (selectedFileName === null)) {
            setOkPopupMessage("업로드할 파일을 선택하세요.");
            setOkPopupShow(true);   
        } else {
            let formData = new FormData();
            formData.append("excelFile", selectedFile)
            setLoading(true);
            const response = await excelUpload(formData)
            setLoading(false);
            if((response.data.RET_CODE === "0000") || (response.data.RET_CODE === "0201")){
                setExcel({ ...excel })
                setOkPopupMessage("'파일'을 등록 하였습니다.");
                setOkPopupShow(true);
                handleDialogClose();
                fetchEssentialDutyVerision();
            } else if(response.data.RET_CODE === '0433'){
                setOkPopupMessage("파일확장자 오류");
                setOkPopupShow(true);
            } else {
                setOkayPopupMessage(response.data.RET_DESC);
                setOkayPopupShow(true);
            }
            setSelectedFileName("");
        }
    }
    
    // 점검서류 등 목록 파일 다운로드
    async function handleDialogFileDownloadDocs() {
        const fileId = excel[dialogId]
        if (fileId || inspectionFileId) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId || inspectionFileId}&fileSn=1`;
        }
    }

    // 파일 다운로드
    async function handleDialogFileDownload() {
        const fileId = excel[dialogId]
        if (fileId || essentialDutyFileId) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId || essentialDutyFileId}&fileSn=1`;
        }
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    // 회원 정보 호출
    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    // 로그아웃
    const handleLogOut = () => {
        remove();
        navigate('/');
    }

    const handleRedirect = () => {
        navigate(-1)
    }

    const fetchCompanyInfo = async () => {
        const response = await getCompanyInfo({
            "companyId": companyId,
            "workplaceId": workplaceId
        })
        setCompanyInfo(response.data.RET_DATA)
    }

    // 날씨 및 지역주소 가져오기
    const fetchWeather = async () => {
        const response = await getWeather({
            "latitude": latitude,
            "longitude": longitude,
        })
        setWeatherData(response.data.RET_DATA)
    }

    // 공지사항 상세페이지 호출
    const handelSetNoticeView = (Id) => {
        setNId(Id);
        setNotifiCenterPage("View");
    }

    // 공지사항 수정페이지 호출
    const handelSetNoticeUpdate = (Id) => {
        setNId(Id);
        setNotifiCenterPage("Update");
    }

    // 분류별 팝업 호출
    const handelNotifiPopup = (popupType) => {
        setNotifiCenterPage(popupType);
        setAdminCenterPopup(true);
        setSettingsPopup(false);
    }

    useEffect(() => {
        setLoading(true);
        if (currentBaseline === null) {
            dispatch(setBaselineId(localStorage.getDefaultBaselineId()));
        }
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
        fetchEssentialRates()
        handleLoginInfo()
        fetchCompanyInfo()
        fetchEssentialDutyVerision()
        setLoading(false);
    }, [])

    useEffect(() => {
        setLoading(true);
        fetchWeather()
        fetchEssentialDutyVerision()
        setLoading(false);
    }, [loginInfo])

    useEffect(() => {
        setLoading(true);
        fetchInspectionDocs()
        setLoading(false);
    }, [clickedDuty, uploadFlag])

    useEffect(() => {
        setLoading(true);
        fetchDutyDetailList()
        setLoading(false);
    }, [clickedEssentialRate])

    return (
        <div className={classes.bodyWrap}>
            <Grid className={classes.headerWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            {/* <Link to={(loginInfo?.roleCd === "001" ? "/dashboard/director" : ) || (loginInfo?.roleCd === "002" ? "/dashboard/employee" : "#none")}> */}
                            <Link to={(loginInfo?.roleCd === "001") ? "/dashboard/director" : (loginInfo?.roleCd === "002") ? "/dashboard/employee" : (loginInfo?.roleCd === "003") ? "/dashboard/employee" : "/"}>
                                <img src={logo} alt="logo" />
                            </Link>
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                            </div>
                            <div className={classes.rightMenu}></div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            {/* 세팅 팝업 Start */}
                            {/* <SettingsButton className={classes.mainMenuButton} id={"excelFileId"} onClick={handleDialogOpen}></SettingsButton> */}
                            <SettingsButton className={classes.mainMenuButton} onClick={() => setSettingsPopup(true)}></SettingsButton>
                                <div className={settingsPopup ? (classes.headerPopup + ' settings_popup') : (classes.headerPopup + ' settings_popupClose')}>
                                    <div className={classes.popHeader}>
                                        <div>관리자 설정</div>
                                        <ButtonClosePop onClick={() => setSettingsPopup(false)}></ButtonClosePop>
                                    </div>
                                    <div className={classes.headerPopList}>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => 
                                            handleDialogOpen()
                                        }>안전보건관리체계의 구축 및 이행 항목 등록/업데이트<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => 
                                        { 
                                            setFileUploadPopup(true) 
                                            setSettingsPopup(false) 
                                        }
                                        }>안전보건관리체계의 구축 및 이행 서류 양식 등록<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => 
                                            handelNotifiPopup("List")
                                        }>가입고객 통합 공지사항​<img src={arrowDown} alt="arrow down" /></Link>
                                    </div>
                                </div>
                                {/* 세팅 팝업 End */}
                                
                                {/* 파일 업로드 Start*/}
                                    <div className={fileUploadPopup ? (classes.headerPopup + ' fileupload_popup') : (classes.headerPopup + ' fileupload_popupClose')}>
                                        <div className={classes.popHeader}>
                                            <div>안전보건관리체계의 구축 및 이행 서류 양식 등록</div>
                                            <ButtonClosePop onClick={() => setFileUploadPopup(false)}></ButtonClosePop>
                                        </div>
                                        <Grid className={classes.pageContent} item container rowSpacing={0} columnSpacing={1}>
                                            <Grid item container xs={3.6} >
                                                <Grid item xs={12}>
                                                    <div className={classes.contentList}>
                                                        <div className={classes.listTitle}>안전보건관리체계의 구축 및 이행</div>
                                                        <ul className={classes.menuList + ' parentList'}>
                                                            <li>
                                                                <ul className={classes.menuList + ' nestedList'}>
                                                                {essentialRates && Object.entries(essentialRates).length > 0 && Object.keys(essentialRates)?.map(function (property) {
                                                                    if (property.includes("rate")) {
                                                                        return (
                                                                            <><li className={classes.listdoteLine}>
                                                                        <Link className={(clickedEssentialRateForClass == property ? classes.listLinkClicked : classes.listLink)} onClick={() => {
                                                                                    setClickedEssentialRateForClass(property)
                                                                                    setClickedEssentialRate(!!essentialRates[property].groupId && essentialRates[property].groupId)
                                                                                }} to={"#none"} underline="none">{!!essentialRates[property].title && essentialRates[property].title}</Link>
                                                                    </li></>
                                                                        )
                                                                    }
                                                                })}
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4.2}>
                                                <Grid item xs={12}>
                                                    <div className={classes.contentList}>
                                                        <div className={classes.listTitle}>의무조치별 상세 점검 항목</div>
                                                        <ul className={classes.menuList + ' secondList'}>
                                                        {dutyDetailList?.map((element) => {
                                                        return (
                                                            <li className={classes.listdoteLine}>
                                                                <Link className={clickedDuty !== element.articleNo ? classes.listLink : classes.listLinkClicked} to={"#none"} underline="none" onClick={() => setClickedDuty(element.articleNo)}>{element.detailedItems}</Link>
                                                            </li>
                                                            )
                                                        })}
                                                        </ul>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item container xs={4.15}>
                                                <Grid item xs={12}>
                                                    <div className={classes.contentList}>
                                                        <div className={classes.listTitle}>점검서류 등 목록</div>
                                                        <ul className={classes.menuList + ' secondList'}>
                                                        {inspectionsDocs?.map((inspection, index) => (
                                                            <><li className={classes.listdoteLine}>
                                                                <Link className={classes.listLink} to={"#none"} underline="none" >
                                                                    <span style={{width: '90%'}}>{inspection?.shGoal}</span>
                                                                    <span style={{width: '10%'}}>
                                                                    {(inspection.fileId === null || inspection.fileId === "null" || inspection.fileId === "") ? 
                                                                        <FileButtonNone id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonNone>
                                                                        : 
                                                                        <FileButtonExis id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonExis>
                                                                    }
                                                                    </span>
                                                                </Link>
                                                            </li></>
                                                        ))}
                                                        </ul>
                                                        {/* <div>
                                                            <ul className={classes.menuList + ' buttonList'}>
                                                            {inspectionsDocs?.map((inspection, index) => (<><li className={classes.listdoteLine}>
                                                                <div>{(inspection.fileId === null || inspection.fileId === "null" || inspection.fileId === "") ? 
                                                                    <FileButtonNone id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonNone>
                                                                    : 
                                                                    <FileButtonExis id="inspectionFile" onClick={(event) => handleDialogOpenEmployee(event, inspection.articleNo, inspection.fileId, index)}></FileButtonExis>
                                                                }
                                                                </div>
                                                                </li></>)
                                                            )}
                                                            </ul>
                                                        </div> */}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.buttonCenter} container xs={12}>
                                                <WhiteButton className={'button-cancelation'} onClick={() => setFileUploadPopup(false)}>닫기</WhiteButton>
                                            </Grid>
                                        </Grid>                                        
                
                                    </div>
                                {/* 파일 업로드 End */}

                                {/* Admin Center Start */}
                                    <div className={adminCenterPopup ? (classes.headerPopup + ' admincenter_popup') : (classes.headerPopup + ' admincenter_popupClose')}>
                                        <div className={classes.popHeader}>
                                            <div>가입고객 통합 공지사항</div>
                                            <ButtonClosePop onClick={() => setAdminCenterPopup(false) }></ButtonClosePop>
                                        </ div>
                                        {
                                            notifiCenterPage === 'List' ?
                                                <NotifiCenterList notifiCenterPage="List" onDoubleClickView={handelSetNoticeView} onCallback={handelNotifiPopup}></NotifiCenterList>
                                            :
                                            notifiCenterPage === 'Registration' ?
                                                <NotifiCenterRegistration notifiCenterPage="Registration" onCallback={handelNotifiPopup}></NotifiCenterRegistration>
                                            :
                                            notifiCenterPage === 'View' ?
                                                <NotifiCenterView notifiCenterPage="View" nId={nId} onDoubleClickUpdate={handelSetNoticeUpdate} onCallback={handelNotifiPopup}></NotifiCenterView>
                                            :
                                            notifiCenterPage === 'Update' ?
                                                <NotifiCenterUpdate  notifiCenterPage="Update" nId={nId} onCallback={handelNotifiPopup}></NotifiCenterUpdate>
                                            : `${notifiCenterPage}`
                                        }
                                    </div>
                                {/* Admin Center End */}
                            {/* <AdminButton className={classes.mainMenuButton}></AdminButton>  */}
                            <div className={classes.userInformation}>
                                <div>{loginInfo?.loginId} / <span>{loginInfo?.roleName}</span></div>
                            </div>
                            {/* <BackButton onClick={() => handleRedirect()}></BackButton> */}
                            <LogButton className={classes.mainMenuButton} onClick={() => {setYesNoPopupShow(true); setYesNoPopupMessage("로그아웃 하시겠습니까?") }}>
                                <LogoutIcon fontSize="large" sx={{ color: 'gray' }}></LogoutIcon>
                            </LogButton>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>

            <UploadEmployeeDialog
                open={openDialogEmployee}
                onClose={handleDialogCloseEmployee}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUploadDocs}
                onDownload={handleDialogFileDownloadDocs}
                enableDownload={true}
                label={labelObject}
                selectedFileName={selectedFileName}
            />

            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                selectedFileName={selectedFileName}
            />

            {/* 로그아웃 */}
            <Overlay show={yesNoPopupShow}>
                <YesNo
                    show={yesNoPopupShow}
                    message={yesNoPopupMessage}
                    onConfirmYes={handleLogOut}
                    onConfirmNo={() => setYesNoPopupShow(false)}
                />
            </Overlay>

            <Overlay show={okPopupShow}>
                <Okay
                    show={okPopupShow}
                    message={okPopupMessage}
                    title="알림"
                    onConfirm={() => setOkPopupShow(false) } />
            </Overlay>
            {loading && <Loading/>}
            {/* <BackButton onClick={() => handleRedirect()}></BackButton> */}
            <div className={classes.pageOverlay}></div>
            <div className={classes.sectionWrap}>
                {children}
            </div>
        </div >
    );
};

export default DefaultLight;