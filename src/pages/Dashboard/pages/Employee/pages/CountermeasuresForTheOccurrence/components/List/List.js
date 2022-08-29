import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { DefaultLayout } from '../../../../../../../../layouts/Default';

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

import { useAccidentSelectMutation, useAccidentOccurPlaceSelectMutation } from '../../../../../../../../hooks/api/AccidentManagement/AccidentManagement';
import { useGetWorkplaceListMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';



const useStyles = makeStyles(() => ({
    pageWrap: {
        // minHeight: 'calc(100vh - 94px)',
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
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
        '& >div:first-of-type [class*=searchRadio]': {
            width: '640px',
        }
    },
    searchRadio: {
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
                marginLeft: '58px'
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
        '& [class*=tableRow]': {
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
        '& [class*=tableRow]': {
            background: 'transparent',
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: '0',
            },
            '&:nth-of-type(8), &:nth-of-type(9)': {
                justifyContent: 'flex-start',
            },
        },
        '&:last-of-type [class*=tableRow]': {
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
            minWidth: '148px'
        },
        '&:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5)': {
            minWidth: '120px'
        },
        '&:nth-of-type(6)': {
            minWidth: '240px'
        },
        '&:nth-of-type(7)': {
            minWidth: '110px'
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
                    display: 'none'
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
        overflow: 'hidden',
        '& div': {
            height: 'inherit',
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
    const navigate = useNavigate()
    const [accidentSelect] = useAccidentSelectMutation()
    const [accidentOccurPlaceSelect] = useAccidentOccurPlaceSelectMutation()
    const [getWorkplaceList] = useGetWorkplaceListMutation()
    const [workplaceList, setWorkplaceList] = useState([])
    const [accidents, setAccidents] = useState([])
    const [occurPlacesList, setOccurPlacesList] = useState([])
    const [accTypeAll, setAccTypeAll] = useState(false)
    const [accTypeFirst, setAccTypeFirst] = useState(false)
    const [accTypeSecond, setAccTypeSecond] = useState(false)
    const [accTypeThird, setAccTypeThird] = useState(false)
    const [accTypeFourth, setAccTypeFourth] = useState(false)
    const [accTypeFifth, setAccTypeFifth] = useState(false)
    const [accTypeSixth, setAccTypeSixth] = useState(false)
    const [accLevelCd, setAccLeveCd] = useState("")
    const [accTypeCd, setAccTypeCd] = useState("")
    const [managerName, setManagerName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [finishDate, setFinishDate] = useState("")
    const [workplaceSelect, setWorkplaceSelect] = useState("")
    const [occurPlaceSelect, setOccurPlaceSelect] = useState("")
    const [page, setPage] = useState(1)


    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

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
                break
            case "02": setAccTypeSecond(!accTypeSecond)
                break
            case "03": setAccTypeThird(!accTypeThird)
                break
            case "04": setAccTypeFourth(!accTypeFourth)
                break
            case "05": setAccTypeFifth(!accTypeFifth)
                break
            case "06": setAccTypeSixth(!accTypeSixth)
                break
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
        console.log(accTypeFirst, accTypeSecond, accTypeThird, accTypeFourth, accTypeFifth, accTypeSixth)
    };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        } else {
            setterFunction(id)
        }
        console.log(accTypeFirst, accTypeSecond, accTypeThird, accTypeFourth, accTypeFifth, accTypeSixth)
    };

    useEffect(() => {
        setList(checkList);
    }, [list]);

    const [num, setNum] = useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

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
            "baselineId": 6,
            "countPerPage": 10,
            "endDate": finishDate,
            "managerName": managerName,
            "occurPlace": occurPlaceSelect,
            "pageNum": page,
            "startDate": startDate,
            "workplaceId": workplaceSelect
        })
        setAccidents(response.data.RET_DATA)
    }

    const fetchWorkplaceList = async () => {
        const response = await getWorkplaceList()
        setWorkplaceList(response.data.RET_DATA)
    }

    const fetchAccidentOccurPlacesList = async () => {
        const response = await accidentOccurPlaceSelect(6)
        setOccurPlacesList(response.data.RET_DATA)
    }

    const handleAccTypeCd = (e) => {
        setAccTypeCd(e.target.value)
    }


    const handleStartDate = (e) => {
        setStartDate(e.target.value)
    }

    const handleFinishDate = (e) => {
        setFinishDate(e.target.value)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    // const accTypeCdAll = () => {
    //     setAccTypeAll(!accTypeAll)
    //     if (accTypeAll) {
    //         setAccTypeFirst("001")
    //         setAccTypeSecond("002")
    //         setAccTypeThird("003")
    //         setAccTypeFourth("004")
    //         setAccTypeFifth("005")
    //         setAccTypeSixth("006")
    //     } else {
    //         setAccTypeFirst("")
    //         setAccTypeSecond("")
    //         setAccTypeThird("")
    //         setAccTypeFourth("")
    //         setAccTypeFifth("")
    //         setAccTypeSixth("")
    //     }
    //     console.log(accTypeAll, accTypeFirst, accTypeSecond, accTypeThird, accTypeFourth, accTypeFifth, accTypeSixth)
    // }
    // const accTypeCdFirst = () => {
    //     setAccTypeSecond(accTypeSecond ? "" : "002")
    // }
    // const accTypeCdFirst = () => {
    //     setAccTypeFirst(accTypeFirst ? "" : "001")
    // }
    // const accTypeCdFirst = () => {
    //     setAccTypeFirst(accTypeFirst ? "" : "001")
    // }
    // const accTypeCdFirst = () => {
    //     setAccTypeFirst(accTypeFirst ? "" : "001")
    // }
    // const accTypeCdFirst = () => {
    //     setAccTypeFirst(accTypeFirst ? "" : "001")
    // }

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
                                <Select
                                    className={classes.selectMenu}
                                    sx={{ width: 204 }}
                                    value={workplaceSelect}
                                    onChange={(e) => setWorkplaceSelect(e.target.value)}
                                    displayEmpty
                                >
                                    {workplaceList && workplaceList.map((workplace) => (<MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>))}
                                </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>재해유형</div>
                                <label>
                                    <Checkbox
                                        icon={<img src={checkIcon} alt="check icon" />}
                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                        onChange={handleSelectAll}
                                        checked={isCheckAll}
                                    />
                                    Select All
                                </label>
                                {list.map(({ id, label, value }) => (
                                    <label>
                                        <Checkbox
                                            id={id}
                                            icon={<img src={checkIcon} alt="check icon" />}
                                            checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                            value={value}
                                            checked={isCheck.includes(id)}
                                            onChange={handleClick}
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>
                            <div>
                                <div className={classes.infoTitle}>사고등급</div>
                                <Select
                                    sx={{ width: 100 }}
                                    className={classes.selectMenu}
                                    value={accLevelCd}
                                    onChange={(e) => setAccLeveCd(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="001">1급</MenuItem>
                                    <MenuItem value="002">2급</MenuItem>
                                    <MenuItem value="003">3급</MenuItem>
                                    <MenuItem value="004">4급</MenuItem>
                                    <MenuItem value="005">5급</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={classes.searchInfo}>
                            <div>
                                <div className={classes.infoTitle}>발생장소</div>
                                <Select
                                    className={classes.selectMenu}
                                    sx={{ width: 204 }}
                                    value={occurPlaceSelect}
                                    onChange={(e) => setOccurPlaceSelect(e.target.value)}
                                    displayEmpty
                                >
                                    {occurPlacesList && occurPlacesList.map((occurPlace) => (<MenuItem value={occurPlace.occurplace}>{occurPlace.occurplace}</MenuItem>))}
                                </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>발행일자</div>
                                <TextField
                                    sx={{ width: 140 }}
                                    id="date"
                                    className={classes.selectMenu}
                                    type="date"
                                    format={"YYY-MM-DD"}
                                    value={startDate}
                                    onInput={handleStartDate}
                                />
                                &nbsp;~&nbsp;
                                <TextField
                                    sx={{ width: 140 }}
                                    id="date"
                                    className={classes.selectMenu}
                                    type="date"
                                    ormat={"YYY-MM-DD"}
                                    value={finishDate}
                                    onInput={handleFinishDate}
                                />
                            </div>
                            <div>
                                <div className={classes.infoTitle}>현장 책임자</div>
                                <TextField
                                    id="standard-basic"
                                    // placeholder="이름입력"
                                    variant="outlined"
                                    sx={{ width: 185 }}
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
                            <RegisterButton sx={{ marginLeft: '10px' }} onClick={() => handleRedirect()}>등록</RegisterButton>
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
                        <div className={classes.tableRow}>발생장소</div>
                        <div className={classes.tableRow}>현장책임자</div>
                        <div className={classes.tableRow}>발생원인</div>
                        <div className={classes.tableRow}>재해발생대책</div>
                        <div className={classes.tableRow}>이행실적</div>
                    </div>
                    <>
                        {accidents && accidents.map((accident) => (<div className={classes.tableBody} onDoubleClick={() => navigate(`/dashboard/employee/accident-countermeasures-implementation/view/${accident.accidentId}`)}>
                            <div className={classes.tableRow}>{accident.occurYear}</div>
                            <div className={classes.tableRow}>{accident.workplaceName}</div>
                            <div className={classes.tableRow}>{accident.occurDate}</div>
                            <div className={classes.tableRow}>{accident.accType001 || accident.accType002 || accident.accType003 || accident.accType004 || accident.accType005 || accident.accType006}</div>
                            <div className={classes.tableRow}>{accident.accLevel}</div>
                            <div className={classes.tableRow}>{accident.occurPlace}</div>
                            <div className={classes.tableRow}>{accident.managerName}</div>
                            <div className={classes.tableRow}>{accident.occurReason}</div>
                            <div className={classes.tableRow}>{accident.preventCn}</div>
                            <div className={classes.tableRow}>&nbsp;</div>
                        </div>))}
                    </>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>{accidents[0]?.totalCount}</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={(Math.ceil(accidents[0]?.totalCount / 10))} boundaryCount={10} shape="rounded" page={page} onChange={handlePageChange} showFirstButton showLastButton />
                    </Stack>
                    <div>
                        <ExcelButton>엑셀 다운로드</ExcelButton>
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    )
}

export default List