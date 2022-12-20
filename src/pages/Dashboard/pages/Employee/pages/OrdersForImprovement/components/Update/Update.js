import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/ko';
import moment from "moment"
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useStyles, UploadButton, BlueButton, WhiteButton } from './useStyles';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';

import { useLawUpdateMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { useLawViewMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { useGetLoginInfoMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { DefaultLayout } from "../../../../../../../../layouts/Default";
import { useFileUploadMutation, useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { OnlyUploadDialog, UploadDialog } from '../../../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../../../components/Overlay';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Update = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { updateid } = useParams()
    const [lawView] = useLawViewMutation();
    const [lawUpdate] = useLawUpdateMutation();
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const todaysDate = moment().format("YYYY-MM-DD")
    const [filePathBefore, setFilePathBefore] = useState("")
    const [filePathAfter, setFilePathAfter] = useState("")
    const [getFileInfo] = useGetFileInfoMutation()
    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "performBeforeId": "",
        "performAfterId": ""
    });
    const [selectedFileName, setSelectedFileName] = useState("")
    const labelObject = {
        upperLabel: "이미지 등록",
        middleLabel: "등록할 파일을 업로드 합니다."
    }
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    
    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const [law, setLaw] = useState({
        recvDate: todaysDate,       // 접수일자
        recvUserName: loginInfo.name,       // 접수자
        recvCd: "",        
        cmmdOrgCd001: "",
        cmmdOrgCd002: "",
        cmmdOrgCd003: "",
        cmmdOrgCd004: "",
        improveCn: "",
        improveTypeCd: "",
        orderDate: "",      // 지적일자
        dueDate: "",        // 완료요청일
        issueReason: "",
        preventCn: "",
        performBeforeId: "",
        performAfterId: "",
        countPerPage: 0,
        lawImproveId: 1,
        occurPlace: "1층작업실",
        pageNum: 0,
        completeDate:"",        // 완료일
    });

    const handleRedirect = () => {
        navigate("/dashboard/employee/order-for-improvement-and-correction-under-related-law/list");
    };

    const fetchLawView = async () => {
        let filePathMain = {}
        const response = await lawView(updateid)

        setLaw(response.data.RET_DATA)
        for (const path in filePath) {
            let fileInfo = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA[path]), fileSn: 1 })
            filePathMain[path] = fileInfo.data.RET_DATA.originalFileName
        }        
        setFilePath(filePathMain)
    };

    const handleLawUpdate = async () => {
        if (law.recvCd.length <= 0) {
            setOkayPopupMessage("필수항목 '접수형태'를 선택하세요.");
            setOkayPopupShow(true);
            return false;
        }
        if (law.cmmdOrgCd001+law.cmmdOrgCd002+law.cmmdOrgCd003+law.cmmdOrgCd004.length <= 0) {
            setOkayPopupMessage("필수항목 '명령구분'을 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.improveCn.length <= 0) {
            setOkayPopupMessage("필수항목 '개선.조치 지적내용'을 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.improveTypeCd === null) {
            setOkayPopupMessage("필수항목 '구분'을 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.orderDate === null) {
            setOkayPopupMessage("필수항목 '지적일자'를 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.dueDate === null) {
            setOkayPopupMessage("필수항목 '완료요청일'을 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        const response = await lawUpdate({
            "cmmdOrgCd001": law.cmmdOrgCd001,
            "cmmdOrgCd002": law.cmmdOrgCd002,
            "cmmdOrgCd003": law.cmmdOrgCd003,
            "cmmdOrgCd004": law.cmmdOrgCd004,
            "countPerPage": 0,
            "dueDate": law.dueDate,     // 완료요청일
            "improveCn": law.improveCn,
            "improveTypeCd": law.improveTypeCd,
            "issueReason": law.issueReason,
            "lawImproveId": updateid,
            "occurPlace": law.occurPlace,
            "orderDate": law.orderDate,     // 지적일자
            "pageNum": 0,
            "performAfterId": law.performAfterId,
            "performBeforeId": law.performBeforeId,
            "preventCn": law.preventCn,
            "recvCd": law.recvCd,
            "recvDate": law.recvDate,          // 접수일자
            "recvUserName": law.recvUserName,
            "completeDate": law.completeDate        // 완료일
        });
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("입력정보에 오류가 있습니다 ");
            setOkayPopupShow(true);
        }
    }

    const [fileUpload] = useFileUploadMutation()

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogFileUpload = async () => {
        let formData = new FormData();

        var fileVal = selectedFile.name.slice(selectedFile.name.indexOf(".")+1).toLowerCase(); 
        if(fileVal !== "jpg" && fileVal !== "png" && fileVal !== "jpeg" && fileVal !== "gif" && fileVal !== "bmp"){ 
            setOkayPopupMessage("이미지파일만 가능합니다.");
            setOkayPopupShow(true);   
            return false;            
        } 

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
                setLaw({ ...law, [dialogId]: fileId })
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

    async function handleDialogFileDownload() {
        const fileId = law[dialogId]
        if (fileId) {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${fileId}&fileSn=1`;
        }
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const handleDialogOpen = (event) => {
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(event.target.id);
    }

    const DateChange = name => (date) => {
        if(date === ''){
            setLaw('');
        } else {
            setLaw({ ...law, [name] : date.format("YYYY-MM-DD") });
        }
    };

    const [locale] = React.useState('ko');

    useEffect(() => {
        window.scrollTo(0, 0);
        handleLoginInfo()
        fetchLawView()
    }, [])

    useEffect(() => {

    }, [filePath])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0} >
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        관계법령에 따른 개선.시정 명령에 따른 조치 현황
                    </Typography>
                </Grid>
                {loginInfo.name === law.recvUserName ?
                <Grid item xs={12} className={classes.boxReception}>
                    <div className={classes.boxTitle}>
                        <span>개선.조치</span>
                        <span>접수</span>
                    </div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}><text>*</text>접수일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>{todaysDate}</div>
                                <div className={classes.rowTitle}><text>*</text>접수자</div>
                                <div className={classes.rowInfo}>{law.recvUserName}</div>
                                <div className={classes.rowTitle}><text>*</text>접수형태</div>
                                <div className={classes.rowInfo}>
                                    <FormControl
                                        className={classes.searchRadio}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                "recvCd": event.target.value,
                                            })
                                        }
                                    >
                                        <RadioGroup row value={law && law.recvCd}>
                                            <FormControlLabel
                                                value="001"
                                                label="공문"
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
                                                label="현장점검"
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
                                                label="신고"
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
                                <div className={classes.rowTitle}><text>*</text>명령구분</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row value={law && law.cmmdOrgCd001 || law && law.cmmdOrgCd002 || law && law.cmmdOrgCd003 || law && law.cmmdOrgCd004 || law && law.cmmdOrgCd005 || law && law.cmmdOrgCd006}>
                                            <FormControlLabel
                                                value={law.cmmdOrgCd001}
                                                label="고용노동부"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setLaw({
                                                                ...law,
                                                                "cmmdOrgCd001": law.cmmdOrgCd001 ? "" : "001",
                                                            })
                                                        }
                                                        checked={law.cmmdOrgCd001.trim() === "" ? false : true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={law.cmmdOrgCd002}
                                                label="소방청(소)"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setLaw({
                                                                ...law,
                                                                "cmmdOrgCd002": law.cmmdOrgCd002 ? "" : "002",
                                                            })
                                                        }
                                                        checked={law.cmmdOrgCd002.trim() === "" ? false : true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={law.cmmdOrgCd003}
                                                label="환경부(청)"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setLaw({
                                                                ...law,
                                                                "cmmdOrgCd003": law.cmmdOrgCd003 ? "" : "003",
                                                            })
                                                        }
                                                        checked={law.cmmdOrgCd003.trim() === "" ? false : true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={law.cmmdOrgCd004}
                                                label="자체점검"
                                                control={<Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={() =>
                                                        setLaw({
                                                            ...law,
                                                            "cmmdOrgCd004": law.cmmdOrgCd004 ? "" : "004",
                                                        })
                                                    }
                                                    checked={law.cmmdOrgCd004.trim() === "" ? false : true}
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
                                <span>개선.조치 </span>
                                <span>지적내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={law.improveCn}
                                        onChange={(e) => setLaw({ ...law, "improveCn": e.target.value })}
                                    />
                                </div>
                                <div className={classes.rowTitle}><text>*</text>구 분</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 180 }}
                                        className={classes.selectMenu}
                                        value={law.improveTypeCd}
                                        key={law.improveTypeCd}
                                        onChange={(e) => setLaw({ ...law, "improveTypeCd": e.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="001">개선</MenuItem>
                                        <MenuItem value="002">조치</MenuItem>
                                    </Select>

                                </div>
                                <div className={classes.rowTitle}><text>*</text>지적일자</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={law.orderDate}
                                            onChange={DateChange('orderDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setLaw({ ...law, "orderDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={law.dueDate}
                                            onChange={DateChange('dueDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setLaw({ ...law, "dueDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            :
                <Grid item xs={12} className={classes.boxReception}>
                <div className={classes.boxTitle}>
                    <span>개선.조치</span>
                    <span>접수</span>
                </div>
                <div className={classes.boxContent}>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}><text>*</text>접수일자</div>
                        <div className={classes.rowContent}>
                            <div className={classes.rowInfo}>{todaysDate}</div>
                            <div className={classes.rowTitle}><text>*</text>접수자</div>
                            <div className={classes.rowInfo}>{law.recvUserName}</div>
                            <div className={classes.rowTitle}><text>*</text>접수형태</div>
                            <div className={classes.rowInfo}>{law.recvName}</div>
                            <div className={classes.rowTitle}><text>*</text>명령구분</div>
                            <div className={classes.rowInfo}>{law.cmmdOrgName001} {law.cmmdOrgName002} {law.cmmdOrgName003} {law.cmmdOrgName004} {law.cmmdOrgName005} {law.cmmdOrgName006}</div>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle} style={{height: '80px'}}>
                            <text>*</text>
                            <span>개선.조치 </span>
                            <span>지적내용</span>
                        </div>
                        <div className={classes.rowContent}>
                            <div className={classes.rowInfo}>{law.improveCn}</div>
                            <div className={classes.rowTitle} style={{height: '80px'}}><text>*</text>구 분</div>
                            <div className={classes.rowInfo} style={{width: '200px'}}>{law.improveType}</div>
                            <div className={classes.rowTitle} style={{height: '80px'}}><text>*</text>지적일자</div>
                            <div className={classes.rowInfo} style={{width: '200px'}}>{law.orderDate}</div>
                            <div className={classes.rowTitle} style={{height: '80px'}}><text>*</text>완료요청일</div>
                            <div className={classes.rowInfo}>{law.dueDate}</div>
                        </div>
                    </div>
                </div>
                </Grid>
                }            
                <Grid item xs={12} className={classes.boxRegistration}>
                    <div className={classes.boxTitle}>
                        <span>개선.조치 </span>
                        <span>대응내역</span>
                    </div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>지적원인</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={law.issueReason}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                "issueReason": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            { /* === Data: 2022.10.03 author:Jimmy add, edit === */}
                            <div className={classes.rowTitle}>완료일</div>
                            <div className={classes.rowInfo}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                    <DesktopDatePicker
                                        className={classes.selectMenuDate}
                                        inputFormat="YYYY-MM-DD"
                                        value={law.completeDate === "" ? "" : law.completeDate}
                                        onChange={DateChange('completeDate')}
                                        // onChange={(newDate) => {
                                        //     const date = new Date(newDate.$d)
                                        //     setLaw({ ...law, "recvDate": moment(date).format("YYYY-MM-DD") })
                                        // }}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            { /* ====================================================== */}

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
                                        value={law.preventCn}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
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
                                            value={filePath.performBeforeId}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
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
                                            value={filePath.performAfterId}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
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
                    <BlueButton className={"button-correction"} onClick={handleLawUpdate}>수정</BlueButton>
                    <WhiteButton
                        className={"button-cancellation"}
                        onClick={() => handleRedirect()}
                    >
                        취소
                    </WhiteButton>
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

export default Update;