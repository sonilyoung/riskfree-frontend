import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles, styled } from '@mui/styles';

import Link from '@mui/material/Link';

import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import alertIcon from '../../../../../../../../assets/images/ic_refer.png';

import iconTab from '../../../../../../../../assets/images/ic_tab.png';
import iconTabOn from '../../../../../../../../assets/images/ic_tab_on.png';
import popupClose2 from '../../../../../../../../assets/images/btn_popClose2.png';
import searchIcon from '../../../../../../../../assets/images/ic_search.png';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRelatedRawButtonMutation, useGetRelatedRawMutation, useInsertDutyButtonMutation } from '../../../../../../../../hooks/api/RelatedLawManagement/RelatedLawManagement';

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
        // width: '100%',
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
        '& *': {
            boxSizing: 'border-box',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        }
    },
    tableHead: {
        width: '100%',
        background: '#bdcbe9',
        '& [class*=tableData]': {
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
        }
    },
    tableBody: {
        width: '100%',
        '& [class*=tableData]': {
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
    uploadPopup: {
        position: 'absolute',
        zIndex: '1000',
        top: '0px',
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
        // display: 'none !important',
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
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& button:first-of-type': {
            marginLeft: '10px'
        }
    },


}));

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url(${popupClose2}) no-repeat 50% 50%;
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


const List = () => {
    const classes = useStyles();

    const [relatedRawList, setRelatedRawList] = useState([]);
    const [relatedRawButtonList, setRelatedRawButtonList] = useState([]);


    const [getRelatedRaw] = useGetRelatedRawMutation();
    const [insertDutyButton] = useInsertDutyButtonMutation();
    const [getRelatedRawButton] = useGetRelatedRawButtonMutation();

    const fetchRelatedRawList = async () => {
        const response = await getRelatedRaw({
            "lawId": 1,
            "baselineId": 6
        });
        setRelatedRawList(response.data.RET_DATA);
        console.log(response.data.RET_DATA);
    }


    const fetchRelatedRawButtonList = async () => {
        const response = await getRelatedRawButton({});
        setRelatedRawButtonList(response.data.RET_DATA);
    }


    const fetchInsertDutyButton = async () => {
        const response = await insertDutyButton();
    }


    useEffect(() => {
        fetchRelatedRawList();
        fetchRelatedRawButtonList();
    }, []);


    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        관계법령에 의무이행의 관리상의 조치
                    </Typography>
                </Grid>

                {/* <div className={classes.uploadPopup}>
                    <ClosePopupButton2></ClosePopupButton2>
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
                </div> */}



                <Grid item xs={12} className={classes.headerButtons}>

                    {relatedRawButtonList.length && relatedRawButtonList.map(relatedRawButtonItem =>
                    (<Link href="#none" className={classes.buttonLink}>
                        <span>{relatedRawButtonItem?.lawName}</span>
                    </Link>)
                    )}
                    <button className={classes.buttonPlus}>+</button>

                </Grid>
                <Grid item xs={12} className={classes.stepBox}>
                    <Stepper sx={{ mb: 4, mt: 4 }} nonLinear activeStep={0} className={classes.activeStep}>
                        <Step >
                            <StepLabel
                                icon={<img src={iconTabOn} alt="active step" />}
                            >
                                <Link href="/dashboard/employee/measure-to-manage-performance-od-duties-law/list">표준상태보기</Link>
                            </StepLabel>
                        </Step>
                        <Step >
                            <StepLabel
                                icon={<img src={iconTab} alt="inactive step" />}
                            >
                                <Link href="/dashboard/employee/measure-to-manage-performance-od-duties-law/list-two">처벌 및 과태료보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTab} alt="inactive step" />}
                            >
                                <Link href="/dashboard/employee/measure-to-manage-performance-od-duties-law/registration" >관리상의 조치내역 보기/등록</Link>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>
                                <div>중대재해처벌법</div>
                                <div>
                                    <span>관련법령</span>
                                    <span>항목</span>
                                </div>
                            </div>
                            <div className={classes.tableData}>중대재해처벌법 <br />시행령</div>
                            <div className={classes.tableData}>위반법조항</div>
                            <div className={classes.tableData}>위반행위</div>
                            <div className={classes.tableData}>세부내용 -1</div>
                            <div className={classes.tableData}>세부내용 -2</div>
                            <div className={classes.tableData}>근거법조문</div>
                        </div>
                    </div>
                    <div className={classes.tableBody}>

                        {
                            relatedRawList?.length && relatedRawList.map(relatedRawItem =>
                            (<div className={classes.tableRow}>
                                <div className={classes.tableData}>{relatedRawItem.relatedArticle}</div>
                                <div className={classes.tableData}>{relatedRawItem.articleItem}<span></span></div>
                                <div className={classes.tableData}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                                <div className={classes.tableData}>{relatedRawItem.violatedArticle}</div>
                                <div className={classes.tableData}>{relatedRawItem.violatedActivity}</div>
                                <div className={classes.tableData}>{relatedRawItem.violationDetail1}</div>
                                <div className={classes.tableData}>{relatedRawItem.violationDetail2}</div>
                                <div className={classes.tableData}>{relatedRawItem.baseArticle}</div>
                            </div>))
                        }
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout >
    );
};

export default List;
