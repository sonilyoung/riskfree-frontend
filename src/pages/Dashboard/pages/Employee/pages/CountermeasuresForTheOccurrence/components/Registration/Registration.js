import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';

import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import noImg from '../../../../../../../../assets/images/ic_no_image.png';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useAccidentInsertMutation } from "../../../../../../../../hooks/api/AccidentManagement/AccidentManagement";
import { useGetLoginInfoMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { useNavigate } from "react-router-dom";
import moment from "moment"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';

import { useFileUploadMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { OnlyUploadDialog, UploadDialog } from '../../../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../../../components/Overlay';
import Ok from '../../../../../../../../components/MessageBox/Ok';


const useStyles = makeStyles(() => ({
    pageWrap: {
        '& >div:not($listTitle, $footerButtons)': {
            display: 'flex',
            borderRadius: '6px',
            background: '#fff',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgb(189 203 203 / 50%)'
        }
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
    },
    boxReception: {
        display: 'flex',
        marginBottom: '16px !important',
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '160px',
        },
        '& $boxRow:first-of-type $rowInfo': {
            width: '306px'
        },
        '& $boxRow:first-of-type $rowInfo:last-of-type': {
            width: 'auto'
        },
        '& $boxRow:last-of-type $rowInfo': {
            width: '100%',
        },
    },
    boxTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100px',
        background: '#8098c9',
        borderRight: '1px solid #fff',
        color: '#fff',
        fontSize: '17px',
        fontWeight: '500',
        '& span': {
            width: '100%',
            textAlign: 'center'
        }
    },
    boxContent: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'calc(100% - 100px)',
        '& $boxRow:first-of-type': {
            height: '60px',
            '& $rowContent': {
                borderTop: 'none'
            },
            '& $rowTitle': {
                borderTop: 'none'
            }
        },
        '& $boxRow:nth-of-type(2) $rowContent': {
            '& $rowInfo:first-of-type': {
                marginRight: '334px'
            },
            '& $rowInfo:nth-of-type(3)': {
                marginRight: '66px'
            },
            '& $rowTitle': {
                borderTop: 'none'
            }
        }
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        minHeight: '60px',
        '& $rowTitle': {
            borderBottom: 'none'
        }
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9',
        borderTop: '1px solid #fff',
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }
    },
    rowContent: {
        height: '100%',
        width: 'calc(100% - 100px)',
        borderTop: '1px solid #d5dae2',
        display: 'flex',
        '& >div[class=*row]': {
            height: '100%'
        },
    },
    rowInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        boxSizing: 'border-box',
    },
    boxRegistration: {
        '& $boxRow': {
            '&:nth-of-type(2)': {
                height: '60px'
            },
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '160px',
        },
        '& $boxRow:first-of-type $rowInfo': {
            width: '340px'
        },
        '& $boxRow:first-of-type $rowContent $rowInfo:nth-of-type(5)': {
            width: '260px'
        },
        '& $boxRow:first-of-type $rowContent $rowInfo:nth-of-type(3)': {
            width: '520px'
        },
        '& $boxRow:nth-of-type(3) $rowContent $rowInfo:first-of-type': {
            width: '100%'
        },
        '& $boxRow:nth-of-type(3) $rowContent $rowInfo:last-of-type': {
            paddingLeft: '0px'
        },
        '& $boxRow:nth-of-type(4) $rowContent $rowInfo': {
            width: '100%'
        },
        '& $boxRow:last-of-type $rowContent': {
            display: 'flex',
            '& >div': {
                width: '50%',
                borderLeft: '1px solid #d5dae2',
                '& >div': {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    borderBottom: '1px solid #d5dae2',
                    minHeight: '40px',
                    maxHeight: '640px',
                    height: '100%',
                    padding: '10px',
                    '&:first-of-type': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#eff2f6',
                        fontWeight: '500',
                        height: '50px',
                        padding: '0'
                    },
                    '& .Mui-disabled input': {
                        '-webkit-text-fill-color': '#333'
                    }
                }
            }
        }
    },
    searchRadio: {
        '& [role=radiogroup]': {
            flexWrap: 'nowrap',
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
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            height: '49px !important',
            fontSize: '16px',
        }
    },
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    footerButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px !important',
        '& button': {
            marginLeft: '10px'
        }
    },
    imgPreview: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            padding: '20px 20px 10px 20px',
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
}));

const AccidentReportButton = styled(ButtonUnstyled)`
    width: 90px;
    height: 80px;
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

const UploadButton = styled(ButtonUnstyled)`
    width: 140px;
    height: 40px;
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

const BlueButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    background: #018de7;
    color: #fff;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #0355b0;
    }
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
    color: inherit;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

const Registration = () => {
    const classes = useStyles();
    const todayDate = moment().format("YYYY-MM-DD")

    const [accidentInsert] = useAccidentInsertMutation();
    const navigate = useNavigate();
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [occurDate, setOccurDate] = useState(null)
    const [recvName, setRecvName] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [finalReportId, setFinalReportId] = useState(null)
    const [initReportId, setInitReportId] = useState(null)
    const [performAfterId, setPerformAfterId] = useState(null)
    const [performBeforeId, setPerformBeforeId] = useState(null)
    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "initReportId": "",
        "finalReportId": "",
        "performBeforeId": "",
        "performAfterId": ""
    })
    const [okPopupShow, setOkPopupShow] = useState(false);
    const [okPopupMessage, setOkPopupMessage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("")

    const [accident, setAccident] = useState({
        accLevelCd: "",
        accTypeCd001: "",
        accTypeCd002: "",
        accTypeCd003: "",
        accTypeCd004: "",
        accTypeCd005: "",
        accTypeCd006: "",
        accdntCn: "",
        accidentId: 1,
        accidentTypeCd: "",
        deathToll: null,
        finalReportId: null,
        initReportId: null,
        jobDeseaseToll: null,
        managerName: "",
        occurDate: "",
        occurPlace: "",
        occurReason: "",
        performAfterId: null,
        performBeforeId: null,
        preventCn: "",
        recvDate: todayDate,
        recvFormCd: "",
        recvTypeCd001: "",
        recvTypeCd002: "",
        recvTypeCd003: "",
        recvTypeCd004: "",
        recvTypeCd005: "",
        recvTypeCd006: "",
        recvUserName: recvName,
        sameAccidentInjury: null,
    });

    const [labelObject, setLabelObject] = useState({
        upperLabel: "이미지 등록",
        middleLabel: "등록할 파일을 업로드 합니다.",
    })

    const [fileUpload] = useFileUploadMutation()

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogOpen = (event) => {
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(event.target.id);
        if (event.target.id === ("performBeforeId" || "performAfterId")) {
            setLabelObject({
                ...labelObject,
                upperLabel: "이미지 등록",
                middleLabel: "등록할 파일을 업로드 합니다.",
            })
        } else {
            setLabelObject({
                ...labelObject,
                upperLabel: "보고서 등록",
                middleLabel: "등록할 파일을 업로드 합니다.",
            })
        }
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const handleDialogFileUpload = async () => {
        let formData = new FormData();
        formData.append("files", selectedFile)
        handleDialogClose()
        const response = await fileUpload(formData)
        const fileId = response.data.RET_DATA[0].atchFileId
        setAccident({ ...accident, [dialogId]: fileId })
        setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0]?.originalFileName })
    }



    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
        setAccident({ ...accident, "recvUserName": response?.data?.RET_DATA?.name })
    }


    const handleRedirect = () => {
        navigate(
            "/dashboard/employee/accident-countermeasures-implementation/list"
        );
    };

    const handleAccidentInsert = () => {
        accidentInsert(accident)
            .then((response) => setOkPopupMessage(response.data))
            .then(() => setOkPopupShow(true));
    };

    const [date, setDate] = React.useState(null);

    const [locale] = React.useState('ko');

    useEffect(() => {
        handleLoginInfo()
    }, [])
    console.log(accident)
    return (
        <DefaultLayout>
            <Grid
                className={classes.pageWrap}
                container
                rowSpacing={0}
                columnSpacing={0}
            >
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        재해발생 및 방지대책 등 이행현황
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxReception}>
                    <div className={classes.boxTitle}>사고접수</div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>접수일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>{todayDate}</div>
                                <div className={classes.rowTitle}>접수자</div>
                                <div className={classes.rowInfo}>
                                    {loginInfo.name}
                                </div>
                                <div className={classes.rowTitle}>접수형태</div>
                                <div className={classes.rowInfo}>
                                    <FormControl
                                        className={classes.searchRadio}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "recvFormCd": event.target.value,
                                            })
                                        }
                                    >
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value="001"
                                                label="전화"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={
                                                            <img src={radioIconOn} alt="radio icon on" />
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value="002"
                                                label="싸이렌"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={
                                                            <img src={radioIconOn} alt="radio icon on" />
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value="003"
                                                label="안전순찰중"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={
                                                            <img src={radioIconOn} alt="radio icon on" />
                                                        }
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.rowTitle}>접수유형</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value={accident.recvTypeCd001}
                                                label="추락"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd001": accident.recvTypeCd001
                                                                    ? ""
                                                                    : "001",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.recvTypeCd002}
                                                label="끼임"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd002": accident.recvTypeCd002
                                                                    ? ""
                                                                    : "002",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.recvTypeCd003}
                                                label="화재"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd003": accident.recvTypeCd003
                                                                    ? ""
                                                                    : "003",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.recvTypeCd004}
                                                label="전기"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd004": accident.recvTypeCd004
                                                                    ? ""
                                                                    : "004",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.recvTypeCd005}
                                                label="밀폐"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd005": accident.recvTypeCd005
                                                                    ? ""
                                                                    : "005",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.recvTypeCd006}
                                                label="중량물"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd006": accident.recvTypeCd006
                                                                    ? ""
                                                                    : "006",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
                                <span>사고조치 </span>
                                <span>내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={accident.accdntCn}
                                        onChange={(event) =>
                                            setAccident({ ...accident, "accdntCn": event.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxRegistration}>
                    <div className={classes.boxTitle}>사고접수</div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={accident && accident.occurDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setAccident({ ...accident, "occurDate": moment(date).format("YYYY-MM-DD") })
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}>사고유형</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value={accident.accTypeCd001}
                                                label="추락"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "accTypeCd001": accident.accTypeCd001
                                                                    ? ""
                                                                    : "001",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.accTypeCd002}
                                                label="끼임"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "accTypeCd002": accident.accTypeCd002
                                                                    ? ""
                                                                    : "002",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.accTypeCd003}
                                                label="화재"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "accTypeCd003": accident.accTypeCd003
                                                                    ? ""
                                                                    : "003",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.accTypeCd004}
                                                label="전기"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "accTypeCd004": accident.accTypeCd004
                                                                    ? ""
                                                                    : "004",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.accTypeCd005}
                                                label="밀폐"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "accTypeCd005": accident.accTypeCd005
                                                                    ? ""
                                                                    : "005",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={accident.accTypeCd006}
                                                label="중량물"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "accTypeCd006": accident.accTypeCd006
                                                                    ? ""
                                                                    : "006",
                                                            })
                                                        }
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.rowTitle}>사고등급</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 100 }}
                                        className={classes.selectMenu}
                                        value={accident.accLevelCd}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "accLevelCd": event.target.value,
                                            })
                                        }
                                        displayEmpty
                                    >
                                        <MenuItem value="001">1급</MenuItem>
                                        <MenuItem value="002">2급</MenuItem>
                                        <MenuItem value="003">3급</MenuItem>
                                        <MenuItem value="004">4급</MenuItem>
                                        <MenuItem value="005">5급</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>발생장소</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident.occurPlace}
                                        className={classes.selectMenu}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "occurPlace": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>현장책임자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident.managerName}
                                        sx={{ width: 140 }}
                                        className={classes.selectMenu}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "managerName": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className={classes.rowTitle}>사고구분</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 100 }}
                                        className={classes.selectMenu}
                                        value={accident.accidentTypeCd}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "accidentTypeCd": event.target.value,
                                            })
                                        }
                                        displayEmpty
                                    >
                                        <MenuItem value="001">지사</MenuItem>
                                        <MenuItem value="002">도급</MenuItem>
                                        <MenuItem value="003">기타</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>사고분류</div>
                                <div className={classes.rowInfo}>
                                    사망&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident.deathToll ? accident.deathToll : ""}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "deathToll": event.target.value,
                                            })
                                        }
                                    />
                                    명&ensp;&ensp; 동일사고유형&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={
                                            accident.sameAccidentInjury
                                                ? accident.sameAccidentInjury
                                                : ""
                                        }
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "sameAccidentInjury": event.target.value,
                                            })
                                        }
                                    />
                                    명&ensp;&ensp; 직업성질환&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={
                                            accident.jobDeseaseToll ? accident.jobDeseaseToll : ""
                                        }
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "jobDeseaseToll": event.target.value,
                                            })
                                        }
                                    />
                                    명
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생원인</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={accident.occurReason}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "occurReason": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className={classes.rowInfo}>
                                    <AccidentReportButton sx={{ marginRight: "10px" }} id="initReportId" onClick={handleDialogOpen}>
                                        초기사고 보고서
                                    </AccidentReportButton>
                                    <AccidentReportButton id="finalReportId" onClick={handleDialogOpen}>최종사고 보고서</AccidentReportButton>
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
                                <span>재발방지 </span>
                                <span>대책</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={accident.preventCn}
                                        onChange={(event) =>
                                            setAccident({
                                                ...accident,
                                                "preventCn": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>이행실적</div>
                            <div className={classes.rowContent}>
                                <div>
                                    <div>조치 전</div>
                                    <div>
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={filePath.performBeforeId ?? ""}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton id="performBeforeId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                        {/* <div className={classes.imgPreview}>
                                            <img src={imgPrev} alt="uploaded image" />
                                        </div> */}
                                    </div>
                                </div>
                                <div>
                                    <div>조치 후</div>
                                    <div>
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={filePath.performAfterId ?? ""}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton id="performAfterId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                        {/* <div className={classes.imgPreview}>
                                            <img src={noImg} alt="no image" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    {/* <BlueButton className={"button-correction"}>수정</BlueButton> */}
                    <BlueButton className={"button-registration"} onClick={handleAccidentInsert}>등록</BlueButton>
                    {/* <WhiteButton className={"button-cancellation"}>취소</WhiteButton> */}
                    {/* <WhiteButton className={"button-delete"}>삭제</WhiteButton> */}
                    <WhiteButton className={"button-list"} onClick={handleRedirect}>목록</WhiteButton>
                </Grid>
            </Grid>
            <OnlyUploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                label={labelObject}
                selectedFileName={selectedFileName}
            />
            <Overlay show={okPopupShow}>
                <Ok
                    show={okPopupShow}
                    message={{ RET_CODE: "0201", RET_DESC: "저장성공" }}
                    // message={okPopupMessage}
                    onConfirm={() => setOkPopupShow(false)} />
            </Overlay>
        </DefaultLayout>
    );
};

export default Registration;
