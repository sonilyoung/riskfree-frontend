import React, { useEffect, useState, useCallback } from 'react';
import { DefaultLayout } from '../../../../../../layouts/Default';

import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';

import searchIcon from '../../../../../../assets/images/ic_search.png';
import pageFirst from '../../../../../../assets/images/btn_first.png';
import pageLast from '../../../../../../assets/images/btn_last.png';
import pageNext from '../../../../../../assets/images/btn_nxt.png';
import pagePrev from '../../../../../../assets/images/btn_pre.png';


import popupClose from '../../../../../../assets/images/btn_popClose.png';
import popupClose2 from '../../../../../../assets/images/btn_popClose2.png';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import { useGetWorkplaceListMutation, useGetLoginInfoMutation } from '../../../../../../hooks/api/MainManagement/MainManagement';
import moment from 'moment';
import { useDeleteSafeWork, useDeleteSafeWorkMutation, useGetSafeWorkFileMutation, useGetSafeWorkFileTopInfoMutation, useGetSafeWorkMutation } from '../../../../../../hooks/api/SafeWorkManagement/SafeWorkManagement';
import useUserInitialWorkplaceId from '../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId';

import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDeleteFileMutation, useFileUploadMutation } from '../../../../../../hooks/api/FileManagement/FIleManagement';
import { OnlyUploadDialog, UploadDialog } from '../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../components/Overlay';
import { useSafeWorkExcelUploadMutation } from '../../../../../../hooks/api/ExcelController/ExcelController';
import { useSelector, useDispatch } from 'react-redux';
import {selectBaselineId, selectIsClose} from '../../../../../../slices/selections/MainSelection';
import Okay from '../../../../../../components/MessageBox/Okay';
//import { useFileDownMutation } from '../../../../../../hooks/api/FileManagement/FIleManagement';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useStyles = makeStyles(() => ({
    pageWrap: {
        // minHeight: 'calc(100vh - 94px)',
        whiteSpace: 'nowrap',
        letterSpacing: '-1.08px'
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
        wordBreak: 'keep-all'
    },
    searchBox: {
        display: 'flex',
        flexWrap: 'wrap',
        // height: '80px',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginBottom: '28px !important',
        background: '#fff',
        '& >div': {
            display: 'flex',
            width: '100%',
        },
    },
    searchRadio: {
        '& [class*=body1]': {
            fontSize: '16px'
        },
        '& input': {
            cursor: 'default'
        },
        '& label': {
            marginRight: '14px'
        }
    },
    searchInfo: {
        display: 'flex',
        width: '100%',
        paddingRight: '30px',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            '&:not(&:first-of-type)': {
                marginLeft: '58px',
            }
        }
    },
    infoTitle: {
        minWidth: '65px',
        marginRight: '14px'
    },
    searchButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    dataTable: {
        borderRadius: '5px',
        boxShadow: '0 0 12px rgb(0 0 0 / 10%)',
        marginBottom: '40px !important',
        background: '#fff',
        overflow: 'hidden',
        minWidth: '1783px',
        '& >div:nth-last-of-type(4)': {
            '& $tableRow': {
                borderBottom: 'none !important',
            }
        },
        '&.popup_table': {
            minWidth: 'unset',
            marginTop: '20px',
            marginBottom: '20px !important',
            '& $tableRow': {
                width: '100% !important',
                height: '50px',
                '&:first-of-type': {
                    width: '80px !important'
                },
                '&:nth-of-type(2)': {
                    width: '500px !important'
                },
                '&:last-of-type': {
                    width: '180px !important',
                    '& button': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:last-of-type': {
                            marginLeft: '10px',
                        }
                    }
                },
            },
        },
    },
    tableHead: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        letterSpacing: '-1.08px',
        '& $tableRow': {
            background: '#bdcbe9',
            borderRight: '1px solid #fff',
            fontSize: '17px',
            fontWeight: '500',
            height: '100px',
            '&:last-of-type': {
                borderRight: '0'
            },
            '&.header_nest': {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                padding: '0',
                background: '#DEEBF7',
                '& >div': {
                    display: 'flex',
                    alignItems: 'center',
                    height: '50%',
                    width: '100%',
                    '&:first-of-type': {
                        justifyContent: 'center',
                        background: '#bdcbe9',
                    },
                    '&:last-of-type': {
                        display: 'flex',
                        borderBottom: '1px solid #bdcbe9',
                        boxSizing: 'border-box',
                        width: '989px',
                        '& >div': {
                            boxSizing: 'border-box',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '123px',
                            height: '100%',
                            borderRight: '1px solid #bdcbe9',
                            '&:last-of-type': {
                                borderRight: 'none'
                            }
                        }
                    },
                }
            },
            '&:nth-of-type(1)': {
                width: '130px'
            },
            '&:nth-of-type(2)': {
                width: '190px'
            },
            '&:nth-of-type(3)': {
                width: '285px'
            },
            '&:nth-of-type(4)': {
                width: '170px'
            },
            '&:nth-of-type(5)': {
                width: '1019px'
            },
        }
    },
    tableBody: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: '50px',
        transition: 'background .2s',
        letterSpacing: '-1.08px',
        '& $tableRow': {
            background: 'transparent',
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: '0',
                width: '128px !important',
            },
            '&:nth-of-type(5), &:nth-of-type(6), &:nth-of-type(7)': {
                // justifyContent: 'flex-start',
            },
            '&:nth-of-type(1)': {
                width: '130px'
            },
            '&:nth-of-type(2)': {
                width: '190px'
            },
            '&:nth-of-type(3)': {
                width: '285px'
            },
            '&:nth-of-type(4)': {
                width: '170px'
            },
            '&:nth-of-type(n + 5)': {
                width: '123px'
            },
        },
        '&:last-of-type $tableRow': {
            borderBottom: '0'
        },
        '&:hover': {
            background: '#eff2f9'
        }
    },
    tableRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        boxSizing: 'border-box',
        padding: '13px 12px',
    },
    pagingBox: {
        position: 'relative',
        height: '40px',
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
                color: '#018de7'
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
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    headerPopup: {
        position: 'absolute',
        zIndex: '1',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '700px',
        height: '500px',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
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
        },
    },
    popupBody: {
        padding: '20px',
        '& button': {
            float: 'right'
        },
    },
    popTop: {
        display: 'flex',
        flexWrap: 'wrap',
        '& >div': {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            '& >div': {
                padding: '10px',
                '&:first-of-type': {
                    width: '80px'
                }
            }
        },
    },
    registerUploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '400px',
        height: '200px',
        background: '#fff',
        borderRadius: '30px',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        boxShadow: '0 0 12px rgb(0 0 0 / 10%)',
        '& >span': {
            width: '30%',
            height: '20px',
            borderBottom: '1px solid #bdcbe9',
            transform: 'translateY(-5px)',
            '&:nth-of-type(2)': {
                width: '40%',
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
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '52%',
        left: '5%',
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
    uploadPopupHide: {
        display: 'none !important',
    },
    uploadInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50%',
        whiteSpace: 'initial',
        '& >*': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& img': {
            width: '30px',
            height: '30px',
        },
    },
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& button:first-of-type': {
            marginLeft: '10px'
        }
    },
    popupTextField: {
        width: '100%',
        marginBottom: '10px !important',
        height: '45px',
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            padding: '10px',
            '&::-webkit-file-upload-button': {
                top: '0px',
                left: '300px',
                position: 'absolute',
                width: '45px',
                height: '45px',
                color: '#fff',
                fontSize: '20px',
                letterSpacing: '-1.08px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background .2s',
                fontSize: '0px',
                color: 'transparent',
                userSelect: 'none',
                background: '#00adef url(' + searchIcon + ') no-repeat 50% 50%',
                '&:hover': {
                    background: '#3a5298 url(' + searchIcon + ') no-repeat 50% 50%',
                }
            },
        },
        '& fieldset': {
            marginRight: '102px',
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
    popupHide: {
        display: "none !important",
    },
    promptPopup: {
        position: 'absolute',
        top: '30%',
        left: '30%',
        width: '300px',
        height: '200px',
        borderRadius: '18px',
        border: '2px solid #018de7',
        background: 'white',
        color: '#333',
        overflow: 'hidden',
        zIndex: '6',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            '&:first-of-type': {
                fontSize: '20px',
                fontWeight: 'bold',
                paddingTop: '10px',
            },
            '&:last-of-type': {
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                '& button': {
                    width: '50%',
                    height: '100%',
                    border: 'none',
                    background: '#eeeff7',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: '.2s',
                    '&:last-of-type': {
                        borderLeft: '1px solid #fff',
                        background: '#018de7',
                        color: '#fff',
                        '&:hover': {
                            background: '#0355b0',
                            color: '#fff'
                        }
                    },
                    '&:hover': {
                        background: '#bdcbe9',
                        color: '#333',
                    }
                }
            },
        }
    },
    promptPopupClose: {
        display: 'none',
    },
}));
const SearchPopupButton = styled(ButtonUnstyled)`
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

const ButtonClosePop = styled(ButtonUnstyled)`
    width: 24px;
    height: 24px;
    background: url(${popupClose}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
`;

const NoButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #fff;
    color: #333;
    border: 2px solid #018de7;
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

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background:url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
    
`;

const RowButton = styled(ButtonUnstyled)`
    width: 35px;
    height: 35px;
    border: 1px solid gray;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    &:hover {
        border: 0px solid gray;
        box-shadow: 0 0 0 1px #333;
    }
    &:active {
        border: 0px solid gray;
        box-shadow: inset 0 0 0 1px darkgray;
    }
`;

const WorkHistoryList = () => {
    const classes = useStyles();

    const [getWorkplaceList] = useGetWorkplaceListMutation();
    const [getSafeWork] = useGetSafeWorkMutation();
    const [getSafeWorkFileTopInfo] = useGetSafeWorkFileTopInfoMutation();
    const [getSafeWorkFile] = useGetSafeWorkFileMutation();
    const [deleteFile] = useDeleteFileMutation();
    const getInitialWorkplaceId = useUserInitialWorkplaceId();

    const [locale] = React.useState('ko');
    const [hide, setHide] = useState(true);
    const [workplaceList, setWorkplaceList] = useState([]);
    const [safeWorkList, setSafeWorkList] = useState([]);
    const [safeWorkFileList, setSafeWorkFileList] = useState([]);
    const [safeWorkFileTopinfo, setSafeWorkFileTopinfo] = useState({});

    const [insertDate, setInsertDate] = useState(null);
    const [username, setUsername] = useState("");
    // const [noticeId, setNoticeId] = useState(null);
    const [registerPopupShow, setRegisterPopupShow] = useState(false);
    const [workplaceId, setWorkplaceId] = useState(getInitialWorkplaceId());
    const [promptPopupShow, setPromptPopupShow] = useState(false);
    const [uploadPopupShow, setUploadPopupShow] = useState(false);
    const [delteFileParams, setDeleteFileParams] = useState({
        "attachedFileId": '',
        "fileSn": ''
    });
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogOnly, setOpenDialogOnly] = useState(false)
    const [constructionType, setConstructionType] = useState(null)
    const [attachFileId, setAttachFileId] = useState(null)
    const [fileIdForDelete, setFileIdForDelete] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [dialogId, setDialogId] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")

    const [fileUpload] = useFileUploadMutation()
    const [safeWorkExcelUpload] = useSafeWorkExcelUploadMutation()
    const [deleteSafeWork] = useDeleteSafeWorkMutation()
    const currentBaselineId = useSelector(selectBaselineId)
    const currentIsClose =  useSelector(selectIsClose)

    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    const [okayPopupShow, setOkayPopupShow] = useState(false);

    const [labelObject, setLabelObject] = useState({
        upperLabel: "공사허가서 등록",
        middleLabel: "공사허가서 파일을 업로드 합니다.",
    })

    const handleAllPopupClose = () => {
        setHide(true);
        setUploadPopupShow(false);
        setPromptPopupShow(false);
    }

    const handleDeleteFile = async () => {
        const response = await deleteFile({ "atchFileId": fileIdForDelete, fileSn: 1 });
        const responseForDelete = await deleteSafeWork({ "atchFileId": fileIdForDelete })
        setPromptPopupShow(false);
        setHide(true)
        fetchSafeWorkList()
    }

    async function getFileDownload(fileId) {        
        if (!!fileId) {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${fileId}&fileSn=1`;
        }
    }    

    async function handleDialogFileDownload() {
        if (!!attachFileId) {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${attachFileId}&fileSn=1`;
        }
    }

    const handleDialogOpen = (id) => {
        setOpenDialog(true);
        setAttachFileId(id);
        setDialogId(id);
        setSelectedFileName("");
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogCloseOnly = () => {
        setOpenDialogOnly(false);
    }

    const handleDialogOpenOnly = (id) => {
        setOpenDialogOnly(true);
        setDialogId(id);
        setSelectedFileName("");
    }

    const handleDialogInputChangeOnly = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList();
        setWorkplaceList(response.data.RET_DATA);
    }

    const fetchSafeWorkList = async () => {
        const response = await getSafeWork({
            "baselineId": currentBaselineId,
            "workplaceId": workplaceId,
            "insertDate": insertDate,
            "userName": username
        });
        //console.log(response);
        setSafeWorkList(response.data.RET_DATA);
        if(getInitialWorkplaceId()===null || getInitialWorkplaceId()===""){
            setWorkplaceId(response.data.RET_DATA?.[0].workplaceId)
        }          
    }

    const fetchSafeWorkFileTopInfo = async (constructionType) => {
        const response = await getSafeWorkFileTopInfo({
            "constructionType": constructionType,
            "workplaceId": workplaceId
        });
        setSafeWorkFileTopinfo(response.data.RET_DATA);
    }

    const fetchSafeWorkFileList = async (constructionType, insertDate) => {
        const response = await getSafeWorkFile({
            "workplaceId": workplaceId,
            "constructionType": constructionType,
            "insertDate": insertDate
        });
        setSafeWorkFileList(response.data.RET_DATA);
        //console.log(response, workplaceId);

    }
    const handleFileInfo = async (id, constructionType, insertDate) => {
        fetchSafeWorkFileList(constructionType, insertDate)
        fetchSafeWorkFileTopInfo(constructionType)
        setHide(false)
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const handleDialogFileUpload = async () => {
        let formData = new FormData();
        if((selectedFileName === "") || (selectedFileName === null)) {
            setOkayPopupMessage("업로드할 파일을 선택하세요.");
            setOkayPopupShow(true);   
        } else {
            formData.append("excelFile", selectedFile)
            const response = await safeWorkExcelUpload(formData)
            if((response.data.RET_CODE === "0000") || (response.data.RET_CODE === "0201")){
                setOkayPopupMessage("'파일'을 등록 하였습니다.");
                setOkayPopupShow(true);
                handleDialogClose();
                handleDialogCloseOnly();
                fetchWorkplaceList();
                fetchSafeWorkList();
            } else if(response.data.RET_CODE === '0433'){
                setOkayPopupMessage("파일확장자 오류");
                setOkayPopupShow(true);
            } else {
                setOkayPopupMessage(response.data.RET_DESC);
                setOkayPopupShow(true);
            }
            setSelectedFileName("");
        }
    }
    //console.log(safeWorkFileList)

    const DateChange = name => (date) => {
        setInsertDate(date);
    };

    /* Data: 2022.10.03 author:Jimmy add: 로그인 정보 호출 및 설정 */
    const [loginInfos, setLoginInfos] = useState({});
    const [getLoginInfo] = useGetLoginInfoMutation()
    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfos(response.data.RET_DATA)
        
    }

    useEffect(() => {
        fetchLoginInfo();
        fetchWorkplaceList();
        fetchSafeWorkList();
    }, []);

    useEffect(() => {
    }, [])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        안전작업허가 공사현황 관리
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div>
                        <div className={classes.searchInfo}>
                            <div>
                                <div className={classes.infoTitle}>사업장</div>
                                {loginInfos.roleCd === '001' ?
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{ width: 210 }}
                                        value=""
                                        key=""
                                        onChange={(e) => setWorkplaceId(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="">전체</MenuItem>
                                        {workplaceList?.length > 0 && workplaceList?.map(workplace =>
                                            <MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>)}
                                    </Select>
                                :
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{ width: 210 }}
                                        value={workplaceId}
                                        displayEmpty
                                    >
                                        <MenuItem value={loginInfos.workplaceId}>{loginInfos.workplaceName}</MenuItem>
                                    </Select>
                                }
                            </div>
                            <div>
                                <div className={classes.infoTitle}>등록일</div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                    <DesktopDatePicker
                                        className={classes.selectMenuDate}
                                        label=" "
                                        inputFormat="YYYY-MM-DD"
                                        value={insertDate}
                                        isClearable
                                        onChange={DateChange('insertDate')}
                                        // onChange={(newDate) => {
                                        //     const date = new Date(newDate.$d);
                                        //     setInsertDate(moment(date).format("YYYY-MM-DD"))
                                        // }}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>등록자</div>
                                <TextField
                                    variant="outlined"
                                    placeholder=""
                                    sx={{ width: 200 }}
                                    className={classes.selectMenu}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.searchButtons}>
                            <SearchButton onClick={() => fetchSafeWorkList()}>조회</SearchButton>
                            {currentIsClose === "1" ?
                                <RegisterButton sx={{ marginLeft: '10px' }}>등록</RegisterButton>
                            :
                                <RegisterButton sx={{ marginLeft: '10px' }} id={"excelFileUpload"} onClick={(e) => handleDialogOpenOnly(e.target.id)}>등록</RegisterButton>
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.dataTable}>
                    <div className={classes.tableHead}>
                        {/* <div className={classes.tableRow}></div> */}
                        <div className={classes.tableRow}>No</div>
                        <div className={classes.tableRow}>사업장</div>
                        <div className={classes.tableRow}>등록일시</div>
                        <div className={classes.tableRow}>등록자</div>
                        <div className={classes.tableRow + ' header_nest'}>
                            <div>등록정보</div>
                            <div>
                                <div>화기</div>
                                <div>밀폐</div>
                                <div>정전</div>
                                <div>굴착</div>
                                <div>방사선</div>
                                <div>고소</div>
                                <div>중장비</div>
                                <div>합계</div>
                            </div>
                        </div>
                    </div>
                    {safeWorkList?.length > 0 && safeWorkList.map((safeWorkItem, index) =>
                    (<div className={classes.tableBody}>
                        {/* <div className={classes.tableRow}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<img src={checkIcon} alt="check icon" />}
                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                    />
                                }
                            />
                        </div> */}
                        <div className={classes.tableRow}>{index + 1}</div>
                        <div className={classes.tableRow}>{safeWorkItem.workplaceName}</div>
                        <div className={classes.tableRow}>{safeWorkItem.insertDate}</div>
                        <div className={classes.tableRow}>{safeWorkItem.userName}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 1, safeWorkItem.insertDate)}>{safeWorkItem.fire}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 2, safeWorkItem.insertDate)}>{safeWorkItem.closeness}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 3, safeWorkItem.insertDate)}>{safeWorkItem.blackout}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 4, safeWorkItem.insertDate)}>{safeWorkItem.excavation}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 5, safeWorkItem.insertDate)}>{safeWorkItem.radiation}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 6, safeWorkItem.insertDate)}>{safeWorkItem.sue}</div>
                        <div className={classes.tableRow} onClick={() => handleFileInfo(safeWorkItem.noticeId, 7, safeWorkItem.insertDate)}>{safeWorkItem.heavy}</div>
                        <div className={classes.tableRow}>{safeWorkItem.totalSum}건</div>
                    </div>)
                    )}
                    <div className={hide ? classes.popupHide : classes.headerPopup}>
                        <div className={classes.popHeader}>
                            안전작업허가 공사내역 관리
                            <ButtonClosePop onClick={() => handleAllPopupClose()}></ButtonClosePop>
                        </div>
                        <div className={hide ? classes.popupHide : classes.popupBody}>
                            <div className={hide ? classes.popupHide : classes.popTop}>
                                <div>
                                    <div>사업장</div>
                                    <div><strong>{!!safeWorkFileTopinfo && !!safeWorkFileTopinfo?.workplaceName && safeWorkFileTopinfo?.workplaceName}</strong></div>
                                </div>
                                <div>
                                    <div>작업구분</div>
                                    <div><strong>{!!safeWorkFileTopinfo && !!safeWorkFileTopinfo?.constructionName && safeWorkFileTopinfo?.constructionName}</strong></div>
                                </div>
                                <div>
                                    <div>등록일</div>
                                    <div><strong>{!!safeWorkFileTopinfo && !!safeWorkFileTopinfo?.insertDate && safeWorkFileTopinfo?.insertDate}</strong></div>
                                </div>
                            </div>
                            <Grid item xs={12} className={hide ? classes.popupHide : classes.dataTable + ' popup_table'}>
                                <div className={classes.tableHead}>
                                    <div className={classes.tableRow}>No</div>
                                    <div className={classes.tableRow}>파일명</div>
                                    <div className={classes.tableRow}>다운로드/삭제</div>
                                </div>
                                {safeWorkFileList?.map((file, index) => (<div className={classes.tableBody}>
                                    <div className={classes.tableRow}>{index + 1}</div>
                                    <div className={classes.tableRow}>{file.fileName}</div>
                                    <div className={classes.tableRow}>
                                        <RowButton>
                                            <FileDownloadIcon sx={{ color: '#333' }} onClick={() => {
                                                getFileDownload(file.attachId)                                                
                                            }}></FileDownloadIcon>
                                        </RowButton>
                                        <RowButton>
                                            <CloseIcon sx={{ color: '#333' }} onClick={() => {
                                                setPromptPopupShow(true)
                                                setFileIdForDelete(file.attachId)                                                
                                            }}></CloseIcon>
                                        </RowButton>
                                    </div>
                                </div>))}
                                <div className={promptPopupShow ? classes.promptPopup : classes.promptPopupClose}>
                                    <div>알림</div>
                                    <div>삭제 하시겠습니까?</div>
                                    <div>
                                        <button onClick={() => setPromptPopupShow(false)} >취소</button>
                                        <button onClick={() => handleDeleteFile()}>확인</button>
                                    </div>
                                </div>
                            </Grid>
                            <NoButton onClick={() => setHide(true)}>취소</NoButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <Stack spacing={2}>
                        <Pagination count={safeWorkList?.length && Math.ceil(safeWorkList[0]?.totalCount / 10)} boundaryCount={10} shape="rounded" showFirstButton showLastButton />
                    </Stack>
                </Grid>
            </Grid>
            {/* 공사허가서 파일 등록 폼 */}
            <OnlyUploadDialog
                open={openDialogOnly}
                onClose={handleDialogCloseOnly}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                label={labelObject}
                selectedFileName={selectedFileName}
            />

            <Overlay show={okayPopupShow}>
                <Okay
                    show={okayPopupShow}
                    message={okayPopupMessage}
                    title={okayPopupTitle}
                    onConfirm={() => setOkayPopupShow(false) } />
            </Overlay>

            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                selectedFileName={selectedFileName}
            />
        </DefaultLayout >
    );
};

export default WorkHistoryList;
