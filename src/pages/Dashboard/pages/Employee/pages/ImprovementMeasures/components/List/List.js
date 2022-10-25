import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useStyles, SearchButton, RegisterButton } from './useStyles';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';
import { useGetWorkplaceListMutation, useGetLoginInfoMutation } from "../../../../../../../../hooks/api/MainManagement/MainManagement";
import { useImprovementSelectMutation } from '../../../../../../../../hooks/api/ImprovementsManagement/ImprovementsManagement';
import { selectBaselineId, selectIsClose } from '../../../../../../../../slices/selections/MainSelection';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import useUserInitialWorkplaceId from '../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId';
import useUserToken from '../../../../../../../../hooks/core/UserToken/UserToken';

function List() {
    const classes = useStyles();
    const navigate = useNavigate()
    const getInitialWorkplaceId = useUserInitialWorkplaceId();
    const [getWorkplaceList] = useGetWorkplaceListMutation()
    const [improvementSelect] = useImprovementSelectMutation()
    const [getUseUserToken] = useUserToken();
    const [workplaces, setWorkplaces] = useState([])
    //const [workplaceSelect, setWorkplaceSelect] = useState(getInitialWorkplaceId())
    const [workplaceSelect, setWorkplaceSelect] = useState("")
    //const [getroleCd, setGetroleCd] = useState(getUseUserToken.getUserRoleCd());
    const [getroleCd, setGetroleCd] = useState('');
    const [statusCd, setStatusCd] = useState("")
    const [improvements, setImprovements] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [page, setPage] = useState(1)

    const handleWorkplaceSelect = (event) => {
        setWorkplaceSelect(event.target.value);
    };

    const handleReqUserSelect = (event) => {
        setGetroleCd(event.target.value);
    };

    const handleStatusCd = (event) => {
        setStatusCd(event.target.value);
    };

    const handleRedirect = () => {
        navigate("/dashboard/employee/improvement-measures/registration")
    }
    const handleComapanyWorkplace = async () => {
        const response = await getWorkplaceList({})
        setWorkplaces(response.data.RET_DATA)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const currentBaseline = useSelector(selectBaselineId);
    const currentIsClose = useSelector(selectIsClose);

    const handleFetchList = async () => {
        const response = await improvementSelect(
            {
                "baselineId": currentBaseline,
                "companyId": null,
                "countPerPage": 10,
                "endDate": endDate,
                "pageNum": page,
                "reqUserCd": getroleCd,
                "startDate": startDate,
                "statusCd": statusCd,
                "workplaceId": workplaceSelect
            }
        )
        setImprovements(response.data.RET_DATA)
    }

    const DateChange = name => (date) => {
        if(name === 'startDate') {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    const [locale] = React.useState('ko');

    /* Data: 2022.10.03 author:Jimmy add: 로그인 정보 호출 및 설정 */
    const [loginInfos, setLoginInfos] = useState({});
    const [getLoginInfo] = useGetLoginInfoMutation()
    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfos(response.data.RET_DATA)
    }
    
    useEffect(() => {
        fetchLoginInfo();
        handleComapanyWorkplace()
        handleFetchList()
    }, [page])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        개선조치 현황
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div className={classes.searchInfo}>
                        <div>
                            <div className={classes.infoTitle}>사업장</div>
                            {loginInfos.roleCd === "001" ?
                                <Select
                                    className={classes.selectMenu}
                                    sx={{ width: 204 }}
                                    value={workplaceSelect}
                                    key={workplaceSelect}
                                    onChange={handleWorkplaceSelect}
                                    displayEmpty
                                >
                                    <MenuItem value="">전체</MenuItem>
                                    {workplaces &&
                                        workplaces.map((workplace) => (
                                            <MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>
                                        ))}
                                </Select>
                            :
                                <Select
                                className={classes.selectMenu}
                                sx={{ width: 204 }}
                                value={workplaceSelect}
                                displayEmpty
                            >
                                <MenuItem value={loginInfos.workplaceId}>{loginInfos.workplaceName}</MenuItem>
                                </Select>
                            }
                        </div>
                        <div>
                            <div className={classes.infoTitle}>요청일자</div>
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
                            <div className={classes.infoTitle}>요청자</div>
                            <Select
                                sx={{ width: 160 }}
                                className={classes.selectMenu}
                                value={getroleCd}
                                key=''
                                onChange={handleReqUserSelect}
                                displayEmpty
                            >
                                <MenuItem value="">전체</MenuItem>
                                <MenuItem value="001">대표이사</MenuItem>
                                <MenuItem value="002">안전책임자</MenuItem>
                                <MenuItem value="003">안전실무자</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <div className={classes.infoTitle}>조치상태</div>
                            <FormControl className={classes.searchRadio} onChange={handleStatusCd}>
                                <RadioGroup row value={statusCd === "" ? "" : statusCd}>
                                    <FormControlLabel
                                        value=""
                                        label="전체"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                value=""
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        value="001"
                                        label="요청중"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                value={"001"}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        value="002"
                                        label="접수"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                value={"002"}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        value="003"
                                        label="진행중"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                value={"003"}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        value="004"
                                        label="조치완료"
                                        control={
                                            <Radio
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                value={"004"}
                                            />
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.searchButtons}>
                        <SearchButton onClick={handleFetchList}>조회</SearchButton>
                        {currentIsClose === "1" ?
                            <RegisterButton sx={{ marginLeft: '10px' }}>등록</RegisterButton>
                        :
                            <RegisterButton sx={{ marginLeft: '10px' }} onClick={() => handleRedirect()}>등록</RegisterButton>
                        }
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.dataTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>No</div>
                        <div className={classes.tableRow}>개선조치No</div>
                        <div className={classes.tableRow}>사업장</div>
                        <div className={classes.tableRow}>요청일</div>
                        <div className={classes.tableRow}>조치요청자</div>
                        <div className={classes.tableRow}>조치요청 내용</div>
                        <div className={classes.tableRow}>완료요청일</div>
                        <div className={classes.tableRow}>조치요청 상태</div>
                    </div>
                    <>
                        {improvements?.map((improvement, index) => (
                            <div className={classes.tableBody} onDoubleClick={() => navigate(`/dashboard/employee/improvement-measures/view/${improvement.improveId}`)}>
                                <div className={classes.tableRow}>{index + 1}</div>
                                <div className={classes.tableRow}>{improvement.improveNo}</div>
                                <div className={classes.tableRow}>{improvement.workplaceName}</div>
                                <div className={classes.tableRow}>{improvement.reqDate}</div>
                                <div className={classes.tableRow}>{improvement.reqUserName}</div>
                                <div className={classes.tableRow}>{improvement.improveCn}</div>
                                <div className={classes.tableRow}>{improvement.finDate}</div>
                                <div className={classes.tableRow}>{improvement.status}</div>
                            </div>
                        ))}
                    </>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>{improvements && improvements[0]?.totalCount}</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={improvements?.length && (Math.ceil(improvements[0]?.totalCount / 10))} boundaryCount={10} shape="rounded" page={page} onChange={handlePageChange} showFirstButton showLastButton />
                    </Stack>
                    <div>
                        {/* <ExcelButton>엑셀 다운로드</ExcelButton> */}
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>

    )
}
export default List;