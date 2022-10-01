import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';

import { DefaultLayout } from '../../../../../../../../layouts/Default';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';

import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import noImg from '../../../../../../../../assets/images/ic_no_image.png';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useAccidentViewMutation, useAccidentDeleteMutation } from '../../../../../../../../hooks/api/AccidentManagement/AccidentManagement';
import { useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { Overlay } from '../../../../../../../../components/Overlay';
import YesNo from '../../../../../../../../components/MessageBox/YesNo';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const useStyles = makeStyles(() => ({
    pageWrap: {
        '& >div:not($listTitle, $footerButtons)': {
            display: 'flex',
            borderRadius: '6px',
            background: '#fff',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgb(189 203 203 / 50%)'
        }
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
    },
    boxReception: {
        display: 'flex',
        marginBottom: '16px !important',
        height: '160px',
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '160px',
        },
        '& $boxRow:first-of-type $rowInfo': {
            width: '306px'
        },
        '& $boxRow:first-of-type $rowInfo:last-of-type': {
            width: 'auto'
        },
        '& $boxRow:last-of-type $rowInfo': {
            width: '100%',
        },
    },
    boxTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100px',
        background: '#8098c9',
        borderRight: '1px solid #fff',
        color: '#fff',
        fontSize: '17px',
        fontWeight: '500',
        '& span': {
            width: '100%',
            textAlign: 'center'
        }
    },
    boxContent: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'calc(100% - 100px)',
        '& $boxRow:first-of-type': {
            height: '60px',
            '& $rowContent': {
                borderTop: 'none'
            },
            '& $rowTitle': {
                borderTop: 'none'
            }
        },
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        minHeight: '60px',
        '& $rowTitle': {
            borderBottom: 'none'
        }
    },
    promptPopup: {
        position: 'absolute',
        top: '70%',
        left: '70%',
        width: '300px',
        height: '200px',
        borderRadius: '18px',
        border: '2px solid #018de7',
        background: 'white',
        color: '#333',
        overflow: 'hidden',
        zIndex: '6',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            '&:first-of-type': {
                fontSize: '20px',
                fontWeight: 'bold',
                paddingTop: '10px',
            },
            '&:last-of-type': {
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                '& button': {
                    width: '50%',
                    height: '100%',
                    border: 'none',
                    background: '#eeeff7',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: '.2s',
                    '&:last-of-type': {
                        borderLeft: '1px solid #fff',
                        background: '#018de7',
                        color: '#fff',
                        '&:hover': {
                            background: '#0355b0',
                            color: '#fff'
                        }
                    },
                    '&:hover': {
                        background: '#bdcbe9',
                        color: '#333',
                    }
                }
            },
        }
    },
    promptPopupClose: {
        display: 'none',
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9',
        borderTop: '1px solid #fff',
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }
    },
    rowContent: {
        height: '100%',
        width: 'calc(100% - 100px)',
        borderTop: '1px solid #d5dae2',
        display: 'flex',
        '& >div[class=*row]': {
            height: '100%'
        },
    },
    rowInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        boxSizing: 'border-box',
    },
    boxRegistration: {
        '& $boxRow': {
            height: '100px',
            '&:nth-of-type(2)': {
                height: '60px'
            },
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '160px',
        },
        '& $boxRow:first-of-type $rowInfo': {
            width: '306px'
        },
        '& $boxRow:first-of-type $rowContent $rowInfo:nth-of-type(3)': {
            width: '520px'
        },
        '& $boxRow:nth-of-type(3) $rowContent $rowInfo:first-of-type': {
            width: '100%'
        },
        '& $boxRow:nth-of-type(3) $rowContent $rowInfo:last-of-type': {
            paddingLeft: '0px'
        },
        '& $boxRow:nth-of-type(4) $rowContent $rowInfo': {
            width: '100%'
        },
        '& $boxRow:last-of-type $rowContent': {
            display: 'flex',
            '& >div': {
                width: '50%',
                borderLeft: '1px solid #d5dae2',
                '& >div': {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    borderBottom: '1px solid #d5dae2',
                    minHeight: '40px',
                    maxHeight: '640px',
                    height: '100%',
                    padding: '10px',
                    '&:first-of-type': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#eff2f6',
                        fontWeight: '500',
                        height: '50px',
                        padding: '0'
                    },
                    '& .Mui-disabled input': {
                        '-webkit-text-fill-color': '#333'
                    }
                }
            }
        }
    },
    searchRadio: {
        '& [role=radiogroup]': {
            flexWrap: 'nowrap',
        },
        '& [class*=body1]': {
            fontSize: '16px'
        },
        '& input': {
            cursor: 'default'
        },
        '& label': {
            marginRight: '10px'
        }
    },
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            height: '49px !important',
            fontSize: '16px'
        }
    },
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    footerButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px !important',
        '& button': {
            marginLeft: '10px'
        }
    },
    imgPreview: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            padding: '20px 20px 10px 20px',
        }
    },
    activeReportBtn: {
        backgroundColor: "#989898 !important",
        '&:hover': {
            backgroundColor: "#7b7b7b !important",
        }
    }
}));

const AccidentReportButton = styled(ButtonUnstyled)`
    width: 90px;
    height: 80px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #6e7884;
    background: #e8ebf4;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #d2dcf3;
    }
`;

const UploadButton = styled(ButtonUnstyled)`
    width: 140px;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #6e7884;
    background: #e8ebf4;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #d2dcf3;
    }
`;

const BlueButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    background: #018de7;
    color: #fff;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #0355b0;
    }
`;

const WhiteButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    border: 2px solid #018de7;
    background: #fff;
    color: inherit;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

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
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("등록이 실패하였습니다.");
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
                                <div className={classes.rowInfo}>
                                    {accident && accident.recvForm}
                                </div>
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
                    <div className={classes.boxTitle}>사고접수</div>
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
                                        {/* <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value="20220607사고등록 전 사진.jpg"
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        /> */}
                                        {/* <UploadButton>찾아보기</UploadButton> */}
                                        <div className={classes.imgPreview}>
                                            {filePathBefore && <img height={350} src={`http://tbs-a.thebridgesoft.com:8102/riskfree-backend/file/getImg?imgPath=${filePathBefore}`} alt="beforeImg" />}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>조치 후</div>
                                    <div>
                                        {/* <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value="이미지를 등록하세요 (gif, jpg, png 파일허용)"
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        /> */}
                                        {/* <UploadButton>찾아보기</UploadButton> */}
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
                    <BlueButton className={'button-correction'} onClick={() => navigate(`/dashboard/employee/accident-countermeasures-implementation/update/${accident.accidentId}`)}>수정</BlueButton>
                    <WhiteButton className={'button-delete'} onClick={() => setYesNoPopupShow(true)}>삭제</WhiteButton>
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

export default View