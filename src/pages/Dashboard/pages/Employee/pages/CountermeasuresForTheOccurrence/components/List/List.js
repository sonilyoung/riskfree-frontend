import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
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

import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useAccidentSelectMutation, useAccidentOccurPlaceSelectMutation } from '../../../../../../../../hooks/api/AccidentManagement/AccidentManagement';
import { useGetWorkplaceListMutation, useGetLoginInfoMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import 'dayjs/locale/ko';
import moment from "moment"
import { selectBaselineId, selectIsClose, selectWorkplaceId } from '../../../../../../../../slices/selections/MainSelection';
import { useSelector } from 'react-redux';
import useUserInitialWorkplaceId from '../../../../../../../../hooks/core/UserInitialWorkplaceId/UserInitialWorkplaceId';

const List = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const getInitialWorkplaceId = useUserInitialWorkplaceId();
    const [accidentSelect] = useAccidentSelectMutation()
    const [accidentOccurPlaceSelect] = useAccidentOccurPlaceSelectMutation()
    const [getWorkplaceList] = useGetWorkplaceListMutation()
    const [workplaceList, setWorkplaceList] = useState([])
    const [accidents, setAccidents] = useState([])
    const [occurPlacesList, setOccurPlacesList] = useState([])
    const [accTypeFirst, setAccTypeFirst] = useState(false)
    const [accTypeSecond, setAccTypeSecond] = useState(false)
    const [accTypeThird, setAccTypeThird] = useState(false)
    const [accTypeFourth, setAccTypeFourth] = useState(false)
    const [accTypeFifth, setAccTypeFifth] = useState(false)
    const [accTypeSixth, setAccTypeSixth] = useState(false)
    const [accLevelCd, setAccLeveCd] = useState("")
    const [accTypeCd, setAccTypeCd] = useState("")
    const [managerName, setManagerName] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [finishDate, setFinishDate] = useState(null)
    const [workplaceSelect, setWorkplaceSelect] = useState(getInitialWorkplaceId())
    const [occurPlaceSelect, setOccurPlaceSelect] = useState("")
    const [page, setPage] = useState(1)
    const [death, setDeath] = useState(false)
    const [job, setJob] = useState(false)
    const [same, setSame] = useState(false)
    const [locale] = React.useState('ko');

    const currentBaseline = useSelector(selectBaselineId);
    const currentIsClose = useSelector(selectIsClose);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    const [typeCheckAll, setTypeCheckAll] = useState(false);
    
    console.log(workplaceSelect)
    const checkList = [
        {
            id: "01",
            label: "추락",
            value: "001"
        },
        {
            id: "02",
            label: "끼임",
            value: "002"
        },
        {
            id: "03",
            label: "화재",
            value: "003"
        },
        {
            id: "04",
            label: "전기",
            value: "004"
        },
        {
            id: "05",
            label: "밀폐",
            value: "005"
        },
        {
            id: "06",
            label: "중량물",
            value: "006"
        }
    ]

    const setterFunction = (id) => {
        switch (id) {
            case "01": setAccTypeFirst(!accTypeFirst)
                break;
            case "02": setAccTypeSecond(!accTypeSecond)
                break;
            case "03": setAccTypeThird(!accTypeThird)
                break;
            case "04": setAccTypeFourth(!accTypeFourth)
                break;
            case "05": setAccTypeFifth(!accTypeFifth)
                break;
            case "06": setAccTypeSixth(!accTypeSixth)
                break;
        }
    }

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
            setAccTypeFirst(false)
            setAccTypeSecond(false)
            setAccTypeThird(false)
            setAccTypeFourth(false)
            setAccTypeFifth(false)
            setAccTypeSixth(false)
        } else {
            setAccTypeFirst(true)
            setAccTypeSecond(true)
            setAccTypeThird(true)
            setAccTypeFourth(true)
            setAccTypeFifth(true)
            setAccTypeSixth(true)
        }
        //console.log(accTypeFirst, accTypeSecond, accTypeThird, accTypeFourth, accTypeFifth, accTypeSixth)
    };

    const handleTypeAll = e => {
        setTypeCheckAll(!typeCheckAll)
        if (typeCheckAll) {
            setDeath(false);
            setJob(false);
            setSame(false);
        } else {
            setDeath(true);
            setJob(true);
            setSame(true);
        }
    }

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        setterFunction(id)
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
        //console.log(accTypeFirst, accTypeSecond, accTypeThird, accTypeFourth, accTypeFifth, accTypeSixth)
    };

    /* Data: 2022.10.03 author:Jimmy add: 로그인 정보 호출 및 설정 */
    const [loginInfos, setLoginInfos] = useState({});
    const [getLoginInfo] = useGetLoginInfoMutation()
    const fetchLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfos(response.data.RET_DATA)
    }
    
    useEffect(() => {
        fetchLoginInfo()
        setList(checkList);
    }, []);
    
    const [num, setNum] = useState('');

    const handleRedirect = () => {
        navigate("/dashboard/employee/accident-countermeasures-implementation/registration")
    }
    const fetchAccidentsList = async () => {
        const response = await accidentSelect({
            "accLevelCd": accLevelCd,
            "accTypeCd001": accTypeFirst ? "001" : "",
            "accTypeCd002": accTypeSecond ? "002" : "",
            "accTypeCd003": accTypeThird ? "003" : "",
            "accTypeCd004": accTypeFourth ? "004" : "",
            "accTypeCd005": accTypeFifth ? "005" : "",
            "accTypeCd006": accTypeSixth ? "006" : "",
            "accidentTypeCd": accTypeCd,
            "baselineId": currentBaseline,
            "countPerPage": 10,
            "death": death ? "Y" : "",
            "endDate": finishDate,
            "job": job ? "Y" : "",
            "managerName": managerName,
            "occurPlace": occurPlaceSelect,
            "pageNum": page,
            "same": same ? "Y" : "",
            "startDate": startDate,
            "workplaceId": workplaceSelect
        })
        setAccidents(response.data.RET_DATA)
        //console.log(response);
    }

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList()
        setWorkplaceList(response.data.RET_DATA)
    }

    const fetchAccidentOccurPlacesList = async () => {
        const response = await accidentOccurPlaceSelect(
                {
                "baselineId" : currentBaseline,
                "workplaceId": workplaceSelect
                }
            )
        setOccurPlacesList(response.data.RET_DATA)
    }

    const handleAccTypeCd = (e) => {
        setAccTypeCd(e.target.value)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const DateChange = name => (date) => {
        if(name === 'startDate') {
            setStartDate(date);
        } else {
            setFinishDate(date);
        }
    };    

    useEffect(() => {
        fetchAccidentsList()
        fetchWorkplaceList()
        fetchAccidentOccurPlacesList()
    }, [page])

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        재해발생 및 방지대책 등 이행현황
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div>
                        <div className={classes.searchInfo}>    
                            <div>
                                <div className={classes.infoTitle}>사업장</div>
                                {loginInfos.roleCd === '001' ?
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{ width: 204 }}
                                        key={workplaceSelect === null ? "" : workplaceSelect }
                                        value={workplaceSelect === null ? "" : workplaceSelect }
                                        onChange={(e) => setWorkplaceSelect(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="">전체</MenuItem>
                                        {workplaceList && workplaceList.map((workplace) => (<MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>))}
                                    </Select>
                                :
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{ width: 204 }}
                                        value={loginInfos.workplaceId}
                                        defaultValue={loginInfos.workplaceId}
                                        key={loginInfos.workplaceId}
                                        displayEmpty
                                    >
                                        <MenuItem value={loginInfos.workplaceId}>{loginInfos.workplaceName}</MenuItem>
                                    </Select>
                                }
                            </div>
                            <div>
                                <div className={classes.infoTitle}>재해유형</div>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value=""
                                            label="전체"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    onChange={handleSelectAll}
                                                    checked={isCheckAll}
                                                />
                                            }
                                        />
                                        {list.map(({ id, label, value }) => (
                                            <FormControlLabel
                                                value={value}
                                                label={label}
                                                control={
                                                    <Checkbox
                                                        id={id}
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                        value={value}
                                                        checked={isCheck.includes(id)}
                                                        onClick={handleClick}
                                                    />
                                                }
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>사고등급</div>
                                
                                <Select
                                    sx={{ width: 100}}
                                    className={classes.selectMenu}
                                    style={{backgroundColor: '#fff', }}
                                    value={accLevelCd === "" ? "" : accLevelCd }
                                    onChange={(e) => setAccLeveCd(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">전체</MenuItem>
                                    <MenuItem value="001">1급</MenuItem>
                                    <MenuItem value="002">2급</MenuItem>
                                    <MenuItem value="003">3급</MenuItem>
                                    <MenuItem value="004">4급</MenuItem>
                                    <MenuItem value="005">5급</MenuItem>
                                </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>사고유형</div>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value=""
                                            label="전체"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    onChange={handleTypeAll}
                                                    checked={typeCheckAll}
                                                />
                                            }
                                        />

                                        <FormControlLabel
                                            value="Y"
                                            label="사망"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    checked={death}
                                                    onChange={() => setDeath(!death)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="Y"
                                            label="동일사고유형"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    checked={job}
                                                    onChange={() => setJob(!job)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="Y"
                                            label="직업성질환"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    checked={same}
                                                    onChange={() => setSame(!same)}
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
                                <div className={classes.infoTitle}>발생장소</div>
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    sx={{ width: 205 }}
                                    className={classes.selectMenu}
                                    value={occurPlaceSelect}
                                    onChange={(e) => setOccurPlaceSelect(e.target.value)}
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
                                        value={finishDate}
                                        isClearable
                                        onChange={DateChange('finishDate')}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 140 }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>현장 책임자</div>
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    sx={{ width: 195 }}
                                    className={classes.selectMenu}
                                    value={managerName}
                                    onChange={(e) => setManagerName(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className={classes.infoTitle}>사고구분</div>
                                <FormControl className={classes.searchRadio} onChange={handleAccTypeCd}>
                                    <RadioGroup row value={accTypeCd}>
                                        <FormControlLabel
                                            value="001"
                                            label="자사"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="002"
                                            label="도급"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="003"
                                            label="기타"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className={classes.searchButtons}>
                            <SearchButton onClick={fetchAccidentsList}>조회</SearchButton>
                            {currentIsClose === "1" ?
                                <RegisterButton sx={{ marginLeft: '10px' }}>등록</RegisterButton>
                            :
                                <RegisterButton sx={{ marginLeft: '10px' }} onClick={() => handleRedirect()}>등록</RegisterButton>
                            }

                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.dataTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>발생년도</div>
                        <div className={classes.tableRow}>사업장</div>
                        <div className={classes.tableRow}>발생일자</div>
                        <div className={classes.tableRow}>재해종류</div>
                        <div className={classes.tableRow}>사고등급</div>
                        <div className={classes.tableRow}>사망</div>
                        <div className={classes.tableRow}>동일사고유형</div>
                        <div className={classes.tableRow}>직업성질환</div>
                        <div className={classes.tableRow}>발생장소</div>
                        <div className={classes.tableRow}>현장책임자</div>
                        <div className={classes.tableRow}>발생원인</div>
                        <div className={classes.tableRow}>재해발생대책</div>
                        {/* <div className={classes.tableRow}>이행실적</div> */}
                    </div>
                    <>
                        {accidents && accidents?.map((accident) => (<div className={classes.tableBody} onDoubleClick={() => navigate(`/dashboard/employee/accident-countermeasures-implementation/view/${accident.accidentId}`)}>
                            <div className={classes.tableRow}>{accident.occurYear}</div>
                            <div className={classes.tableRow}>{accident.workplaceName}</div>
                            <div className={classes.tableRow}>{accident.occurDate}</div>
                            <div className={classes.tableRow}>{accident.accType001 || accident.accType002 || accident.accType003 || accident.accType004 || accident.accType005 || accident.accType006}</div>
                            <div className={classes.tableRow}>{accident.accLevel}</div>
                            <div className={classes.tableRow}>{accident.deathToll === 0 ? "" : accident.deathToll}</div>
                            <div className={classes.tableRow}>{accident.sameAccidentInjury === 0 ? "" : accident.sameAccidentInjury}</div>
                            <div className={classes.tableRow}>{accident.jobDeseaseToll === 0 ? "" : accident.jobDeseaseToll}</div>
                            <div className={classes.tableRow}>{accident.occurPlace}</div>
                            <div className={classes.tableRow}>{accident.managerName}</div>
                            <div className={classes.tableRow}>{accident.occurReason}</div>
                            <div className={classes.tableRow}>{accident.preventCn}</div>
                            {/* <div className={classes.tableRow}>&nbsp;</div> */}
                        </div>))}
                    </>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>{accidents && accidents[0]?.totalCount}</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={accidents?.length && (Math.ceil(accidents[0]?.totalCount / 10))} boundaryCount={10} shape="rounded" page={page} onChange={handlePageChange} showFirstButton showLastButton />
                    </Stack>
                    <div>
                        {/* <ExcelButton>엑셀 다운로드</ExcelButton> */}
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    )
}

export default List