import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useStyles, UploadButton, BlueButton, WhiteButton } from './useStyles';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import { useGetWorkplaceListMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { useImprovementViewMutation, useImprovementUpdateMutation } from '../../../../../../../../hooks/api/ImprovementsManagement/ImprovementsManagement';
import 'dayjs/locale/ko';
import moment from "moment"
import useUserInitialWorkplaceId from '../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId';
import { UploadDialog } from '../../../../../../../../dialogs/Upload';
import { useFileUploadMutation, useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { useFileDownMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import Okay from '../../../../../../../../components/MessageBox/Okay';
import { Overlay } from '../../../../../../../../components/Overlay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Registration = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const { updateid } = useParams()
    const getInitialWorkplaceId = useUserInitialWorkplaceId();
    const [getWorkplaceList] = useGetWorkplaceListMutation()
    const [improvementUpdate] = useImprovementUpdateMutation()
    const [improvementView] = useImprovementViewMutation()
    const [workplaces, setWorkplaces] = useState([])
    const [workplaceSelect, setWorkplaceSelect] = useState(getInitialWorkplaceId())
    const [reqUserCd, setReqUserCd] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [actionAfterId, setActionAfterId] = useState(null)
    const [actionBeforeId, setActionBeforeId] = useState(null)
    const [fileUpload] = useFileUploadMutation()
    const [getFileInfo] = useGetFileInfoMutation()
    const [dialogId, setDialogId] = useState("")

    const [filePathBefore, setFilePathBefore] = useState("")
    const [filePathAfter, setFilePathAfter] = useState("")
    const [fileReq, setFileReq] = useState("")

    const [filePath, setFilePath] = useState({
        "reqFileId": "",
        "actionBeforeId": "",
        "actionAfterId": ""
    })
    const [selectedFileName, setSelectedFileName] = useState("")
    const [fileDown] = useFileDownMutation()
    const [improvement, setImprovement] = useState(
        {
            "actionAfterId": filePathAfter,
            "actionBeforeId": filePathBefore,
            "actionCn": "",
            "companyId": 1,
            "finDate": null,
            "improveCn": "",
            "improveId": null,
            "improveNo": "",
            "insertId": null,
            "reqDate": null,
            "reqFileId": null,
            "reqUserCd": fileReq,
            "statusCd": "",
            "completeDate": "",
            "updateId": null,
            "workplaceId": workplaceSelect
        }
    )
    const [locale] = React.useState('ko');
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    const handleRedirect = () => {
        navigate("/dashboard/employee/improvement-measures/list")
    }

    const fetchComapanyWorkplace = async () => {
        const response = await getWorkplaceList({})
        setWorkplaces(response.data.RET_DATA)
    }

    
    const fetchImprovementView = async () => {
        const response = await improvementView(updateid)
        setImprovement(response?.data?.RET_DATA)

        if (response.data.RET_DATA.actionBeforeId) {
             const responseFileInfoBefore = await getFileInfo({ atchFileId: parseInt(response?.data?.RET_DATA?.actionBeforeId), fileSn: 1 })
             setFilePathBefore(responseFileInfoBefore?.data?.RET_DATA?.originalFileName)
        }
        if (response.data.RET_DATA.actionAfterId) {
             const responseFileInfoAfter = await getFileInfo({ atchFileId: parseInt(response?.data?.RET_DATA?.actionAfterId), fileSn: 1 })
             setFilePathAfter(responseFileInfoAfter.data.RET_DATA.originalFileName)
        }
        if (response.data.RET_DATA.reqFileId) {
            const responseFileInfoExel = await getFileInfo({ atchFileId: parseInt(response?.data?.RET_DATA?.reqFileId), fileSn: 1 })
            setFileReq(responseFileInfoExel.data.RET_DATA.originalFileName)
        }
    }

    const handleDialogOpen = (event) => {
        setOpenDialog(true);
        setDialogId(event.target.id);
        setSelectedFileName("");
    }
    
    const handleDialogClose = () => {
        setOpenDialog(false);
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
                const fileId = response.data.RET_DATA[0].atchFileId
                setOkayPopupMessage("'파일'을 등록 하였습니다.");
                setOkayPopupShow(true);
                handleDialogClose();
                setImprovement({ ...improvement, [dialogId]: parseInt(fileId) })
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

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name);
    }

    async function handleDialogFileDownload(id) {
        const fileId = improvement[dialogId]
        if (fileId || id) {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${fileId || id}&fileSn=1`;
        }
    }
    
    const handleUpdateImprovement = async () => {
        const response = await improvementUpdate(
            {
                "actionAfterId": parseInt(improvement.actionAfterId),
                "actionBeforeId": parseInt(improvement.actionBeforeId),
                "actionCn": improvement.actionCn,
                "companyId": 1,
                "finDate": improvement.finDate,
                "improveCn": improvement.improveCn,
                "improveId": improvement.improveId,
                "improveNo": improvement.improveNo,
                "insertId": null,
                "reqDate": improvement.reqDate,
                "reqFileId": parseInt(improvement.reqFileId),
                "reqUserCd": improvement.reqUserCd,
                "statusCd": improvement.statusCd,
                "completeDate": improvement.completeDate,
                "updateId": improvement.improveId,
                "workplaceId": improvement.workplaceId
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

    useEffect(() => {
        fetchComapanyWorkplace()
        fetchImprovementView()
    }, [])

    useEffect(() => {
        //console.log(improvement)
    }, [filePath])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        개선조치 현황
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxFirst}>
                    <div className={classes.boxTitle}>
                        <span>개선.조치</span>
                        <span>접수</span>
                    </div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}><text>*</text>사업장</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 200 }}
                                        className={classes.selectMenu}
                                        value={improvement && improvement.workplaceId}
                                        onChange={(event) => setImprovement({ ...improvement, "workplaceId": event.target.value })}
                                    >
                                        {workplaces?.map((workplace) => (<MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>))}
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>개선조치 NO</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        sx={{ width: 200 }}
                                        className={classes.selectMenu}
                                        value={improvement && improvement.improveNo}
                                        onChange={(event) => setImprovement({ ...improvement, "improveNo": event.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
                                <text>*</text>
                                <span>개선.조치 </span>
                                <span>내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={improvement && improvement.improveCn}
                                        onChange={(event) => setImprovement({ ...improvement, "improveCn": event.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}><text>*</text>요청일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={improvement && improvement.reqDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setImprovement({ ...improvement, "reqDate": moment(date).format("YYYY-MM-DD") })
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>요청자</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                            sx={{ width: 200 }}
                                            className={classes.selectMenu}
                                            value={improvement.reqUserCd}
                                            onChange={(event) => setImprovement({ ...improvement, "reqUserCd": event.target.value })}
                                        >
                                            <MenuItem value="001">대표이사</MenuItem>
                                            <MenuItem value="002">안전책임자</MenuItem>
                                            <MenuItem value="003">안전실무자</MenuItem>
                                        </Select>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={improvement && improvement.finDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setImprovement({ ...improvement, "finDate": moment(date).format("YYYY-MM-DD") })
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}>첨부파일</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        
                                        value={filePath.reqFileId === "" ? fileReq : filePath.reqFileId }
                                        sx={{ width: 390 }}
                                        className={classes.selectMenu}
                                        style={{ cursor: "pointer" }}
                                        onDoubleClick={() => handleDialogFileDownload(improvement.reqFileId)}
                                    />
                                    <UploadButton id="reqFileId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxSecond}>
                    <div className={classes.boxTitle}>
                        <span>개선.조치 </span>
                        <span>내역</span>
                    </div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>조치구분</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio} onChange={(event) => setImprovement({ ...improvement, "statusCd": event.target.value })} >
                                        <RadioGroup row value={improvement && improvement.statusCd}>
                                            <FormControlLabel
                                                value="001"
                                                label="요청중"
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
                                                label="접수"
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
                                                label="진행중"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                        value={"003"}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value="004"
                                                label="조치완료"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                        value={"004"}
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className={classes.rowTitle}>완료일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={improvement.completeDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setImprovement({ ...improvement, "completeDate": moment(date).format("YYYY-MM-DD") })
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>조치내용</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={improvement && improvement.actionCn}
                                        onChange={(event) => setImprovement({ ...improvement, "actionCn": event.target.value })}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>첨부파일</div>
                            <div className={classes.rowContent}>
                                <div>
                                    <div>조치 전</div>
                                    <div>
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={filePath.actionBeforeId === "" ? filePathBefore : filePath.actionBeforeId}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            style={{ cursor: "pointer" }}
                                            onDoubleClick={() => handleDialogFileDownload(improvement.actionBeforeId)}
                                        // disabled
                                        />
                                        <UploadButton id="actionBeforeId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                    </div>
                                </div>
                                <div>
                                    <div>조치 후</div>
                                    <div>
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={filePath.actionAfterId === "" ? filePathAfter : filePath.actionAfterId}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            style={{ cursor: "pointer" }}
                                            onDoubleClick={() => handleDialogFileDownload(improvement.actionAfterId)}
                                        // disabled
                                        />
                                        <UploadButton id="actionAfterId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={'button-correction'} onClick={handleUpdateImprovement}>수정</BlueButton>
                    <WhiteButton className={'button-cancellation'} onClick={() => handleRedirect()}>취소</WhiteButton>
                </Grid>
            </Grid>
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
        </DefaultLayout>
    );
};

export default Registration;
