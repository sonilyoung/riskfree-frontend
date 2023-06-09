import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useStyles, AccidentReportButton, UploadButton, BlueButton, WhiteButton } from './useStyles';

import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useAccidentViewMutation, useAccidentDeleteMutation, useAccidentUpdateMutation } from '../../../../../../../../hooks/api/AccidentManagement/AccidentManagement';
import { useGetLoginInfoMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import noImg from '../../../../../../../../assets/images/ic_no_image.png';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';

import { useFileUploadMutation, useFileDownMutation, useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { UploadDialog } from '../../../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../../../components/Overlay';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Update = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const { updateid } = useParams()
    const [accidentView] = useAccidentViewMutation()
    const [accidentUpdate] = useAccidentUpdateMutation()
    const todayDate = moment().format("YYYY-MM-DD")
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [accident, setAccident] = useState({
        "accLevelCd": "",
        "accTypeCd001": "",
        "accTypeCd002": "",
        "accTypeCd003": "",
        "accTypeCd004": "",
        "accTypeCd005": "",
        "accTypeCd006": "",
        "accdntCn": "",
        "accidentId": updateid,
        "accidentTypeCd": "",
        "deathToll": null,
        "finalReportId": null,
        "initReportId": null,
        "jobDeseaseToll": null,
        "managerName": "",
        "occurDate": null,
        "occurPlace": "",
        "occurReason": "",
        "performAfterId": null,
        "performBeforeId": null,
        "preventCn": "",
        "recvDate": "",
        "recvFormCd": "",
        "recvTypeCd001": "",
        "recvTypeCd002": "",
        "recvTypeCd003": "",
        "recvTypeCd004": "",
        "recvTypeCd005": "",
        "recvTypeCd006": "",
        "recvUserName": "",
        "sameAccidentInjury": null
    })
    const [finalReportId, setFinalReportId] = useState(null)
    const [initReportId, setInitReportId] = useState(null)
    const [performAfterId, setPerformAfterId] = useState(null)
    const [performBeforeId, setPerformBeforeId] = useState(null)
    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "performBeforeId": "",
        "performAfterId": ""
    })
    const [fileDown] = useFileDownMutation()
    const [fileUpload] = useFileUploadMutation()
    const [getFileInfo] = useGetFileInfoMutation();
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [selectedFileName, setSelectedFileName] = useState("")
    const [locale] = React.useState('ko');

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }


    const handleRedirect = () => {
        navigate("/dashboard/employee/accident-countermeasures-implementation/list")
    }

    const fetchAccidentView = async () => {
        let filePathMain = {}
        const response = await accidentView(updateid)
        setAccident(response.data.RET_DATA)
        for (const path in filePath) {
            let fileInfo = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA[path]), fileSn: 1 })
            filePathMain[path] = fileInfo.data.RET_DATA.originalFileName
        }
        setFilePath(filePathMain)
        console.log(filePathMain)
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
                setAccident({ ...accident, [dialogId]: parseInt(fileId) })
                setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })

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
        //const fileId = accident[dialogId]
        //if (fileId || id) 
        if (id) {
            //window.location = `${BASE_URL}file/fileDown?atchFileId=${fileId || id}&fileSn=1`;
            window.location = `${BASE_URL}file/fileDown?atchFileId=${id}&fileSn=1`;
        }
    }

    const handleDialogOpen = (event) => {
        setOpenDialog(true);
        setDialogId(event.target.id);
        console.log(event.target.id)
    }

    const handleUpdate = async () => {

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

        const response = await accidentUpdate(
            {
                "accLevelCd": "001",
                "accTypeCd001": accident.accTypeCd001,
                "accTypeCd002": accident.accTypeCd002,
                "accTypeCd003": accident.accTypeCd003,
                "accTypeCd004": accident.accTypeCd004,
                "accTypeCd005": accident.accTypeCd005,
                "accTypeCd006": accident.accTypeCd006,
                "accdntCn": accident.accdntCn,
                "accidentId": accident.accidentId,
                "accidentTypeCd": accident.accidentTypeCd,
                "deathToll": accident.deathToll,
                "finalReportId": accident.finalReportId,
                "initReportId": accident.initReportId,
                "jobDeseaseToll": accident.jobDeseaseToll,
                "managerName": accident.managerName,
                "occurDate": accident.occurDate,
                "occurPlace": accident.occurPlace,
                "occurReason": accident.occurReason,
                "performAfterId": accident?.performAfterId,
                "performBeforeId": accident?.performBeforeId,
                "preventCn": accident.preventCn,
                "recvDate": accident.recvDate,
                "recvFormCd": accident.recvFormCd,
                "recvTypeCd001": accident?.recvTypeCd001,
                "recvTypeCd002": accident?.recvTypeCd002,
                "recvTypeCd003": accident?.recvTypeCd003,
                "recvTypeCd004": accident?.recvTypeCd004,
                "recvTypeCd005": accident?.recvTypeCd005,
                "recvTypeCd006": accident?.recvTypeCd006,
                "recvUserName": accident.recvUserName,
                "sameAccidentInjury": accident.sameAccidentInjury
            }
        );
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("입력정보에 오류가 있습니다 ");
            setOkayPopupShow(true);
        }
    }

    /* Data: 2022.10.03 author:Jimmy add: 로그인 정보 호출 및 설정 */
    const [loginInfos, setLoginInfos] = useState({});
    const [getLoginInfo] = useGetLoginInfoMutation()
    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfos(response.data.RET_DATA)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchLoginInfo();
        fetchAccidentView()
    }, [])

    useEffect(() => {
    }, [filePath])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        재해발생 및 방지대책 등 이행현황
                    </Typography>
                </Grid>
                {loginInfos.name === accident.recvUserName ?
                    <Grid item xs={12} className={classes.boxReception}>
                        <div className={classes.boxTitle}>사고접수</div>
                        <div className={classes.boxContent}>
                            <div className={classes.boxRow}>
                                <div className={classes.rowTitle}><text>*</text>발생일자</div>
                                <div className={classes.rowContent}>
                                    <div className={classes.rowInfo}>{accident && accident.recvDate}</div>
                                    <div className={classes.rowTitle}><text>*</text>접수자</div>
                                    <div className={classes.rowInfo}>{accident && accident.recvUserName}</div>
                                    <div className={classes.rowTitle}><text>*</text>접수형태</div>
                                    <div className={classes.rowInfo}>
                                        <FormControl className={classes.searchRadio} onChange={(e) => setAccident({ ...accident, "recvFormCd": e.target.value })}>
                                            <RadioGroup row value={accident && accident.recvFormCd}>
                                                <FormControlLabel
                                                    value="001"
                                                    label="전화"
                                                    control={
                                                        <Radio
                                                            icon={<img src={radioIcon} alt="radio icon" />}
                                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                            value={"001"}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="002"
                                                    label="싸이렌"
                                                    control={
                                                        <Radio
                                                            icon={<img src={radioIcon} alt="radio icon" />}
                                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                            value={"002"}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="003"
                                                    label="안전순찰중"
                                                    control={
                                                        <Radio
                                                            icon={<img src={radioIcon} alt="radio icon" />}
                                                            checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                            value={"003"}
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
                                                    value={""}
                                                    label="추락"
                                                    onChange={(e) => setAccident({ ...accident, "recvTypeCd001": accident.recvTypeCd001 ? "" : "001" })}
                                                    control={
                                                        <Checkbox
                                                            icon={<img src={checkIcon} alt="check icon" />}
                                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                            checked={!!accident.recvTypeCd001}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={""}
                                                    label="끼임"
                                                    onChange={(e) => setAccident({ ...accident, "recvTypeCd002": accident.recvTypeCd002 ? "" : "002" })}
                                                    control={
                                                        <Checkbox
                                                            icon={<img src={checkIcon} alt="check icon" />}
                                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                            checked={!!accident.recvTypeCd002}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={""}
                                                    label="화재"
                                                    onChange={(e) => setAccident({ ...accident, "recvTypeCd003": accident.recvTypeCd003 ? "" : "003" })}
                                                    control={
                                                        <Checkbox
                                                            icon={<img src={checkIcon} alt="check icon" />}
                                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                            checked={!!accident.recvTypeCd003}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={""}
                                                    label="전기"
                                                    onChange={(e) => setAccident({ ...accident, "recvTypeCd004": accident.recvTypeCd004 ? "" : "004" })}
                                                    control={
                                                        <Checkbox
                                                            icon={<img src={checkIcon} alt="check icon" />}
                                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                            checked={!!accident.recvTypeCd004}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={""}
                                                    label="밀폐"
                                                    onChange={(e) => setAccident({ ...accident, "recvTypeCd005": accident.recvTypeCd005 ? "" : "005" })}
                                                    control={
                                                        <Checkbox
                                                            icon={<img src={checkIcon} alt="check icon" />}
                                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                            checked={!!accident.recvTypeCd005}
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={""}
                                                    label="중량물"
                                                    onChange={(e) => setAccident({ ...accident, "recvTypeCd006": accident.recvTypeCd006 ? "" : "006" })}
                                                    control={
                                                        <Checkbox
                                                            icon={<img src={checkIcon} alt="check icon" />}
                                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                            checked={!!accident.recvTypeCd006}
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
                                    <span>사고접수</span>
                                    <span>내용</span>
                                </div>
                                <div className={classes.rowContent}>
                                    <div className={classes.rowInfo}>
                                        <TextField
                                            className={classes.textArea}
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            onChange={(e) => setAccident({ ...accident, "accdntCn": e.target.value })}
                                            value={accident && accident.accdntCn}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                :
                    <Grid item xs={12} className={classes.boxReception}>
                        <div className={classes.boxTitle}>사고접수</div>
                        <div className={classes.boxContent}>
                            <div className={classes.boxRow}>
                                <div className={classes.rowTitle} style={{height:'80px'}}><text>*</text>발생일자</div>
                                <div className={classes.rowContent}>
                                    <div className={classes.rowInfo}>{accident && accident.recvDate}</div>
                                    <div className={classes.rowTitle} style={{height:'80px'}}><text>*</text>접수자</div>
                                    <div className={classes.rowInfo}>{accident && accident.recvUserName}</div>
                                    <div className={classes.rowTitle} style={{height:'80px'}}><text>*</text>접수형태</div>
                                    <div className={classes.rowInfo}>{accident && accident.recvForm}</div>
                                    <div className={classes.rowTitle} style={{height:'80px'}}><text>*</text>접수유형</div>
                                    <div className={classes.rowInfo}>{accident && accident.recvType001}</div>
                                </div>
                            </div>
                            <div className={classes.boxRow}>
                                <div className={classes.rowTitle}>
                                    <text>*</text>
                                    <span>사고접수</span>
                                    <span>내용</span>
                                </div>
                                <div className={classes.rowContent}>
                                    <div className={classes.rowInfo}>{accident && accident.accdntCn}</div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    }                
                
                <Grid item xs={12} className={classes.boxRegistration}>
                    <div className={classes.boxTitle}>사고처리</div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>처리일자</div>
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
                                                value={""}
                                                label="추락"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd001": accident.accTypeCd001 ? "" : "001" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd001}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="끼임"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd002": accident.accTypeCd002 ? "" : "002" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd002}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="화재"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd003": accident.accTypeCd003 ? "" : "003" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd003}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="전기"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd004": accident.accTypeCd004 ? "" : "004" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd004}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="밀폐"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd005": accident.accTypeCd005 ? "" : "005" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd005}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="중량물"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd006": accident.accTypeCd006 ? "" : "006" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd006}
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
                                        value={accident && accident.accLevelCd}
                                        onChange={(e) => setAccident({ ...accident, "accLevelCd": e.target.value })}
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
                                        value={accident && accident.occurPlace}
                                        className={classes.selectMenu}
                                        onChange={(e) => setAccident({ ...accident, "occurPlace": e.target.value })}
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
                                        value={accident && accident.managerName}
                                        onChange={(e) => setAccident({ ...accident, "managerName": e.target.value })}
                                        sx={{ width: 140 }}
                                        className={classes.selectMenu}
                                    />
                                </div>
                                <div className={classes.rowTitle}>사고구분</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 100 }}
                                        className={classes.selectMenu}
                                        value={accident && accident.accidentTypeCd}
                                        onChange={(e) => setAccident({ ...accident, "accidentTypeCd": e.target.value })}
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
                                        value={accident && accident.deathToll}
                                        onChange={(e) => setAccident({ ...accident, "deathToll": e.target.value })}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    />
                                    명&ensp;&ensp;
                                    동일사고유형&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.jobDeseaseToll}
                                        onChange={(e) => setAccident({ ...accident, "jobDeseaseToll": e.target.value })}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    />
                                    명&ensp;&ensp;
                                    직업성질환&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.sameAccidentInjury}
                                        onChange={(e) => setAccident({ ...accident, "sameAccidentInjury": e.target.value })}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
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
                                        value={accident && accident.occurReason}
                                        onChange={(e) => setAccident({ ...accident, "occurReason": e.target.value })}
                                    />
                                </div>
                                <div className={classes.rowInfo}>
                                    <AccidentReportButton sx={{ marginRight: "10px" }} id="initReportId" onClick={handleDialogOpen} className={accident.initReportId && classes.activeReportBtn}>초기사고 보고서</AccidentReportButton>
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
                                        value={accident && accident.preventCn}
                                        onChange={(e) => setAccident({ ...accident, "preventCn": e.target.value })}
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
                                            onDoubleClick={() => handleDialogFileDownload(accident.performBeforeId)}
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
                                            onDoubleClick={() => handleDialogFileDownload(accident.performAfterId)}
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
                    <BlueButton className={'button-correction'} onClick={handleUpdate}>수정</BlueButton>
                    <WhiteButton className={'button-cancellation'} onClick={handleRedirect}>취소</WhiteButton>
                </Grid>
            </Grid >
            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                enableDownload={true}
                onDownload={handleDialogFileDownload}
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
        </DefaultLayout >

    )
}

export default Update
