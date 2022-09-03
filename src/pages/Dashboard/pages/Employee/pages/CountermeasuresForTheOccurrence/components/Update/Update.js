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
import { DefaultLayout } from '../../../../../../../../layouts/Default';


import { useAccidentViewMutation, useAccidentDeleteMutation, useAccidentUpdateMutation } from '../../../../../../../../hooks/api/AccidentManagement/AccidentManagement';


import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';

import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import noImg from '../../../../../../../../assets/images/ic_no_image.png';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment"

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
        height: '160px',
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
        '& [class*=boxRow]:first-of-type': {
            height: '60px',
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
        minHeight: '60px',
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
            '&:nth-of-type(2)': {
                height: '60px'
            },
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]:first-of-type': {
            width: '160px',
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]': {
            width: '306px'
        },
        '& [class*=boxRow]:first-of-type [class*=rowContent] [class*=rowInfo]:nth-of-type(3)': {
            width: '520px'
        },
        '& [class*=boxRow]:nth-of-type(3) [class*=rowContent] [class*=rowInfo]:first-of-type': {
            width: '100%'
        },
        '& [class*=boxRow]:nth-of-type(3) [class*=rowContent] [class*=rowInfo]:last-of-type': {
            paddingLeft: '0px'
        },
        '& [class*=boxRow]:nth-of-type(4) [class*=rowContent] [class*=rowInfo]': {
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

const Update = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const { updateid } = useParams()
    const [accidentView] = useAccidentViewMutation()
    const [accidentUpdate] = useAccidentUpdateMutation()
    const todayDate = moment().format("YYYY-MM-DD")
    const [accident, setAccident] = useState({
        "accLevelCd": "",
        "accTypeCd001": "",
        "accTypeCd002": "",
        "accTypeCd003": "",
        "accTypeCd004": "",
        "accTypeCd005": "",
        "accTypeCd006": "",
        "accdntCn": "",
        "accidentId": updateid,
        "accidentTypeCd": "",
        "deathToll": null,
        "finalReportId": null,
        "initReportId": null,
        "jobDeseaseToll": null,
        "managerName": "",
        "occurDate": "",
        "occurPlace": "",
        "occurReason": "",
        "performAfterId": null,
        "performBeforeId": null,
        "preventCn": "",
        "recvDate": "",
        "recvFormCd": "",
        "recvTypeCd001": "",
        "recvTypeCd002": "",
        "recvTypeCd003": "",
        "recvTypeCd004": "",
        "recvTypeCd005": "",
        "recvTypeCd006": "",
        "recvUserName": "",
        "sameAccidentInjury": null
    })

    const handleRedirect = () => {
        navigate("/dashboard/employee/accident-countermeasures-implementation/list")
    }

    const fetchAccidentView = async () => {
        const response = await accidentView(updateid)
        setAccident(response.data.RET_DATA)
    }

    const handleUpdate = () => {
        accidentUpdate(
            {
                "accLevelCd": "001",
                "accTypeCd001": accident.accTypeCd001,
                "accTypeCd002": accident.accTypeCd002,
                "accTypeCd003": accident.accTypeCd003,
                "accTypeCd004": accident.accTypeCd004,
                "accTypeCd005": accident.accTypeCd005,
                "accTypeCd006": accident.accTypeCd006,
                "accdntCn": accident.accdntCn,
                "accidentId": accident.accidentId,
                "accidentTypeCd": accident.accidentTypeCd,
                "deathToll": accident.deathToll,
                "finalReportId": null,
                "initReportId": null,
                "jobDeseaseToll": accident.jobDeseaseToll,
                "managerName": accident.managerName,
                "occurDate": accident.occurDate,
                "occurPlace": accident.occurPlace,
                "occurReason": accident.occurReason,
                "performAfterId": null,
                "performBeforeId": null,
                "preventCn": accident.preventCn,
                "recvDate": accident.recvDate,
                "recvFormCd": accident.recvFormCd,
                "recvTypeCd001": accident.recvTypeCd001,
                "recvTypeCd002": accident.recvTypeCd002,
                "recvTypeCd003": accident.recvTypeCd003,
                "recvTypeCd004": accident.recvTypeCd004,
                "recvTypeCd005": accident.recvTypeCd005,
                "recvTypeCd006": accident.recvTypeCd006,
                "recvUserName": accident.recvUserName,
                "sameAccidentInjury": accident.sameAccidentInjury
            }
        )
            .then(() => navigate("/dashboard/employee/accident-countermeasures-implementation/list"))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
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
                                <div className={classes.rowInfo}>{todayDate}</div>
                                <div className={classes.rowTitle}>접수자</div>
                                <div className={classes.rowInfo}>[홍xx] / 방제센터 사고접수부</div>
                                <div className={classes.rowTitle}>접수형태</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio} onChange={(e) => setAccident({ ...accident, "recvFormCd": e.target.value })}>
                                        <RadioGroup row value={accident && accident.recvFormCd}>
                                            <FormControlLabel
                                                value="001"
                                                label="전화"
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
                                                label="싸이렌"
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
                                                label="안전순찰중"
                                                control={
                                                    <Radio
                                                        icon={<img src={radioIcon} alt="radio icon" />}
                                                        checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                        value={"003"}
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.rowTitle}>접수유형</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value={""}
                                                label="추락"
                                                onChange={(e) => setAccident({ ...accident, "recvTypeCd001": accident.recvTypeCd001 ? "" : "001" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.recvTypeCd001}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="끼임"
                                                onChange={(e) => setAccident({ ...accident, "recvTypeCd002": accident.recvTypeCd002 ? "" : "002" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.recvTypeCd002}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="화재"
                                                onChange={(e) => setAccident({ ...accident, "recvTypeCd003": accident.recvTypeCd003 ? "" : "003" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.recvTypeCd003}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="전기"
                                                onChange={(e) => setAccident({ ...accident, "recvTypeCd004": accident.recvTypeCd004 ? "" : "004" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.recvTypeCd004}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="밀폐"
                                                onChange={(e) => setAccident({ ...accident, "recvTypeCd005": accident.recvTypeCd005 ? "" : "005" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.recvTypeCd005}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="중량물"
                                                onChange={(e) => setAccident({ ...accident, "recvTypeCd006": accident.recvTypeCd006 ? "" : "006" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.recvTypeCd006}
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
                                <span>사고조치 </span>
                                <span>내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        onChange={(e) => setAccident({ ...accident, "accdntCn": e.target.value })}
                                        value={accident && accident.accdntCn}
                                    />
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
                                    <TextField
                                        sx={{ width: 140 }}
                                        id="date"
                                        className={classes.selectMenu}
                                        type="date"
                                        onInput={(e) => setAccident({ ...accident, "occurDate": e.target.value })}
                                        value={accident && accident.occurDate}
                                        format={"YYYY-MM-DD"}
                                    />
                                </div>
                                <div className={classes.rowTitle}>사고유형</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value={""}
                                                label="추락"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd001": accident.accTypeCd001 ? "" : "001" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd001}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="끼임"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd002": accident.accTypeCd002 ? "" : "002" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd002}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="화재"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd003": accident.accTypeCd003 ? "" : "003" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd003}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="전기"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd004": accident.accTypeCd004 ? "" : "004" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd004}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="밀폐"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd005": accident.accTypeCd005 ? "" : "005" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd005}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                value={""}
                                                label="중량물"
                                                onChange={(e) => setAccident({ ...accident, "accTypeCd006": accident.accTypeCd006 ? "" : "006" })}
                                                control={
                                                    <Checkbox
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        checked={!!accident.accTypeCd006}
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.rowTitle}>사고등급</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 100 }}
                                        className={classes.selectMenu}
                                        value={accident && accident.accLevelCd}
                                        onChange={(e) => setAccident({ ...accident, "accLevelCd": e.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="001">1급</MenuItem>
                                        <MenuItem value="002">2급</MenuItem>
                                        <MenuItem value="003">3급</MenuItem>
                                        <MenuItem value="004">4급</MenuItem>
                                        <MenuItem value="005">5급</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>발생장소</div>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.occurPlace}
                                        className={classes.selectMenu}
                                        onChange={(e) => setAccident({ ...accident, "occurPlace": e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>현장책임자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.managerName}
                                        onChange={(e) => setAccident({ ...accident, "managerName": e.target.value })}
                                        sx={{ width: 140 }}
                                        className={classes.selectMenu}
                                    />
                                </div>
                                <div className={classes.rowTitle}>사고구분</div>
                                <div className={classes.rowInfo}>
                                    <Select
                                        sx={{ width: 100 }}
                                        className={classes.selectMenu}
                                        value={accident && accident.accidentTypeCd}
                                        onChange={(e) => setAccident({ ...accident, "accidentTypeCd": e.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="001">추락</MenuItem>
                                        <MenuItem value="002">끼임</MenuItem>
                                        <MenuItem value="003">화재</MenuItem>
                                        <MenuItem value="004">전기</MenuItem>
                                        <MenuItem value="005">밀폐</MenuItem>
                                        <MenuItem value="006">중량물</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.rowTitle}>사고분류</div>
                                <div className={classes.rowInfo}>
                                    사망&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.deathToll}
                                        onChange={(e) => setAccident({ ...accident, "deathToll": e.target.value })}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    />
                                    명&ensp;&ensp;
                                    동일사고유형&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.jobDeseaseToll}
                                        onChange={(e) => setAccident({ ...accident, "jobDeseaseToll": e.target.value })}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    />
                                    명&ensp;&ensp;
                                    직업성질환&nbsp;
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={accident && accident.sameAccidentInjury}
                                        onChange={(e) => setAccident({ ...accident, "sameAccidentInjury": e.target.value })}
                                        sx={{ width: 80 }}
                                        className={classes.selectMenu}
                                    />
                                    명
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생원인</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        value={accident && accident.occurReason}
                                        onChange={(e) => setAccident({ ...accident, "occurReason": e.target.value })}
                                    />
                                </div>
                                <div className={classes.rowInfo}>
                                    <AccidentReportButton sx={{ marginRight: '10px' }}>초기사고 보고서</AccidentReportButton>
                                    <AccidentReportButton>최종사고 보고서</AccidentReportButton>
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
                                        value={accident && accident.preventCn}
                                        onChange={(e) => setAccident({ ...accident, "preventCn": e.target.value })}
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
                                        <div className={classes.imgPreview}>
                                            <img src={imgPrev} alt="uploaded image" />
                                        </div>
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
                                        <div className={classes.imgPreview}>
                                            <img src={noImg} alt="no image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={'button-correction'} onClick={handleUpdate}>수정</BlueButton>
                    <WhiteButton className={'button-cancellation'} onClick={handleRedirect}>취소</WhiteButton>
                </Grid>
            </Grid>
        </DefaultLayout>

    )
}

export default Update