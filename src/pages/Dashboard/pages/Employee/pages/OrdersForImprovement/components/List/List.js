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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useStyles, SearchButton, RegisterButton, ExcelButton } from './useStyles';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import { useGetWorkplaceListMutation, useGetLoginInfoMutation } from "../../../../../../../../hooks/api/MainManagement/MainManagement";
import { useLawIssueReassonSelectMutation, useLawSelectMutation } from "../../../../../../../../hooks/api/LawImprovementsManagement/LawImprovementsManagement";
import { DefaultLayout } from "../../../../../../../../layouts/Default";
import 'dayjs/locale/ko';
import { useSelector } from "react-redux";
import { selectBaselineId, selectIsClose } from "../../../../../../../../slices/selections/MainSelection";
import useUserInitialWorkplaceId from "../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId";

const List = () => {
    const classes = useStyles();
    const currentBaselineId = useSelector(selectBaselineId);
    const currentIsClose = useSelector(selectIsClose);
    const getInitialWorkplaceId = useUserInitialWorkplaceId();
    const [lawSelect] = useLawSelectMutation();
    const [getWorkplaceList] = useGetWorkplaceListMutation();
    const [lawIssueReassonSelect] = useLawIssueReassonSelectMutation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    //const [workplaceId, setWorkplaceId] = useState(getInitialWorkplaceId);
    const [workplaceId, setWorkplaceId] = useState("");
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
        
        if (response.data.RET_DATA.roleCd !== "001"){ 
            setLawImprovements({ ...lawImprovements, "workplaceId": response.data.RET_DATA.workplaceId })
        }
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
                                {loginInfos.roleCd === "001" ?
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{ width: 204 }}
                                        value={lawImprovements.workplaceId}
                                        onChange={handleChange("workplaceId")}
                                        displayEmpty
                                    >
                                        <MenuItem value="">전체</MenuItem>
                                        {workplaceList &&
                                            workplaceList.map((workplace) => (
                                                <MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>
                                            ))}
                                    </Select>
                                :
                                    <Select
                                    className={classes.selectMenu}
                                    sx={{ width: 204 }}
                                    value={lawImprovements.workplaceId}
                                    displayEmpty
                                >
                                        <MenuItem value={loginInfos.workplaceId}>{loginInfos.workplaceName}</MenuItem>
                                </Select>
                            }
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
                                >
                                    <RadioGroup row value={lawImprovements.improveTypeCd === "" ? "" : lawImprovements.improveTypeCd}>
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
                                        renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>조치상태</div>
                                <FormControl
                                    className={classes.searchRadio}
                                    onChange={handleChange("statusCd")}
                                >
                                    <RadioGroup row value={lawImprovements.statusCd === "" ? "" : lawImprovements.statusCd}>
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
                            {currentIsClose === "1" ?
                                <RegisterButton sx={{ marginLeft: "10px" }}>등록</RegisterButton>
                            :
                                <RegisterButton sx={{ marginLeft: "10px" }} onClick={() => handleRedirect()}>등록</RegisterButton>
                            }
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
                        {/* <div className={classes.tableRow}>발생장소</div> */}
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
                                {/* <div className={classes.tableRow}>{lawItem.occurPlace}</div> */}
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
