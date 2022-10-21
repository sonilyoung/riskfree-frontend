import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStyles, BlueButton, WhiteButton } from './useStyles';
import { useSelector } from 'react-redux';
import { selectIsClose } from '../../../../../../../../slices/selections/MainSelection';
import { useLawViewMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { useLawDeleteMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { DefaultLayout } from "../../../../../../../../layouts/Default";
import { useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { Overlay } from '../../../../../../../../components/Overlay';
import YesNo from '../../../../../../../../components/MessageBox/YesNo';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const View = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [lawView] = useLawViewMutation();
    const [lawDelete] = useLawDeleteMutation();
    const { id } = useParams()
    const [law, setLaw] = useState({})
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("삭제 하시겠습니까?");
    const [filePathBefore, setFilePathBefore] = useState("")
    const [filePathAfter, setFilePathAfter] = useState("")
    const [getFileInfo] = useGetFileInfoMutation();
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const currentIsClose = useSelector(selectIsClose);
    const handleRedirect = () => {
        navigate(
            "/dashboard/employee/order-for-improvement-and-correction-under-related-law/list"
        );
    };

    const handleLawView = async () => {
        const response = await lawView(id)
        setLaw(response.data.RET_DATA)
        if (response.data.RET_DATA.performBeforeId) {
            const responseFileInfoBefore = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.performBeforeId), fileSn: 1 })
            setFilePathBefore(responseFileInfoBefore.data.RET_DATA.filePath + "/" + responseFileInfoBefore.data.RET_DATA.saveFileName)
        }
        if (response.data.RET_DATA.performAfterId) {
            const responseFileInfoAfter = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.performAfterId), fileSn: 1 })
            setFilePathAfter(responseFileInfoAfter.data.RET_DATA.filePath + "/" + responseFileInfoAfter.data.RET_DATA.saveFileName)
        }
    };

    const handleLawDelete = async () => {
        const response = await lawDelete(id);
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
        handleLawView()
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
                        관계법령에 따른 개선.시정 명령에 따른 조치 현황
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxReception}>
                    <div className={classes.boxTitle}>
                        <span>개선.조치</span>
                        <span>접수</span>
                    </div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>접수일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>{law?.recvDate}</div>
                                <div className={classes.rowTitle}>접수자</div>
                                <div className={classes.rowInfo}>{law.recvUserName}</div>
                                <div className={classes.rowTitle}>접수형태</div>
                                <div className={classes.rowInfo}>
                                    {law && law.recvName}
                                </div>
                                <div className={classes.rowTitle}>명령구분</div>
                                <div className={classes.rowInfo}>
                                    {law && Object.keys(law).map(cmmdOrg => {
                                        if (cmmdOrg.includes("cmmdOrgName0") && law[cmmdOrg] != undefined) {
                                            return law[cmmdOrg]
                                        }
                                    }).filter(e => !!e).join(", ")}
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
                                <span>개선.조치 </span>
                                <span>지적내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {law && law.improveCn}
                                </div>
                                <div className={classes.rowTitle}>구분</div>
                                <div className={classes.rowInfo}>
                                    {law && law.improveType}
                                </div>
                                <div className={classes.rowTitle}>지적일자</div>
                                <div className={classes.rowInfo}>
                                    {law && law.orderDate}
                                </div>
                                <div className={classes.rowTitle}>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    {law && law.dueDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
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
                                    {law && law.issueReason}
                                </div>
                            </div>
                            <div className={classes.rowTitle}>완료일</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {law && law.completeDate}
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
                                    {law && law.preventCn}
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
                    <BlueButton className={"button-correction"}>수정</BlueButton>
                    <WhiteButton className={"button-delete"}>삭제</WhiteButton>
                    </>
                :
                    <>
                    <BlueButton className={"button-correction"} onClick={() => navigate(`/dashboard/employee/order-for-improvement-and-correction-under-related-law/update/${law.lawImproveId}`)}>수정</BlueButton>
                    <WhiteButton className={"button-delete"} onClick={() => setYesNoPopupShow(true)}>삭제</WhiteButton>
                    </>
                }
                    <WhiteButton className={"button-list"} onClick={() => handleRedirect()} >목록</WhiteButton>
                </Grid>
            </Grid>
            <Overlay show={yesNoPopupShow}>
                <YesNo
                    show={yesNoPopupShow}
                    message={yesNoPopupMessage}
                    onConfirmYes={handleLawDelete}
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
        </DefaultLayout>
    );
};

export default View;