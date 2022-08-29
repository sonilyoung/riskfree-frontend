import React from 'react';
import { DefaultLayout } from '../../../layouts/Default';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';

import Link from '@mui/material/Link';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import iconTab from '../../../assets/images/ic_tab.png';
import iconTabOn from '../../../assets/images/ic_tab_on.png';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import searchIcon from '../../../assets/images/ic_search.png';

import pageFirst from '../../../assets/images/btn_first.png';
import pageLast from '../../../assets/images/btn_last.png';
import pageNext from '../../../assets/images/btn_nxt.png';
import pagePrev from '../../../assets/images/btn_pre.png';

import Alert from '@mui/material/Alert';
import alertIcon from '../../../assets/images/ic_refer.png';

// import popupClose from '../../../assets/images/btn_popClose.png';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles(() => ({
    pageWrap: {

    },
    headerButtons: {
        display: 'flex',
        marginTop: '10px !important',
    },
    stepBox: {
        '& .MuiStepLabel-label': {
            fontSize: '18px'
        },
        '& .MuiStepper-root': {
            marginTop: '40px',
            marginBottom: '20px'
        }
    },
    activeStep: {
        '& .MuiStepLabel-label.Mui-active': {
            color: '#018de7'
        }
    },
    buttonLink: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        height: '68px',
        width: '100%',
        marginLeft: '10px !important',
        background: '#3a5298',
        borderRadius: '5px',
        letterSpacing: '-1.08px',
        '&:first-of-type': {
            marginLeft: '0 !important'
        },
        '&.current, &:hover': {
            backgroundImage: 'linear-gradient(#04b9fb, #017dfa)'
        },
        '& span': {
            width: '100%',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '500',
            color: '#fff',
        },
    },
    boxTable: {
        minWidth: '1800px',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    tableHead: {
        background: '#bdcbe9',
        '& [class*=tableData]': {
            height: '80px',
            borderRight: '1px solid #fff',
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '100px'
            },
            '&:nth-of-type(2)': {
                width: '180px'
            },
            '&:nth-of-type(3)': {
                width: '890px',
                padding: '0',
                justifyContent: 'flex-start',
                '& >div': {
                    height: '40px',
                    width: '110px',
                    background: '#c8ddf2',
                    '&:first-of-type': {
                        width: '100%',
                        borderBottom: '1px solid #fff',
                        background: '#bdcbe9',
                    },
                    '&:nth-of-type(n+2)': {
                        borderRight: '1px solid #fff'
                    },
                    '&:nth-of-type(2)': {
                        width: '100px',
                    },
                    '&:nth-of-type(3)': {
                        width: '119px',
                    },
                    '&:last-of-type': {
                        width: '119px',
                        borderRight: 'none' 
                    },
                }
            },
            '&:nth-of-type(4)': {
                width: '110px'
            },
            '&:nth-of-type(5)': {
                width: '266px'
            },
            '&:nth-of-type(6)': {
                width: '94px'
            },
            '&:nth-of-type(7), &:nth-of-type(8)': {
                width: '80px'
            },
        }
    },
    tableBody: {
        '& [class*=tableData]': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: 'none',
            },
        },
        '& [class*=tableRow]': {
            transition: 'background .2s',
            '&:hover': {
                background: '#eff2f9'
            }
        }
    },
    tableRow: {
        display: 'flex',
        '&:last-of-type': {
            '& [class*=tableData]': {
                borderBottom: 'none'
            },
        },
    },
    tableData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        height: '40px',
        '&:first-of-type, &:nth-of-type(3)': {
            width: '100px'
        },
        '&:nth-of-type(2)': {
            width: '180px'
        },
        '&:nth-of-type(n+4)': {
            width: '110px'
        },
        '&:nth-of-type(4), &:nth-of-type(10)': {
            width: '120px'
        },
        '&:nth-of-type(12)': {
            width: '266px'
        },
        '&:nth-of-type(n+13)': {
            width: '80px'
        },
        '&:nth-of-type(13)': {
            width: '94px'
        },
    },
    searchBox: {
        minWidth: '1800px',
        position: 'relative',
        display: 'flex',
        height: '80px',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginBottom: '28px !important',
        background: '#fff'
    },
    searchInfo: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        paddingRight: '10px',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            '& >div:last-of-type': {
                marginLeft: '10px'
            }
        }
    },
    searchButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    selectMenu: {
        height: '40px',
        overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    tableTextField: {
        width: '100%',
        height: '33px',
        margin: '0 6px !important',
        '& div': {
            height: 'inherit',
        },
        '& input, & .MuiSelect-select': {
            fontSize: '16px',
            padding: '0 10px',
        }
    },
    pagingBox: {
        position: 'relative',
        height: '40px',
        marginTop: '40px !important',
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
    adminPopup: {
        // display: 'none !important',
        position: 'absolute',
        zIndex: '1',
        width: '650px',
        height: 'auto',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
        '&.regMember': {
            top: '180px',
            left: '180px',
        },
        '&.infoMember': {
            top: '180px',
            left: '900px',
            '& [class*=headNest] [class*=dataNest]': {
                background: '#c8ddf2'
            }
        },
        '&.popSettings': {
            top: '600px',
            left: '180px',
            display: 'none !important',
        },
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
        }
    },
    popButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '10px',
        marginBottom: '25px',
        '& button:last-of-type': {
            marginLeft: '10px'
        }
    },
    popupTable: {
        margin: '20px',
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px',
        overflow: 'hidden',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    popupRow: {
        display: 'flex',
        '&:first-of-type [class*=popupData]': {
            borderTop: '1px solid #bdcbe9',
            '&.data_head': {
                borderTop: '1px solid #c8ddf2',
            },
        },
        '&:last-of-type [class*=popupData]': {
            borderBottom: '1px solid #bdcbe9',
            '&.data_head': {
                borderBottom: '1px solid #c8ddf2',
            },
        },
    },
    popupData: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        minHeight: '45px',
        width: '70%',
        borderBottom: '1px solid #bdcbe9',
        '&.data_head': {
            width: '30%',
            background: '#c8ddf2',
            borderBottom: '1px solid #fff',
        },
    },
    dataNest: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        minHeight: '45px',
        borderBottom: '1px solid #bdcbe9',
        '&:last-of-type': {
            borderBottom: 'none'
        },
        '&.headTitle': {
            display: 'flex',
            '& >div': {
                display: 'flex',
                alignItems: 'center',
                width: '162px',
                height: '44px',
                '&:nth-of-type(2)': {
                    width: '100px',
                    background: '#bdcbe9',
                    borderBottom: '1px solid #fff'
                }
            },
        }
    },
    headNest: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '&:first-of-type': {
            width: '45%',
            borderRight: '1px solid #fff',
        },
        '&:last-of-type': {
            width: '55%',
            '& [class*=dataNest]': {
                background: '#bdcbe9',
                borderBottom: '1px solid #fff',
                '&:last-of-type': {
                    borderBottom: 'none'
                }
            },
        },
    },
    popBody: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px',
        '& >button': {
            margin: '20px'
        }
    },
    popAlert: {
        width: '100%'
    },
    popUpload: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',
        background: '#bdcbe9',
    },
    uploadTitle: {
        width: '100%',
        height: '50px',
        background: '#53699A',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadField: {
        padding: '20px',
        display: 'flex',
        width: '100%',
    },
    uploadBox: {
        width: '100%',
        height: '50px',
        borderRadius: '6px',
        background: '#fff',
        marginRight: '15px',
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

const YesButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #0355b0;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #018de7;
    }
`;

const NoButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #fff;
    color: #333;
    border: 2px solid #0355b0;
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

const UploadButton1 = styled(ButtonUnstyled)`
    width: 200px;
    height: 50px;
    background: #fff;
    color: #53699A;
    border: 2px solid #bdcbe9;
    border-radius: 50px;
    font-size: 16px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        background: #53699A;
        color: #fff;
        border-color: #53699A;
    }
`;

const UploadButton2 = styled(ButtonUnstyled)`
    width: 180px;
    height: 50px;
    background: #53699A;
    color: #fff;
    border: 2px solid #53699A;
    border-radius: 5px;
    font-size: 16px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        background: #fff;
        color: #53699A;
    }
`;

const SearchUserButton = styled(ButtonUnstyled)`
    width: 140px;
    height: 33px;
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


const MembersManagement = () => {
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
                        관계법령에 의무이행의 관리상의 조치
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div className={classes.searchInfo}>
                        <div>
                            <Select
                                sx={{width: 200}}
                                className={classes.selectMenu}
                                value={num}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="">전체</MenuItem>
                            </Select>
                            <TextField 
                                variant="outlined" 
                                placeholder="검색어를 입력하세요."
                                sx={{width: 370}}
                                className={classes.selectMenu}
                            />
                        </div>
                    </div>
                    <div className={classes.searchButtons}>
                        <SearchButton>조회</SearchButton>
                        <RegisterButton sx={{marginLeft: '10px'}}>조회</RegisterButton>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        </div>
					</div>
					<div className={classes.tableBody}>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
                        <div className={classes.tableRow}>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                        	<div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                            <div className={classes.tableData}></div>
                        </div>
					</div>
                    <div className={classes.adminPopup + ' regMember'}>
                        <div className={classes.popHeader}>
                            Popup title
                        </div>
                        <div className={classes.popupTable}>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        variant="outlined" 
                                        value="이미지를 등록하세요"
                                        className={classes.tableTextField}
                                    />
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}>
                                    <div className={classes.headNest}></div>
                                    <div className={classes.headNest}>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                    </div>
                                </div>
                                <div className={classes.popupData}>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">이미지를 등록하세요</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.dataNest}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">이미지를 등록하세요</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.dataNest + ' headTitle'}>
                                        <div>
                                            <TextField 
                                                variant="outlined" 
                                                value="이미지를"
                                                className={classes.tableTextField}
                                            />
                                        </div>
                                        <div></div>
                                        <div>
                                            <Select
                                                className={classes.tableTextField}
                                                value={num}
                                                onChange={handleChange}
                                                displayEmpty
                                            >
                                                <MenuItem value="">이미지를</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={classes.dataNest + ' headTitle'}>
                                        <div>
                                            <TextField 
                                                variant="outlined" 
                                                value=""
                                                className={classes.tableTextField}
                                            />
                                        </div>
                                        <div style={{borderBottom: 'none'}}></div>
                                        <div>
                                            <TextField 
                                                variant="outlined" 
                                                value=""
                                                className={classes.tableTextField}
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value=""
                                            className={classes.tableTextField}
                                            sx={{width: 160}}
                                        />
                                        &nbsp;@&nbsp;
                                        <TextField 
                                            variant="outlined" 
                                            value=""
                                            className={classes.tableTextField}
                                            sx={{width: 218}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        variant="outlined" 
                                        value=""
                                        className={classes.tableTextField}
                                        sx={{width: 160}}
                                    />
                                    &nbsp;세
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        type="date"
                                        className={classes.tableTextField}
                                        sx={{width: 160}}
                                    />
                                    &nbsp;‒&nbsp;
                                    <TextField 
                                        type="date"
                                        className={classes.tableTextField}
                                        sx={{width: 160}}
                                    />
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <Select
                                        className={classes.tableTextField}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">이미지를 등록하세요</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        variant="outlined" 
                                        value="이미지를 등록하세요"
                                        className={classes.tableTextField}
                                        sx={{width: 270}}
                                    />
                                    <SearchUserButton>Search user</SearchUserButton>
                                </div>
                            </div>
                        </div>
                        <div className={classes.popButtons}>
                            <YesButton>Yes</YesButton>
                            <NoButton>No</NoButton>
                        </div>
                    </div>
                    <div className={classes.adminPopup + ' infoMember'}>
                        <div className={classes.popHeader}>
                            Popup title
                        </div>
                        <div className={classes.popupTable}>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        variant="outlined" 
                                        value="이미지를 등록하세요"
                                        className={classes.tableTextField}
                                    />
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}>
                                    <div className={classes.headNest}></div>
                                    <div className={classes.headNest}>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                        <div className={classes.dataNest}></div>
                                    </div>
                                </div>
                                <div className={classes.popupData}>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">이미지를 등록하세요</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.dataNest}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">이미지를 등록하세요</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <Select
                                            className={classes.tableTextField}
                                            value={num}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">이미지를 등록하세요</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="010"
                                            className={classes.tableTextField}
                                            sx={{width: 70}}
                                        />
                                        &nbsp;‒&nbsp;
                                        <TextField 
                                            variant="outlined" 
                                            value="1212"
                                            className={classes.tableTextField}
                                            sx={{width: 70}}
                                        />
                                        &nbsp;‒&nbsp;
                                        <TextField 
                                            variant="outlined" 
                                            value="4345"
                                            className={classes.tableTextField}
                                            sx={{width: 70}}
                                        />
                                    </div>
                                    <div className={classes.dataNest}>
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                            sx={{width: 189}}
                                        />
                                        &nbsp;@&nbsp;
                                        <TextField 
                                            variant="outlined" 
                                            value="이미지를 등록하세요"
                                            className={classes.tableTextField}
                                            sx={{width: 189}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        variant="outlined" 
                                        value="이미지를 등록하세요"
                                        className={classes.tableTextField}
                                        sx={{width: 190}}
                                    />
                                    &nbsp;록
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <TextField 
                                        variant="outlined" 
                                        value="이미지를 등록하세요"
                                        className={classes.tableTextField}
                                        sx={{width: 190}}
                                    />
                                    &nbsp;~&nbsp;
                                    <TextField 
                                        variant="outlined" 
                                        value="이미지를 등록하세요"
                                        className={classes.tableTextField}
                                        sx={{width: 190}}
                                    />
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <Select
                                        className={classes.tableTextField}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        sx={{width: 250}}
                                    >
                                        <MenuItem value="">이미지를 등록하세요</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className={classes.popupRow}>
                                <div className={classes.popupData + ' data_head'}></div>
                                <div className={classes.popupData}>
                                    <Select
                                        className={classes.tableTextField}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        sx={{width: 250}}
                                    >
                                        <MenuItem value="">이미지를 등록하세요</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className={classes.popButtons}>
                            <YesButton>Yes</YesButton>
                            <NoButton>No</NoButton>
                        </div>
                    </div>
                    <div className={classes.adminPopup + ' popSettings'}>
                        <div className={classes.popHeader}>
                            Popup title
                        </div>
                        <div className={classes.popBody}>
                            <div className={classes.popAlert}>
                                <Alert
                                    icon={<img src={alertIcon} alt="alert icon" />}
                                    severity="error">
                                    Alert message
                                </Alert>
                            </div>
                            <UploadButton1>Upload button 1</UploadButton1>
                            <div className={classes.popUpload}>
                                <div className={classes.uploadTitle}>Upload title</div>
                                <div className={classes.uploadField}>
                                    <div className={classes.uploadBox}></div>
                                    <UploadButton2>Upload button 2</UploadButton2>
                                </div>
                            </div>
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

export default MembersManagement;
