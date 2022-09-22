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

import { useGetWorkplaceListMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { useImprovementInsertMutation } from '../../../../../../../../hooks/api/ImprovementsManagement/ImprovementsManagement';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import moment from "moment"
import useUserInitialWorkplaceId from '../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId';
import { useStyles } from './useStyles';
import { UploadButton, WhiteButton, BlueButton } from './buttons/Unstyled';
import { UploadDialog } from '../../../../../../../../dialogs/Upload';

const Registration = () => {
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
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogAfterId, setOpenDialogAfterId] = useState(false)
    const [openDialogBeforeId, setOpenDialogBeforeId] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
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
    const [improvement, setImprovement] = useState(
        {
            "actionAfterId": actionAfterId,
            "actionBeforeId": actionBeforeId,
            "actionCn": "",
            "companyId": 1,
            "finDate": finDate,
            "improveCn": "",
            "improveId": null,
            "improveNo": "",
            "insertId": null,
            "reqDate": reqDate,
            "reqFileId": atchFileId,
            "reqUserCd": reqUserCd,
            "statusCd": "",
            "updateId": null,
            "workplaceId": parseInt(workplaceSelect)
        }
    )
    const [fileUpload] = useFileUploadMutation();
    const [fileDown] = useFileDownMutation()

    const handleDialogOpen = (event) => {
        setOpenDialog(true);
        setDialogId(event.target.id);
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        console.log(improvement)
    }

    const handleDialogFileUpload = async () => {
        let formData = new FormData();
        formData.append("files", selectedFile)
        const response = await fileUpload(formData)
        const fileId = response.data.RET_DATA[0].atchFileId
        setImprovement({ ...improvement, [dialogId]: fileId })
        setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0].originalFileName })
    }

    async function handleDialogFileDownload() {
        // TODO: Download is not good practice here. Please ask David tomorrow
        // const response = await fileDown({ atchFileId, fileSn })
        // console.log(response)
        // const url = window.URL.createObjectURL(new Blob([response]))
        // console.log(url);
        // if (dialog === "reqFile") {
        //     setReqFileLink(url)
        //     console.log(url) 
        // }
        // else if (dialog === "actionAfterId") {
        //     setActionAfterLink(url)
        //     console.log(url)
        // }
        // else if (dialog === "actionBeforeId") {
        //     setActionBeforeLink(url)
        //     console.log(url)
        // }
        // const link = document.createElement('a')
        // link.href = url
        // link.setAttribute('download', fileName)
        // document.body.appendChild(link)
        // link.click()
        // link.remove()
        // window.URL.revokeObjectURL(url)
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    const handleRedirect = () => {
        navigate("/dashboard/employee/improvement-measures/list")
    }

    const fetchComapanyWorkplace = async () => {
        const response = await getWorkplaceList({})
        setWorkplaces(response.data.RET_DATA)
    }

    const handleImprovementInsert = () => {
        improvementInsert(improvement)
            .then(res => console.log(res))
            .then(() => handleRedirect())
    }

    const [date1, setDate1] = React.useState(null),
        [date2, setDate2] = React.useState(null);

    const [locale] = React.useState('ko');
    useEffect(() => {
        fetchComapanyWorkplace()
    }, [])

    useEffect(() => {
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
                            <div className={classes.rowTitle}>사업장</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 200 }}
                                        className={classes.selectMenu}
                                        value={improvement && improvement.workplaceId}
                                        onChange={(event) => setImprovement({ ...improvement, "workplaceId": event.target.value })}
                                        displayEmpty
                                    >
                                        {workplaces?.map((workplace) => (<MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>))}
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>개선조치 NO</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        sx={{ width: 200 }}
                                        className={classes.selectMenu}
                                        onChange={(event) => setImprovement({ ...improvement, "improveNo": event.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
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
                            <div className={classes.rowTitle}>요청일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={improvement.reqDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setImprovement({ ...improvement, "reqDate": moment(date).format("YYYY-MM-DD") })
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}>요청자</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 200 }}
                                        className={classes.selectMenu}
                                        value={improvement && improvement.reqUserCd}
                                        onChange={(event) => setImprovement({ ...improvement, "reqUserCd": event.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="001">대표이사</MenuItem>
                                        <MenuItem value="002">안전책임자</MenuItem>안전책임자
                                        <MenuItem value="003">안전실무자</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={improvement.finDate}
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
                                        // placeholder="여수공장 시정조치요청 파일.hwp"
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
                                        <RadioGroup row>
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
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>조치구분</div>
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
                            <div className={classes.rowTitle}>조치내용</div>
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
                    <WhiteButton className={'button-cancellation'} onClick={() => handleRedirect()}>취소</WhiteButton>
                    <WhiteButton className={'button-list'} onClick={() => handleRedirect()}>목록</WhiteButton>
                </Grid>
            </Grid>
            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={false}
            />
        </DefaultLayout>
    );
};

export default Registration;
