import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'

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
import searchIcon from '../../assets/images/ic_search.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { useUpdateSafetyFileMutation, useGetLoginInfoMutation, useGetCompanyInfoMutation, useGetWeatherMutation, useInsertBaselineMutation, useInsertBaseLineDataCopyMutation, useGetBaselineListMutation, useCloseMutation, useUpdateUserCompanyMutation, useInsertBaseLineDataUpdateMutation } from '../../hooks/api/MainManagement/MainManagement';
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
import moment from 'moment';
import { useFileUploadMutation, useGetFileInfoMutation } from '../../hooks/api/FileManagement/FIleManagement';
import { Overlay } from '../../components/Overlay';
import { OnlyUploadDialog, UploadDialog, UploadImageDialog } from '../../dialogs/Upload';
import Okay from '../../components/MessageBox/Okay';
import YesNo from '../../components/MessageBox/YesNo';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


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
        borderRadius: '24px 0 0 0',
        // width: '1874px',
        '& >div:first-of-type': {
            width: '1794px',
            margin: '0 auto',
        }
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
        width: '420px',
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
    uploadPopup: {
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '40%',
        transform: 'translate(-50%,-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        color: 'black',
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
    uploadPopupHide: {
        display: 'none',
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
    textArea: {
        '& .MuiOutlinedInput-root': {
            background: '#fff',
            '& textarea': {
                height: '74px !important',
                fontSize: '16px',
            }
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

const UserButtonInactive = styled(ButtonUnstyled)`
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
    &:hover {
        background-image: url(${setIconHover});
    }
`;

const SettingsButtonInactive = styled(ButtonUnstyled)`
    background: transparent url(${setIcon});
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

const Default = ({ children }) => {
    const classes = useStyles();
    const location = useLocation()
    const navigate = useNavigate()

    const [defaultPage, setDefaultPage] = useState("0101");
    const { MainKey } = useParams(1)

    const [userToken] = useUserToken()
    const [getWeather] = useGetWeatherMutation()
    const [getLoginInfo] = useGetLoginInfoMutation();
    const [getCompanyInfo] = useGetCompanyInfoMutation()
    const [insertBaseline] = useInsertBaselineMutation();
    const [insertBaseLineDataCopy] = useInsertBaseLineDataCopyMutation();
    const [insertBaseLineDataUpdate] = useInsertBaseLineDataUpdateMutation();
    const [getBaselineList] = useGetBaselineListMutation();
    const [close] = useCloseMutation();
    const [updateUserCompany] = useUpdateUserCompanyMutation();

    const [locale] = React.useState('ko');
    const [date, setDate] = React.useState(null);
    const [loginInfo, setLoginInfo] = useState({})
    const [userPopup, setUserPopup] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({})
    const companyId = userToken.getUserCompanyId();
    const workplaceId = userToken.getUserWorkplaceId();
    const roleCd = userToken.getUserRoleCd();
    const [baselineInfo, setBaselineInfo] = useState({
        "baselineName": "",
        "baselineStart": null,
        "baselineEnd": null
    });
    const [baselineList, setBaselineList] = useState([]);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [safetyGoal, setSafetyGoal] = useState("");
    const [missionStatement, setMissionStatement] = useState("");
    const [attachedFileId, setAttachedFileId] = useState(1);
    const [targetBaselineId, setTargetBaselineId] = useState("");
    const [popupPrompt, setPopupPrompt] = useState(false);

    const dispatch = useDispatch();
    const localStorage = useLocalStorage();
    const currentBaselineId = useSelector(selectBaselineId);

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [weatherData, setWeatherData] = useState({})

    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupShowClose, setYesNoPopupShowClose] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("")

    const [yesNoPopupShowLogOut, setYesNoPopupShowLogOut] = useState(false);
    const [yesNoPopupMessageLogOut, setYesNoPopupMessageLogOut] = useState("")    

    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [selectedFile, setSelectedFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogOnly, setOpenDialogOnly] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("")
    const labelObjectOnly = {
        upperLabel: "로고 등록",
        middleLabel: "등록할 파일을 업로드 합니다."
    }
    
    const [labelObject, setLabelObject] = useState({
        upperLabel: "이미지 등록",
        middleLabel: "등록할 파일을 업로드 합니다.",
    })

    const [employeeFiles, setEmployeeFiles] = useState({
        "safetyFileUpload": "",
        "logoImgUpload": "",
        "documentFileUpload": ""
    })

    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "performBeforeId": "",
        "performAfterId": ""
    })

    const [fileUpload] = useFileUploadMutation();
    const [getFileInfo] = useGetFileInfoMutation();
    const [updateSafetyFile] = useUpdateSafetyFileMutation();





    //설정창 아코디언 선언
    const [expanded, setExpanded] = React.useState('');

    const panelhandleChange = (panel) => (event, newExpanded) => {
      if(panel === 'panel3') {
        setTargetBaselineId('');
      }
      setExpanded(newExpanded ? panel : false);
    };

    const handleDialogFileUpload = async () => {
        let formData = new FormData();
        formData.append("files", selectedFile)
        handleDialogClose();
        handleDialogCloseOnly();
        const response = await fileUpload(formData);
        setOkayPopupMessage("등록 되었습니다.");
        setOkayPopupShow(true);
        const fileId = response.data.RET_DATA[0].atchFileId
        setEmployeeFiles({ ...employeeFiles, [dialogId]: parseInt(fileId) });
        if (dialogId === "logoImgUpload") {
            setFilePath({ ...filePath, [dialogId]: (response.data.RET_DATA[0].filePath + "/" + response.data.RET_DATA[0].saveFileName) })
        } else {
            setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })
        }
    }

    async function handleDialogFileDownload() {
        const fileId = employeeFiles[dialogId]
        if (fileId) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId}&fileSn=1`;
        }
    }

    const handleDialogOpen = (event) => {
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(event.target.id);
        console.log(event.target.id)
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
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
        setSelectedFileName("");
        setOpenDialogOnly(true);
        setDialogId(event.target.id);
    }

    const handleDialogInputChangeOnly = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

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
        // window.localStorage.setItem("safetyFileId", responseSaferyFile.data.RET_DATA.attachFileId)        
    }

    const [openDialogEmployee, setOpenDialogEmployee] = useState(false)
    const [articleNoForInspection, setArticleNoForInspection] = useState(null)
    const [inspectionFileId, setInspectionFileId] = useState(null)
    const [inspectionIndex, setInspectionIndex] = useState(null)

    const handleDialogOpenEmployee = (event, articleNo, fileId, index) => {
        setOpenDialogEmployee(true);
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

    const handleInsertBaseLineDataCopy = async () => {
        if((targetBaselineId === '') || (targetBaselineId === null)){
            setOkayPopupMessage("'복사할 관리차수'를 선택하세요.");
            setOkayPopupShow(true);
        } else {
            const response = await insertBaseLineDataCopy({
                "baselineId": currentBaselineId,
                "targetBaselineId": targetBaselineId
            });
            
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

    //관리차수 마감
    const handleClose = async () => {
        //const response = await close({});
        setYesNoPopupMessage('선택한 해당차수를 마감 하시겠습니까?');
        setYesNoPopupShowClose(true);
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
        const response = await insertBaseLineDataUpdate({"baselineId" : currentBaselineId});
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

    const fetchBaselineList = async () => {
        const response = await getBaselineList({});
        setBaselineList(response.data.RET_DATA);
    }

    const fetchCompanyInfo = async () => {
        const response = await getCompanyInfo({
            "companyId": companyId,
            "workplaceId": workplaceId
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

    const DateChange = name => (date) => {
        setBaselineInfo({ ...baselineInfo, [name]: date});
    };

    useEffect(() => {
        if (currentBaselineId === null) {
            dispatch(setBaselineId(localStorage.getDefaultBaselineId()));
        }
        handleLoginInfo();
        fetchCompanyInfo();
        fetchBaselineList();

    }, []);

    useEffect(() => {
        fetchWeather();
    }, [loginInfo]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
    }, []);

    return (
        <div className={classes.bodyWrap}>
            <Grid className={classes.headerWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            {/* <Link to={(loginInfo?.roleCd === "001" && "/dashboard/director") || (loginInfo?.roleCd === "002" ? "/dashboard/employee" : "#none")}> */}
                            <Link to={(loginInfo?.roleCd === "001") ? "/dashboard/director" : (loginInfo?.roleCd === "002") ? "/dashboard/employee" : (loginInfo?.roleCd === "003") ? "/dashboard/employee" : "/"}>
                                <img src={logo} alt="logo" />
                            </Link>
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                                {roleCd === '001'
                                    ? <UserButtonInactive className={classes.mainMenuButton}></UserButtonInactive>
                                    : (<>
                                        <UserButton className={classes.mainMenuButton} onClick={() => setUserPopup(true)}></UserButton>
                                        <div className={userPopup ? (classes.headerPopup + ' user_popup') : (classes.headerPopup + ' user_popupClose')}>
                                            <div className={classes.popHeader}>
                                                최초 사용자 설정
                                                <ButtonClosePop onClick={() => setUserPopup(!userPopup)}></ButtonClosePop>
                                            </div>
                                            <div className={classes.headerPopList}>
                                                <div className={classes.userTab}>
                                                    <div className={classes.userImage}>
                                                        {!!(companyInfo) && !!companyInfo.logoImg && (<img height={50} src={`${BASE_URL}file/getImg?imgPath=${companyInfo?.logoImg}`} alt="logo" />)}
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
                                                />
                                                <TextField
                                                    id="standard-basic"
                                                    placeholder='경영방침 등록 (띄어쓰기 포함 16자 이내)'
                                                    value={companyInfo?.missionStatements}
                                                    onChange={(event) => setCompanyInfo({ ...companyInfo, "missionStatements": event.target.value })}
                                                    variant="outlined"
                                                    sx={{ width: 370 }}
                                                    className={classes.popupTextField}
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
                                                            (   gif, jpg, png 파일허용)
                                                        </Alert>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.headerPopFooter}>
                                                <PopupFootButton onClick={() => handleUpdateUserCompany()}>저장하기</PopupFootButton>
                                            </div>
                                        </div>
                                    </>)
                                }

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
                                <LogButton className={classes.mainMenuButton} onClick={() => {setYesNoPopupShowLogOut(true); setYesNoPopupMessageLogOut("로그아웃 하시겠습니까?") }}></LogButton>
                                {/* 설정 팝업창 */}
                                {roleCd === '001'
                                    ? <SettingsButtonInactive className={classes.mainMenuButton}></SettingsButtonInactive>
                                    : (<>
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
                                                            placeholder='관리차수'
                                                            value={baselineInfo.baselineName}
                                                            variant="outlined"
                                                            sx={{ width: 80 }}
                                                            className={classes.popupTextField}
                                                            onChange={(event) => setBaselineInfo({ ...baselineInfo, "baselineName": event.target.value })}
                                                        />
                                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                                            <DesktopDatePicker
                                                                className={classes.selectMenuDate}
                                                                label=" "
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
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion expanded={expanded === 'panel2'} onChange={panelhandleChange('panel2')} className={classes.popupAccord}>
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
                                                <Accordion expanded={expanded === 'panel3'} onChange={panelhandleChange('panel3')} className={classes.popupAccord}>
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
                                    </>)
                                }

                                <div className={showUploadPopup ? classes.uploadPopup : classes.uploadPopupHide}>
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
                                            variant="outlined"
                                            sx={{ width: 250 }}
                                            className={classes.popupTextField}
                                        />
                                        <SearchButton></SearchButton>
                                        <UnknownButton1>전체사업장</UnknownButton1>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            {/* <AdminButton className={classes.mainMenuButton}></AdminButton> */}
                            <div className={classes.weatherSection}>
                                <span>
                                    {weatherData && <img src={`${BASE_URL}file/getImg?imgPath=${weatherData?.weatherImgUrl}`} alt="weather icon" />}
                                </span>
                                <span>{weatherData?.temperature} °C</span>
                                <span>{weatherData?.address}</span>
                            </div>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={false}
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
                    onConfirm={() => setOkayPopupShow(false)} />
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
                />
            </Overlay>
            <BackButton onClick={() => handleRedirect()}></BackButton>
            <div className={classes.pageOverlay}></div>
            <div className={classes.sectionWrap}>
                {children}
            </div>
        </div >
    );
};

export default Default;