import React, { useState, useEffect, useRef } from 'react';
import { DefaultLightLayout } from '../../../../layouts/DefaultLight';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';

import Link from '@mui/material/Link';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import iconTab from '../../../../assets/images/ic_tab.png';
import iconTabOn from '../../../../assets/images/ic_tab_on.png';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import searchIcon from '../../../../assets/images/ic_search.png';

import pageFirst from '../../../../assets/images/btn_first.png';
import pageLast from '../../../../assets/images/btn_last.png';
import pageNext from '../../../../assets/images/btn_nxt.png';
import pagePrev from '../../../../assets/images/btn_pre.png';

import Alert from '@mui/material/Alert';
import alertIcon from '../../../../assets/images/ic_refer.png';

// import popupClose from '../../../assets/images/btn_popClose.png';

import Stack from '@mui/material/Stack';

import { useSubscribersSelectMutation, useSubscribersInsertMutation, useSubscribersViewMutation, useSubscribersUpdateMutation, useSubscribersWorkplaceSelectMutation, useSubscribersDeleteMutation  } from '../../../../hooks/api/SubscribersManagement/SubscribersManagement';
import { useGetCommCodeListMutation } from '../../../../hooks/api/CommCodeManagement/CommCodeManagement';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useUserURLRedirect from '../../../../hooks/core/UserURLRedirect/UserURLRedirect';
import { CleaningServices } from '@mui/icons-material';
import { useFileUploadMutation, useFileDownMutation, useGetFileInfoMutation } from '../../../../hooks/api/FileManagement/FIleManagement';
import { DownloadDialog, OnlyUploadDialog, UploadDialog } from '../../../../dialogs/Upload';
import { Overlay } from '../../../../components/Overlay';
import Okay from '../../../../components/MessageBox/Okay';
import YesNo from '../../../../components/MessageBox/YesNo';
import { useLoginMutation, useGetPwdInfoMutation } from '../../../../hooks/api/LoginManagement/LoginManagement';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const useStyles = makeStyles(() => ({
    pageWrap: {

    },
    headerButtons: {
        display: 'flex',
        marginTop: '10px !important',
    },
    stepBox: {
        '& .MuiStepLabel-label': {
            fontSize: '18px'
        },
        '& .MuiStepper-root': {
            marginTop: '40px',
            marginBottom: '20px'
        }
    },
    activeStep: {
        '& .MuiStepLabel-label.Mui-active': {
            color: '#018de7'
        }
    },
    buttonLink: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        height: '68px',
        width: '100%',
        marginLeft: '10px !important',
        background: '#3a5298',
        borderRadius: '5px',
        letterSpacing: '-1.08px',
        '&:first-of-type': {
            marginLeft: '0 !important'
        },
        '&.current, &:hover': {
            backgroundImage: 'linear-gradient(#04b9fb, #017dfa)'
        },
        '& span': {
            width: '100%',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '500',
            color: '#fff',
        },
    },
    boxTable: {
        minWidth: '1800px',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    tableHead: {
        background: '#bdcbe9',
        '& $tableData': {
            height: '80px',
            borderRight: '1px solid #fff',
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '100px'
            },
            '&:nth-of-type(2)': {
                width: '180px'
            },
            '&:nth-of-type(3)': {
                width: '970px',
                padding: '0',
                justifyContent: 'flex-start',
                background: '#c8ddf2',
                '& >div': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40px',
                    width: '116px',
                    background: '#c8ddf2',
                    '&:first-of-type': {
                        width: '100%',
                        borderBottom: '1px solid #fff',
                        background: '#bdcbe9',
                    },
                    '&:nth-of-type(n+2)': {
                        borderRight: '1px solid #fff'
                    },
                    '&:nth-of-type(2)': {
                        width: '94px',
                    },
                    '&:nth-of-type(3)': {
                        width: '128px',
                    },
                    '&:last-of-type': {
                        width: '128px',
                        borderRight: 'none'
                    },
                }
            },
            '&:nth-of-type(4)': {
                width: '110px'
            },
            '&:nth-of-type(5)': {
                width: '110px'
            },
            '&:nth-of-type(6)': {
                width: '220px'
            },
            '&:nth-of-type(7)': {
                width: '108px'
            },
            '&:nth-of-type(8)': {
                width: '59px'
            }
        }
    },
    tableBody: {
        '& $tableData': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: 'none',
            },
        },
        '& $tableRow': {
            transition: 'background .2s',
            '&:hover': {
                background: '#eff2f9'
            }
        }
    },
    tableRow: {
        display: 'flex',
        '&:last-of-type': {
            '& $tableData': {
                borderBottom: 'none'
            },
        },
    },
    tableRowClose: {
        display: 'none',
    },
    tableData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        minHeight: '40px',        
        '& >button': {
            width: '20px',
            height: '20px',
            color: "#fff",
            backgroundColor: '#888',
            fontSize: '15px',
            marginRight: '10px',
            border: 'none',
            cursor: 'pointer'
        },
        '&:first-of-type, &:nth-of-type(3)': {
            width: '100px'
        },
        '&:nth-of-type(2)': {
            width: '180px'
        },
        '&:nth-of-type(n+4)': {
            width: '120px'
        },
        '&:nth-of-type(4)': {
            width: '130px'
        },
        '&:nth-of-type(10)': {
            width: '140px'
        },
        '&:nth-of-type(11)': {
            width: '110px'
        },
        '&:nth-of-type(12)': {
            width: '110px'
        },
        '&:nth-of-type(13)': {
            width: '220px'
        },
        '&:nth-of-type(14)': {
            width: '110px'
        },
        '&:last-of-type': {
            width: '60px',
        }
    },
    searchBox: {
        minWidth: '1800px',
        position: 'relative',
        display: 'flex',
        height: '80px',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginBottom: '28px !important',
        background: '#fff'
    },
    searchInfo: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        paddingRight: '10px',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            '& >div:last-of-type': {
                marginLeft: '10px'
            }
        }
    },
    searchButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    tableTextField: {
        width: '100%',
        height: '33px',
        margin: '0 6px !important',
        backgroundColor: '#fff',
        borderRadius: '5px',
        '& div': {
            height: 'inherit',
        },
        '& input, & .MuiSelect-select': {
            fontSize: '16px',
            padding: '0 10px',
        }
    },
    pagingBox: {
        position: 'relative',
        height: '40px',
        marginTop: '40px !important',
        '& .MuiPagination-root': {
            display: 'flex',
            justifyContent: 'center'
        },
        '& >div:first-of-type': {
            position: 'absolute',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            top: '0',
            left: '0',
            '& strong': {
                color: '#018de7',
                padding:'0 3px'
            }
        },
        '& >div:last-of-type': {
            position: 'absolute',
            top: '0',
            right: '0'
        },
        '& .MuiPagination-ul button': {
            width: '40px',
            height: '40px',
            margin: '0',
            borderRadius: '0',
            fontSize: '14px',
            color: '#666',
            '&:hover': {
                background: 'transparent'
            },
            '&.Mui-selected': {
                background: '#6e7884',
                color: '#fff',
                cursor: 'default',
            },
            '&[aria-label$=page]': {
                '& svg': {
                    display: 'none'
                }
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=first]': {
                background: 'url(' + pageFirst + ')',
                marginRight: '-1px'
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=last]': {
                background: 'url(' + pageLast + ')',
                marginLeft: '-1px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=next]': {
                background: 'url(' + pageNext + ')',
                marginLeft: '8px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=previous]': {
                background: 'url(' + pagePrev + ')',
                marginRight: '8px'
            }
        }
    },
    adminPopup: {
        display: 'block',
        position: 'absolute',
        zIndex: '1',
        width: '700px',
        height: 'auto',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
        '&.regMember': {
            position: 'fixed',
            top: '100px',
            left: '560px',
        },
        '&.regMemberClose': {
            display: "none"
        },
        '&.infoMember': {
            position: 'fixed',
            top: '90px',
            left: '560px',
            '& $headNest $dataNest': {
                background: '#c8ddf2'
            }
        },
        '&.infoMemberClose': {
            display: "none"
        },

        '&.popSettings': {
            top: '600px',
            left: '180px',
            display: 'none !important',
        },
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
    popButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '10px',
        marginBottom: '25px',
        '& button:last-of-type': {
            marginLeft: '10px'
        },
        '& button:first-of-type': {
            marginRight: '10px'
        }
    },
    popupTable: {
        margin: '20px',
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px',
        overflow: 'hidden',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    popupRow: {
        display: 'flex',
        '&:first-of-type $popupData': {
            borderTop: '1px solid #bdcbe9',
            '&.data_head': {
                borderTop: '1px solid #c8ddf2',
            },
        },
        '&:last-of-type $popupData': {
            borderBottom: '1px solid #bdcbe9',
            '&.data_head': {
                borderBottom: '1px solid #c8ddf2',
            },
        },
        '& ex': {

            width: '15px',
            marginTop: '5px',
            position: 'absolute',
            float: 'left',
            color: '#fc4b07',

            zoom: '1.1'
        }
    },
    popupData: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        minHeight: '45px',
        width: '70%',
        borderBottom: '1px solid #bdcbe9',
        '&.data_head': {
            width: '30%',
            background: '#c8ddf2',
            borderBottom: '1px solid #fff',
            justifyContent: 'center'
        },
        '& text': {
            marginRight: '6px',
            marginTop: '5px',
            color: '#fc4b07',
            zoom: '1.1'
        }

    },
    dataNest: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        minHeight: '45px',
        borderBottom: '1px solid #bdcbe9',
        '&:last-of-type': {
            borderBottom: 'none'
        },
        '&.headTitle': {
            display: 'flex',
            '& >div': {
                display: 'flex',
                alignItems: 'center',
                width: '179px',
                height: '44px',
                '&:nth-of-type(2)': {
                    width: '100px',
                    background: '#bdcbe9',
                    borderBottom: '1px solid #fff',
                    justifyContent: 'center'
                }
            },
        }
    },
    headNest: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        '&:first-of-type': {
            width: '40%',
            borderRight: '1px solid #fff',
        },
        '&:last-of-type': {
            width: '60%',
            '& $dataNest': {
                background: '#bdcbe9',
                borderBottom: '1px solid #fff',
                '&:last-of-type': {
                    borderBottom: 'none'
                }
            },
        },
        '& $dataNest': {
            justifyContent: 'center'
        }
    },
    popBody: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px',
        '& >button': {
            margin: '20px'
        }
    },
    popAlert: {
        width: '100%'
    },
    popUpload: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',
        background: '#bdcbe9',
    },
    uploadTitle: {
        width: '100%',
        height: '50px',
        background: '#53699A',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadField: {
        padding: '20px',
        display: 'flex',
        width: '100%',
    },
    uploadBox: {
        width: '100%',
        height: '50px',
        borderRadius: '6px',
        background: '#fff',
        marginRight: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#53699A',
    },
    selectMenuDate: {
        height: '33px',
        margin: '0 6px !important',
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
    slideLabelHot: {
        width: '14px',
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
}));

const SearchButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #3f4c72;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:before {
        content: "";
        position: relative;
        top: -1px;
        display: inline-block;
        width: 17px;
        height: 17px;
        vertical-align: middle;
        margin-right: 4px;
        background-image: url(${searchIcon});;
    }
    &:hover {
        background: #192b5e;
    }
`;

const RegisterButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #018de7;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #0355b0;
    }
`;

const YesButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #0355b0;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #018de7;
    }
`;

const NoButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #fff;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    border: 2px solid #0355b0;
    border-radius: 5px;
    font-size: 16px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        background: #018de7;
        color: #fff;
        border-color: #018de7;
    }
`;

const WhiteButton = styled(ButtonUnstyled)`
    border: none;
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    border-radius: 5px;
    border: 2px solid #CC3333;
    background: #fff;
    color: #CC3333;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #ffdddd;
    }
`;

const UploadButton1 = styled(ButtonUnstyled)`
    width: 200px;
    height: 50px;
    background: #fff;
    color: #53699A;
    border: 2px solid #bdcbe9;
    border-radius: 50px;
    font-size: 16px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        background: #53699A;
        color: #fff;
        border-color: #53699A;
    }
`;

const UploadButton2 = styled(ButtonUnstyled)`
    width: 180px;
    height: 50px;
    background: #53699A;
    color: #fff;
    border: 2px solid #53699A;
    border-radius: 5px;
    font-size: 16px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        background: #fff;
        color: #53699A;
    }
`;

const SearchUserButton = styled(ButtonUnstyled)`
    width: 140px;
    height: 33px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #6e7884;
    background: #e8ebf4;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #d2dcf3;
    }
`;


const SystemAdministrator = () => {
    const [login] = useLoginMutation();
    const [getPwdInfo] = useGetPwdInfoMutation();
    const registNoRef = useRef();    
    const [passSearch, setPassSearch] = useState('');
    const classes = useStyles();
    const navigate = useNavigate();
    const [locale] = React.useState('ko');
    const [regMemberPop, setRegMemberPop] = useState(false);
    const [userInfoPop, setUserInfoPop] = useState(false);
    const [col, setCol] = useState("");
    const [param, setParam] = useState("");
    const [subscribersSelect] = useSubscribersSelectMutation();
    const [subscribersInsert] = useSubscribersInsertMutation();
    const [subscribersUpdate] = useSubscribersUpdateMutation();
    const [subscribersDelete] = useSubscribersDeleteMutation();
    const [subscribersWorkplaceSelect] = useSubscribersWorkplaceSelectMutation();
    const [subscribersList, setSubscribersList] = useState([]);
    const [getCommCodeList] = useGetCommCodeListMutation();
    const [subscribersView] = useSubscribersViewMutation();
    const [subscribersWorkplaceSelectList, setSubscribersWorkplaceSelectList] = useState([]);
    const [subscriberInsertEmailBeforeSign, setSubscriberInsertEmailBeforeSign] = useState("")
    const [subscriberInsertEmailAfterSign, setSubscriberInsertEmailAfterSign] = useState("")
    const [dialogId, setDialogId] = useState("");
    const [downloadDialogShow, setDownloadDialogShow] = useState(false);
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("삭제 하시겠습니까?");
    const [filePath, setFilePath] = useState({
        "contractFileId": ""
    });
    const [updateFlag, setUpdateFlag] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState("")
    const [fileIdForDownload, setFileIdForDownload] = useState(null)
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogOnly, setOpenDialogOnly] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subscriberInsert, setSubscriberInsert] = useState({
        "companyName": "",
        "contractAmount": "",
        "contractEndDate": null,
        "contractFileId": "",
        "contractDay": "",
        "contractStartDate": null,
        "loginId": "",
        "managerEmail": subscriberInsertEmailBeforeSign + '@' + subscriberInsertEmailAfterSign,
        "managerName": "",
        "managerRoleCd": "",
        "managerTel": "",
        "registNo": "",
        "scaleCd": "",
        "sectorCd": "",
        "statusCd": "",
        "workplaceName": "",
        "newYn": ""
    });
    const [managerEmail, setManagerEmail] = useState({
        firstInput: '',
        secondeInput: ''
    });
    const [managerTel, setManagerTel] = useState({
        firstInput: '',
        secondeInput: '',
        thirdInput: ''
    });
    const [contractDay, setContractDay] = useState("");
    const [contractStartDate, setContractStartDate] = useState(null);
    const [contractEndDate, setContractEndDate] = useState(null);
    const [subscriberView, setSubscriberView] = useState({
        "companyName": "",
        "contractAmount": "",
        "contractEndDate": null,
        "contractFileId": "",
        "contractDay": "",
        "contractStartDate": null,
        "loginId": "",
        "managerEmail": "",
        "managerName": "",
        "managerRoleCd": "",
        "managerTel": "",
        "registNo": "",
        "scaleCd": "",
        "sectorCd": "",
        "statusCd": "",
        "workplaceName": "",
        "newYn": ""
    });
    const [codeGroup1, setCodeGroup1] = useState([]);
    const [codeGroup2, setCodeGroup2] = useState([]);
    const [codeGroup3, setCodeGroup3] = useState([]);
    const getPath = useUserURLRedirect();
    const [plusButtons, setPlusButtons] = useState([]);
    const [plusButtonId, setPlusButtonId] = useState(0);
    const [getFileInfo] = useGetFileInfoMutation()
    const [fileUpload] = useFileUploadMutation()
    const labelObjectOnly = {
        upperLabel: "계약서 등록",
        middleLabel: "등록할 파일을 업로드 합니다."
    }
    
    const handlePlusButtonClick = (buttonId, companyId) => {
        const plusButtonsChangedState = plusButtons?.map(button => {

            if (button.clicked === true) {
                return { ...button, clicked: false, plus: true }
            }

            if (button.id !== buttonId) {
                return button;
            } else {
                fetchSubscribersWorkplaceSelectList(companyId);
                return { ...button, clicked: !button.clicked, plus: !button.plus }
            }
        });
        setPlusButtons(plusButtonsChangedState);
        setPlusButtonId(buttonId);
    }

    const handleTableRowClasses = () => {
        const activeClass = plusButtons?.find(item => item.id === plusButtonId);
        return activeClass.clicked;
    }

    const handleInputValidation = (subscriberData, callback, type) => {
        //console.log(subscriberData);
        let emptyInputFields = [];
        let validation = false;
        //for (const subscriberDataProperty in subscriberData) {
        //    if (subscriberData[subscriberDataProperty] === null || subscriberData[subscriberDataProperty] === undefined) {
        //        //console.log(subscriberDataProperty + " : " + subscriberData[subscriberDataProperty] + " false vrednosti");
        //        emptyInputFields.push(subscriberDataProperty);
        //    }
        //}
        //if (emptyInputFields.length === 0) {
        //    callback();
        //} else {
           
            if (subscriberData.companyName.length <= 0) {
                setOkayPopupMessage("필수항목 '회사명'을 입력하세요.");
                setOkayPopupShow(true);
                return validation = false;
            }
            if (subscriberData.workplaceName.length <= 0) {
                setOkayPopupMessage("필수항목 '사업장명'을 입력하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
            if (subscriberData.registNo.length <= 0) {
                setOkayPopupMessage("필수항목 '사업자등록번호'를 입력하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
            if (subscriberData.loginId.length <= 0) {
                setOkayPopupMessage("필수항목 'ID'를 입력하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
            if (subscriberData.managerRoleCd.length <= 0) {
                setOkayPopupMessage("필수항목 '사용자권한' 선택하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
            if (subscriberData.managerName.length <= 0) {
                setOkayPopupMessage("필수항목 '담당자명'을 입력하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
            if (subscriberData.managerTel.length <= 0) {
                setOkayPopupMessage("필수항목 '연락처'를 입력하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
            if (subscriberData.statusCd.length <= 0) {
                setOkayPopupMessage("필수항목 '상태'를 선택하세요.");
                setOkayPopupShow(true);                    
                return validation = false;
            }
        //}
        //emptyInputFields = emptyInputFields?.map(emptyInputField => {
        emptyInputFields?.map(emptyInputField => {
            if (type === "update") {
                if (emptyInputField === "managerTel" && managerTel?.firstInput && managerTel?.secondeInput && managerTel?.thirdInput) {
                    return validation = true;                   

                } else if (emptyInputField === "managerEmail" && managerEmail?.firstInput && managerEmail?.secondeInput) {
                    return validation = true;

                } else if (emptyInputField === "contractDay" && contractDay) {
                    return validation = true;

                } else if (emptyInputField === "contractStartDate" && contractStartDate) {
                    return validation = true;

                } else if (emptyInputField === "contractEndDate" && contractEndDate) {
                    return validation = true;

                } else if (emptyInputField === "contractDate" || emptyInputField === "contractFileYn") {
                    return validation = true;

                } else {
                    return validation = false;
                }
                
            } else if (type === "insert") {
                if (emptyInputField === "managerEmail" && subscriberInsertEmailBeforeSign && subscriberInsertEmailAfterSign) {
                    return validation = true;
                } else if (emptyInputField === "contractDate" || emptyInputField === "contractFileYn") {
                    return validation = true;
                } else {
                    return validation = false;
                }
            }
        })?.filter(emptyInputFieldChecked => emptyInputFieldChecked === false);
        callback();
    }
    
    //모니터
    // const handleRedirect = async (workplaceId, userId, loginId) => {
    //     const response = await subscribersView(`${workplaceId}&userId=${userId}`);
    //     const redirectPath = getPath(response.data?.RET_DATA?.managerRoleCd);


    //     //const decryptedBuffer = getdecrypt("WkaOhqSK03Z1pSuPOdc03w==");
    //     //bytes.toString(CryptoJS.enc.Utf8);
    //     //console.log(decryptedBuffer)
    
    
    //     //console.log(passResponse.data)

    //     //사업장 로그인 정보
    //     const userLoginResponse = await login({
    //         // loginId: loginId,
    //         // loginPw: passSearch
    //         loginId: "B2",
    //         loginPw: "test"
    //     });
        
    //     if (userLoginResponse.data.RET_CODE === '0000') {
    //         const jwtToken = userLoginResponse.data.RET_DATA.accessToken;
    //         sessionStorage.setItem("MonitorView", jwtToken)
    //         const www_path = window.location.href.split("/")[2];
    //         window.open(`http://${www_path}${redirectPath}`,'Moniter_View', 'width=1024, height=750, location=no, status=no, scrollbars=yes, _blank')
    //     } else {
    //         setOkayPopupMessage("회원정보를 가져올수가 없습니다.");
    //         setOkayPopupShow(true);
    //     }
    //     sessionStorage.clear();

    // }

    const fetchSubscribersList = async () => {
        const response = await subscribersSelect({
            "col": col,
            "param": param
        });
        setSubscribersList(response.data.RET_DATA);
        const plusButtonsInitialState = response.data?.RET_DATA?.map((item, index) => { return { id: index + 1, clicked: false, plus: true } });
        setPlusButtons(plusButtonsInitialState);
    }

    const fetchCommCodeListGroup1 = async () => {
        const responseGroup1 = await getCommCodeList({
            "groupId": "001"
        })
        setCodeGroup1(responseGroup1.data.RET_DATA.list)
    }

    const fetchCommCodeListGroup2 = async () => {
        const responseGroup2 = await getCommCodeList({
            "groupId": "002"
        })
        setCodeGroup2(responseGroup2.data.RET_DATA.list)
    }

    const fetchCommCodeListGroup3 = async () => {
        const responseGroup3 = await getCommCodeList({
            "groupId": "003"
        })
        setCodeGroup3(responseGroup3.data.RET_DATA.list)
    }

    const fetchSubscribersWorkplaceSelectList = async (companyId) => {
        const response = await subscribersWorkplaceSelect(companyId);
        setSubscribersWorkplaceSelectList(!!(response.data.RET_DATA) && response.data.RET_DATA);
    }

    const fetchSubscriberView = async (workplaceId, userId) => {
        let filePathMain = {}
        const response = await subscribersView(`${workplaceId}&userId=${userId}`);
        const managerTelWithOutHyphen = !!(response.data.RET_DATA) && response.data.RET_DATA?.managerTel?.split("-").join("");
        setManagerTel({
            firstInput: managerTelWithOutHyphen.slice(0, 3),
            secondeInput: managerTelWithOutHyphen.slice(3, 7),
            thirdInput: managerTelWithOutHyphen.slice(7),
        });
        setManagerEmail({
            firstInput: response.data.RET_DATA?.managerEmail.split('@')[0],
            secondeInput: response.data.RET_DATA?.managerEmail.split('@')[1],
        });
        setContractDay(response.data.RET_DATA?.contractDay);
        setContractStartDate(response.data.RET_DATA?.contractStartDate);
        setContractEndDate(response.data.RET_DATA?.contractEndDate);
        setSubscriberView(response?.data?.RET_DATA);

        if (response?.data?.RET_DATA?.contractFileId) {
            let fileInfo = await getFileInfo({ atchFileId: parseInt(response?.data?.RET_DATA["contractFileId"]), fileSn: 1 })
            filePathMain["contractFileId"] = fileInfo?.data?.RET_DATA?.originalFileName
            setFilePath(filePathMain);
        }
    }

    const handleRegisterInitialValue = () => {
        setSubscriberInsertEmailBeforeSign("");
        setSubscriberInsertEmailAfterSign("");
        setSubscriberInsert({
            "companyName": "",
            "contractAmount": "",
            "contractDay": "",            
            "contractEndDate": null,
            "contractFileId": "",
            "contractStartDate": null,
            "loginId": "",
            "managerEmail": subscriberInsertEmailBeforeSign + '@' + subscriberInsertEmailAfterSign,
            "managerName": "",
            "managerRoleCd": "",
            "managerTel": "",
            "registNo": "",
            "scaleCd": "",
            "sectorCd": "",
            "statusCd": "",
            "workplaceName": ""
        });
    }

    const handleSubscribersInsert = async () => {
        const response = await subscribersInsert({
            "companyName": subscriberInsert.companyName,
            "contractAmount": subscriberInsert.contractAmount,
            "contractDay": subscriberInsert.contractDay,
            "contractEndDate": subscriberInsert.contractEndDate,
            "contractFileId": subscriberInsert.contractFileId,
            "contractStartDate": subscriberInsert.contractStartDate,
            "loginId": subscriberInsert.loginId,
            "managerEmail": subscriberInsertEmailBeforeSign + '@' + subscriberInsertEmailAfterSign,
            "managerName": subscriberInsert.managerName,
            "managerRoleCd": subscriberInsert.managerRoleCd,
            "managerTel": subscriberInsert.managerTel,
            "registNo": subscriberInsert.registNo,
            "scaleCd": subscriberInsert.scaleCd,
            "sectorCd": subscriberInsert.sectorCd,
            "statusCd": subscriberInsert.statusCd,
            "workplaceName": subscriberInsert.workplaceName
        });
        //console.log('REG----------------------');
        //console.log(response);
        if (response?.data?.RET_CODE === "0000") {
            fetchSubscribersList();
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
            handleRegisterInitialValue();
            setFilePath({ ...filePath, "contractFileId": "" });
            setRegMemberPop(false);
        } else {
            //setOkayPopupMessage("입력정보에 오류가 있습니다");
            setOkayPopupMessage(response?.data?.RET_DESC);
            setOkayPopupShow(true);
        }
    }

    const handleSubscribersUpdate = async () => {
        const response = await subscribersUpdate({
            "companyId": subscriberView.companyId,
            "companyName": subscriberView.companyName,
            "contractAmount": subscriberView.contractAmount,
            "contractDay": contractDay,
            "contractEndDate": contractEndDate,
            "contractFileId": subscriberView.contractFileId,
            "contractStartDate": contractStartDate,
            "loginId": subscriberView.loginId,
            "managerEmail": managerEmail.firstInput + '@' + managerEmail.secondeInput,
            "managerName": subscriberView.managerName,
            "managerRoleCd": subscriberView.managerRoleCd,
            "managerTel": managerTel.firstInput + '-' + managerTel.secondeInput + '-' + managerTel.thirdInput,
            "registNo": subscriberView.registNo,
            "scaleCd": subscriberView.scaleCd,
            "sectorCd": subscriberView.sectorCd,
            "statusCd": subscriberView.statusCd,
            "userId": subscriberView.userId,
            "workplaceId": subscriberView.workplaceId,
            "workplaceName": subscriberView.workplaceName
        });
        //console.log('UPDATE----------------------');
        //console.log(response);
        if (response?.data?.RET_CODE === "0000") {
            fetchSubscribersList();
            setOkayPopupMessage("수정 되었습니다.");
            setOkayPopupShow(true);
            setFilePath({ ...filePath, "contractFileId": "" });
            setUserInfoPop(false);
        } else {
            //setOkayPopupMessage("입력정보에 오류가 있습니다");
            setOkayPopupMessage(response?.data?.RET_DESC);
            setOkayPopupShow(true);
        }

    }

    //가입자 정보 삭제
    const handleSubscribersDelete = async () => {
        const response = await subscribersDelete({
            "loginId" : subscriberView.loginId
        })
        setYesNoPopupShow(false);
        if (response?.data?.RET_CODE === "0434") {
            setOkayPopupMessage("삭제 되었습니다.");
            setOkayPopupShow(true);
            setUserInfoPop(false)
            setFilePath({ ...filePath, "contractFileId": "" });
            fetchSubscribersList();
        } else {
            setOkayPopupMessage("삭제에 실패하였습니다.");
            setOkayPopupShow(true);
        }        
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogOpen = (event) => {
        setOpenDialog(true);
        setDialogId(event.target.id);
        setSelectedFileName("")
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name);
    }

    const handleDialogFileUpload = async () => {
        if((selectedFileName === "") || (selectedFileName === null)) {
            setOkayPopupMessage("업로드할 파일을 선택하세요.");
            setOkayPopupShow(true);   
        } else {        
            let formData = new FormData();
            formData.append("files", selectedFile)
            const response = await fileUpload(formData)
            const fileId = response.data.RET_DATA[0].atchFileId
            if((response.data.RET_CODE === "0000") || (response.data.RET_CODE === "0201")){
                setOkayPopupMessage("'파일'을 등록 하였습니다.");
                setOkayPopupShow(true);
                setSubscriberInsert({ ...subscriberInsert, [dialogId]: fileId })
                setSubscriberView({ ...subscriberView, [dialogId]: fileId })
                setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0]?.originalFileName })
                handleDialogClose()
                handleDialogCloseOnly()
            } else if(response.data.RET_CODE === '0433'){
                setOkayPopupMessage("파일확장자 오류");
                setOkayPopupShow(true);
            } else {
                setOkayPopupMessage("시스템 오류");
                setOkayPopupShow(true);
            }
        setSelectedFileName("");
        }            

    }

    async function handleDialogFileDownload(id) {
        const fileId = subscriberView[dialogId]
        if (fileId || fileIdForDownload || id) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId || fileIdForDownload || id}&fileSn=1`;
        }
    }

    const handleDialogCloseOnly = () => {
        setOpenDialogOnly(false);
    }

    const handleDialogOpenOnly = (event) => {
        setOpenDialogOnly(true);
        setDialogId(event.target.id);
        setSelectedFileName("");
    }

    // const handleDialogInputChangeOnly = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    //     setSelectedFileName(file.name);
    // }

    //사업자 번호 정규식 유효성 검사 수행
    const handleRegistNoI = (e) => {
        const value = e.target.value.replace(/\D+/g, "");
        const numberLength = 10;

        let resultNo = "";  

        for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
            case 3:
                resultNo += "-";
            break;
            case 5:
                resultNo += "-";
            break;
            default:
            break;
        }
        resultNo += value[i];
        }
        e.target.value = resultNo;
        setSubscriberInsert({...subscriberInsert, "registNo": e.target.value}); 
    }

        //사업자 번호 정규식 유효성 검사 수행
        const handleRegistNoD = (e) => {
            const value = e.target.value.replace(/\D+/g, "");
            const numberLength = 10;
    
            let resultNo = "";  
    
            for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 3:
                    resultNo += "-";
                break;
                case 5:
                    resultNo += "-";
                break;
                default:
                break;
            }
            resultNo += value[i];
            }
            e.target.value = resultNo;
            setSubscriberView({ ...subscriberView, "registNo": e.target.value });
        }

    const DateChangeI = name => (date) => {
        if((date === "") || (date === null)){
            setSubscriberInsert({ ...subscriberInsert, [name] : "" })
        } else {
            setSubscriberInsert({ ...subscriberInsert, [name] : date.format("YYYY-MM-DD") })
        }
    };
    
    const DateChangeD = (date) => {
        //Invalid date
        if((date === "") || (date === null)){
            setContractDay("")
        } else {
            setContractDay(date.format("YYYY-MM-DD"))
        }
    };

    

    useEffect(() => {
        fetchSubscribersList();
        fetchCommCodeListGroup1();
        fetchCommCodeListGroup2();
        fetchCommCodeListGroup3();
    }, []);

    
    // useEffect(() => {
    //     if (subscriberInsert.registNo.length <= 10) {
    //         //setValues({registNo: registNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')});
    //         setSubscriberInsert({ ...subscriberInsert, "registNo": subscriberInsert.registNo.replace(/-/g, "").replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') })
    //     } else {

    //     }
    // }, [subscriberInsert.registNo]);
    

    return (
        <DefaultLightLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        가입자 관리
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div className={classes.searchInfo}>
                        <div>
                            <Select
                                sx={{ width: 200 }}
                                className={classes.selectMenu}
                                value={col === "" ? "all" : col}
                                key="all"
                                onChange={(e) => setCol(e.target.value)}
                            >
                                <MenuItem value="all">전체</MenuItem>
                                <MenuItem value="companyName">회사명</MenuItem>
                                <MenuItem value="userName">담당자 </MenuItem>
                                <MenuItem value="loginId">ID</MenuItem>
                            </Select>
                            <TextField
                                variant="outlined"
                                placeholder="검색어를 입력하세요."
                                sx={{ width: 370 }}
                                className={classes.selectMenu}
                                value={param}
                                onChange={(e) => setParam(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.searchButtons}>
                        <SearchButton onClick={() => fetchSubscribersList()}>조회</SearchButton>
                        <RegisterButton sx={{ marginLeft: '10px' }} onClick={() => setRegMemberPop(true)}>등록</RegisterButton>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>No</div>
                            <div className={classes.tableData}>회사명</div>
                            <div className={classes.tableData}>
                                <div>사용자</div>
                                <div>사업장명</div>
                                <div>사업자등록번호</div>
                                <div>업종</div>
                                <div>규모</div>
                                <div>ID</div>
                                <div>권한</div>
                                <div>담당자명</div>
                                <div>연락처</div>
                            </div>
                            <div className={classes.tableData}>계약금액</div>
                            <div className={classes.tableData}>계약일</div>
                            <div className={classes.tableData}>계약기간</div>
                            <div className={classes.tableData}>상태</div>
                            <div className={classes.tableData}>계약서</div>
                            {/* <div className={classes.tableData}>화면</div> */}
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {!!subscribersList && !!subscribersList?.length && subscribersList?.map((subscriber, index) => (
                            <>
                                <div className={classes.tableRow}>

                                    {!!plusButtons && !!plusButtons?.length && plusButtons?.map((button, btnIndex) => {
                                        if (btnIndex === index && subscriber.rowCount > 1) {
                                            return <div className={classes.tableData}><button onClick={() => handlePlusButtonClick(button.id, subscriber.companyId)}>{button.plus ? "+" : "–"}</button>{index + 1}</div>
                                        } else if (btnIndex === 1 && subscriber.rowCount === 1) {
                                            return <div className={classes.tableData}>{index + 1}</div>
                                        } else if (subscribersList.length <= 1) {
                                            return <div className={classes.tableData}>{index + 1}</div>
                                        }
                                    })}
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.newYn === "Y" ? <span className={classes.slideLabelHot}>n</span> : ""}{subscriber.companyName}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.workplaceName}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.registNo}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.sector}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.scale}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.loginId}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.managerRole}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.managerName}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.managerTel}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.contractAmount && parseFloat(subscriber.contractAmount).toLocaleString()}</div>
                                    
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.contractDay}</div>
                                    
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.contractDate}</div>
                                    <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscriber.workplaceId, subscriber.userId); }}>{subscriber.status}</div>
                                    {subscriber?.contractFileYn === "O"
                                        ? <div className={classes.tableData} style={{ cursor: "pointer" }} onDoubleClick={() => handleDialogFileDownload(subscriber.contractFileId)}>{subscriber.contractFileYn}</div>
                                        : <div className={classes.tableData} style={{ cursor: "pointer" }}>{subscriber.contractFileYn}</div>
                                    }
                                    {/* <div className={classes.tableData} onClick={() => handleRedirect(subscriber.workplaceId, subscriber.userId, subscriber.loginId)}>{subscriber?.status ? <img src={monitor} alt="monitor" /> : null}</div> */}
                                </div>
                                {!!subscribersWorkplaceSelectList && !!subscribersWorkplaceSelectList?.length && subscribersWorkplaceSelectList?.map((subscribersWorkplaceItem, subscribersWorkplaceItemIndex) => {
                                    if (index + 1 === plusButtonId) {
                                        return (<div className={handleTableRowClasses() ? classes.tableRow : classes.tableRowClose} >
                                            <div className={classes.tableData}></div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.newYn === "Y" ? <span className={classes.slideLabelHot}>n</span> : ""}{subscribersWorkplaceItem.companyName}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.workplaceName}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.registNo}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.sector}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.scale}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.loginId}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.managerRole}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.managerName}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.managerTel}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.contractAmount && parseFloat(subscribersWorkplaceItem.contractAmount).toLocaleString()}</div>
                                            
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.contractDay}</div>

                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.contractDate}</div>
                                            <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem.status}</div>
                                            {subscribersWorkplaceItem?.contractFileYn === "O"
                                                ? <div className={classes.tableData} style={{ cursor: "pointer" }} onDoubleClick={() => { handleDialogFileDownload(subscribersWorkplaceItem.contractFileId) }}>{subscribersWorkplaceItem.contractFileYn}</div>
                                                : <div className={classes.tableData} style={{ cursor: "pointer" }}>{subscribersWorkplaceItem.contractFileYn}</div>
                                            }
                                            {/* <div className={classes.tableData} onDoubleClick={() => { setUserInfoPop(true); fetchSubscriberView(subscribersWorkplaceItem.workplaceId, subscribersWorkplaceItem.userId); }}>{subscribersWorkplaceItem?.statusCd ? <img src={monitor} alt="monitor" /> : null}</div> */}
                                        </div>);
                                    }
                                })}
                            </>
                        ))}
                    </div>

                    {/* 가입자 등록 폼 */}
                    <Overlay show={regMemberPop}>
                        <div className={regMemberPop ? (classes.adminPopup + ' regMember') : (classes.adminPopup + ' regMemberClose')}>
                            <div className={classes.popHeader}>
                                가입자 등록
                            </div>
                            <div className={classes.popupTable}>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}><text>*</text>회사명</div>
                                    <div className={classes.popupData}>
                                        <TextField
                                            variant="outlined"
                                            value={subscriberInsert.companyName}
                                            className={classes.tableTextField}
                                            onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "companyName": e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>
                                        <div className={classes.headNest}>사용자</div>
                                        <div className={classes.headNest}>
                                            <div className={classes.dataNest}><text>*</text>사업장명</div>
                                            <div className={classes.dataNest}><text>*</text>사업자등록번호</div>
                                            <div className={classes.dataNest}>업종</div>
                                            <div className={classes.dataNest}>규모</div>
                                            <div className={classes.dataNest}><text>*</text>ID</div>
                                            <div className={classes.dataNest}><text>*</text>담당자명</div>
                                            <div className={classes.dataNest}>이메일</div>
                                        </div>
                                    </div>
                                    <div className={classes.popupData}>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                value={subscriberInsert.workplaceName}
                                                className={classes.tableTextField}
                                                onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "workplaceName": e.target.value })}
                                            />
                                        </div>
                                        {/* 사업자 번호 */}
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                ref={registNoRef}
                                                value={subscriberInsert.registNo}
                                                className={classes.tableTextField}
                                                onChange={handleRegistNoI}
                                                //onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "registNo": e.target.value })}
                                            />
                                        </div>
                                        <div className={classes.dataNest}>
                                            <Select
                                                className={classes.tableTextField}
                                                value={subscriberInsert.sectorCd}
                                                onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "sectorCd": e.target.value })}
                                            >
                                                {codeGroup2?.map((code) => (<MenuItem value={code.codeId}>{code.codeNameKor}</MenuItem>))}
                                            </Select>
                                        </div>
                                        <div className={classes.dataNest}>
                                            <Select
                                                className={classes.tableTextField}
                                                value={subscriberInsert.scaleCd}
                                                onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "scaleCd": e.target.value })}
                                            >
                                                {codeGroup1?.map((code) => (<MenuItem value={code.codeId}>{code.codeNameKor}</MenuItem>))}
                                            </Select>
                                        </div>
                                        <div className={classes.dataNest + ' headTitle'}>
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={subscriberInsert.loginId}
                                                    className={classes.tableTextField}
                                                    onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "loginId": e.target.value })}
                                                />
                                            </div>
                                            <div><text>*</text>사용자권한</div>
                                            <div>
                                                <Select
                                                    className={classes.tableTextField}
                                                    value={subscriberInsert.managerRoleCd}
                                                    onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "managerRoleCd": e.target.value })}
                                                >
                                                    {codeGroup3?.map((code) => (<MenuItem value={code.codeId}>{code.codeNameKor}</MenuItem>))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className={classes.dataNest + ' headTitle'}>
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={subscriberInsert.managerName}
                                                    className={classes.tableTextField}
                                                    onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "managerName": e.target.value })}
                                                />
                                            </div>
                                            <div style={{ borderBottom: 'none' }}><text>*</text>연락처</div>
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={subscriberInsert.managerTel}
                                                    className={classes.tableTextField}
                                                    onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "managerTel": e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                value={subscriberInsertEmailBeforeSign}
                                                className={classes.tableTextField}
                                                onChange={(e) => setSubscriberInsertEmailBeforeSign(e.target.value)}
                                                sx={{ width: 180 }}
                                            />
                                            &nbsp;@&nbsp;
                                            <TextField
                                                variant="outlined"
                                                value={subscriberInsertEmailAfterSign}
                                                className={classes.tableTextField}
                                                onChange={(e) => setSubscriberInsertEmailAfterSign(e.target.value)}
                                                sx={{ width: 232 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약금액</div>
                                    <div className={classes.popupData}>
                                        <TextField
                                            variant="outlined"
                                            value={subscriberInsert.contractAmount}
                                            className={classes.tableTextField}
                                            onChange={(e) => {
                                                setSubscriberInsert({ ...subscriberInsert, "contractAmount": e.target.value })
                                            }}
                                            sx={{ width: 180 }}
                                        />
                                        &nbsp;원
                                    </div>
                                </div>

                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약일</div>
                                    <div className={classes.popupData}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                            <DesktopDatePicker
                                                className={classes.selectMenuDate}
                                                label=" "
                                                inputFormat="YYYY-MM-DD"
                                                value={subscriberInsert.contractDay}
                                                onChange={DateChangeI('contractDay')}
                                                isClearable                                                
                                                renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약기간</div>
                                    <div className={classes.popupData}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                            <DesktopDatePicker
                                                className={classes.selectMenuDate}
                                                label=" "
                                                inputFormat="YYYY-MM-DD"
                                                value={subscriberInsert.contractStartDate}
                                                onChange={(newDate) => {
                                                    const date = new Date(newDate === null ? "" : newDate.$d) 
                                                    setSubscriberInsert({ ...subscriberInsert, "contractStartDate": moment(date).format("YYYY-MM-DD") })
                                                }}
                                                isClearable selectsStart
                                                from={Date.parse(subscriberInsert.contractStartDate)} to={Date.parse(subscriberInsert.contractEndDate)}
                                                renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                            />
                                        </LocalizationProvider>
                                        &nbsp;~&nbsp;
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                            <DesktopDatePicker
                                                className={classes.selectMenuDate}
                                                label=" "
                                                inputFormat="YYYY-MM-DD"
                                                value={subscriberInsert.contractEndDate}
                                                onChange={(newDate) => {
                                                    const date = new Date(newDate === null ? "" : newDate.$d)
                                                    setSubscriberInsert({ ...subscriberInsert, "contractEndDate": moment(date).format("YYYY-MM-DD") })
                                                }}
                                                isClearable selectsEnd
                                                from={Date.parse(subscriberInsert.contractStartDate)} to={Date.parse(subscriberInsert.contractEndDate)} minDate={Date.parse(subscriberInsert.contractStartDate)}
                                                renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}><text>*</text>상태</div>
                                    <div className={classes.popupData}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={subscriberInsert.statusCd}
                                            onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "statusCd": e.target.value })}
                                        >
                                            <MenuItem value={1}>사용</MenuItem>
                                            <MenuItem value={0}>사용중지</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약서</div>
                                    <div className={classes.popupData}>
                                        <TextField
                                            variant="outlined"
                                            value={filePath.contractFileId ?? ""}
                                            className={classes.tableTextField}
                                            // onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "contractFileId": e.target.value })}
                                            sx={{ width: 300 }}
                                        />
                                        <SearchUserButton id="contractFileId" onClick={handleDialogOpenOnly}>찾아보기</SearchUserButton>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.popButtons}>
                                <YesButton onClick={() => handleInputValidation(subscriberInsert, handleSubscribersInsert, "insert")}>등록</YesButton>
                                <NoButton onClick={() => { handleRegisterInitialValue(); setRegMemberPop(false); setFilePath({ ...filePath, "contractFileId": "" }) }}>취소</NoButton>
                            </div>
                        </div>
                    </Overlay>

                    {/* 가입자 정보 수정 폼 */}
                    <Overlay show={userInfoPop}>
                        <div className={userInfoPop ? (classes.adminPopup + ' infoMember') : (classes.adminPopup + ' infoMemberClose')}>
                            <div className={classes.popHeader}>
                                가입자 정보 수정
                            </div>
                            <div className={classes.popupTable}>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}><text>*</text>회사명</div>
                                    <div className={classes.popupData}>
                                        <TextField
                                            variant="outlined"
                                            value={subscriberView.companyName}
                                            className={classes.tableTextField}
                                            onChange={(event) => setSubscriberView({ ...subscriberView, "companyName": event.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>
                                        <div className={classes.headNest}>사용자</div>
                                        <div className={classes.headNest}>
                                            <div className={classes.dataNest}><text>*</text>사업장명</div>
                                            <div className={classes.dataNest}><text>*</text>사업자등록번호</div>
                                            <div className={classes.dataNest}>업종</div>
                                            <div className={classes.dataNest}>규모</div>
                                            <div className={classes.dataNest}><text>*</text>ID</div>
                                            <div className={classes.dataNest}><text>*</text>사용자권한</div>
                                            <div className={classes.dataNest}><text>*</text>담당자명</div>
                                            <div className={classes.dataNest}>연락처</div>
                                            <div className={classes.dataNest}>이메일</div>
                                        </div>
                                    </div>
                                    <div className={classes.popupData}>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                value={subscriberView.workplaceName}
                                                className={classes.tableTextField}
                                                onChange={(event) => setSubscriberView({ ...subscriberView, "workplaceName": event.target.value })}
                                            />
                                        </div>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                value={subscriberView.registNo}
                                                className={classes.tableTextField}
                                                onChange={handleRegistNoD}
                                                //onChange={(event) => setSubscriberView({ ...subscriberView, "registNo": event.target.value })}
                                            />
                                        </div>
                                        <div className={classes.dataNest}>
                                            <Select
                                                className={classes.tableTextField}
                                                value={subscriberView.sectorCd}
                                                onChange={(event) => setSubscriberView({ ...subscriberView, "sectorCd": event.target.value })}
                                            >
                                                {codeGroup2?.map((code) => (<MenuItem value={code.codeId}>{code.codeNameKor}</MenuItem>))}
                                            </Select>
                                        </div>
                                        <div className={classes.dataNest}>
                                            <Select
                                                className={classes.tableTextField}
                                                value={subscriberView.scaleCd}
                                                onChange={(e) => setSubscriberView({ ...subscriberView, "scaleCd": e.target.value })}
                                            >
                                                {codeGroup1?.map((code) => (<MenuItem value={code.codeId}>{code.codeNameKor}</MenuItem>))}
                                            </Select>
                                        </div>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                style={{backgroundColor: "#d4d9e1"}}
                                                value={subscriberView.loginId}
                                                onChange={(event) => setSubscriberView({ ...subscriberView, "loginId": event.target.value })}
                                                InputProps={{
                                                    readOnly: true,
                                                  }}
                                            />
                                        </div>
                                        <div className={classes.dataNest}>
                                            <Select
                                                className={classes.tableTextField}
                                                value={subscriberView.managerRoleCd}
                                                onChange={(event) => setSubscriberView({ ...subscriberView, "managerRoleCd": event.target.value })}
                                            >
                                                {codeGroup3?.map((code) => (<MenuItem value={code.codeId}>{code.codeNameKor}</MenuItem>))}
                                            </Select>
                                        </div>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                value={subscriberView.managerName}
                                                onChange={(event) => setSubscriberView({ ...subscriberView, "managerName": event.target.value })}
                                            />
                                        </div>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                value={managerTel.firstInput}
                                                onChange={(event) => setManagerTel({ ...managerTel, firstInput: event.target.value })}
                                                sx={{ width: 70 }}
                                            />
                                            &nbsp;‒&nbsp;
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                value={managerTel.secondeInput}
                                                onChange={(event) => setManagerTel({ ...managerTel, secondeInput: event.target.value })}
                                                sx={{ width: 70 }}
                                            />
                                            &nbsp;‒&nbsp;
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                value={managerTel.thirdInput}
                                                onChange={(event) => setManagerTel({ ...managerTel, thirdInput: event.target.value })}
                                                sx={{ width: 70 }}
                                            />
                                        </div>
                                        <div className={classes.dataNest}>
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                value={managerEmail.firstInput}
                                                onChange={(event) => setManagerEmail({ ...managerEmail, firstInput: event.target.value })}
                                                sx={{ width: 189 }}
                                            />
                                            &nbsp;@&nbsp;
                                            <TextField
                                                variant="outlined"
                                                className={classes.tableTextField}
                                                value={managerEmail.secondeInput}
                                                onChange={(event) => setManagerEmail({ ...managerEmail, secondeInput: event.target.value })}
                                                sx={{ width: 189 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약금액</div>
                                    <div className={classes.popupData}>
                                        <TextField
                                            variant="outlined"
                                            className={classes.tableTextField}
                                            value={subscriberView.contractAmount === null ? "" : subscriberView.contractAmount}
                                            onChange={(event) => setSubscriberView({ ...subscriberView, "contractAmount": event.target.value })}
                                            sx={{ width: 190 }}
                                        />
                                        &nbsp;원
                                    </div>
                                </div>

                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약일</div>
                                    <div className={classes.popupData}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                            <DesktopDatePicker
                                                className={classes.selectMenuDate}
                                                label=" "
                                                inputFormat="YYYY-MM-DD"
                                                value={contractDay}
                                                onChange={DateChangeD}
                                                renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                               
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약기간</div>
                                    <div className={classes.popupData}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                            <DesktopDatePicker
                                                className={classes.selectMenuDate}
                                                label=" "
                                                inputFormat="YYYY-MM-DD"
                                                value={contractStartDate}
                                                onChange={(newDate) => {
                                                    const date = new Date(newDate === null ? "" : newDate.$d)
                                                    setContractStartDate(moment(date).format("YYYY-MM-DD"))
                                                }}
                                                renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                            />
                                        </LocalizationProvider>
                                        &nbsp;~&nbsp;
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                            <DesktopDatePicker
                                                className={classes.selectMenuDate}
                                                label=" "
                                                inputFormat="YYYY-MM-DD"
                                                value={contractEndDate}
                                                onChange={(newDate) => {
                                                    const date = new Date(newDate === null ? "" : newDate.$d)
                                                    setContractEndDate(moment(date).format("YYYY-MM-DD"))
                                                }}
                                                renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}><text>*</text>상태</div>
                                    <div className={classes.popupData}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={!!(subscriberView.companyName) ? subscriberView.statusCd : ""}
                                            onChange={(event) => setSubscriberView({ ...subscriberView, "statusCd": event.target.value })}
                                            sx={{ width: 250 }}
                                        >
                                            <MenuItem value="1">사용</MenuItem>
                                            <MenuItem value="0">사용중지</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className={classes.popupRow}>
                                    <div className={classes.popupData + ' data_head'}>계약서</div>
                                    <div className={classes.popupData}>
                                        <TextField
                                            variant="outlined"
                                            value={filePath.contractFileId ?? ""}
                                            className={classes.tableTextField}
                                            // onChange={(e) => setSubscriberInsert({ ...subscriberInsert, "contractFileId": e.target.value })}
                                            sx={{ width: 300 }}
                                        />
                                        <SearchUserButton id="contractFileId" onClick={handleDialogOpen}>찾아보기</SearchUserButton>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.popButtons}>
                                <YesButton onClick={() => handleInputValidation(subscriberView, handleSubscribersUpdate, "update")}>수정</YesButton>
                                <WhiteButton className={"button-delete"} onClick={() => setYesNoPopupShow(true)}>삭제</WhiteButton>
                                <NoButton onClick={() => { setUserInfoPop(false); setFilePath({ ...filePath, "contractFileId": "" }) }}>취소</NoButton>
                            </div>
                        </div>
                    </Overlay>
                    <div className={classes.adminPopup + ' popSettings'}>
                        <div className={classes.popHeader}>
                            파일업로드
                        </div>
                        <div className={classes.popBody}>
                            <div className={classes.popAlert}>
                                <Alert
                                    icon={<img src={alertIcon} alt="alert icon" />}
                                    severity="error">
                                    필수 의무조치내역 양식 엑셀 파일을 업로드 하십시오
                                </Alert>
                            </div>
                            <UploadButton1>등록된 양식 다운로드</UploadButton1>
                            <div className={classes.popUpload}>
                                <div className={classes.uploadTitle}>양식파일 업로드</div>
                                <div className={classes.uploadField}>
                                    <div className={classes.uploadBox}>파일을 이곳에 드래그해 주세요.</div>
                                    <UploadButton2>파일 업로드</UploadButton2>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 가입고객사 <strong>{parseFloat(!!(subscribersList) && !!(subscribersList.length) && subscribersList[0]?.totalCount).toLocaleString()}</strong> 개</div>
                    <Stack spacing={2}>
                    </Stack>
                </Grid>
            </Grid>
            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                selectedFileName={selectedFileName}
            />
            <OnlyUploadDialog
                open={openDialogOnly}
                onClose={handleDialogCloseOnly}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                label={labelObjectOnly}
                selectedFileName={selectedFileName}
            />

            {/* 파일다운로드 */}
            <DownloadDialog
                open={downloadDialogShow}
                onClose={() => setDownloadDialogShow(false)}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
            />

            {/* 가입자 회원 삭제 */}
            <Overlay show={yesNoPopupShow}>
                <YesNo
                    show={yesNoPopupShow}
                    message={yesNoPopupMessage}
                    onConfirmYes={handleSubscribersDelete}
                    onConfirmNo={() => setYesNoPopupShow(false)}
                />
            </Overlay>

            <Overlay show={okayPopupShow}>
                <Okay
                    show={okayPopupShow}
                    message={okayPopupMessage}
                    title={okayPopupTitle}
                    onConfirm={() => setOkayPopupShow(false)} />
            </Overlay>
        </DefaultLightLayout >
    );
};

export default SystemAdministrator;
