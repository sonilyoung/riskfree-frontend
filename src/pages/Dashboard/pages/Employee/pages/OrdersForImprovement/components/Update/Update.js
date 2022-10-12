import React, { useState, useEffect } from 'react'
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

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';

import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import noImg from '../../../../../../../../assets/images/ic_no_image.png';
import { useLawUpdateMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { useLawViewMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { useGetLoginInfoMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { DefaultLayout } from "../../../../../../../../layouts/Default";
import moment from "moment"

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';

import { useFileUploadMutation, useGetFileInfoMutation } from '../../../../../../../../hooks/api/FileManagement/FIleManagement';
import { OnlyUploadDialog, UploadDialog } from '../../../../../../../../dialogs/Upload';
import { Overlay } from '../../../../../../../../components/Overlay';
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
            width: 'auto',
            '&:first-of-type': {
                width: '672px',
            }
        },
        '& $boxContent $boxRow:first-of-type': {
            height: '60px'
        },
        '& $boxContent $boxRow:nth-of-type(2) $rowTitle': {
            borderTop: 'none'
        },
        '& $boxContent $boxRow:nth-of-type(2) $rowTitle:first-of-type': {
            borderTop: '1px solid #fff'
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
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        '& $rowTitle': {
            borderBottom: 'none'
        }
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
        textAlign: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9',
        borderTop: '1px solid #fff',
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        },
        '& text': {
            position: 'absolute',
            marginTop: '5px',
            marginLeft: '8px',
            textAlign: 'left',
            color: '#fc4b07',
            zoom: '1.1'
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
    /* === Data: 2022.10.03 author:Jimmy add, edit === */
    boxRegistration: {
        height: '100%',
        '& $boxRow:first-of-type $rowTitle': {
            width: '125px'
        },
        '& $boxRow:first-of-type $rowInfo:last-of-type': {
            width: '272px',
        },

        '& $boxRow:first-of-type $rowContent $rowInfo': {
            width: '100%',
            height: '100px'
        },
        '& $boxRow $rowContent $rowInfo': {
            width: '100%',
            height: '100px'
        },
        /* ============================================= */

        '& $boxRow:last-of-type $rowContent': {
            display: 'flex',
            '& >div': {
                width: '100%',
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
    selectMenuDate: {
        height: '40px',
        '& div': {
            height: 'inherit',
            background: '#fff',
        },
        '& input': {
            paddingLeft: '10px',
        },
        '& legend': {
            width: '0'
        },
        '& button': {
            paddingLeft: '0',
        }
    },
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

const Update = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { updateid } = useParams()
    const [lawView] = useLawViewMutation();
    const [lawUpdate] = useLawUpdateMutation();
    const [getLoginInfo] = useGetLoginInfoMutation()
    const [loginInfo, setLoginInfo] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const todaysDate = moment().format("YYYY-MM-DD")
    const [filePathBefore, setFilePathBefore] = useState("")
    const [filePathAfter, setFilePathAfter] = useState("")
    const [getFileInfo] = useGetFileInfoMutation()
    const [dialogId, setDialogId] = useState("")
    const [filePath, setFilePath] = useState({
        "performBeforeId": "",
        "performAfterId": ""
    });
    const [selectedFileName, setSelectedFileName] = useState("")
    const labelObject = {
        upperLabel: "이미지 등록",
        middleLabel: "등록할 파일을 업로드 합니다."
    }
    const [okayPopupShow, setOkayPopupShow] = useState(false);
    const [okayPopupMessage, setOkayPopupMessage] = useState("");
    const [okayPopupTitle, setOkayPopupTitle] = useState("알림");
    
    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const [law, setLaw] = useState({
        recvDate: todaysDate,       // 접수일자
        recvUserName: loginInfo.name,       // 접수자
        recvCd: "",        
        cmmdOrgCd001: "",
        cmmdOrgCd002: "",
        cmmdOrgCd003: "",
        cmmdOrgCd004: "",
        improveCn: "",
        improveTypeCd: "",
        orderDate: "",      // 지적일자
        dueDate: "",        // 완료요청일
        issueReason: "",
        preventCn: "",
        performBeforeId: "",
        performAfterId: "",
        countPerPage: 0,
        lawImproveId: 1,
        occurPlace: "1층작업실",
        pageNum: 0,
        completeDate:"",        // 완료일
    });

    const handleRedirect = () => {
        navigate(
            "/dashboard/employee/order-for-improvement-and-correction-under-related-law/list"
        );
    };

    const fetchLawView = async () => {
        let filePathMain = {}
        const response = await lawView(updateid)

        console.log("파일확인:", response.data.RET_DATA);

        setLaw(response.data.RET_DATA)
        for (const path in filePath) {
            let fileInfo = await getFileInfo({ atchFileId: parseInt(response.data.RET_DATA[path]), fileSn: 1 })
            filePathMain[path] = fileInfo.data.RET_DATA.originalFileName
        }        
        setFilePath(filePathMain)
    };

    const handleLawUpdate = async () => {
        if (law.recvCd.length <= 0) {
            setOkayPopupMessage("필수항목 '접수형태'를 선택하세요.");
            setOkayPopupShow(true);
            return false;
        }
        if (law.cmmdOrgCd001+law.cmmdOrgCd002+law.cmmdOrgCd003+law.cmmdOrgCd004.length <= 0) {
            setOkayPopupMessage("필수항목 '명령구분'을 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.improveCn.length <= 0) {
            setOkayPopupMessage("필수항목 '개선.조치 지적내용'을 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.improveTypeCd === null) {
            setOkayPopupMessage("필수항목 '구분'을 선택하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.orderDate === null) {
            setOkayPopupMessage("필수항목 '지적일자'를 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        if (law.dueDate === null) {
            setOkayPopupMessage("필수항목 '완료요청일'을 입력하세요.");
            setOkayPopupShow(true);                    
            return false;
        }
        const response = await lawUpdate({
            "cmmdOrgCd001": law.cmmdOrgCd001,
            "cmmdOrgCd002": law.cmmdOrgCd002,
            "cmmdOrgCd003": law.cmmdOrgCd003,
            "cmmdOrgCd004": law.cmmdOrgCd004,
            "countPerPage": 0,
            "dueDate": law.dueDate,     // 완료요청일
            "improveCn": law.improveCn,
            "improveTypeCd": law.improveTypeCd,
            "issueReason": law.issueReason,
            "lawImproveId": updateid,
            "occurPlace": law.occurPlace,
            "orderDate": law.orderDate,     // 지적일자
            "pageNum": 0,
            "performAfterId": law.performAfterId,
            "performBeforeId": law.performBeforeId,
            "preventCn": law.preventCn,
            "recvCd": law.recvCd,
            "recvDate": law.recvDate,          // 접수일자
            "recvUserName": law.recvUserName,
            "completeDate": law.completeDate        // 완료일
        });
        if (response?.data?.RET_CODE === "0000") {
            setOkayPopupMessage("등록 되었습니다.");
            setOkayPopupShow(true);
        } else {
            setOkayPopupMessage("입력정보에 오류가 있습니다 ");
            setOkayPopupShow(true);
        }
    }

    const [fileUpload] = useFileUploadMutation()

    const handleDialogClose = () => {
        setOpenDialog(false);
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
                setLaw({ ...law, [dialogId]: fileId })
                setFilePath({ ...filePath, [dialogId]: response.data.RET_DATA[0]?.originalFileName })
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
        const fileId = law[dialogId]
        if (fileId) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId}&fileSn=1`;
        }
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }

    const handleDialogOpen = (event) => {
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(event.target.id);
        //console.log(event.target.id)
    }

    const DateChange = name => (date) => {
        setLaw({ ...law, [name] : date.format("YYYY-MM-DD") });
    };

    const [locale] = React.useState('ko');

    useEffect(() => {
        window.scrollTo(0, 0);
        handleLoginInfo()
        fetchLawView()
    }, [])

    useEffect(() => {

    }, [filePath])

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
                            <div className={classes.rowTitle}><text>*</text>접수일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>{todaysDate}</div>
                                <div className={classes.rowTitle}><text>*</text>접수자</div>
                                <div className={classes.rowInfo}>{loginInfo.name}</div>
                                <div className={classes.rowTitle}><text>*</text>접수형태</div>
                                <div className={classes.rowInfo}>
                                    <FormControl
                                        className={classes.searchRadio}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                "recvCd": event.target.value,
                                            })
                                        }
                                    >
                                        <RadioGroup row value={law && law.recvCd}>
                                            <FormControlLabel
                                                value="001"
                                                label="공문"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={
                                                            <img src={radioIconOn} alt="radio icon on" />
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value="002"
                                                label="현장점검"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={
                                                            <img src={radioIconOn} alt="radio icon on" />
                                                        }
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value="003"
                                                label="신고"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={
                                                            <img src={radioIconOn} alt="radio icon on" />
                                                        }
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>명령구분</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row value={law && law.cmmdOrgCd001 || law && law.cmmdOrgCd002 || law && law.cmmdOrgCd003 || law && law.cmmdOrgCd004 || law && law.cmmdOrgCd005 || law && law.cmmdOrgCd006}>
                                            <FormControlLabel
                                                value={law.cmmdOrgCd001}
                                                label="고용노동부"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setLaw({
                                                                ...law,
                                                                "cmmdOrgCd001": law.cmmdOrgCd001 ? "" : "001",
                                                            })
                                                        }
                                                        checked={law.cmmdOrgCd001.trim() === "" ? false : true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={law.cmmdOrgCd002}
                                                label="소방청(소)"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setLaw({
                                                                ...law,
                                                                "cmmdOrgCd002": law.cmmdOrgCd002 ? "" : "002",
                                                            })
                                                        }
                                                        checked={law.cmmdOrgCd002.trim() === "" ? false : true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={law.cmmdOrgCd003}
                                                label="환경부(청)"
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={
                                                            <img src={checkIconOn} alt="check icon on" />
                                                        }
                                                        onChange={() =>
                                                            setLaw({
                                                                ...law,
                                                                "cmmdOrgCd003": law.cmmdOrgCd003 ? "" : "003",
                                                            })
                                                        }
                                                        checked={law.cmmdOrgCd003.trim() === "" ? false : true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={law.cmmdOrgCd004}
                                                label="자체점검"
                                                control={<Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={() =>
                                                        setLaw({
                                                            ...law,
                                                            "cmmdOrgCd004": law.cmmdOrgCd004 ? "" : "004",
                                                        })
                                                    }
                                                    checked={law.cmmdOrgCd004.trim() === "" ? false : true}
                                                />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
                                <text>*</text>
                                <span>개선.조치 </span>
                                <span>지적내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={law.improveCn}
                                        onChange={(e) => setLaw({ ...law, "improveCn": e.target.value })}
                                    />
                                </div>
                                <div className={classes.rowTitle}><text>*</text>구 분</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 180 }}
                                        className={classes.selectMenu}
                                        value={law.improveTypeCd}
                                        key={law.improveTypeCd}
                                        onChange={(e) => setLaw({ ...law, "improveTypeCd": e.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="001">개선</MenuItem>
                                        <MenuItem value="002">조치</MenuItem>
                                    </Select>

                                </div>
                                <div className={classes.rowTitle}><text>*</text>지적일자</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={law.orderDate}
                                            onChange={DateChange('orderDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setLaw({ ...law, "orderDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}><text>*</text>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={law.dueDate}
                                            onChange={DateChange('dueDate')}
                                            // onChange={(newDate) => {
                                            //     const date = new Date(newDate.$d)
                                            //     setLaw({ ...law, "dueDate": moment(date).format("YYYY-MM-DD") })
                                            // }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                        />
                                    </LocalizationProvider>
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
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={law.issueReason}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                "issueReason": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            { /* === Data: 2022.10.03 author:Jimmy add, edit === */}
                            <div className={classes.rowTitle}>완료일</div>
                            <div className={classes.rowInfo}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                    <DesktopDatePicker
                                        className={classes.selectMenuDate}
                                        inputFormat="YYYY-MM-DD"
                                        value={law.completeDate === "" ? "" : law.completeDate}
                                        onChange={DateChange('completeDate')}
                                        // onChange={(newDate) => {
                                        //     const date = new Date(newDate.$d)
                                        //     setLaw({ ...law, "recvDate": moment(date).format("YYYY-MM-DD") })
                                        // }}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            { /* ====================================================== */}

                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>
                                <span>재발방지 </span>
                                <span>대책</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={law.preventCn}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                "preventCn": event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>이행실적</div>
                            <div className={classes.rowContent}>
                                <div>
                                    <div>조치 전</div>
                                    <div>
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={filePath.performBeforeId}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                        />
                                        <UploadButton id="performBeforeId" onClick={handleDialogOpen}>찾아보기</UploadButton>
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
                                            value={filePath.performAfterId}
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                        />
                                        <UploadButton id="performAfterId" onClick={handleDialogOpen}>찾아보기</UploadButton>
                                        {/* <div className={classes.imgPreview}>
                                            <img src={noImg} alt="no image" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={"button-correction"} onClick={handleLawUpdate}>수정</BlueButton>
                    <WhiteButton
                        className={"button-cancellation"}
                        onClick={() => handleRedirect()}
                    >
                        취소
                    </WhiteButton>
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
        </DefaultLayout>
    );
};

export default Update;