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

const useStyles = makeStyles(() => ({
    pageWrap: {
        '& >div[class*=box]': {
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
        '& [class*=boxRow]:first-of-type [class*=rowInfo]:first-of-type': {
            width: '160px',
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]': {
            width: '306px'
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]:last-of-type': {
            width: 'auto'
        },
        '& [class*=boxRow]:last-of-type [class*=rowInfo]': {
            width: 'auto',
            '&:first-of-type': {
                width: '672px',
            }
        },
        '& [class*=boxContent] [class*=boxRow]:first-of-type': {
            height: '60px'
        },
        '& [class*=boxContent] [class*=boxRow]:nth-of-type(2) [class*=rowTitle]': {
            borderTop: 'none'
        },
        '& [class*=boxContent] [class*=boxRow]:nth-of-type(2) [class*=rowTitle]:first-of-type': {
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
        '& [class*=boxRow]:first-of-type': {
            '& [class*=rowContent]': {
                borderTop: 'none'
            },
            '& [class*=rowTitle]': {
                borderTop: 'none'
            }
        },
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        '& [class*=rowTitle]': {
            borderBottom: 'none'
        }
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
        '& [class*=boxRow]': {
            height: '100px',
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& [class*=boxRow] [class*=rowContent] [class*=rowInfo]': {
            width: '100%'
        },
        '& [class*=boxRow]:last-of-type [class*=rowContent]': {
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
    const todaysDate = moment().format("YYYY-MM-DD")

    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const [law, setLaw] = useState({
        recvDate: todaysDate,
        recvUserName: loginInfo.name,
        recvCd: "",
        cmmdOrgCd001: "",
        cmmdOrgCd002: "",
        cmmdOrgCd003: "",
        cmmdOrgCd004: "",
        improveCn: "",
        improveTypeCd: "",
        orderDate: "",
        dueDate: "",
        issueReason: "",
        preventCn: "",
        performBeforeId: 2,
        performAfterId: 1,
        countPerPage: 0,
        lawImproveId: 1,
        occurPlace: "1층작업실",
        pageNum: 0,
    });

    const handleRedirect = () => {
        navigate(
            "/dashboard/employee/order-for-improvement-and-correction-under-related-law/list"
        );
    };

    const handleLawView = async () => {
        const response = await lawView(updateid)
        setLaw(response.data.RET_DATA)
    };

    const handleLawUpdate = async () => {
        lawUpdate({
            "cmmdOrgCd001": law.cmmdOrgCd001,
            "cmmdOrgCd002": law.cmmdOrgCd002,
            "cmmdOrgCd003": law.cmmdOrgCd003,
            "cmmdOrgCd004": law.cmmdOrgCd004,
            "countPerPage": 0,
            "dueDate": law.dueDate,
            "improveCn": law.improveCn,
            "improveTypeCd": law.improveTypeCd,
            "issueReason": law.issueReason,
            "lawImproveId": updateid,
            "occurPlace": law.occurPlace,
            "orderDate": law.orderDate,
            "pageNum": 0,
            "performAfterId": law.performAfterId,
            "performBeforeId": law.performBeforeId,
            "preventCn": law.preventCn,
            "recvCd": law.recvCd,
            "recvDate": law.recvDate,
            "recvUserName": law.recvUserName
        })
            .then(() => handleRedirect())
    }

    const [date1, setDate1] = React.useState(null),
        [date2, setDate2] = React.useState(null);

    const [locale] = React.useState('ko');

    useEffect(() => {
        window.scrollTo(0, 0);
        handleLoginInfo()
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
                                <div className={classes.rowInfo}>{todaysDate}</div>
                                <div className={classes.rowTitle}>접수자</div>
                                <div className={classes.rowInfo}>{loginInfo.name}</div>
                                <div className={classes.rowTitle}>접수형태</div>
                                <div className={classes.rowInfo}>
                                    <FormControl
                                        className={classes.searchRadio}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                recvCd: event.target.value,
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
                                <div className={classes.rowTitle}>명령구분</div>
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
                                                                cmmdOrgCd001: law.cmmdOrgCd001 ? "" : "001",
                                                            })
                                                        }
                                                        checked={!!law.cmmdOrgCd001}
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
                                                                cmmdOrgCd002: law.cmmdOrgCd002 ? "" : "002",
                                                            })
                                                        }
                                                        checked={!!law.cmmdOrgCd002}
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
                                                                cmmdOrgCd003: law.cmmdOrgCd003 ? "" : "003",
                                                            })
                                                        }
                                                        checked={!!law.cmmdOrgCd003}
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
                                                            cmmdOrgCd004: law.cmmdOrgCd004 ? "" : "004",
                                                        })
                                                    }
                                                    checked={!!law.cmmdOrgCd004}
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
                                        defaultValue="작업 감독자 미배치로 인한 지적"
                                    />
                                </div>
                                <div className={classes.rowTitle}>구분</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 180 }}
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">개선</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>지적일자</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={law.orderDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setLaw({ ...law, "orderDate": moment(date).format("YYYY-MM-DD") })
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: 180 }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={classes.rowTitle}>완료요청일</div>
                                <div className={classes.rowInfo}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <DesktopDatePicker
                                            className={classes.selectMenuDate}
                                            label=" "
                                            inputFormat="YYYY-MM-DD"
                                            value={law.dueDate}
                                            onChange={(newDate) => {
                                                const date = new Date(newDate.$d)
                                                setLaw({ ...law, "dueDate": moment(date).format("YYYY-MM-DD") })
                                            }}
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
                                                issueReason: event.target.value,
                                            })
                                        }
                                    />
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
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={law.preventCn}
                                        onChange={(event) =>
                                            setLaw({
                                                ...law,
                                                preventCn: event.target.value,
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
                                            value="20220607사고등록 전 사진.jpg"
                                            sx={{ width: 610 }}
                                            className={classes.selectMenu}
                                            disabled
                                        />
                                        <UploadButton>찾아보기</UploadButton>
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
                                        <UploadButton>찾아보기</UploadButton>
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
        </DefaultLayout>
    );
};

export default Update;