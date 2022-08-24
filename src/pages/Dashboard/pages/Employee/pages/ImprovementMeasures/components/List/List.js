import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
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

import { useCompanyWorkplaceSelectMutation } from '../../../../../../../../hooks/api/CompanyManagement/CompanyManagement';
import { useImprovementSelectMutation } from '../../../../../../../../hooks/api/ImprovementsManagement/ImprovementsManagement'
import moment from "moment";



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
        height: '80px',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginBottom: '28px !important',
        background: '#fff'
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
        justifyContent: 'space-between',
        width: '100%',
        paddingRight: '30px',
        '& >div': {
            display: 'flex',
            alignItems: 'center'
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
        '& [class*=tableRow]': {
            background: 'transparent',
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: '0',
            },
            '&:nth-of-type(6)': {
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
        minWidth: '150px',
        boxSizing: 'border-box',
        padding: '13px 12px',
        '&:first-of-type': {
            minWidth: '90px'
        },
        '&:nth-of-type(6)': {
            width: '100%'
        }
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

function List() {
    const classes = useStyles();
    const navigate = useNavigate()
    const [companyWorkplaceSelect] = useCompanyWorkplaceSelectMutation()
    const [improvementSelect] = useImprovementSelectMutation()
    const [workplaces, setWorkplaces] = useState([])
    const [workplaceSelect, setWorkplaceSelect] = useState("")
    const [reqUser, setReqUser] = useState("")
    const [statusCd, setStatusCd] = useState("")
    const [improvements, setImprovements] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [page, setPage] = useState(1)
    const todaysDate = moment().utcOffset("+09:00").format("YYYY-MM-DD");


    const handleWorkplaceSelect = (event) => {
        setWorkplaceSelect(event.target.value);
    };

    const handleReqUserSelect = (event) => {
        setReqUser(event.target.value);
    };

    const handleStatusCd = (event) => {
        setStatusCd(event.target.value);
    };

    const handleRedirect = () => {
        navigate("/dashboard/employee/improvement-measures/registration")
    }
    const handleComapanyWorkplace = async () => {
        const response = await companyWorkplaceSelect({})
        setWorkplaces(response.data.RET_DATA)
    }

    const handleStartDate = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDate = (event) => {
        setEndDate(event.target.value)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }
    const handleFetchList = async () => {
        const response = await improvementSelect(
            {
                "companyId": null,
                "countPerPage": 10,
                "endDate": endDate,
                "improveId": null,
                "pageNum": page,
                "reqUserCd": reqUser,
                "startDate": startDate,
                "statusCd": statusCd,
                "workplaceId": workplaceSelect
            }
        )
        setImprovements(response.data.RET_DATA)
    }

    useEffect(() => {
        handleComapanyWorkplace()
        handleFetchList()
    }, [])

    useEffect(() => {
        handleFetchList()
    }, [page])

    // console.log(reqUser)
    // console.log(statusCd)
    // console.log(improvements)
    // console.log(startDate)
    // console.log(todaysDate)
    // console.log(endDate)
    // console.log(workplaces)
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
                            <Select
                                className={classes.selectMenu}
                                sx={{ width: 204 }}
                                onChange={handleWorkplaceSelect}
                                value={workplaceSelect}
                                displayEmpty
                            >
                                {workplaces?.map((workplace) => (<MenuItem value={workplace.workplaceId}>{workplace.workplaceName}</MenuItem>))}
                            </Select>
                        </div>
                        <div>
                            <div className={classes.infoTitle}>요청일자</div>
                            <TextField
                                sx={{ width: 140 }}
                                id="date"
                                className={classes.selectMenu}
                                type="date"
                                format={"YYYY-MM-DD"}
                                max={todaysDate}
                                onInput={handleStartDate}
                            />
                            &nbsp;~&nbsp;
                            <TextField
                                sx={{ width: 140 }}
                                id="date"
                                className={classes.selectMenu}
                                type="date"
                                format={"YYYY-MM-DD"}
                                max={todaysDate}
                                onInput={handleEndDate}
                            />
                        </div>
                        <div>
                            <div className={classes.infoTitle}>요청자</div>
                            <Select
                                sx={{ width: 160 }}
                                className={classes.selectMenu}
                                value={reqUser}
                                onChange={handleReqUserSelect}
                                displayEmpty
                            >
                                <MenuItem value="002">대표이사</MenuItem>
                                <MenuItem value="003">안전책임자</MenuItem>안전책임자
                                <MenuItem value="004">안전실무자</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <div className={classes.infoTitle}>조치상태</div>
                            <FormControl className={classes.searchRadio} onChange={handleStatusCd}>
                                <RadioGroup row >
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
                        <RegisterButton sx={{ marginLeft: '10px' }} onClick={() => handleRedirect()}>조회</RegisterButton>
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
                    <div>총 게시글 <strong>{improvements[0]?.totalCount}</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={(Math.ceil(improvements[0]?.totalCount / 10))} boundaryCount={10} shape="rounded" page={page} onChange={handlePageChange} showFirstButton showLastButton />
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