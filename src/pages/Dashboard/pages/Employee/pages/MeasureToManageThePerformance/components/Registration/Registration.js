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

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useGetRelatedRawButtonMutation, useGetRelatedRawMutation, useInsertDutyButtonMutation } from '../../../../../../../../hooks/api/RelatedLawManagement/RelatedLawManagement';
import { useUpdateRelatedArticleMutation } from '../../../../../../../../hooks/api/MainManagement/MainManagement';
import { useNavigate } from 'react-router-dom';

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
            padding: '0 20px',
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
        '& $tableData': {
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
        '& $tableData': {
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
            '& $tableData': {
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
    linkBtn: {
        textDecoration: "none",
        color: "#adb0b2",
        '&:visited': {
            color: '#adb0b2'
        }
    }

}));

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

const MPDLawThird = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [relatedRawList, setRelatedRawList] = useState([]);
    const [relatedRawButtonList, setRelatedRawButtonList] = useState([]);


    const [getRelatedRaw] = useGetRelatedRawMutation();
    const [insertDutyButton] = useInsertDutyButtonMutation();
    const [getRelatedRawButton] = useGetRelatedRawButtonMutation();
    const [updateRelatedRaw] = useUpdateRelatedArticleMutation();

    const handleRedirect = () => {
        navigate('/dashboard/employee/measure-to-manage-performance-od-duties-law/list');
    }

    const fetchRelatedRawList = async () => {
        const response = await getRelatedRaw({
            "lawId": 1,
            "baselineId": 6
        });
        setRelatedRawList(response.data.RET_DATA);
    }

    const fetchRelatedRawButtonList = async () => {
        const response = await getRelatedRawButton({});
        setRelatedRawButtonList(response.data.RET_DATA);
    }


    const fetchInsertDutyButton = async () => {
        const response = await insertDutyButton({});
    }

    const handleUpdateRelatedRawList = () => {
        updateRelatedRaw({
            "updateList": [
                {
                    "dutyImproveId": 1079,
                    "acctionCn": "테스트1"
                },
                {
                    "dutyImproveId": 1080,
                    "acctionCn": "테스트"
                }
            ]
        })
            .then(res => console.log(res))
            .then(() => handleRedirect());
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
                    (<Link href="#none" className={classes.buttonLink}>
                        <span>{relatedRawButtonItem?.lawName}</span>
                    </Link>)
                    )}

                </Grid>
                <Grid item xs={12} className={classes.stepBox}>
                    <Stepper sx={{ mb: 4, mt: 4 }} nonLinear activeStep={2} className={classes.activeStep}>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTab} alt="inactive step" />}
                            >
                                <Link className={classes.linkBtn} to="/dashboard/employee/measure-to-manage-performance-od-duties-law/list">표준상태보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTab} alt="inactive step" />}
                            >
                                <Link className={classes.linkBtn} to="/dashboard/employee/measure-to-manage-performance-od-duties-law/list-two">처벌 및 과태료보기</Link>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel
                                icon={<img src={iconTabOn} alt="active step" />}
                            >
                                <Link className={classes.linkBtn} to="/dashboard/employee/measure-to-manage-performance-od-duties-law/registration">관리상의 조치내역 보기/등록</Link>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.boxRow}>
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
                                <div className={classes.tableData}>관리상의 조치 내역</div>
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
                                <div className={classes.tableData}>
                                    <div className={classes.textAreaWrap}>
                                        <TextField
                                            className={classes.textArea}
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={3}
                                            placeholder={relatedRawItem.acctionCn}
                                        />
                                    </div>
                                </div>
                            </div>))}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.footerButtons}>
                <BlueButton className={'button-registration'} onClick={handleUpdateRelatedRawList}>등록</BlueButton>
                <WhiteButton className={'button-cancelation'} onClick={handleRedirect}>취소</WhiteButton>
            </Grid>
        </DefaultLayout>
    );
};

export default MPDLawThird;
