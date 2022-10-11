import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DefaultLayout } from '../../../../../../../../layouts/Default';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import { useFileUploadMutation, useFileDownMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';

import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import imgPrev2 from '../../../../../../../../assets/images/prw_photo2.jpg';

import { useGetWorkplaceListMutation, useGetLoginInfoMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { useGetGenerateKeyMutation, useImprovementInsertMutation } from '../../../../../../../../hooks/api/ImprovementsManagement/ImprovementsManagement';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import moment from "moment"
import useUserInitialWorkplaceId from '../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId';
import { useStyles } from './useStyles';
import { UploadButton, WhiteButton, BlueButton } from './buttons/Unstyled';
import { OnlyUploadDialog, UploadDialog } from '../../../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../../../components/Overlay';
import Okay from '../../../../../../../../components/MessageBox/Okay';

import useUserToken from '../../../../../../../../hooks/core/UserToken/UserToken';


const Registration = () => {
    const [getUseUserToken] = useUserToken();
    const [getroleCd, setGetroleCd] = useState(getUseUserToken.getUserRoleCd());

    const classes = useStyles();
    const navigate = useNavigate()
    const getInitialWorkplaceId = useUserInitialWorkplaceId();
    const [getWorkplaceList] = useGetWorkplaceListMutation()
    const [improvementInsert] = useImprovementInsertMutation()
    const [workplaces, setWorkplaces] = useState([])
    const [workplaceSelect, setWorkplaceSelect] = useState(getInitialWorkplaceId())
    const [reqUserCd, setReqUserCd] = useState("")
    const [reqDate, setReqDate] = useState(null)
    const [finDate, setFinDate] = useState(null)
    const [completeDate, setcompleteDate] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogAfterId, setOpenDialogAfterId] = useState(false)
    const [openDialogBeforeId, setOpenDialogBeforeId] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileName, setSelectedFileName] = useState("")
    const [atchFileId, setAtchFileId] = useState(null)
    const [atchFilePath, setAtchFilePath] = useState("")
    const [atchFileSn, setAtchFileSn] = useState(null)
    const [actionAfterId, setActionAfterId] = useState(null)
    const [actionAfterPath, setActionAfterPath] = useState(null)
    const [actionAfterFileSn, setActionAfterFileSn] = useState(null)
    const [actionBeforeId, setActionBeforeId] = useState(null)
    const [actionBeforeFileSn, setActionBeforeFileSn] = useState(null)
    const [actionBeforePath, setActionBeforePath] = useState("")
    const [reqFileLink, setReqFileLink] = useState("")
    const [actionBeforeLink, setActionBeforeLink] = useState("")
    const [actionAfterLink, setActionAfterLink] = useState("")
    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "reqFileId": "",
        "actionBeforeId": "",
        "actionAfterId": ""
    })
    const [fileUpload] = useFileUploadMutation();
    const [fileDown] = useFileDownMutation()
    const [getGenerateKey] = useGetGenerateKeyMutation()
    const [generatedKey, setGeneratedKey] = useState("")

    const [improvement, setImprovement] = useState(
        {
            "actionAfterId": actionAfterId,
            "actionBeforeId": actionBeforeId,
            "actionCn": "",
            "companyId": 1,
            "finDate": finDate,
            "improveCn": "",
            "improveId": null,
            "improveNo": generatedKey,
            "insertId": null,
            "reqDate": moment(new Date()),
            "reqFileId": atchFileId,
            "reqUserCd": getroleCd,
            "statusCd": "001",
            "completeDate": completeDate,
            "updateId": null,
            "workplaceId": parseInt(workplaceSelect)
        }
    )

    const labelObject = {
        upperLabel: "첨부파일 등록",
        middleLabel: "등록할 파일을 업로드 합니다."
    }
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    const handleDialogOpen = (event) => {
        setOpenDialog(true);
        setDialogId(event.target.id);
        setSelectedFileName("");
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
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
                setImprovement({ ...improvement, [dialogId]: fileId })
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

    const handleRedirect = () => {
        navigate("/dashboard/employee/improvement-measures/list")
    }

    const fetchComapanyWorkplace = async () => {
        const response = await getWorkplaceList({})
        setWorkplaces(response.data.RET_DATA)
    }

    const handleImprovementInsert = async () => {
           
        if (improvement.improveCn.length <= 0) {
            setOkayPopupMessage("필수항목 '개선.조치 내용'을 입력하세요.");
            setOkayPopupShow(true);
            return false;
        }
        if (improvement.reqDate.length <= 0) {
            setOkayPopupMessage("필수항목 '요청일자'를 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (improvement.reqUserCd.length <= 0) {
            setOkayPopupMessage("필수항목 '요청자'를 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (improvement.finDate === null) {
            setOkayPopupMessage("필수항목 '완료요청일'을 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }

        const response = await improvementInsert(improvement);
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("사용자를 찾을수 없거나 입력정보에 오류가 있습니다 ");
            setOkayPopupShow(true);
        }
    }

    const getGeneratedKey = async () => {
        const response = await getGenerateKey()
        setGeneratedKey(response?.data?.RET_DATA?.improveKey)
        setImprovement({ ...improvement, "improveNo": response?.data?.RET_DATA?.improveKey })
    }

    const DateChange = name => (date) => {
        if(name === 'finDate') {
            setImprovement({ ...improvement, "finDate": date});
        } else if(name === 'completeDate') {
            setImprovement({ ...improvement, "completeDate": date});
        } else if(name === 'reqDate') {
            setImprovement({ ...improvement, "reqDate": date});
        }
    };

    const [locale] = React.useState('ko');
    useEffect(() => {
        fetchComapanyWorkplace()
        getGeneratedKey()
    }, [])

    useEffect(() => {
        //console.log(improvement)
    }, [filePath.reqFileId, filePath.actionBeforeId, filePath.actionAfterId])

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
                                { /* === Data: 2022.10.03 author:Jimmy edit: 실무자일 경우 본인 속한 사업장만 표시 value === */}
                                <div className={classes.rowInfo}>
                                    {
                                        reqUserCd === "003"
                                            ?
                                            <Select
                                                sx={{ width: 200 }}
                                                className={classes.selectMenu}
                                                value={improvement.workplaceId}
                                                onChange={(event) => setImprovement({ ...improvement, "workplaceId": event.target.value })}
                                                displayEmpty
                                            >
                                                <MenuItem value={improvement.workplaceId}>{improvement.workplaceName}</MenuItem>
                                            </Select>
                                            :
                                            <Select
                                                sx={{ width: 200 }}
                                                className={classes.selectMenu}
                                                value={improvement.workplaceId}
                                                onChange={(event) => setImprovement({ ...improvement, "workplaceId": event.target.value })}
                                                displayEmpty
                                            >
                                                {workplaces?.map((workplace) => (<MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>))}
                                            </Select>
                                    }
                                </div>
                                <div className={classes.rowTitle}><text>*</text>개선조치 NO</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        sx={{ width: 200 }}
                                        value={generatedKey ?? ""}
                                        className={classes.selectMenu}
                                    // onChange={(event) => setImprovement({ ...improvement, "improveNo": event.target.value })}
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
                                        { /* === Data: 2022.10.03 author:Jimmy edit: value === */}
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={improvement?.reqDate}
                                            isClearable
                                            onChange={DateChange('reqDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setImprovement({ ...improvement, "reqDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>요청자</div>
                                <div className={classes.rowInfo}>
                                    { /* === Data: 2022.10.03 author:Jimmy edit: value === */}
                                    <Select
                                        sx={{ width: 200 }}
                                        className={classes.selectMenu}
                                        value={improvement.reqUserCd}
                                        key={improvement.reqUserCd}
                                        //onChange={(event) => setImprovement({ ...improvement, "reqUserCd": event.target.value })}
                                        displayEmpty
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
                                            value={improvement.finDate}
                                            isClearable
                                            onChange={DateChange('finDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setImprovement({ ...improvement, "finDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}>첨부파일</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={filePath.reqFileId ?? ""}
                                        sx={{ width: 390 }}
                                        className={classes.selectMenu}
                                        disabled
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
                                    <FormControl className={classes.searchRadio} onChange={(event) => setImprovement({ ...improvement, "statusCd": event.target.value })}>
                                        <RadioGroup row defaultValue="001">
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
                                            isClearable
                                            onChange={DateChange('completeDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setImprovement({ ...improvement, "completeDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
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
                                            value={filePath.actionBeforeId ?? ""}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton id="actionBeforeId" onClick={handleDialogOpen}>찾아보기</UploadButton>
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
                                            value={filePath.actionAfterId ?? ""}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton id="actionAfterId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                        {/* <div className={classes.imgPreview}>
                                            <img src={imgPrev2} alt="preview image" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={'button-registration'} onClick={handleImprovementInsert}>등록</BlueButton>
                    <WhiteButton className={'button-list'} onClick={() => handleRedirect()}>목록</WhiteButton>
                </Grid>
            </Grid >
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
        </DefaultLayout >
    );
};

export default Registration;
