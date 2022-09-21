import React from 'react';
import { DefaultLayout } from '../../../layouts/Default';

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

import searchIcon from '../../../assets/images/ic_search.png';
import radioIcon from '../../../assets/images/ic_radio.png';
import radioIconOn from '../../../assets/images/ic_radio_on.png';
import excelIcon from '../../../assets/images/ic_excel.png';

import pageFirst from '../../../assets/images/btn_first.png';
import pageLast from '../../../assets/images/btn_last.png';
import pageNext from '../../../assets/images/btn_nxt.png';
import pagePrev from '../../../assets/images/btn_pre.png';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';


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
        background: '#fff',
        '& $searchInfo >div': {
            '&:last-of-type >div +div': {
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '6px',
                paddingLeft: '10px',
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
        '& $tableRow': {
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

const IMStatus = () => {
    const classes = useStyles();

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    const [date1, setDate1] = React.useState(null),
          [date2, setDate2] = React.useState(null);

    const [locale] = React.useState('ko');


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
                                    sx={{width: 204}}
                                    value={num}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">전체</MenuItem>
                                </Select>
                        </div>
                        <div>
                            <div className={classes.infoTitle}>요청일자</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                <DesktopDatePicker
                                    className={classes.selectMenuDate}
                                    label=" "
                                    inputFormat="YYYY-MM-DD"
                                    value={date1}
                                    onChange={setDate1}
                                    renderInput={(params) => <TextField {...params} sx={{width: 140}} />}
                                />
                            </LocalizationProvider>
                            &nbsp;~&nbsp;
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                <DesktopDatePicker
                                    className={classes.selectMenuDate}
                                    label=" "
                                    inputFormat="YYYY-MM-DD"
                                    value={date2}
                                    onChange={setDate2}
                                    renderInput={(params) => <TextField {...params} sx={{width: 140}} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div>
                            <div className={classes.infoTitle}>요청자</div>
                            <Select
                                sx={{width: 160}}
                                className={classes.selectMenu}
                                value={num}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="">전체</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <div className={classes.infoTitle}>조치상태</div>
                            <FormControl className={classes.searchRadio}>
                                <RadioGroup row>
                                    <FormControlLabel
                                        value="요청중"
                                        label="요청중"
                                        control={
                                            <Radio 
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                            />
                                        } 
                                    />
                                    <FormControlLabel
                                        value="접수"
                                        label="접수"
                                        control={
                                            <Radio 
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                            />
                                        } 
                                    />
                                    <FormControlLabel
                                        value="진행중"
                                        label="진행중"
                                        control={
                                            <Radio 
                                                icon={<img src={radioIcon} alt="check icon" />}
                                                checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                            />
                                        } 
                                    />
                                    <FormControlLabel
                                        value="조치완료"
                                        label="조치완료"
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
                        <SearchButton>조회</SearchButton>
                        <RegisterButton sx={{marginLeft: '10px'}}>등록</RegisterButton>
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
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>10</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>9</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>8</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>7</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>6</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>5</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>4</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>3</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>1</div>
                        <div className={classes.tableRow}>CE-001</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>대표이사</div>
                        <div className={classes.tableRow}>지하배관시설 누수에 따른 조치 요청</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>요청중</div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>126</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={10} boundaryCount={10} shape="rounded" showFirstButton showLastButton />
                    </Stack>
                    <div>
                        {/* <ExcelButton>엑셀 다운로드</ExcelButton> */}
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default IMStatus;
