import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import iconTab from '../../../../../../../../assets/images/ic_tab.png';
import iconTabOn from '../../../../../../../../assets/images/ic_tab_on.png';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useGetRelatedRawButtonMutation, useGetRelatedRawMutation, useInsertDutyButtonMutation } from '../../../../../../../../hooks/api/RelatedLawManagement/RelatedLawManagement';
import { useSelector } from 'react-redux';
import { selectBaselineId } from '../../../../../../../../slices/selections/MainSelection';

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
            width: '152px',
        },
        '&:nth-of-type(8)': {
            width: '152px',
        },
        '&:nth-of-type(9)': {
            width: '152px',
        },
    },
    linkBtn: {
        textDecoration: "none",
        color: "#adb0b2",
        '&:visited': {
            color: '#adb0b2'
        }
    },
    activeLinkBtn: {
        textDecoration: "none",
        color: '#018de7'
    }

}));

const ListTwo = () => {
    const classes = useStyles();

    const [relatedRawList, setRelatedRawList] = useState([]);
    const [relatedRawButtonList, setRelatedRawButtonList] = useState([]);


    const [getRelatedRaw] = useGetRelatedRawMutation();
    const [insertDutyButton] = useInsertDutyButtonMutation();
    const [getRelatedRawButton] = useGetRelatedRawButtonMutation();

    const currentBaseline = useSelector(selectBaselineId);

    const fetchRelatedRawList = async () => {
        const response = await getRelatedRaw({
            "lawId": 1,
            "baselineId": currentBaseline
        });
        setRelatedRawList(response.data.RET_DATA);
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
                <Grid item xs={12} className={classes.headerButtons}>
                    {relatedRawButtonList.length > 0 && relatedRawButtonList.map(relatedRawButtonItem =>
                    (<Link to="#" className={classes.buttonLink}>
                        <span>{relatedRawButtonItem?.lawName}</span>
                    </Link>)
                    )}
                    <button className={classes.buttonPlus}>+</button>
                </Grid>
                <Grid item xs={12} className={classes.stepBox}>
                    <Stepper sx={{ mb: 4, mt: 4 }} nonLinear activeStep={1} className={classes.activeStep}>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTab} alt="inactive step" />}
                            >
                                <Link className={classes.linkBtn} to="/dashboard/employee/measure-to-manage-performance-od-duties-law/list">표준상태보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTabOn} alt="active step" />}
                            >
                                <Link className={classes.activeLinkBtn} to="/dashboard/employee/measure-to-manage-performance-od-duties-law/list-two">처벌 및 과태료보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTab} alt="inactive step" />}
                            >
                                <Link className={classes.linkBtn} to="/dashboard/employee/measure-to-manage-performance-od-duties-law/registration">관리상의 조치내역 보기/등록</Link>
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
                            <div className={classes.tableData}>
                                <div>처벌사항 및 과태료 금액 (만원)</div>
                                <div>
                                    <span>1차 위반</span>
                                    <span>2차 위반</span>
                                    <span>3차 위반</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {relatedRawList?.length > 0 && relatedRawList.map(relatedRawItem =>
                        (<div className={classes.tableRow}>
                            <div className={classes.tableData}>{relatedRawItem.relatedArticle}</div>
                            <div className={classes.tableData}>{relatedRawItem.articleItem}<span></span></div>
                            <div className={classes.tableData}>{relatedRawItem.seriousAccdntDecree} <span></span></div>
                            <div className={classes.tableData}>{relatedRawItem.violatedArticle}</div>
                            <div className={classes.tableData}>{relatedRawItem.violatedActivity}</div>
                            <div className={classes.tableData}>{relatedRawItem.violationDetail1}</div>
                            <div className={classes.tableData}>{relatedRawItem.stPenalty1}</div>
                            <div className={classes.tableData}>{relatedRawItem.stPenalty2}</div>
                            <div className={classes.tableData}>{relatedRawItem.stPenalty3}</div>
                        </div>))}
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default ListTwo;
