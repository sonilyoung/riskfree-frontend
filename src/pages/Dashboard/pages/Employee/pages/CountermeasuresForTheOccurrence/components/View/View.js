import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStyles, AccidentReportButton, BlueButton, WhiteButton } from './useStyles';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { selectIsClose } from '../../../../../../../../slices/selections/MainSelection';
import { useSelector } from 'react-redux';
import { useAccidentViewMutation, useAccidentDeleteMutation } from '../../../../../../../../hooks/api/AccidentManagement/AccidentManagement';
import { useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { Overlay } from '../../../../../../../../components/Overlay';
import YesNo from '../../../../../../../../components/MessageBox/YesNo';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const View = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const { id } = useParams()
    const [accidentView] = useAccidentViewMutation()
    const [accidentDelete] = useAccidentDeleteMutation()
    const [accident, setAccident] = useState({});
    const [getFileInfo] = useGetFileInfoMutation()
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("삭제 하시겠습니까?");
    const [filePathBefore, setFilePathBefore] = useState("")
    const [filePathAfter, setFilePathAfter] = useState("");
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    const currentIsClose = useSelector(selectIsClose);

    const handleRedirect = () => {
        navigate("/dashboard/employee/accident-countermeasures-implementation/list")
    }

    const fetchAccidentView = async () => {
        const response = await accidentView(id)
        setAccident(response.data.RET_DATA)
        if (response.data.RET_DATA.performBeforeId) {
            const responseFileInfoBefore = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.performBeforeId), fileSn: 1 })
            setFilePathBefore(responseFileInfoBefore.data.RET_DATA.filePath + "/" + responseFileInfoBefore.data.RET_DATA.saveFileName)
        }
        if (response.data.RET_DATA.performAfterId) {
            const responseFileInfoAfter = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.performAfterId), fileSn: 1 })
            setFilePathAfter(responseFileInfoAfter.data.RET_DATA.filePath + "/" + responseFileInfoAfter.data.RET_DATA.saveFileName)
        }
        // if (response.data.RET_DATA.reqFileId) {
        //     const responseFileInfoExel = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.reqFileId), fileSn: 1 })
        //     setFileNameExel(responseFileInfoExel.data.RET_DATA.originalFileName)
        // }
    }

    async function handleDialogFileDownload(id) {
        if (id) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${id}&fileSn=1`;
        }
    }

    const handleDelete = async () => {
        const response = await accidentDelete(id)
        setYesNoPopupShow(false);
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("삭제 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("삭제에 실패하였습니다.");
            setOkayPopupShow(true);
        }
    }
    useEffect(() => {
        fetchAccidentView()
    }, [])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
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
                                <div className={classes.rowInfo}>{accident && accident.recvDate}</div>
                                <div className={classes.rowTitle}>접수자</div>
                                <div className={classes.rowInfo}>{accident && accident.recvUserName}</div>
                                <div className={classes.rowTitle}>접수형태</div>
                                <div className={classes.rowInfo}>{accident && accident.recvForm}</div>
                                <div className={classes.rowTitle}>접수유형</div>
                                <div className={classes.rowInfo}>
                                    {accident && Object.keys(accident).map(recvType => {
                                        if (recvType.includes("recvType0") && accident[recvType] != undefined) {
                                            return accident[recvType]
                                        }
                                    }).filter(e => !!e).join(", ")}
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
                                    {accident && accident.accdntCn}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxRegistration}>
                    <div className={classes.boxTitle}>사고처리</div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {accident && accident.occurDate}
                                </div>
                                <div className={classes.rowTitle}>사고유형</div>
                                <div className={classes.rowInfo}>
                                    {accident && Object.keys(accident).map(accType => {
                                        if (accType.includes("accType0") && accident[accType] != undefined) {
                                            return accident[accType]
                                        }
                                    }).filter(e => !!e).join(", ")}
                                </div>
                                <div className={classes.rowTitle}>사고등급</div>
                                <div className={classes.rowInfo}>
                                    {accident && accident.accLevel}
                                </div>
                                <div className={classes.rowTitle}>발생장소</div>
                                <div className={classes.rowInfo}>
                                    {accident && accident.occurPlace}
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>현장책임자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {/* <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value="홍길동"
                                        sx={{ width: 140 }}
                                        className={classes.selectMenu}
                                    /> */}
                                    <div style={{ width: 140 }}>{accident && accident.managerName}</div>
                                </div>
                                <div className={classes.rowTitle}>사고구분</div>
                                <div className={classes.rowInfo}>
                                    {/* <Select
                                        sx={{ width: 100 }}
                                        className={classes.selectMenu}
                                        // value={num}
                                        // onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">자사</MenuItem>
                                    </Select> */}
                                    <div style={{ width: 140 }}>{accident && accident.accidentType}</div>
                                </div>
                                <div className={classes.rowTitle}>사고분류</div>
                                <div className={classes.rowInfo}>
                                    사망&nbsp;
                                    {/* <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value=""
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    /> */}
                                    {accident && accident.deathToll}
                                    명&ensp;&ensp;
                                    동일사고유형&nbsp;
                                    {/* <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value=""
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    /> */}
                                    {accident && accident.jobDeseaseToll}
                                    명&ensp;&ensp;
                                    직업성질환&nbsp;
                                    {/* <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value=""
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    /> */}
                                    {accident && accident.sameAccidentInjury}
                                    명
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생원인</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {accident && accident.occurReason}
                                </div>
                                <div className={classes.rowInfo}>
                                    <AccidentReportButton sx={{ marginRight: '10px' }} className={accident.initReportId && classes.activeReportBtn} onDoubleClick={() => handleDialogFileDownload(accident.initReportId)}>초기사고 보고서</AccidentReportButton>
                                    <AccidentReportButton className={accident.finalReportId && classes.activeReportBtn} onDoubleClick={() => handleDialogFileDownload(accident.finalReportId)}>최종사고 보고서</AccidentReportButton>
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
                                    {accident && accident.preventCn}
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>이행실적</div>
                            <div className={classes.rowContent}>
                                <div>
                                    <div>조치 전</div>
                                    <div>
                                        <div className={classes.imgPreview}>
                                            {filePathBefore && <img height={350} src={`http://tbs-a.thebridgesoft.com:8102/riskfree-backend/file/getImg?imgPath=${filePathBefore}`} alt="beforeImg" />}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>조치 후</div>
                                    <div>
                                        <div className={classes.imgPreview}>
                                            {filePathAfter && <img height={350} src={`http://tbs-a.thebridgesoft.com:8102/riskfree-backend/file/getImg?imgPath=${filePathAfter}`} alt="AfterImg" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    {currentIsClose === "1" ?
                        <>
                        <BlueButton className={'button-correction'}>수정</BlueButton>
                        <WhiteButton className={'button-delete'}>삭제</WhiteButton>
                        </>
                    :
                        <>
                        <BlueButton className={'button-correction'} onClick={() => navigate(`/dashboard/employee/accident-countermeasures-implementation/update/${accident.accidentId}`)}>수정</BlueButton>
                        <WhiteButton className={'button-delete'} onClick={() => setYesNoPopupShow(true)}>삭제</WhiteButton>
                        </>
                    }
                        <WhiteButton className={'button-list'} onClick={() => handleRedirect()}>목록</WhiteButton>
                </Grid>
            </Grid>
            <Overlay show={yesNoPopupShow}>
                <YesNo
                    show={yesNoPopupShow}
                    message={yesNoPopupMessage}
                    onConfirmYes={handleDelete}
                    onConfirmNo={() => setYesNoPopupShow(false)}
                />
            </Overlay>
            <Overlay show={okayPopupShow}>
                <Okay
                    show={okayPopupShow}
                    message={okayPopupMessage}
                    title={okayPopupTitle}
                    onConfirm={() => {handleRedirect()}} />
            </Overlay>
        </DefaultLayout >
    )
}

export default View
