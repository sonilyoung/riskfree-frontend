import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useNoticesViewMutation, useNoticesDeleteMutation } from '../../../../../../../hooks/api/NoticesManagement/NoticesManagement';
import { Overlay } from '../../../../../../../components/Overlay';
import YesNo from '../../../../../../../components/MessageBox/YesNo';
import Okay from '../../../../../../../components/MessageBox/Okay';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useStyles = makeStyles(() => ({
    pageWrap: {
        padding: '15px'
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
    },
    boxTable: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '6px',
        marginTop: '10px !important',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff'
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        height: '60px',
        color: '#333333',
        '&:nth-last-of-type(2)': {
            height: '260px',
            borderBottom: 'none',
            '& span': {
                width: '100%'
            }
        },
        '&:nth-of-type(2) $rowInfo': {
            padding: '0',
            width: 'calc(100% - 100px)'
        },
    },
    rowTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        background: '#bdcbe9',
        borderBottom: '1px solid #fff',
        fontSize: '17px',
        fontWeight: '500',
        '&:last-of-type': {
            borderBottom: 'none'
        }
    },
    promptPopup: {
        // display: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '320px',
        height: '220px',
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
            height: '60px',
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
        display: 'none !important',
    },
    rowInfo: {
        width: 'calc(100% - 120px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '0 10px',
        borderBottom: '1px solid #d5dae2',
    },
    infoContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '145px'
    },
    infoTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9'
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

}));

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
    color: #018de7;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

const View = (props) => {
    const classes = useStyles();
    const [id, setId] = useState(props.nId)

    const [noticesView] = useNoticesViewMutation()
    const [noticesDelete] = useNoticesDeleteMutation()
    const [notice, setNotice] = useState()
    const HOT = "001"
    const NOT_HOT = "002"
    const [yesNoPopupShow, setYesNoPopupShow] = useState(false);
    const [yesNoPopupMessage, setYesNoPopupMessage] = useState("삭제 하시겠습니까?");
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    const navigate = useNavigate()

    const handleFetch = async () => {
        const response = await noticesView(id);
        setNotice(response);
    }

    // 목록페이지 호출
    const handleRedirect = () => {
        props.onCallback("List");
    }

    // 수정페이지 호출
    const handelUpdate = (noticeId) => {
        props.onDoubleClickUpdate(noticeId);
    }
  
    const handleDelete = async () => {
        const response = await noticesDelete(id)
        setYesNoPopupShow(false);
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("삭제 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("삭제에 실패하였습니다.");
            setOkayPopupShow(true);
        }
    }

    const handleFileDownload = (fileId) => {
        window.location = `${BASE_URL}/file/fileDown?atchFileId=${notice?.data?.RET_DATA?.attachId}&fileSn=1`;
    }

    useEffect(() => {
        handleFetch();
    }, [])

    return (
        <>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        공지사항
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>제목</div>
                        <div className={classes.rowInfo}>
                            {notice && notice.data.RET_DATA.title}
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>중요공지여부</div>
                        <div className={classes.rowInfo}>
                            <div className={classes.infoContent}>{(notice && notice.data.RET_DATA.importCd === "001") ? "중요" : "일반"}</div>
                            <div className={classes.infoTitle}>작성자</div>

                            <div className={classes.infoContent}>{notice?.data.RET_DATA.insertName}</div>
                            <div className={classes.infoTitle}>작성일</div>

                            <div className={classes.infoContent}>{notice?.data.RET_DATA.insertDate}</div>
                            <div className={classes.infoTitle}>조회수</div>

                            <div className={classes.infoContent}>{notice?.data.RET_DATA.viewCnt}</div>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>내용</div>
                        <div className={classes.rowInfo}>
                            {notice?.data.RET_DATA.content}
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>첨부파일</div>
                        <div className={classes.rowInfo} onDoubleClick={handleFileDownload} style={{ cursor: "pointer" }}>
                            {`${notice?.data.RET_DATA.originalFilename ?? ""}`}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={'button-correction'} onClick={() => handelUpdate(notice?.data.RET_DATA.noticeId)}>수정</BlueButton>
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
                    onConfirm={() => {handleRedirect()}} />
            </Overlay>
        </>
    );
};

export default View;