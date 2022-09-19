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
import { UploadDialog }  from '../../../../../../../../dialogs/Upload';

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
    const [improvement, setImprovement] = useState(
        {
            "actionAfterId": null,
            "actionBeforeId": null,
            "actionCn": "",
            "companyId": 1,
            "finDate": finDate,
            "improveCn": "",
            "improveId": null,
            "improveNo": "",
            "insertId": null,
            "reqDate": reqDate,
            "reqFileId": 1,
            "reqUserCd": reqUserCd,
            "statusCd": "",
            "updateId": null,
            "workplaceId": workplaceSelect
        }
    )

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogFileUpload = () => {
        console.log('I am doping upload');
    }

    const handleDialogInputChange = () => {
        console.log('I am doping input change');
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
                                            value={reqDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setReqDate(moment(date).format("YYYY-MM-DD"))
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
                                        <MenuItem value="002">대표이사</MenuItem>
                                        <MenuItem value="003">안전책임자</MenuItem>안전책임자
                                        <MenuItem value="004">안전실무자</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={finDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setFinDate(moment(date).format("YYYY-MM-DD"))
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
                                        placeholder="여수공장 시정조치요청 파일.hwp"
                                        value="이미지를 등록하세요 (gif, jpg, png 파일허용)"
                                        sx={{ width: 390 }}
                                        className={classes.selectMenu}
                                        disabled
                                    />
                                    <UploadButton onClick={e => setOpenDialog(true)}>찾아보기</UploadButton>
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
                                            value="이미지를 등록하세요 (gif, jpg, png 파일허용)"
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton onClick={e => setOpenDialog(true)}>찾아보기</UploadButton>
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
                                            value="이미지를 등록하세요 (gif, jpg, png 파일허용)"
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton onClick={e => setOpenDialog(true)}>찾아보기</UploadButton>
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
            />
        </DefaultLayout>
    );
};

export default Registration;
