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
        '& >div:first-of-type [class*=searchInfo] >div:nth-of-type(2), & >div:last-of-type [class*=searchInfo] >div:nth-of-type(2)': {
            width: '700px',
        },
        '& >div:first-of-type [class*=searchInfo] >div:last-of-type, & >div:last-of-type [class*=searchInfo] >div:last-of-type': {
            marginLeft: '30px'
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
            '&:nth-of-type(6), &:nth-of-type(7), &:nth-of-type(8)': {
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
            minWidth: '150px'
        },
        '&:nth-of-type(3), &:nth-of-type(4)': {
            minWidth: '120px'
        },
        '&:nth-of-type(5), &:nth-of-type(6)': {
            minWidth: '240px'
        },
        '&:nth-of-type(7), &:nth-of-type(8)': {
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

const OICLaw = () => {
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
                                        sx={{width: 204}}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">여수사업장</MenuItem>
                                    </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>조치요청 명령구분</div>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value="전체"
                                            label="전체"
                                            control={
                                                <Checkbox 
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="고용노동부"
                                            label="고용노동부"
                                            control={
                                                <Checkbox 
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="소방청(소)"
                                            label="소방청(소)"
                                            control={
                                                <Checkbox 
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="환경부(청)"
                                            label="환경부(청)"
                                            control={
                                                <Checkbox 
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="자체점검"
                                            label="자체점검"
                                            control={
                                                <Checkbox 
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>구분</div>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value="개선"
                                            label="개선"
                                            control={
                                                <Radio 
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="조치"
                                            label="조치"
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
                    </div>
                    <div>
                        <div className={classes.searchInfo}>
                            <div>
                                <div className={classes.infoTitle}>지적원인</div>
                                    <Select
                                        className={classes.selectMenu}
                                        sx={{width: 204}}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">작업감독자미배치</MenuItem>
                                    </Select>
                            </div>
                            <div>
                                <div className={classes.infoTitle}>발행일자</div>
                                    <TextField
                                        sx={{width: 140}}
                                        id="date"
                                        className={classes.selectMenu}
                                        type="date"
                                    />
                                    &nbsp;~&nbsp;
                                    <TextField
                                        sx={{width: 140}}
                                        id="date"
                                        className={classes.selectMenu}
                                        type="date"
                                    />
                            </div>
                            <div>
                                <div className={classes.infoTitle}>조치상태</div>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value="전체"
                                            label="전체"
                                            control={
                                                <Radio 
                                                    icon={<img src={radioIcon} alt="check icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="조치중"
                                            label="조치중"
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
                        <div className={classes.tableRow}>개선조치 내용</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                    <div className={classes.tableBody}>
                        <div className={classes.tableRow}>2022</div>
                        <div className={classes.tableRow}>여수</div>
                        <div className={classes.tableRow}>개선중</div>
                        <div className={classes.tableRow}>22.04.01</div>
                        <div className={classes.tableRow}>고용노동부</div>
                        <div className={classes.tableRow}>2BL-3-2공구</div>
                        <div className={classes.tableRow}>컨베이어 벨트수리중 Tag 미부착</div>
                        <div className={classes.tableRow}>전원반 Tag부착 및 안전요원 배치</div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>126</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={10} boundaryCount={10} shape="rounded" showFirstButton showLastButton />
                    </Stack>
                    <div>
                        <ExcelButton>엑셀 다운로드</ExcelButton>
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default OICLaw;
