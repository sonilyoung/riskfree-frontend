import React from 'react';
import { DefaultLayout } from '../../../layouts/Default';

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

import searchIcon from '../../../assets/images/ic_search.png';
import radioIcon from '../../../assets/images/ic_radio.png';
import radioIconOn from '../../../assets/images/ic_radio_on.png';
import excelIcon from '../../../assets/images/ic_excel.png';

import pageFirst from '../../../assets/images/btn_first.png';
import pageLast from '../../../assets/images/btn_last.png';
import pageNext from '../../../assets/images/btn_nxt.png';
import pagePrev from '../../../assets/images/btn_pre.png';

import checkIcon from '../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../assets/images/ic_chk3_on.png';

import popupClose from '../../../assets/images/btn_popClose.png';

import Alert from '@mui/material/Alert';
import alertIcon from '../../../assets/images/ic_refer.png';

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
        },
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
        borderRadius: '5px',
        boxShadow: '0 0 12px rgb(0 0 0 / 10%)',
        marginBottom: '40px !important',
        background: '#fff',
        overflow: 'hidden',
        minWidth: '1783px',
        '&.popup_table': {
            minWidth: 'unset',
            marginTop: '20px',
            marginBottom: '20px !important',
            '& [class*=tableRow]': {
                width: '100% !important',
                height: '50px',
                '&:first-of-type': {
                    width: '80px !important'
                },
                '&:nth-of-type(2)': {
                    width: '400px !important'
                },
                '&:last-of-type': {
                    width: '180px !important'
                },
            },
            '& [class*=tableHead]': {
                '& [class*=tableRow]': {

                }
            },
            '& [class*=tableBody]': {
                '& [class*=tableRow]': {

                }
            },

        },
    },
    tableHead: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        letterSpacing: '-1.08px',
        '& [class*=tableRow]': {
            background: '#bdcbe9',
            borderRight: '1px solid #fff',
            fontSize: '17px',
            fontWeight: '500',
            height: '100px',
            '&:last-of-type': {
                borderRight: '0'
            },
            '&.header_nest': {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                padding: '0',
                background: '#DEEBF7',
                '& >div': {
                    display: 'flex',
                    alignItems: 'center',
                    height: '50%',
                    width: '100%',
                    '&:first-of-type': {
                        justifyContent: 'center',
                        background: '#bdcbe9',
                    },
                    '&:last-of-type': {
                        display: 'flex',
                        borderBottom: '1px solid #bdcbe9',
                        boxSizing: 'border-box',
                        width: '959px',
                        '& >div': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '120px',
                            height: '100%',
                            borderRight: '1px solid #bdcbe9',
                            '&:last-of-type': {
                                borderRight: 'none'
                            }
                        }
                    },
                }
            },
            '&:first-of-type': {
                width: '60px'
            },
            '&:nth-of-type(2)': {
                width: '120px'
            },
            '&:nth-of-type(3)': {
                width: '200px'
            },
            '&:nth-of-type(4)': {
                width: '285px'
            },
            '&:nth-of-type(5)': {
                width: '160px'
            },
            '&:nth-of-type(6)': {
                width: '963px'
            },
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
            '&:nth-of-type(6), &:nth-of-type(7), &:nth-of-type(8)': {
                justifyContent: 'flex-start',
            },
            '&:first-of-type': {
                width: '60px'
            },
            '&:nth-of-type(2)': {
                width: '120px'
            },
            '&:nth-of-type(3)': {
                width: '200px'
            },
            '&:nth-of-type(4)': {
                width: '284px'
            },
            '&:nth-of-type(5)': {
                width: '160px'
            },
            '&:nth-of-type(n + 6)': {
                width: '120px'
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
        boxSizing: 'border-box',
        padding: '13px 12px',
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
    headerPopup: {
        display: 'none !important',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '700px',
        height: '500px',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
    },
    popHeader: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '54px',
        paddingLeft: '20px',
        backgroundImage: 'linear-gradient(#0943c3, #0481d8)',
        color: '#fff',
        fontSize: '20px',
        '& button': {
            position: 'absolute',
            right: '0px',
            marginRight: '20px'
        },
        display: "none !important"
    },
    popupBody: {
        padding: '20px',
        '& button': {
            float: 'right'
        },
        display: "none !important"
    },
    popTop: {
        display: 'flex',
        flexWrap: 'wrap',
        '& >div': {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            '& >div': {
                padding: '10px',
                '&:first-of-type': {
                    width: '80px'
                }
            }
        },
        display: "none !important"
    },
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        boxShadow: '0 0 12px rgb(0 0 0 / 10%)',
        display: 'none !important',
        '& >span': {
            width: '30%',
            height: '20px',
            borderBottom: '1px solid #bdcbe9',
            transform: 'translateY(-5px)',
            '&:nth-of-type(2)': {
                width: '40%',
                border: 'none',
                padding: '0 10px',
                boxSizing: 'border-box',
                textAlign: 'center',
                transform: 'unset',
            }
        },
        '& >button': {
            position: 'absolute',
            top: '0px',
            right: '-65px'
        }
    },
    uploadInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50%',
        whiteSpace: 'initial',
        '& >*': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& img': {
            width: '30px',
            height: '30px',
        },
    },
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& button:first-of-type': {
            marginLeft: '10px'
        }
    },
    popupTextField: {
        marginBottom: '10px !important',
        overflow: 'hidden',
        height: '40px',
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
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

const ButtonClosePop = styled(ButtonUnstyled)`
    width: 24px;
    height: 24px;
    background: url(${popupClose}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
`;

const NoButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #fff;
    color: #333;
    border: 2px solid #018de7;
    border-radius: 5px;
    font-size: 16px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        background: #018de7;
        color: #fff;
        border-color: #018de7;
    }
`;

const UnknownButton1 = styled(ButtonUnstyled)`
    width: 150px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 46px;
    background: #00adef;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298;
    }   
`;

const UnknownButton2 = styled(ButtonUnstyled)`
    width: 200px;
    height: 46px;
    color: #000;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 46px;
    background: #eff2f9;
    border: 2px solid #00adef;
    cursor: pointer;
    transition: border-color .2s;
    &:hover {
        border-color: #3a5298;
    }  
`;

const WorkHistoryList = () => {
    const classes = useStyles();

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        안전작업허가 공사현황 관리
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div>
                        <div className={classes.searchInfo}>
                            <div>
                                <div className={classes.infoTitle}>사업장</div>
                                <Select
                                    className={classes.selectMenu}
                                    sx={{ width: 210 }}
                                    value={num}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">전체</MenuItem>
                                </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>등록일</div>
                                <TextField
                                    sx={{ width: 180 }}
                                    id="date"
                                    className={classes.selectMenu}
                                    type="date"
                                />
                            </div>
                            <div>
                                <div className={classes.infoTitle}>등록자</div>
                                <TextField
                                    variant="outlined"
                                    placeholder="홍길동"
                                    sx={{ width: 200 }}
                                    className={classes.selectMenu}
                                />
                            </div>
                        </div>
                        <div className={classes.searchButtons}>
                            <SearchButton>조회</SearchButton>
                            <RegisterButton sx={{ marginLeft: '10px' }}>등록</RegisterButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.dataTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>No</div>
                        <div className={classes.tableRow}>사업장</div>
                        <div className={classes.tableRow}>등록일시</div>
                        <div className={classes.tableRow}>등록자</div>
                        <div className={classes.tableRow + ' header_nest'}>
                            <div>등록정보</div>
                            <div>
                                <div>화기</div>
                                <div>밀폐</div>
                                <div>정전</div>
                                <div>굴착</div>
                                <div>방사선</div>
                                <div>고소</div>
                                <div>중장비</div>
                                <div>합계</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>1</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>3</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>4</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>5</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>6</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>7</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>8</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>9</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>10</div>
                        <div className={classes.tableRow}>울산</div>
                        <div className={classes.tableRow}>2022-01-03 14:00</div>
                        <div className={classes.tableRow}>홍길동</div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}></div>
                        <div className={classes.tableRow}>2건</div>
                    </div>
                    <div className={classes.headerPopup}>
                        <div className={classes.popHeader}>
                            안전작업허가 공사내역 관리
                            <ButtonClosePop></ButtonClosePop>
                        </div>
                        <div className={classes.popupBody}>
                            <div className={classes.popTop}>
                                <div>
                                    <div>사업장</div>
                                    <div><strong>여수</strong></div>
                                </div>
                                <div>
                                    <div>자이그브</div>
                                    <div><strong>구차</strong></div>
                                </div>
                                <div>
                                    <div>등록일</div>
                                    <div><strong>2022-04-01</strong></div>
                                </div>
                            </div>
                            <Grid item xs={12} className={classes.dataTable + ' popup_table'}>
                                <div className={classes.tableHead}>
                                    <div className={classes.tableRow}>No</div>
                                    <div className={classes.tableRow}>파일명</div>
                                    <div className={classes.tableRow}>다운로드/삭제</div>
                                </div>
                                <div className={classes.tableBody}>
                                    <div className={classes.tableRow}>1</div>
                                    <div className={classes.tableRow}>공사내역_광명기업_2022033101.xlsx</div>
                                    <div className={classes.tableRow}></div>
                                </div>
                                <div className={classes.tableBody}>
                                    <div className={classes.tableRow}>2</div>
                                    <div className={classes.tableRow}>공사내역_광명기업_2022033101.xlsx</div>
                                    <div className={classes.tableRow}></div>
                                </div>
                                <div className={classes.tableBody}>
                                    <div className={classes.tableRow}>3</div>
                                    <div className={classes.tableRow}>공사내역_광명기업_2022033101.xlsx</div>
                                    <div className={classes.tableRow}></div>
                                </div>
                            </Grid>
                            <NoButton>취소</NoButton>
                        </div>
                    </div>
                    <div className={classes.uploadPopup}>
                        <div className={classes.uploadInfo}>
                            <img src={alertIcon} alt="alert icon" />
                            <span>업로드 양식을 다운로드하신 후 임의로 수정하시면 | 업로드가 안되니 수정하시 마시기 바랍니다.</span>
                            <UnknownButton2>업로드 양식 다운로드</UnknownButton2>
                        </div>
                        <span></span>
                        <span>작성파일 업로드</span>
                        <span></span>
                        <div className={classes.uploadSearch}>
                            <TextField
                                id="standard-basic"
                                placeholder="20220802 경영방침내.xsX"
                                variant="outlined"
                                sx={{ width: 250 }}
                                className={classes.popupTextField}
                            />
                            <UnknownButton1>파일 업로드</UnknownButton1>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <Stack spacing={2}>
                        <Pagination count={10} boundaryCount={10} shape="rounded" showFirstButton showLastButton />
                    </Stack>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default WorkHistoryList;
