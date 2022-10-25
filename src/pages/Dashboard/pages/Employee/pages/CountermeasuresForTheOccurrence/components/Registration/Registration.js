import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useStyles, AccidentReportButton, UploadButton, BlueButton, WhiteButton } from './useStyles';

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
import Okay from '../../../../../../../../components/MessageBox/Okay';

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
    const [selectedFileName, setSelectedFileName] = useState("")
    const [accTypeCd, setAccTypeCd] = useState("")
    const [recvTypeCd, setRecvTypeCd] = useState("")
    
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
    });
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

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
        if((selectedFileName === "") || (selectedFileName === null)) {
            setOkayPopupMessage("업로드할 파일을 선택하세요.");
            setOkayPopupShow(true);   
        } else {

            formData.append("files", selectedFile)
            const response = await fileUpload(formData)
            if(response.data.RET_CODE === "0000"){
                setOkayPopupMessage("'파일'을 등록 하였습니다.");
                setOkayPopupShow(true);
                handleDialogClose();
                const fileId = response.data.RET_DATA[0].atchFileId
                setAccident({ ...accident, [dialogId]: fileId })
                setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0]?.originalFileName })
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

    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
        setAccident({ ...accident, "recvUserName": response?.data?.RET_DATA?.name })
    }

    const handleRedirect = () => {
        navigate("/dashboard/employee/accident-countermeasures-implementation/list");
    };
      
    const handleAccidentInsert = async (e) => {
        if (accident.recvFormCd.length <= 0) {
            setOkayPopupMessage("필수항목 '접수형태'을 입력하세요.");
            setOkayPopupShow(true);
            return false;
        }
        if (accident.recvTypeCd001 + accident.recvTypeCd002 + accident.recvTypeCd003 + accident.recvTypeCd004 + accident.recvTypeCd005 + accident.recvTypeCd006.length <= 0) {
            setOkayPopupMessage("필수항목 '접수유형'를 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (accident.accdntCn.length <= 0) {
            setOkayPopupMessage("필수항목 '사고조치 내용'을 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        const response = await accidentInsert(accident);
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
        } else if (response?.data?.RET_CODE === "0403") {
            setOkayPopupMessage(response?.data?.RET_DESC);
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("입력정보에 오류가 있습니다 ");
            setOkayPopupShow(true);
        }
    };
    const [date, setDate] = React.useState(null);
    const [locale] = React.useState('ko');

    //발생일자
    const DateChange = name => (date) => {
        setAccident({ ...accident, "occurDate": date});
    };

    useEffect(() => {
        handleLoginInfo()
    }, [])
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
                            <div className={classes.rowTitle}><text>*</text>발생일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>{todayDate}</div>
                                <div className={classes.rowTitle}><text>*</text>접수자</div>
                                <div className={classes.rowInfo}>
                                    {loginInfo.name}
                                </div>
                                <div className={classes.rowTitle}><text>*</text>접수형태</div>
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
                                <div className={classes.rowTitle}><text>*</text>접수유형</div>
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
                                                        //onChange={handlerecvType('recvTypeCd001','001')}
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd001": accident.recvTypeCd001
                                                                    ? ""
                                                                    : "001"
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
                                                        //onChange={handlerecvType('recvTypeCd002','002')}
                                                        onChange={() =>
                                                            setAccident({
                                                                ...accident,
                                                                "recvTypeCd002": accident.recvTypeCd002
                                                                    ? ""
                                                                    : "002"
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
                                <text>*</text>
                                <span>사고접수 </span>
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

{/*                 
                <Grid item xs={12} className={classes.boxRegistration}>
                    <div className={classes.boxTitle}>사고처리</div>
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
                                            isClearable
                                            onChange={DateChange('occurDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date()
                                            //     setAccident({ ...accident, "occurDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
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
                                        <MenuItem value="001">자사</MenuItem>
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
                                    <AccidentReportButton sx={{ marginRight: "10px" }} id="initReportId" onClick={handleDialogOpen} className={accident.initReportId && classes.activeReportBtn}>
                                        초기사고 보고서
                                    </AccidentReportButton>
                                    <AccidentReportButton id="finalReportId" onClick={handleDialogOpen} className={accident.finalReportId && classes.activeReportBtn}>최종사고 보고서</AccidentReportButton>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
 */}
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
            <Overlay show={okayPopupShow}>
                <Okay
                    show={okayPopupShow}
                    message={okayPopupMessage}
                    title={okayPopupTitle}
                    onConfirm={() => {
                        if (okayPopupMessage === "등록 되었습니다.") {
                            setOkayPopupShow(false);
                            handleRedirect();
                        } else {
                            setOkayPopupShow(false);
                        }
                    }} />
            </Overlay>
        </DefaultLayout>
    );
};

export default Registration;
