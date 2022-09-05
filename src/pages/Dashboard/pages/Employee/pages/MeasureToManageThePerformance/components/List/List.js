import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';

import Link from '@mui/material/Link';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import iconTab from '../../../../../../../../assets/images/ic_tab.png';
import iconTabOn from '../../../../../../../../assets/images/ic_tab_on.png';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useNavigate, useParams } from 'react-router-dom';

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
        // width: '50%',
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
    }


}));

const List = () => {
    const classes = useStyles();

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        관계법령에 의무이행의 관리상의 조치
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.headerButtons}>
                    <Link href="#none" className={classes.buttonLink + ' current'}>
                        <span>화평물질 등록 및 </span>
                        <span>평가에 관한</span>
                    </Link>
                    <Link href="#none" className={classes.buttonLink}>
                        <span>화학물질 </span>
                        <span>관리법</span>
                    </Link>
                    <Link href="#none" className={classes.buttonLink}>
                        <span>위험물 </span>
                        <span>안전 관리법</span>
                    </Link>
                    <Link href="#none" className={classes.buttonLink}>
                        <span>고압가스 </span>
                        <span>안전 관리법</span>
                    </Link>
                    <Link href="#none" className={classes.buttonLink}>
                        <span>화학물 </span>
                        <span>안전 관리법</span>
                    </Link>
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
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>제4조제1항제4호</div>
                            <div className={classes.tableData}>안전ㆍ보건 관계 법령에 따른 <span>의무이행에 필요한 관리상의 조치</span></div>
                            <div className={classes.tableData}>제5조제2항제1호 <span>의무이행 점검</span></div>
                            <div className={classes.tableData}>제5조제1항</div>
                            <div className={classes.tableData}>3. 제5조제1항 전단에 따른 등록을 하지 아니하고 용기등을 제조한 자</div>
                            <div className={classes.tableData}>제5조(용기ㆍ냉동기 및 특정설비의 제조등록 등) 용기ㆍ냉동기 또는 특정설비(이하 "용기등"이라 한다)를 제조하려는 자는 시장ㆍ군수 또는 구청장에게 등록하여야 한다. </div>
                            <div className={classes.tableData}>&nbsp;</div>
                            <div className={classes.tableData}>법 제39조 제3호</div>
                        </div>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>제4조제1항제4호</div>
                            <div className={classes.tableData}>안전ㆍ보건 관계 법령에 따른 <span>의무이행에 필요한 관리상의 조치</span></div>
                            <div className={classes.tableData}>제5조제2항제1호 <span>의무이행 점검</span></div>
                            <div className={classes.tableData}>제5조제1항</div>
                            <div className={classes.tableData}>3. 제5조제1항 전단에 따른 등록을 하지 아니하고 용기등을 제조한 자</div>
                            <div className={classes.tableData}>제5조(용기ㆍ냉동기 및 특정설비의 제조등록 등) 용기ㆍ냉동기 또는 특정설비(이하 "용기등"이라 한다)를 제조하려는 자는 시장ㆍ군수 또는 구청장에게 등록하여야 한다. </div>
                            <div className={classes.tableData}>&nbsp;</div>
                            <div className={classes.tableData}>법 제39조 제3호</div>
                        </div>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>제4조제1항제4호</div>
                            <div className={classes.tableData}>안전ㆍ보건 관계 법령에 따른 <span>의무이행에 필요한 관리상의 조치</span></div>
                            <div className={classes.tableData}>제5조제2항제1호 <span>의무이행 점검</span></div>
                            <div className={classes.tableData}>제5조제1항</div>
                            <div className={classes.tableData}>3. 제5조제1항 전단에 따른 등록을 하지 아니하고 용기등을 제조한 자</div>
                            <div className={classes.tableData}>제5조(용기ㆍ냉동기 및 특정설비의 제조등록 등) 용기ㆍ냉동기 또는 특정설비(이하 "용기등"이라 한다)를 제조하려는 자는 시장ㆍ군수 또는 구청장에게 등록하여야 한다. </div>
                            <div className={classes.tableData}>&nbsp;</div>
                            <div className={classes.tableData}>법 제39조 제3호</div>
                        </div>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>제4조제1항제4호</div>
                            <div className={classes.tableData}>안전ㆍ보건 관계 법령에 따른 <span>의무이행에 필요한 관리상의 조치</span></div>
                            <div className={classes.tableData}>제5조제2항제1호 <span>의무이행 점검</span></div>
                            <div className={classes.tableData}>제5조제1항</div>
                            <div className={classes.tableData}>3. 제5조제1항 전단에 따른 등록을 하지 아니하고 용기등을 제조한 자</div>
                            <div className={classes.tableData}>제23조의3(고압가스배관 매설상황 확인) 굴착공사를 하려는 자는 굴착공사를 하기 전에 해당 토지의 지하에 고압가스배관이 묻혀 있는지를 확인하여 줄 것을 산업통상자원부령으로 정하는 바에 따라 정보지원센터에 요청하여야 한다. 다만, 고압가스배관에 위험을 발생시킬 우려가 없다고 인정되는 굴착공사로서 대통령령으로 정하는 굴착공사의 경우에는 그러하지 아니하다.</div>
                            <div className={classes.tableData}>&nbsp;</div>
                            <div className={classes.tableData}>법 제39조 제3호</div>
                        </div>
                        <div className={classes.tableRow}>
                            <div className={classes.tableData}>제4조제1항제4호</div>
                            <div className={classes.tableData}>안전ㆍ보건 관계 법령에 따른 <span>의무이행에 필요한 관리상의 조치</span></div>
                            <div className={classes.tableData}>제5조제2항제1호 <span>의무이행 점검</span></div>
                            <div className={classes.tableData}>제5조제1항</div>
                            <div className={classes.tableData}>3. 제5조제1항 전단에 따른 등록을 하지 아니하고 용기등을 제조한 자</div>
                            <div className={classes.tableData}>제5조(용기ㆍ냉동기 및 특정설비의 제조등록 등) 용기ㆍ냉동기 또는 특정설비(이하 "용기등"이라 한다)를 제조하려는 자는 시장ㆍ군수 또는 구청장에게 등록하여야 한다. </div>
                            <div className={classes.tableData}>&nbsp;</div>
                            <div className={classes.tableData}>법 제39조 제3호</div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default List;
