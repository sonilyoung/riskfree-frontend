import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';
import { DefaultLayout } from '../../../../../../../../layouts/Default';

import { selectBaselineId, selectIsClose, selectWorkplaceId, setBaselineId, setIsClose } from '../../../../../../../../slices/selections/MainSelection';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';

import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import imgPrev2 from '../../../../../../../../assets/images/prw_photo2.jpg';

import { useImprovementViewMutation, useImprovementDeleteMutation } from '../../../../../../../../hooks/api/ImprovementsManagement/ImprovementsManagement'
import { useGetFileInfoMutation, useGetImgMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import YesNo from '../../../../../../../../components/MessageBox/YesNo';
import { Overlay } from '../../../../../../../../components/Overlay';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL

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
    boxFirst: {
        display: 'flex',
        marginBottom: '16px !important',
        '& $boxRow:first-of-type $rowInfo:first-of-type': {
            width: '580px',
        },
        '& $boxRow:first-of-type $rowContent $rowTitle': {
            width: '110px',
        },
        '& $boxRow:nth-of-type(2) $rowInfo': {
            width: '100%'
        },
        '& $boxRow:last-of-type $rowInfo': {
            width: '240px',
            '&:last-of-type': {
                width: '560px',
                display: 'flex',
                justifyContent: 'space-between',
                '& .Mui-disabled input': {
                    '-webkit-text-fill-color': '#333'
                }
            }
        }
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
            '& $rowContent': {
                borderTop: 'none'
            },
            '& $rowTitle': {
                borderTop: 'none'
            }
        },
        '& $boxRow:last-of-type': {
            '& $rowTitle:not(:first-of-type)': {
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
    boxSecond: {
        '& $boxRow:last-of-type': {
            height: 'auto'
        },
        '& $boxRow $rowContent $rowInfo': {
            width: '58.8%'
        },
        '& $boxRow:first-of-type $rowContent $rowTitle': {
            width: '166px',
        },
        '& $boxRow $rowContent $rowInfo:last-of-type': {
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
        height: '38px',
        overflow: 'hidden',
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
    }

}));

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

const Registration = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const { id } = useParams()
    const [improvementView] = useImprovementViewMutation()
    const [improvemetnDelete] = useImprovementDeleteMutation()
    const [improvement, setImprovement] = useState({})
    const [getFileInfo] = useGetFileInfoMutation()
    const [filePathBefore, setFilePathBefore] = useState("")
    const [filePathAfter, setFilePathAfter] = useState("")
    const [fileNameExel, setFileNameExel] = useState("")
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("삭제 하시겠습니까?");
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    
    const handleRedirect = () => {
        navigate("/dashboard/employee/improvement-measures/list")
    }

    const handleFetchView = async () => {
        const response = await improvementView(id)
        setImprovement(response.data.RET_DATA)
        console.log(improvement)
        if (response.data.RET_DATA.actionBeforeId) {
            const responseFileInfoBefore = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.actionBeforeId), fileSn: 1 })
            setFilePathBefore(responseFileInfoBefore.data.RET_DATA.filePath + "/" + responseFileInfoBefore.data.RET_DATA.saveFileName)
        }
        if (response.data.RET_DATA.actionAfterId) {
            const responseFileInfoAfter = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.actionAfterId), fileSn: 1 })
            setFilePathAfter(responseFileInfoAfter.data.RET_DATA.filePath + "/" + responseFileInfoAfter.data.RET_DATA.saveFileName)
        }
        if (response.data.RET_DATA.reqFileId) {
            const responseFileInfoExel = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA.reqFileId), fileSn: 1 })
            setFileNameExel(responseFileInfoExel.data.RET_DATA.originalFileName)
        }
    }

    // const fetchFileInfo = async (improvement) => {
    //     const response = await getFileInfo({ atchFileId: improvement.reqFileId, fileSn: 1 })
    //     console.log(response)
    // }

    const currentIsClose = useSelector(selectIsClose);
    
    async function handleDialogFileDownload(id) {
        if (id) {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${id}&fileSn=1`;
        }
    }

    const handleDeleteImprovement = async () => {
        const response = await improvemetnDelete(id);
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
        handleFetchView()
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
                                    {improvement && improvement.workplaceName}
                                </div>
                                <div className={classes.rowTitle}>개선조치 NO</div>
                                <div className={classes.rowInfo}>
                                    {improvement && improvement.improveNo}
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
                                    {improvement && improvement.improveCn}
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>요청일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {improvement && improvement.reqDate}
                                </div>
                                <div className={classes.rowTitle}>요청자</div>
                                <div className={classes.rowInfo}>
                                    {improvement && improvement.reqUserName}
                                </div>
                                <div className={classes.rowTitle}>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    {improvement && improvement.finDate}
                                </div>
                                <div className={classes.rowTitle}>첨부파일</div>
                                <div className={classes.rowInfo} style={{ cursor: "pointer" }} onDoubleClick={() => handleDialogFileDownload(improvement.reqFileId)}>
                                    {fileNameExel && fileNameExel}
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
                                    {(improvement?.statusCd === "001" && "요청중") || (improvement?.statusCd === "002" && "접수") || (improvement?.statusCd === "003" && "진행중") || (improvement?.statusCd === "004" && "조치완료")}
                                </div>


                                <div className={classes.rowTitle}>완료일</div>
                                <div className={classes.rowContent}>
                                    <div className={classes.rowInfo}>
                                        {improvement && improvement.completeDate}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>조치내용</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    {improvement && improvement.actionCn}
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>첨부파일</div>
                            <div className={classes.rowContent}>
                                <div>
                                    <div>조치 전</div>
                                    <div>
                                        {filePathBefore && <img height={350} src={`${BASE_URL}file/getImg?imgPath=${filePathBefore}`} alt="beforeImg" />}
                                    </div>
                                </div>
                                <div>
                                    <div>조치 후</div>
                                    <div>
                                        {filePathAfter && <img height={350} src={`${BASE_URL}file/getImg?imgPath=${filePathAfter}`} alt="AfterImg" />}
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
                    <BlueButton className={'button-correction'} onClick={() => navigate(`/dashboard/employee/improvement-measures/update/${improvement.improveId}`)}>수정</BlueButton>
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
                    onConfirmYes={handleDeleteImprovement}
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

export default Registration;
