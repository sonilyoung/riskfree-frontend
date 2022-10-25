import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { useStyles, ClosePopupButton2, UnknownButton1, BlueButton, WhiteButton } from './useStyles';
import iconTab from '../../../../../../assets/images/ic_tab.png';
import iconTabOn from '../../../../../../assets/images/ic_tab_on.png';
import DefaultLayout from '../../../../../../layouts/Default/Default';
import { useGetRelatedRawButtonMutation, useGetRelatedRawMutation, useInsertDutyButtonMutation, useUpdateRelatedRawMutation, useDeleteDutyButtonMutation } from '../../../../../../hooks/api/RelatedLawManagement/RelatedLawManagement';
import { useGetLoginInfoMutation } from "../../../../../../hooks/api/MainManagement/MainManagement";
import { selectBaselineId, selectIsClose } from '../../../../../../slices/selections/MainSelection';
import { useSelector } from 'react-redux';
import { UploadEmployeeDialog } from '../../../../../../dialogs/Upload';
import { useRelatedRawExcelUploadMutation } from '../../../../../../hooks/api/ExcelController/ExcelController';
import Okay from '../../../../../../components/MessageBox/Okay';
import { Overlay } from '../../../../../../components/Overlay';
import YesNo from '../../../../../../components/MessageBox/YesNo';
import Loading from '../../../../../../pages/Loading';
import * as Cookie from '../../../../../../pages/Cookie';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeasureToManageThePerformance = () => {
    const classes = useStyles();
    const [loginInfos, setLoginInfos] = useState({});
    const [getLoginInfo] = useGetLoginInfoMutation();
    const [relatedRawList, setRelatedRawList] = useState([]);
    const [relatedRawButtonList, setRelatedRawButtonList] = useState([]);
    const [updateList, setUpdateList] = useState([]);
    const [lawName, setLawName] = useState("");
    const [lawId, setLawId] = useState("0");
    const [popupPlusButton, setPopupPlusButton] = useState(false);
    const [page, setPage] = useState(1);
    const [toggleList, setToggleList] = useState('one');
    const [selectedFileName, setSelectedFileName] = useState("")
    const [files, setFiles] = useState({
        "safetyFileUpload": "",
        "logoImgUpload": "",
        "documentFileUpload": ""
    })

    const [dialogId, setDialogId] = useState("")
    const [attachId, setAttachId] = useState("")
    const [filePath, setFilePath] = useState({
        "performBeforeId": "",
        "performAfterId": ""
    })

    const labelObject = {
        upperLabel: "법령데이터 관리",
        middleLabel: "등록된 데이터를 엑셀로 다운로드 합니다."
    }

    //로딩바추가
    const [loading, setLoading] = useState(true);    
    const [selectedFile, setSelectedFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false)
    const [uploadFlag, setUploadFlag] = useState(false);
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [seccerrCode, setseccerrCode] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [getRelatedRaw] = useGetRelatedRawMutation();
    const [insertDutyButton] = useInsertDutyButtonMutation();           // 법령버튼 생성
    const [getRelatedRawButton] = useGetRelatedRawButtonMutation();
    const [updateRelatedRaw] = useUpdateRelatedRawMutation();
    const [subscribersDeleteButton] = useDeleteDutyButtonMutation();    // 법령버튼 삭제(내용포함)
    const [relatedRawExcelUpload] = useRelatedRawExcelUploadMutation()
    const currentBaseline = useSelector(selectBaselineId);
    const currentIsClose = useSelector(selectIsClose);

    const handleDialogFileUpload = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("excelFile", selectedFile)
        const lawButtonId = { lawButtonId: dialogId }
        formData.append('lawButtonId', new Blob([JSON.stringify(lawButtonId)], { type: 'application/json' }))
        const response = await relatedRawExcelUpload(formData)
        setLoading(false);
        handleDialogClose();
        setOkayPopupMessage("등록 되었습니다.");
        setOkayPopupShow(true);
        setseccerrCode(response.data.RET_CODE);
        setUploadFlag(!uploadFlag);
        setLawId(lawButtonId.lawButtonId);
    }

    const handleDialogOpen = (id, attachId) => {
        console.log("파일아이디", attachId);
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(id);
        setAttachId(attachId);
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }
    
    //페이지 이동
    const handlePageChange = (pagelawId) => (event) => {
        setPage(parseInt(event.target.innerText))
    }

    const fetchRelatedRawList = async (ClicklawId) => {
        setLawId(ClicklawId);
        if(ClicklawId !== lawId) {
            setPage(parseInt(1))
        }
        const response = await getRelatedRaw({
            "lawId": ClicklawId,
            "baselineId": currentBaseline,
            "countPerPage": 10,
            "pageNum": page
        });
        
        setRelatedRawList(response.data.RET_DATA);
        const currentUpdateList = response.data?.RET_DATA?.map(relatedRawItem => {
            return {
                "dutyImproveId": relatedRawItem.dutyImproveId,
                "acctionCn": relatedRawItem.acctionCn
            }
        });
        setUpdateList(currentUpdateList);
    }

    const fetchRelatedRawButtonList = async () => {
        const response = await getRelatedRawButton({});
        setRelatedRawButtonList(response.data.RET_DATA);
        if((lawId === "") || (lawId === null) || (lawId === "0")) {
            setLawId(response.data.RET_DATA[0].lawButtonId);
            fetchRelatedRawList(response.data.RET_DATA[0].lawButtonId);
        } else {
            setLawId(lawId);
            fetchRelatedRawList(lawId);
        }
    }

    const fetchInsertDutyButton = async () => {
        if(lawName === ""){
            setOkayPopupMessage("법령명을 입력해주세요.");
            setOkayPopupShow(true);
        } else {
            await insertDutyButton({
                "lawName": lawName
            });
            setPopupPlusButton(false);
            fetchRelatedRawButtonList(lawId);
            setLawName('');
        }
    }

    const handleUpdateRelatedRawList = async () => {
        setLoading(true);
        const response = await updateRelatedRaw({ "updateList": updateList });
        setLoading(false);
        if ((response?.data?.RET_CODE === "0000") ||(response?.data?.RET_CODE === "0201")) {
            setseccerrCode(response?.data?.RET_CODE);
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
            fetchRelatedRawList(lawId)
        } else {
            setseccerrCode(response?.data?.RET_CODE);
            setOkayPopupMessage("입력정보에 오류가 있습니다 ");
            setOkayPopupShow(true);
        }
    }

    // 관계법령 삭제
    const handleSubscribersDelete = async () => {
        const response = await subscribersDeleteButton({
            "lawButtonId" : parseInt(lawId),
            "companyId" : parseInt(loginInfos.companyId),
            "workplaceId" : parseInt(loginInfos.workplaceId),
            "baselineId" : parseInt(currentBaseline)
        })
        setYesNoPopupShow(false);
        if (response?.data?.RET_CODE === "0434") {
            setOkayPopupMessage("관계법령을 삭제 하였습니다.");
            setOkayPopupShow(true);
            fetchRelatedRawButtonList();
        } else {
            setOkayPopupMessage("삭제에 실패하였습니다.");
            setOkayPopupShow(true);
        }
    }

    async function handleDialogFileDownload() {
        setLoading(true);
        window.location = `${BASE_URL}common/excel/relatedRawExcel?workplaceId=${loginInfos.workplaceId}&baselineId=${currentBaseline}&companyId=${loginInfos.companyId}`;
        const FILEDOWNLOAD_INTERVAL = setInterval(function() {
            var donToken = Cookie.getCookie('fileDownloadToken');
            if (donToken === 'Y') { 
                clearInterval(FILEDOWNLOAD_INTERVAL);
                setLoading(false);
                Cookie.setCookie('fileDownloadToken', "N", 1);                
                setOkayPopupShow(true); 
                setOkayPopupMessage('파일다운로드가 완료되었습니다.');
            }
        }, 500);  
    }

    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfos(response.data.RET_DATA)
    }

    useEffect(() => {
    }, [uploadFlag])

    useEffect(() => {
        fetchLoginInfo();
        setLoading(true);
        fetchRelatedRawButtonList();
        setLoading(false);
    }, [page]);

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        관계법령에 의무이행의 관리상의 조치
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.headerButtons}>
                    {!!relatedRawButtonList && relatedRawButtonList.length > 0 && relatedRawButtonList.map(relatedRawButtonItem =>
                     currentIsClose === "1" ? 
                        (<Link to="#" className={lawId === relatedRawButtonItem.lawButtonId ? classes.buttonLinkactive : classes.buttonLink} onClick={() => fetchRelatedRawList(relatedRawButtonItem.lawButtonId)}>
                        <span>{relatedRawButtonItem?.lawName}</span>
                        </Link>)
                    :
                        (<Link to="#" className={lawId === relatedRawButtonItem.lawButtonId ? classes.buttonLinkactive : classes.buttonLink} onClick={() => fetchRelatedRawList(relatedRawButtonItem.lawButtonId)} onDoubleClick={() => handleDialogOpen(relatedRawButtonItem.lawButtonId, relatedRawButtonItem.attachId)}>
                        <span>{relatedRawButtonItem?.lawName}</span>
                        </Link>)
                    )}
                    { currentIsClose === "1" ? 
                        <>
                        <button className={classes.buttonPlus}>+</button>
                        <button className={classes.buttonPlus}>-</button>
                        </>
                    :
                        <>
                        <button className={classes.buttonPlus} onClick={() => setPopupPlusButton(true)}>+</button>
                        <button className={classes.buttonPlus} onClick={() => setYesNoPopupShow(true)}>-</button>
                        </>
                    }
                </Grid>
                <Grid className={classes.pageBody} item xs={10.7} >
                    <div className={popupPlusButton ? classes.uploadPlusPopup : classes.uploadPopupHide}>
                        <ClosePopupButton2 onClick={() => setPopupPlusButton(false)}></ClosePopupButton2>
                        <h3>법령명생성</h3>
                        <div className={classes.uploadSearch}>
                            <TextField
                                id="standard-basic"
                                value={lawName}
                                variant="outlined"
                                sx={{ width: 250 }}
                                className={classes.popupTextField}
                                onChange={(event) => setLawName(event.target.value)}
                            />
                            <UnknownButton1 onClick={() => fetchInsertDutyButton()}>확인</UnknownButton1>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.stepBox}>
                    <Stepper sx={{ mb: 4, mt: 4 }} nonLinear activeStep={0} className={classes.activeStep}>
                        <Step >
                            <StepLabel
                                icon={<img src={toggleList === 'one' ? iconTabOn : iconTab} alt={toggleList === 'one' ? "inactive step" : "active step"} />}
                            >
                                <Link className={toggleList === 'one' ? classes.activeLinkBtn : classes.linkBtn} to="#" onClick={() => setToggleList('one')} >표준상태보기</Link>
                            </StepLabel>
                        </Step>
                        <Step >
                            <StepLabel
                                icon={<img src={toggleList === 'two' ? iconTabOn : iconTab} alt={toggleList === 'two' ? "active step" : "inactive step"} />}
                            >
                                <Link className={toggleList === 'two' ? classes.activeLinkBtn : classes.linkBtn} to="#" onClick={() => setToggleList('two')}>처벌 및 과태료보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={toggleList === 'three' ? iconTabOn : iconTab} alt={toggleList === 'three' ? "active step" : "inactive step"} />}
                            >
                                <Link className={toggleList === 'three' ? classes.activeLinkBtn : classes.linkBtn} to="#" onClick={() => setToggleList('three')} >관리상의 조치내역 보기/등록</Link>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={toggleList === "one" ? classes.tableHead : toggleList === "two" ? classes.tableHeadTwo : classes.tableHeadThree}>
                        <div className={classes.tableRow}>
                            <div className={toggleList === "one" ? classes.tableDataOne : toggleList === "two" ? classes.tableDataTwo : classes.tableDataThree}>
                                <div>중대재해처벌법</div>
                                <div>
                                    <span>관련법령</span>
                                    <span>항목</span>
                                </div>
                            </div>
                            {toggleList === 'one'
                                ? <><div className={classes.tableDataOne}>중대재해처벌법 <br />시행령</div>
                                    <div className={classes.tableDataOne}>위반법조항</div>
                                    <div className={classes.tableDataOne}>위반행위</div>
                                    <div className={classes.tableDataOne}>세부내용 -1</div>
                                    <div className={classes.tableDataOne}>세부내용 -2</div>
                                    <div className={classes.tableDataOne}>근거법조문</div>
                                </>
                                : toggleList === 'two'
                                    ? <>
                                        <div className={classes.tableDataTwo}>중대재해처벌법 <br />시행령</div>
                                        <div className={classes.tableDataTwo}>위반법조항</div>
                                        <div className={classes.tableDataTwo}>위반행위</div>
                                        <div className={classes.tableDataTwo}>세부내용 -1</div>
                                        <div className={classes.tableDataTwo}>
                                            <div>처벌사항 및 과태료 금액 (만원)</div>
                                            <div>
                                                <span>1차 위반</span>
                                                <span>2차 위반</span>
                                                <span>3차 위반</span>
                                            </div>
                                        </div>
                                    </>
                                    : <>
                                        <div className={classes.tableDataThree}>중대재해처벌법 <br />시행령</div>
                                        <div className={classes.tableDataThree}>위반법조항</div>
                                        <div className={classes.tableDataThree}>위반행위</div>
                                        <div className={classes.tableDataThree}>세부내용 -1</div>
                                        <div className={classes.tableDataThree}>관리상의 조치 내역</div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {!!relatedRawList && relatedRawList?.length > 0 && relatedRawList.map((relatedRawItem, index) =>
                        (<div className={classes.tableRow}>
                            {toggleList === 'one'
                                ? <><div className={classes.tableDataOne}>{relatedRawItem.relatedArticle}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.articleItem}<span></span></div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violatedArticle}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violatedActivity}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violationDetail1}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violationDetail2}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.baseArticle}</div>
                                </>
                                : toggleList === 'two'
                                    ? <>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.relatedArticle}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.articleItem}<span></span></div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.violatedArticle}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.violatedActivity}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.violationDetail1}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.stPenalty1}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.stPenalty2}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.stPenalty3}</div>
                                    </>
                                    : <>
                                        <div className={classes.tableDataThree}>{relatedRawItem.relatedArticle}</div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.articleItem}<span></span></div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.violatedArticle}</div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.violatedActivity}</div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.violationDetail1}</div>
                                        <div className={classes.tableDataThree}>
                                            <div className={classes.textAreaWrap}>
                                                <TextField
                                                    className={classes.textArea}
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={3}
                                                    value={updateList[index]?.acctionCn === null ? "" : updateList[index]?.acctionCn}
                                                    onChange={(event) => {
                                                        const changedUpdateList = updateList.map((updateItem, i) => i === index ? { ...updateItem, "acctionCn": event.target.value } : updateItem);
                                                        setUpdateList(changedUpdateList);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>}
                        </div>))}
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>{relatedRawList?.length > 0 && relatedRawList[0]?.totalCount}</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={relatedRawList?.length && Math.ceil(relatedRawList[0]?.totalCount / 10)} boundaryCount={3} shape="rounded" page={page} onChange={handlePageChange(lawId)} showFirstButton showLastButton />
                    </Stack>
                </Grid>
                {toggleList === "three"
                    && <Grid item xs={12} className={classes.footerButtons}>
                        <BlueButton className={'button-registration'} onClick={() => handleUpdateRelatedRawList()}>등록</BlueButton>
                        <WhiteButton className={'button-cancelation'} >취소</WhiteButton>
                    </Grid>}
            </Grid>
            <UploadEmployeeDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                label={labelObject}
                selectedFileName={selectedFileName}
            />
            <Overlay show={okayPopupShow}>
                <Okay
                    show={okayPopupShow}
                    message={okayPopupMessage}
                    title={okayPopupTitle}
                    onConfirm={() => {
                        if (seccerrCode === "0201" || seccerrCode === "0000") {
                            setOkayPopupShow(false);
                            setseccerrCode("");
                            fetchRelatedRawList(lawId);
                        } else {
                            setOkayPopupShow(false);
                        }
                    }}
                    />
            </Overlay>
            
            {/* 관계법령 삭제 */}
            <Overlay show={yesNoPopupShow}>
                <YesNo
                    show={yesNoPopupShow}
                    message="선택한 해당 관계법령을 삭제 하시겠습니까?"
                    onConfirmYes={handleSubscribersDelete}
                    onConfirmNo={() => setYesNoPopupShow(false)}
                />
            </Overlay>

            {loading && <Loading/>}
        </DefaultLayout >
    );
};

export default MeasureToManageThePerformance;
