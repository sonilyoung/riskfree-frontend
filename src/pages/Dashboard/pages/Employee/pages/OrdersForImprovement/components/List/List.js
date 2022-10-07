import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';

import searchIcon from '../../../../../../../../assets/images/ic_search.png';
import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import excelIcon from '../../../../../../../../assets/images/ic_excel.png';

import pageFirst from '../../../../../../../../assets/images/btn_first.png';
import pageLast from '../../../../../../../../assets/images/btn_last.png';
import pageNext from '../../../../../../../../assets/images/btn_nxt.png';
import pagePrev from '../../../../../../../../assets/images/btn_pre.png';

import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import { useGetWorkplaceListMutation, useGetLoginInfoMutation } from "../../../../../../../../hooks/api/MainManagement/MainManagement";
import {
    useLawIssueReassonSelectMutation,
    useLawSelectMutation,
} from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";

import { DefaultLayout } from "../../../../../../../../layouts/Default";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import moment from "moment"
import { useSelector } from "react-redux";
import { selectBaselineId, selectWorkplaceId } from "../../../../../../../../slices/selections/MainSelection";
import useUserInitialWorkplaceId from "../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId";

const useStyles = makeStyles(() => ({
    pageWrap: {
        // minHeight: 'calc(100vh - 94px)',
        whiteSpace: 'nowrap',
        letterSpacing: '-1.08px'
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
        wordBreak: 'keep-all'
    },
    searchBox: {
        display: 'flex',
        flexWrap: 'wrap',
        // height: '80px',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginBottom: '28px !important',
        background: '#fff',
        '& >div': {
            display: 'flex',
            width: '100%',
            '&:last-of-type': {
                marginTop: '12px'
            }
        },
        '& >div:first-of-type $searchInfo >div:nth-of-type(2), & >div:last-of-type $searchInfo >div:nth-of-type(2)': {
            width: '700px',
        },
        '& >div:first-of-type $searchInfo >div:last-of-type, & >div:last-of-type $searchInfo >div:last-of-type': {
            marginLeft: '30px'
        },
        '& >div:first-of-type $searchInfo >div': {
            '&:nth-of-type(2) >div +div, &:nth-of-type(3) >div +div': {
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '6px',
                paddingLeft: '10px',
            },
            '&:nth-of-type(2)': {
                '& >div:first-of-type': {
                    marginRight: '53px',
                }
            },
        },
        '& >div:last-of-type $searchInfo >div': {
            '&:nth-of-type(3) >div +div': {
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '6px',
                paddingLeft: '10px',
            },
            '&:nth-of-type(2)': {
                '& >div:first-of-type': {
                    marginRight: '70px',
                }
            },
        },
    },
    searchRadio: {
        height: '40px',
        justifyContent: 'center',
        boxSizing: 'border-box',
        '& [class*=body1]': {
            fontSize: '16px'
        },
        '& input': {
            cursor: 'default'
        },
        '& label': {
            marginRight: '14px'
        }
    },
    searchInfo: {
        display: 'flex',
        width: '100%',
        paddingRight: '30px',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            '&:not(&:first-of-type)': {
                marginLeft: '58px',
            }
        }
    },
    infoTitle: {
        minWidth: '65px',
        marginRight: '14px'
    },
    searchButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    dataTable: {
        maxHeight: '560px',
        borderRadius: '5px',
        boxShadow: '0 0 12px rgb(0 0 0 / 10%)',
        marginBottom: '40px !important',
        background: '#fff',
        overflow: 'hidden'
    },
    tableHead: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: '50px',
        letterSpacing: '-1.08px',
        '& $tableRow': {
            background: '#bdcbe9',
            borderRight: '1px solid #fff',
            fontSize: '17px',
            fontWeight: '500',
            '&:last-of-type': {
                borderRight: '0'
            }
        }
    },
     
    tableBody: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: '50px',
        transition: 'background .2s',
        letterSpacing: '-1.08px',
        '& $tableRow': {
            background: 'transparent',
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: '0',
            },
            /* === Data: 2022.10.03 author:Jimmy edit: &:nth-of-type(9) === */
            '&:nth-of-type(6), &:nth-of-type(7), &:nth-of-type(9)': {
                justifyContent: 'flex-start',
            },
        },
        '&:last-of-type $tableRow': {
            borderBottom: '0'
        },
        '&:hover': {
            background: '#eff2f9'
        }
    },
    tableRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        minWidth: '280px',
        boxSizing: 'border-box',
        padding: '13px 12px',
        '&:first-of-type': {
            minWidth: '90px'
        },
        '&:nth-of-type(2)': {
            minWidth: '150px'
        },
        /* === Data: 2022.10.03 author:Jimmy add: &:nth-of-type(8) === */
        '&:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(8)': {
            minWidth: '120px'
        },
        '&:nth-of-type(5), &:nth-of-type(6)': {
            minWidth: '240px'
        },
        '&:nth-of-type(7), &:nth-of-type(9)': {
            minWidth: '420px'
        },
    },
    pagingBox: {
        position: 'relative',
        height: '40px',
        '& .MuiPagination-root': {
            display: 'flex',
            justifyContent: 'center'
        },
        '& >div:first-of-type': {
            position: 'absolute',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            top: '0',
            left: '0',
            '& strong': {
                color: '#018de7'
            }
        },
        '& >div:last-of-type': {
            position: 'absolute',
            top: '0',
            right: '0'
        },
        '& .MuiPagination-ul button': {
            width: '40px',
            height: '40px',
            margin: '0',
            borderRadius: '0',
            fontSize: '14px',
            color: '#666',
            '&:hover': {
                background: 'transparent'
            },
            '&.Mui-selected': {
                background: '#6e7884',
                color: '#fff',
                cursor: 'default',
            },
            '&[aria-label$=page]': {
                '& svg': {
                    display: 'none',
                }
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=first]': {
                background: 'url(' + pageFirst + ')',
                marginRight: '-1px'
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=last]': {
                background: 'url(' + pageLast + ')',
                marginLeft: '-1px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=next]': {
                background: 'url(' + pageNext + ')',
                marginLeft: '8px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=previous]': {
                background: 'url(' + pagePrev + ')',
                marginRight: '8px'
            }
        }
    },
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
        '& div': {
            height: 'inherit',
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

const SearchButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #3f4c72;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:before {
        content: "";
        position: relative;
        top: -1px;
        display: inline-block;
        width: 17px;
        height: 17px;
        vertical-align: middle;
        margin-right: 4px;
        background-image: url(${searchIcon});;
    }
    &:hover {
        background: #192b5e;
    }
`;

const RegisterButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #018de7;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #0355b0;
    }
`;

const ExcelButton = styled(ButtonUnstyled)`
    width: 152px;
    height: 40px;
    border: 1px solid #6e7884;
    border-radius: 5px;
    color: #333 ! important;
    background: #fff;
    transition: background .2s;
    cursor: pointer;
    &:before {
        content: "";
        display: inline-block;
        width: 17px;
        height: 15px;
        vertical-align: middle;
        margin-right: 4px;
        background: url(${excelIcon}) no-repeat 0 0;
    }
    &:hover {
        background: #d2dcf3;
    }
`;

const List = () => {
    const classes = useStyles();

    const currentBaselineId = useSelector(selectBaselineId);

    const getInitialWorkplaceId = useUserInitialWorkplaceId();
    const [lawSelect] = useLawSelectMutation();
    const [getWorkplaceList] = useGetWorkplaceListMutation();
    const [lawIssueReassonSelect] = useLawIssueReassonSelectMutation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [workplaceId, setWorkplaceId] = useState(getInitialWorkplaceId);
    const [workplaceList, setWorkplaceList] = useState([]);
    const [issueReasson, setIssueReasson] = useState([]);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [lawImprovements, setLawImprovements] = useState({
        baselineId: currentBaselineId,
        cmmdOrgCd001: "",
        cmmdOrgCd002: "",
        cmmdOrgCd003: "",
        cmmdOrgCd004: "",
        countPerPage: 10,
        dueDate: "",
        endDate: endDate,
        improveTypeCd: "",
        issueReason: "",
        pageNum: page,
        startDate: startDate,
        statusCd: "",
        workplaceId: workplaceId
    });
    const [lawList, setLawList] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleRedirect = () => {
        navigate("/dashboard/employee/order-for-improvement-and-correction-under-related-law/registration");
    };

    const handleChange = (prop) => (event) => {
        if (prop.includes("cmmdOrgCd00")) {
            setLawImprovements({
                ...lawImprovements,
                [prop]: event.target.checked ? event.target.value : "",
            });
            setChecked(false);
        } else if (prop === "allCheckboxes") {
            handleCheckBoxes(event);
        } else {
            setLawImprovements({
                ...lawImprovements,
                [prop]: event.target.value,
            });
        }
    };

    const handleCheckBoxes = (event) => {
        event.target.checked
            ? setLawImprovements({
                ...lawImprovements,
                cmmdOrgCd001: "001",
                cmmdOrgCd002: "002",
                cmmdOrgCd003: "003",
                cmmdOrgCd004: "004",
            })
            : setLawImprovements({
                ...lawImprovements,
                cmmdOrgCd001: "",
                cmmdOrgCd002: "",
                cmmdOrgCd003: "",
                cmmdOrgCd004: "",
            });
        setChecked(!checked);
    };

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList();
        setWorkplaceList(response.data.RET_DATA);
    };

    const fetchIssueReasson = async () => {
        const response = await lawIssueReassonSelect(currentBaselineId);
        setIssueReasson(response.data.RET_DATA);
    };

    const fetchLawList = async () => {
        const response = await lawSelect(lawImprovements);
        setLawList(response.data.RET_DATA);
    };

    const DateChange = name => (date) => {
        if(name === 'startDate') {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    /* Data: 2022.10.03 author:Jimmy add: 로그인 정보 호출 및 설정 */
    const [loginInfos, setLoginInfos] = useState({});
    const [getLoginInfo] = useGetLoginInfoMutation()
    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfos(response.data.RET_DATA)
    }

    const [locale] = React.useState('ko');
    useEffect(() => {
        fetchLoginInfo();
        fetchWorkplaceList();
        fetchIssueReasson();
        fetchLawList();
    }, []);

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
                <Grid item xs={12} className={classes.searchBox}>
                    <div>
                        <div className={classes.searchInfo}>
                            <div>
                                <div className={classes.infoTitle}>사업장</div>
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{ width: 204 }}
                                        value={lawImprovements.workplaceId}
                                        onChange={handleChange("workplaceId")}
                                        displayEmpty
                                    >
                                        {workplaceList &&
                                            workplaceList.map((workplace) => (
                                                <MenuItem value={workplace.workplaceId}>
                                                    {workplace.workplaceName}
                                                </MenuItem>
                                            ))}
                                    </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>조치요청 명령구분</div>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        {/* ALL SELECTED -THIS CHECKBOX */}
                                        <FormControlLabel
                                            value=""
                                            label="전체"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={handleChange("allCheckboxes")}
                                                    checked={checked ? true : false}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="001"
                                            label="고용노동부"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={handleChange("cmmdOrgCd001")}
                                                    // onChange={() => {
                                                    //   setLawImprovements({
                                                    //     ...lawImprovements,
                                                    //     cmmdOrgCd001: lawImprovements.cmmdOrgCd001
                                                    //       ? ""
                                                    //       : "001",
                                                    //   });
                                                    //   setChecked(false);
                                                    // }}
                                                    checked={lawImprovements.cmmdOrgCd001 ? true : false}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="002"
                                            label="소방청(소)"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={handleChange("cmmdOrgCd002")}
                                                    // onChange={() => {
                                                    //   setLawImprovements({
                                                    //     ...lawImprovements,
                                                    //     cmmdOrgCd002: lawImprovements.cmmdOrgCd002
                                                    //       ? ""
                                                    //       : "002",
                                                    //   });
                                                    //   setChecked(false);
                                                    // }}
                                                    checked={lawImprovements.cmmdOrgCd002 ? true : false}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="003"
                                            label="환경부(청)"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={handleChange("cmmdOrgCd003")}
                                                    // onChange={() => {
                                                    //   setLawImprovements({
                                                    //     ...lawImprovements,
                                                    //     cmmdOrgCd003: lawImprovements.cmmdOrgCd003
                                                    //       ? ""
                                                    //       : "003",
                                                    //   });
                                                    //   setChecked(false);
                                                    // }}
                                                    checked={lawImprovements.cmmdOrgCd003 ? true : false}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="004"
                                            label="자체점검"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={checkIconOn} alt="check icon on" />
                                                    }
                                                    onChange={handleChange("cmmdOrgCd004")}
                                                    // onChange={() => {
                                                    //   setLawImprovements({
                                                    //     ...lawImprovements,
                                                    //     cmmdOrgCd004: lawImprovements.cmmdOrgCd004
                                                    //       ? ""
                                                    //       : "004",
                                                    //   });
                                                    //   setChecked(false);
                                                    // }}
                                                    checked={lawImprovements.cmmdOrgCd004 ? true : false}
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>구분</div>
                                <FormControl
                                    className={classes.searchRadio}
                                    onChange={handleChange("improveTypeCd")}
                                // onChange={(event) =>
                                //   setLawImprovements({
                                //     ...lawImprovements,
                                //     improveTypeCd: event.target.value,
                                //   })
                                // }
                                >
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value="001"
                                            label="개선"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={radioIconOn} alt="check icon on" />
                                                    }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="002"
                                            label="조치"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={radioIconOn} alt="check icon on" />
                                                    }
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={classes.searchInfo}>
                            <div>
                                <div className={classes.infoTitle}>지적원인</div>
                                {/*
                                <Select
                                    className={classes.selectMenu}
                                    sx={{ width: 204 }}
                                    value={lawImprovements.issueReason}
                                    onChange={handleChange("issueReason")}
                                    // onChange={(event) =>
                                    //   setLawImprovements({
                                    //     ...lawImprovements,
                                    //     issueReason: event.target.value,
                                    //   })
                                    // }
                                    displayEmpty
                                >
                                    {issueReasson &&
                                        issueReasson.map((issue) => (
                                            <MenuItem value={issue.issuereason}>
                                                {issue.issuereason}
                                            </MenuItem>
                                        ))}
                                </Select>
                                */}
                                <TextField
                                    className={classes.selectMenu}
                                    id="outlined-multiline-static"
                                    sx={{ width: 204 }}
                                    value={lawImprovements.issueReason}
                                    onChange={handleChange("issueReason")}
                                />
                            </div>
                            <div>
                                <div className={classes.infoTitle}>발생일자</div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                    <DesktopDatePicker
                                        className={classes.selectMenuDate}
                                        label=" "
                                        inputFormat="YYYY-MM-DD"
                                        value={startDate}
                                        isClearable
                                        onChange={DateChange('startDate')}
                                        // onChange={(newDate) => {
                                        //     const date = new Date(newDate.$d)
                                        //     setStartDate(moment(date).format("YYYY-MM-DD"))
                                        // }}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                    />
                                </LocalizationProvider>
                                &nbsp;~&nbsp;
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                    <DesktopDatePicker
                                        className={classes.selectMenuDate}
                                        label=" "
                                        inputFormat="YYYY-MM-DD"
                                        value={endDate}
                                        isClearable
                                        onChange={DateChange('endDate')}
                                        // onChange={(newDate) => {
                                        //     const date = new Date(newDate.$d)
                                        //     setEndDate(moment(date).format("YYYY-MM-DD"))
                                        // }}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>조치상태</div>
                                <FormControl
                                    className={classes.searchRadio}
                                    onChange={handleChange("statusCd")}
                                // onChange={(event) =>
                                //   setLawImprovements({
                                //     ...lawImprovements,
                                //     statusCd: event.target.value,
                                //   })
                                // }
                                >
                                    <RadioGroup row>
                                        {/* BOTH VALUES */}
                                        <FormControlLabel
                                            value=""
                                            label="전체"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={radioIconOn} alt="check icon on" />
                                                    }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="005"
                                            label="조치중"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={radioIconOn} alt="check icon on" />
                                                    }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="006"
                                            label="조치완료"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={
                                                        <img src={radioIconOn} alt="check icon on" />
                                                    }
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className={classes.searchButtons}>
                            <SearchButton onClick={fetchLawList}>조회</SearchButton>
                            <RegisterButton
                                sx={{ marginLeft: "10px" }}
                                onClick={() => handleRedirect()}
                            >
                                등록
                            </RegisterButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.dataTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>발생년도</div>
                        <div className={classes.tableRow}>사업장</div>
                        <div className={classes.tableRow}>조치상태</div>
                        <div className={classes.tableRow}>지적일자</div>
                        <div className={classes.tableRow}>조치명령 기관</div>
                        <div className={classes.tableRow}>발생장소</div>
                        <div className={classes.tableRow}>조치명령 원인</div>
                        <div className={classes.tableRow}>완료요청일</div> { /* === Data: 2022.10.03 author:Jimmy add: 완료요청일 === */ }
                        <div className={classes.tableRow}>개선조치 내용</div>
                    </div>

                    {lawList &&
                        lawList.map((lawItem) => (
                            <div
                                className={classes.tableBody}
                                onDoubleClick={() =>
                                    navigate(
                                        `/dashboard/employee/order-for-improvement-and-correction-under-related-law/view/${lawItem.lawImproveId}`
                                    )
                                }
                            >
                                <div className={classes.tableRow}>{lawItem.recvYear}</div>
                                <div className={classes.tableRow}>{lawItem.workplaceName}</div>
                                <div className={classes.tableRow}>{lawItem.status}</div>
                                <div className={classes.tableRow}>
                                    {lawItem.orderDate}
                                </div>
                                <div className={classes.tableRow}>
                                    {lawItem.cmmdOrgName001 && lawItem.cmmdOrgName001}&nbsp;
                                    {lawItem.cmmdOrgName002 && lawItem.cmmdOrgName002}&nbsp;
                                    {lawItem.cmmdOrgName003 && lawItem.cmmdOrgName003}&nbsp;
                                    {lawItem.cmmdOrgName004 && lawItem.cmmdOrgName004}
                                </div>
                                <div className={classes.tableRow}>{lawItem.occurPlace}</div>
                                <div className={classes.tableRow}>{lawItem.issueReason}</div>
                                <div className={classes.tableRow}>{lawItem.dueDate}</div> { /* === Data: 2022.10.03 author:Jimmy add: 완료요청일 === */ }
                                <div className={classes.tableRow}>{lawItem.preventCn}</div>
                            </div>
                        ))}
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>
                        총 게시글 <strong>{!!lawList && lawList[0]?.totalCount}</strong> 건
                    </div>
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(!!lawList && (lawList[0]?.totalCount / 10))}
                            boundaryCount={10}
                            shape="rounded"
                            onChange={(event) => setPage(event.target.value)}
                            showFirstButton
                            showLastButton
                        />
                    </Stack>
                    <div>
                        {/* <ExcelButton>엑셀 다운로드</ExcelButton> */}
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default List;
