import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';

import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import pageFirst from '../../../../../../assets/images/btn_first.png';
import pageLast from '../../../../../../assets/images/btn_last.png';
import pageNext from '../../../../../../assets/images/btn_nxt.png';
import pagePrev from '../../../../../../assets/images/btn_pre.png';

import excelIcon from '../../../../../../assets/images/ic_excel.png';
import alertIcon from '../../../../../../assets/images/ic_refer.png';

import iconTab from '../../../../../../assets/images/ic_tab.png';
import iconTabOn from '../../../../../../assets/images/ic_tab_on.png';
import popupClose2 from '../../../../../../assets/images/btn_popClose2.png';
import searchIcon from '../../../../../../assets/images/ic_search.png';
import DefaultLayout from '../../../../../../layouts/Default/Default';
import { useGetRelatedRawButtonMutation, useGetRelatedRawMutation, useInsertDutyButtonMutation, useUpdateRelatedRawMutation } from '../../../../../../hooks/api/RelatedLawManagement/RelatedLawManagement';
import { selectBaselineId } from '../../../../../../slices/selections/MainSelection';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    pageWrap: {

    },
    headerButtons: {
        display: 'flex',
        alignItems: 'center',
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
        textDecoration: "none",
        // width: '100%',
        marginLeft: '10px !important',
        background: '#3a5298',
        borderRadius: '5px',
        letterSpacing: '-1.08px',
        textDecoration: 'none',
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
            padding: '0 20px'
        },
    },
    buttonPlus: {
        color: '#fff',
        fontSize: '30px',
        padding: '5px 10px',
        marginLeft: '10px !important',
        background: '#3a5298',
        borderRadius: '5px',
        border: '1px solid #3a5298',
        '&:hover': {
            backgroundImage: 'linear-gradient(#04b9fb, #017dfa)',
            border: 'none',
        },
    },
    boxTable: {
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        marginBottom: '20px',
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    tableHead: {
        width: '100%',
        background: '#bdcbe9',
        '& $tableDataOne': {
            height: '100px',
            borderRight: '1px solid #fff',
            textAlign: 'center',
            justifyContent: 'center',
            '& >div': {
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:first-of-type': {
                    borderBottom: '1px solid #fff'
                },
                '&:last-of-type span': {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:first-of-type': {
                        width: '135px',
                        borderRight: '1px solid #fff'
                    },
                    '&:last-of-type': {
                        width: '175px'
                    }
                }
            },
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '310px',
                padding: '0'
            },
            '&:nth-of-type(2)': {
                width: '240px',
            },
            '&:nth-of-type(3)': {
                width: '135px',
            },
            '&:nth-of-type(4)': {
                width: '322px',
            },
            '&:nth-of-type(5)': {
                width: '322px',
            },
            '&:nth-of-type(6)': {
                width: '322px',
            },
            '&:nth-of-type(7)': {
                width: '135px',
            },
        },
    },
    tableHeadTwo: {
        width: '100%',
        background: '#bdcbe9',
        '& $tableDataTwo': {
            height: '100px',
            borderRight: '1px solid #fff',
            justifyContent: 'center',
            textAlign: 'center',
            '&:first-of-type >div': {
                '&:last-of-type span': {
                    '&:first-of-type': {
                        width: '135px',
                        borderRight: '1px solid #fff'
                    },
                    '&:last-of-type': {
                        width: '175px'
                    }
                }
            },
            '&:last-of-type >div': {
                '&:last-of-type span': {
                    width: '100%',
                    borderRight: '1px solid #fff',
                    '&:last-of-type': {
                        borderRight: 'none'
                    }
                }
            },
            '& >div': {
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:first-of-type': {
                    borderBottom: '1px solid #fff'
                },
                '&:last-of-type span': {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }

            },
            '&:last-of-type': {
                borderRight: 'none',
                padding: '0'
            },
            '&:first-of-type': {
                width: '310px',
                padding: '0'
            },
            '&:nth-of-type(2)': {
                width: '240px',
            },
            '&:nth-of-type(3)': {
                width: '135px',
            },
            '&:nth-of-type(4)': {
                width: '322px',
            },
            '&:nth-of-type(5)': {
                width: '322px',
            },
            '&:nth-of-type(6)': {
                width: '456px',
            },
        }
    },
    tableHeadThree: {
        width: '100%',
        background: '#bdcbe9',
        '& $tableDataThree': {
            height: '100px',
            borderRight: '1px solid #fff',
            textAlign: 'center',
            justifyContent: 'center',
            '& >div': {
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:first-of-type': {
                    borderBottom: '1px solid #fff'
                },
                '&:last-of-type span': {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:first-of-type': {
                        width: '135px',
                        borderRight: '1px solid #fff'
                    },
                    '&:last-of-type': {
                        width: '175px'
                    }
                }
            },
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '310px',
                padding: '0'
            },
            '&:nth-of-type(2)': {
                width: '240px',
            },
            '&:nth-of-type(3)': {
                width: '135px',
            },
            '&:nth-of-type(4)': {
                width: '368px',
            },
            '&:nth-of-type(5)': {
                width: '368px',
            },
            '&:nth-of-type(6)': {
                width: '368px',
            },
        }
    },
    tableBody: {
        width: '100%',
        '& $tableDataOne,$tableDataTwo,$tableDataThree': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: 'none',
            },
            '&:first-of-type': {
                width: '135px'
            },
            '&:nth-of-type(2)': {
                width: '175px'
            },
        },
        '& $tableRow': {
            transition: 'background .2s',
            '&:hover': {
                background: '#eff2f9'
            }
        }
    },
    tableRow: {
        display: 'flex',
        '&:last-of-type': {
            '&  $tableDataOne,$tableDataTwo,$tableDataThree': {
                borderBottom: 'none'
            },
        },
    },
    tableDataOne: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '& >span': {
            color: '#fc4b07'
        },
        '&:nth-of-type(3)': {
            width: '240px',
        },
        '&:nth-of-type(4)': {
            width: '135px',
        },
        '&:nth-of-type(5)': {
            width: '322px',
        },
        '&:nth-of-type(6)': {
            width: '322px',
        },
        '&:nth-of-type(7)': {
            width: '322px',
        },
        '&:nth-of-type(8)': {
            width: '135px',
        },
    },
    tableDataTwo: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '& >span': {
            color: '#fc4b07'
        },
        '&:nth-of-type(3)': {
            width: '240px',
        },
        '&:nth-of-type(4)': {
            width: '135px',
        },
        '&:nth-of-type(5)': {
            width: '322px',
        },
        '&:nth-of-type(6)': {
            width: '322px',
        },
        '&:nth-of-type(7)': {
            width: '152px',
        },
        '&:nth-of-type(8)': {
            width: '152px',
        },
        '&:nth-of-type(9)': {
            width: '152px',
        },
    },
    tableDataThree: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '& >span': {
            color: '#fc4b07'
        },
        '&:nth-of-type(3)': {
            width: '240px',
        },
        '&:nth-of-type(4)': {
            width: '135px',
        },
        '&:nth-of-type(5)': {
            width: '368px',
        },
        '&:nth-of-type(6)': {
            width: '368px',
        },
        '&:nth-of-type(7)': {
            width: '368px',
        },
    },
    footerButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px !important',
        '& button': {
            marginLeft: '10px'
        }
    },
    textAreaWrap: {
        width: '100%'
    },
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            fontSize: '16px'
        }
    },
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        boxShadow: '0px 0px 10px 10000px rgba(0,0,0,0.4)',
        '& >span': {
            width: '20%',
            height: '20px',
            borderBottom: '1px solid #bdcbe9',
            transform: 'translateY(-5px)',
            '&:nth-of-type(2)': {
                width: '60%',
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
    uploadPlusPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        // height: '250px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 10px 10000px rgba(0,0,0,0.4)',
        '& > h3': {
            margin: '0 0 10px',
        },
        '& >button': {
            position: 'absolute',
            top: '0px',
            right: '-65px'
        }
    },
    uploadPopupHide: {
        display: 'none !important',
    },
    uploadInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50%',
        '& >*': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '& img': {
            width: '30px',
            height: '30px',
        }
    },
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& button:first-of-type': {
            marginLeft: '10px'
        }
    },
    linkBtn: {
        textDecoration: "none",
        color: "#adb0b2",
    },
    activeLinkBtn: {
        textDecoration: "none",
        color: '#018de7'
    },
    pagingBox: {
        position: 'relative',
        top: '20px',
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
    pageBody: {
        position: 'relative',
        display: 'flex',
        backgroundImage: 'linear-gradient(#424762, #33374f)',
        borderRadius: '32px 32px 0 0',
        width: '1720px'
    },
    popupTextField: {
        marginBottom: '10px !important',
        overflow: 'hidden',
        height: '40px',
        borderRadius: ' 46px',
        // '& .Mui-focused': {
        //     border: '2px solid #00adef',
        // },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            background: '#eff2f9',
        }
    },

}));

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background:url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
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

const SearchButton = styled(ButtonUnstyled)`
    width: 46px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 50%;
    background: #00adef url(${searchIcon}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298 url(${searchIcon}) no-repeat 50% 50%;
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
`
const BlueButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    background: #018de7;
    color: #fff;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #0355b0;
    }
`;

const WhiteButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    border: 2px solid #018de7;
    background: #fff;
    color: inherit;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

const MeasureToManageThePerformance = () => {
    const classes = useStyles();

    const [relatedRawList, setRelatedRawList] = useState([]);
    const [relatedRawButtonList, setRelatedRawButtonList] = useState([]);
    const [updateList, setUpdateList] = useState([]);
    const [lawName, setLawName] = useState("");
    const [lawId, setLawId] = useState(1);
    const [popupButton, setPopupButton] = useState(false);
    const [popupPlusButton, setPopupPlusButton] = useState(false);
    const [page, setPage] = useState(1);
    const [toggleList, setToggleList] = useState('one');

    const [getRelatedRaw] = useGetRelatedRawMutation();
    const [insertDutyButton] = useInsertDutyButtonMutation();
    const [getRelatedRawButton] = useGetRelatedRawButtonMutation();
    const [updateRelatedRaw] = useUpdateRelatedRawMutation();

    const currentBaseline = useSelector(selectBaselineId);
    // console.log(currentBaseline);

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const fetchRelatedRawList = async (lawId) => {
        const response = await getRelatedRaw({
            "lawId": lawId,
            "baselineId": currentBaseline,
            "countPerPage": 10,
            "pageNum": page
        });
        setRelatedRawList(response.data.RET_DATA);
        setRelatedRawList(response.data.RET_DATA);
        const currentUpdateList = response.data?.RET_DATA?.map(relatedRawItem => {
            return {
                "dutyImproveId": relatedRawItem.dutyImproveId,
                "acctionCn": relatedRawItem.acctionCn
            }
        });
        setUpdateList(currentUpdateList);
    }

    const fetchRelatedRawButtonList = async () => {
        const response = await getRelatedRawButton({});
        setRelatedRawButtonList(response.data.RET_DATA);
    }

    const fetchInsertDutyButton = async () => {
        await insertDutyButton({
            "lawName": lawName
        });
        setPopupPlusButton(false);
        fetchRelatedRawButtonList();
    }

    const handleUpdateRelatedRawList = () => {
        updateRelatedRaw({ "updateList": updateList })
            .then(res => console.log(res))
            .then(() => fetchRelatedRawList(lawId));
    }

    useEffect(() => {
        fetchRelatedRawList(lawId);
        fetchRelatedRawButtonList();
    }, [page]);

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        관계법령에 의무이행의 관리상의 조치
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.headerButtons}>
                    {!!relatedRawButtonList && relatedRawButtonList.length > 0 && relatedRawButtonList.map(relatedRawButtonItem =>
                    (<Link to="#" className={classes.buttonLink} onClick={() => fetchRelatedRawList(relatedRawButtonItem.lawButtonId)} onDoubleClick={() => setPopupButton(true)}>
                        <span>{relatedRawButtonItem?.lawName}</span>
                    </Link>)
                    )}
                    <button className={classes.buttonPlus} onClick={() => setPopupPlusButton(true)}>+</button>
                </Grid>
                <Grid className={classes.pageBody} item xs={10.7}>
                    <div className={popupButton ? classes.uploadPopup : classes.uploadPopupHide} >
                        <ClosePopupButton2 onClick={() => setPopupButton(false)}></ClosePopupButton2>
                        <div className={classes.uploadInfo}>
                            <img src={alertIcon} alt="alert icon" />
                            <span>재해예방과 쾌적한 작업환경을 조성함으로써 근로자 및 이해관계자의 안전과 보건을 유지.</span>
                            <UnknownButton2>전체사업장</UnknownButton2>
                        </div>
                        <span></span>
                        <span>의무조치별 상세 점검</span>
                        <span></span>
                        <div className={classes.uploadSearch}>
                            <TextField
                                id="standard-basic"
                                placeholder="여수공장 시정조치요청 파일.hwp"
                                variant="outlined"
                                sx={{ width: 250 }}
                                className={classes.popupTextField}
                            />
                            <SearchButton></SearchButton>
                            <UnknownButton1>전체사업장</UnknownButton1>
                        </div>
                    </div>
                    <div className={popupPlusButton ? classes.uploadPlusPopup : classes.uploadPopupHide} >
                        <ClosePopupButton2 onClick={() => setPopupPlusButton(false)}></ClosePopupButton2>
                        <h3>의무조치별 상세 점검</h3>
                        <div className={classes.uploadSearch}>
                            <TextField
                                id="standard-basic"
                                value={lawName}
                                variant="outlined"
                                sx={{ width: 250 }}
                                className={classes.popupTextField}
                                onChange={(event) => setLawName(event.target.value)}
                            />
                            <UnknownButton1 onClick={() => fetchInsertDutyButton()}>전체사업장</UnknownButton1>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.stepBox}>
                    <Stepper sx={{ mb: 4, mt: 4 }} nonLinear activeStep={0} className={classes.activeStep}>
                        <Step >
                            <StepLabel
                                icon={<img src={toggleList === 'one' ? iconTabOn : iconTab} alt={toggleList === 'one' ? "inactive step" : "active step"} />}
                            >
                                <Link className={toggleList === 'one' ? classes.activeLinkBtn : classes.linkBtn} to="#" onClick={() => setToggleList('one')} >표준상태보기</Link>
                            </StepLabel>
                        </Step>
                        <Step >
                            <StepLabel
                                icon={<img src={toggleList === 'two' ? iconTabOn : iconTab} alt={toggleList === 'two' ? "active step" : "inactive step"} />}
                            >
                                <Link className={toggleList === 'two' ? classes.activeLinkBtn : classes.linkBtn} to="#" onClick={() => setToggleList('two')}>처벌 및 과태료보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={toggleList === 'three' ? iconTabOn : iconTab} alt={toggleList === 'three' ? "active step" : "inactive step"} />}
                            >
                                <Link className={toggleList === 'three' ? classes.activeLinkBtn : classes.linkBtn} to="#" onClick={() => setToggleList('three')} >관리상의 조치내역 보기/등록</Link>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={toggleList === "one" ? classes.tableHead : toggleList === "two" ? classes.tableHeadTwo : classes.tableHeadThree}>
                        <div className={classes.tableRow}>
                            <div className={toggleList === "one" ? classes.tableDataOne : toggleList === "two" ? classes.tableDataTwo : classes.tableDataThree}>
                                <div>중대재해처벌법</div>
                                <div>
                                    <span>관련법령</span>
                                    <span>항목</span>
                                </div>
                            </div>
                            {toggleList === 'one'
                                ? <><div className={classes.tableDataOne}>중대재해처벌법 <br />시행령</div>
                                    <div className={classes.tableDataOne}>위반법조항</div>
                                    <div className={classes.tableDataOne}>위반행위</div>
                                    <div className={classes.tableDataOne}>세부내용 -1</div>
                                    <div className={classes.tableDataOne}>세부내용 -2</div>
                                    <div className={classes.tableDataOne}>근거법조문</div>
                                </>
                                : toggleList === 'two'
                                    ? <>
                                        <div className={classes.tableDataTwo}>중대재해처벌법 <br />시행령</div>
                                        <div className={classes.tableDataTwo}>위반법조항</div>
                                        <div className={classes.tableDataTwo}>위반행위</div>
                                        <div className={classes.tableDataTwo}>세부내용 -1</div>
                                        <div className={classes.tableDataTwo}>
                                            <div>처벌사항 및 과태료 금액 (만원)</div>
                                            <div>
                                                <span>1차 위반</span>
                                                <span>2차 위반</span>
                                                <span>3차 위반</span>
                                            </div>
                                        </div>
                                    </>
                                    : <>
                                        <div className={classes.tableDataThree}>중대재해처벌법 <br />시행령</div>
                                        <div className={classes.tableDataThree}>위반법조항</div>
                                        <div className={classes.tableDataThree}>위반행위</div>
                                        <div className={classes.tableDataThree}>세부내용 -1</div>
                                        <div className={classes.tableDataThree}>관리상의 조치 내역</div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {!!relatedRawList && relatedRawList?.length > 0 && relatedRawList.map((relatedRawItem, index) =>
                        (<div className={classes.tableRow}>
                            {toggleList === 'one'
                                ? <>
                                    <div className={classes.tableDataOne}>{relatedRawItem.relatedArticle}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.articleItem}<span></span></div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violatedArticle}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violatedActivity}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violationDetail1}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.violationDetail2}</div>
                                    <div className={classes.tableDataOne}>{relatedRawItem.baseArticle}</div>
                                </>
                                : toggleList === 'two'
                                    ? <>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.relatedArticle}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.articleItem}<span></span></div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.violatedArticle}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.violatedActivity}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.violationDetail1}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.stPenalty1}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.stPenalty2}</div>
                                        <div className={classes.tableDataTwo}>{relatedRawItem.stPenalty3}</div>
                                    </>
                                    : <>
                                        <div className={classes.tableDataThree}>{relatedRawItem.relatedArticle}</div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.articleItem}<span></span></div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.violatedArticle}</div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.violatedActivity}</div>
                                        <div className={classes.tableDataThree}>{relatedRawItem.violationDetail1}</div>
                                        <div className={classes.tableDataThree}>
                                            <div className={classes.textAreaWrap}>
                                                <TextField
                                                    className={classes.textArea}
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={3}
                                                    value={updateList[index]?.acctionCn}
                                                    onChange={(event) => {
                                                        const changedUpdateList = updateList.map((updateItem, i) => i === index ? { ...updateItem, "acctionCn": event.target.value } : updateItem);
                                                        setUpdateList(changedUpdateList);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>}
                        </div>))}
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글 <strong>{relatedRawList?.length > 0 && relatedRawList[0]?.totalCount}</strong> 건</div>
                    <Stack spacing={2}>
                        <Pagination count={relatedRawList?.length && Math.ceil(relatedRawList[0]?.totalCount / 10)} boundaryCount={3} shape="rounded" page={page} onChange={handlePageChange} showFirstButton showLastButton />
                    </Stack>
                    <div>
                        {/* <ExcelButton>엑셀 다운로드</ExcelButton> */}
                    </div>
                </Grid>
                {toggleList === "three"
                    && <Grid item xs={12} className={classes.footerButtons}>
                        <BlueButton className={'button-registration'} onClick={() => handleUpdateRelatedRawList()}>등록</BlueButton>
                        <WhiteButton className={'button-cancelation'} >취소</WhiteButton>
                    </Grid>}
            </Grid>
        </DefaultLayout >
    );
};

export default MeasureToManageThePerformance;
