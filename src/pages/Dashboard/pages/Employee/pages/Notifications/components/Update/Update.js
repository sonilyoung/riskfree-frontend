import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import deleteButton from '../../../../../../../../assets/images/btn_del.png';

import { useNoticesUpdateMutation, useNoticesViewMutation } from '../../../../../../../../hooks/api/NoticesManagement/NoticesManagement';

import { useFileUploadMutation, useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { OnlyUploadDialog, UploadDialog } from '../../../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../../../components/Overlay';
import Okay from '../../../../../../../../components/MessageBox/Okay';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const useStyles = makeStyles(() => ({
    pageWrap: {

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
        minHeight: '60px',
        '&:nth-last-of-type(2)': {
            height: '460px',
            borderBottom: 'none',
            '& >span': {
                width: '100%'
            }
        },
        '&:nth-of-type(2) $rowInfo': {
            padding: '0',
            width: 'calc(100% - 200px)'
        },
        '&:last-of-type >div': {
            border: 'none'
        },
        '&:last-of-type': {
            height: 'auto',
            '& $rowInfo': {
                padding: '10px'
            },
            '& $textArea input': {
                '-webkit-text-fill-color': '#333',
            }
        }
    },
    rowTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        background: '#bdcbe9',
        borderBottom: '1px solid #fff',
        fontSize: '17px',
        fontWeight: '500',
        '&:last-of-type': {
            borderBottom: 'none',
        },
        '& span': {
            marginRight: '6px',
            color: '#fc4b07'
        }
    },
    rowInfo: {
        width: 'calc(100% - 220px)',
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
        width: '245px'
    },
    infoTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
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
    textArea: {
        '& .MuiOutlinedInput-root': {
            '& input': {
                fontSize: '16px',
                height: '8px',
            },
            '& textArea': {
                fontSize: '16px',
            }
        },
    },
    radioSelect: {
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
    uploadedFile: {
        width: '100%',
        marginBottom: '10px',
        '& button': {
            marginLeft: '10px'
        }
    },
    uploadAction: {
        width: '100%',
        display: 'flex',
        '& button': {
            marginLeft: '10px'
        }
    },
    textRefer: {
        marginTop: '16px !important',
        fontSize: '15px',
        color: '#555',
        '& span': {
            marginRight: '6px',
            color: '#fc4b07'
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

const RemoveButton = styled(ButtonUnstyled)`
    border: none;
    cursor: pointer;
    width: 26px;
    height: 26px;
    vertical-align: middle;
    font-size: 0;
    background: url(${deleteButton}) no-repeat 0 0;
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

const Update = () => {
    const classes = useStyles();
    const { updateid } = useParams();
    const navigate = useNavigate();
    const [noticesUpdate] = useNoticesUpdateMutation();
    const [noticesView] = useNoticesViewMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [notice, setNotice] = useState({
        "attachId": 0,
        "companyId": 1,
        "content": "",
        "importCd": "",
        "insertId": 0,
        "noticeId": 0,
        "title": "",
        "updateId": 0
    })
    const [dialogId, setDialogId] = useState("")
    const [fileName, setFileName] = useState({
        "attachId": ""
    })

    const HOT = "001"
    const NOT_HOT = "002"

    const labelObject = {
        upperLabel: "첨부파일 등록",
        middleLabel: "등록할 파일을 업로드 합니다.",
    }
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");

    const [okayPopupShowUpdate, setOkayPopupShowUpdate] = useState(false);
    const [okayPopupMessageUpdate, setOkayPopupMessageUpdate] = useState("");
    const [okayPopupTitleUpdate, setOkayPopupTitleUpdate] = useState("알림");
    

    const [selectedFileName, setSelectedFileName] = useState("")

    const [fileUpload] = useFileUploadMutation()
    const [getFileInfo] = useGetFileInfoMutation()


    
    const handleRedirect = () => {
        navigate("/dashboard/director/notifications/list")
    }

    const handleFetchView = async () => {
        const response = await noticesView(updateid)
        //console.log(response)
        setNotice(response.data.RET_DATA)
        let fileInfo = await getFileInfo({ atchFileId: parseInt(response?.data?.RET_DATA["attachId"]), fileSn: 1 })
        setFileName({ ...fileName, "attachId": fileInfo.data.RET_DATA.originalFileName })
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
                setNotice({ ...notice, "attachId": parseInt(fileId) })
                setFileName({ ...fileName, "attachId": response.data.RET_DATA[0].originalFileName })
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

    async function handleDialogFileDownload() {
        const fileId = notice["attachId"]
        if (fileId) {
            window.location = `${BASE_URL}file/fileDown?atchFileId=${fileId}&fileSn=1`;
        }
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogOpen = (event) => {
        setOpenDialog(true);
        setDialogId(event.target.id);
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name);
    }

   
    const handleUdateRedirect = () => {
        navigate(`/dashboard/director/notifications/view/${updateid}`);
    } 

    

    const handleUpdate = async () => {
        if (notice.title.length <= 0) {
            setOkayPopupMessageUpdate("필수항목 '제목'을 입력하세요.");
            setOkayPopupShowUpdate(true);
            return false;
        }
        if (notice.importCd.length <= 0) {
            setOkayPopupMessageUpdate("필수항목 '중요공지여부'를 선택하세요.");
            setOkayPopupShowUpdate(true);                    
            return false;
        }
        if (notice.content.length <= 0) {
            setOkayPopupMessageUpdate("필수항목 '내용'을 입력하세요.");
            setOkayPopupShowUpdate(true);                    
            return false;
        }
        const response = await noticesUpdate({
            "attachId": notice.attachId,
            "companyId": notice.companyId,
            "content": notice.content,
            "importCd": notice.importCd,
            "insertId": notice.insertId,
            "noticeId": updateid,
            "title": notice.title,
            "updateId": notice.updateId
        });
        //console.log(response);
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessageUpdate("수정 되었습니다.");
            setOkayPopupShowUpdate(true);
        } else {
            setOkayPopupMessageUpdate("사용자를 찾을수 없거나 입력정보에 오류가 있습니다 ");
            setOkayPopupShowUpdate(true);
        }
    }

    const handleSelect = (e) => {
        setNotice({ ...notice, "importCd": e.target.value });
    };

    useEffect(() => {
        handleFetchView()
    }, [])

    console.log(notice)

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        공지사항
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>
                            <span>*</span>
                            제목
                        </div>
                        <div className={classes.rowInfo}>
                            <TextField
                                className={classes.textArea}
                                id="outlined-basic"
                                placeholder="제목을 입력하세요"
                                value={notice.title}
                                onChange={(e) => setNotice({ ...notice, "title": e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>
                            <span>*</span>
                            중요공지여부
                        </div>
                        <div className={classes.rowInfo}>
                            <FormControl className={classes.radioSelect} onChange={handleSelect} >
                                <RadioGroup row value={notice.importCd}>
                                    <FormControlLabel
                                        value={HOT}
                                        label="중요"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="radio icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="radio icon on"
                                                    value="001"
                                                />}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        value={NOT_HOT}
                                        label="일반"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="radio icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="radio icon on"
                                                    value="002"
                                                />}
                                            />
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>
                            <span>*</span>
                            내용
                        </div>
                        <div className={classes.rowInfo}>
                            <TextField
                                className={classes.textArea}
                                id="outlined-multiline-static"
                                multiline
                                rows={14}
                                placeholder="내용을 입력하세요"
                                value={notice.content}
                                onChange={(e) => setNotice({ ...notice, "content": e.target.value })} />
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>첨부파일</div>
                        <div className={classes.rowInfo}>
                            {/* <div className={classes.uploadedFile}>
                                <span>개선조치 관련 내부 점검 파일.hwp</span>
                                <RemoveButton></RemoveButton>
                            </div> */}
                            <div className={classes.uploadAction}>
                                <TextField
                                    className={classes.textArea}
                                    id="outlined-basic"
                                    value={fileName.attachId ?? ""}
                                />
                                <UploadButton onClick={e => setOpenDialog(true)}>찾아보기</UploadButton>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.textRefer}>
                    <span>*</span>
                    표시는 필수 입력 항목입니다.
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={'button-registration'} onClick={handleUpdate}>수정</BlueButton>
                    <WhiteButton className={'button-cancelation'} onClick={() => handleRedirect()}>취소</WhiteButton>
                </Grid>
            </Grid>

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
            <Overlay show={okayPopupShowUpdate}>
                <Okay
                    show={okayPopupShowUpdate}
                    message={okayPopupMessageUpdate}
                    title={okayPopupTitleUpdate}
                    onConfirm={() => {handleUdateRedirect()}} />
            </Overlay>            
        </DefaultLayout>

    );
};

export default Update;
