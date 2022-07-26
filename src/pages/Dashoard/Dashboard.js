import React from 'react';
import { WideLayout } from '../../layouts/Wide';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import logo from '../../assets/images/logo.png';
import dashboardPattern from '../../assets/images/dashboard_pattern.png';
import workplaceBackground from '../../assets/images/bg_workplace.png';
import adminLogo from '../../assets/images/admin_logo.png';
import userIcon from '../../assets/images/btn_user.png';
import userIconHover from '../../assets/images/btn_user_ov.png';
import logIcon from '../../assets/images/btn_log.png';
import logIconHover from '../../assets/images/btn_log_ov.png';
import setIcon from '../../assets/images/btn_set.png';
import setIconHover from '../../assets/images/btn_set_ov.png';
import adminIcon from '../../assets/images/btn_admin.png';
import adminIconHover from '../../assets/images/btn_admin_ov.png';
import weatherIcon from '../../assets/images/weather_icon.png';
import chartIcon from '../../assets/images/btn_chart.png';
import orderBackground from '../../assets/images/bg_body_order.png';

import numOne from '../../assets/images/num1.png';
import numTwo from '../../assets/images/num2.png';
import numThree from '../../assets/images/num3.png';
import numFour from '../../assets/images/num4.png';
import numFive from '../../assets/images/num5.png';
import numNine from '../../assets/images/num9.png';

import btnNext from '../../assets/images/btn_next.png';
import btnPrev from '../../assets/images/btn_prev.png';
import arrowNext from '../../assets/images/arrow_next.png';
import arrowPrev from '../../assets/images/arrow_prev.png';

import circleGreen from '../../assets/images/bg_circle_green.png';
// import circleYellow from '../../assets/images/bg_circle_yellow.png';
// import circleOrange from '../../assets/images/bg_circle_orange.png';
import circleRed from '../../assets/images/bg_circle_red.png';
import gageImg from '../../assets/images/bg_gage.png';
import needleImg from '../../assets/images/img_needle.png';
import gageState from '../../assets/images/txt_warning.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const useStyles = makeStyles(() => ({
    dashboardWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center',
    },
    pageHeader: {
        // height: '225px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundImage: 'url(' + dashboardPattern + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top'
    },
    mainHeader: {
        display: 'flex',
        zIndex: 1
    },
    mainLogo: {
        '& img': {
            transform: 'translate(20px, 10px)'
        }
    },
    mainMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectMenu: {
        height: '40px'
    },
    leftMenu: {
        display: 'flex',
        alignItems: 'center'
    },
    rightMenu: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#fff'
    },
    userInformation: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#d5d5d8',
        '& div:first-of-type': {
            fontSize: '17px'
        },
        '& div:first-of-type span': {
            color: '#00adef',
            letterSpacing: '-2.08px'
        },
        '& div:last-of-type': {
            fontSize: '15px',
            fontWeight: '200',
            background: '#12141e',
            padding: '3px 8px',
            borderRadius: '4px'
        }
    },
    mainAsside: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#d5d5d8',
        letterSpacing: '-2.08px'
    },
    weatherSection: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
        '& span': {
            display: 'flex',
            marginLeft: '10px'
        },
        '& :nth-child(2)': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '5px',
            fontSize: '28px',
            color: '#fba325',
            fontWeight: '400'
        },
        '& :last-of-type': {
            letterSpacing: '-2.08px'
        }
    },
    headerWorkplace: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(' + workplaceBackground + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        // backgroundSize: 'contain',
        // pointerEvents: 'none'
    },
    adminLogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '135px',
        height: '135px'
    },
    adminField: {
        marginTop: '20px',
        width: '650px',
        '& :first-of-type': {
            width: '200px',
            color: '#fbe027',
            fontWeight: '700',
            textShadow: '2px 2px 1px rgb(0 0 0 / 20%)',
            textAlign: 'center'
        },
        '& :last-of-type': {
            width: '450px'
        },
        '& *': {
            boxSizing: 'border-box',
            padding: '15px',
        }
    },
    adminFieldLeft: {
        display: 'flex',
        '& :last-of-type': {
            justifyContent: 'flex-start'
        }
    },
    adminFieldRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
        '& :last-of-type': {
            justifyContent: 'flex-end'
        }
    },
    adminFieldText: {
        display: 'flex',
        justifyContent: 'center',   
        fontWeight: '500',
        fontSize: '28px',
        color: '#fff',
        letterSpacing: '-2.08px'
    },
    headerNavigation: {
        position: 'relative',
        height: '64px'
    },
    circleButton: {
        height: '60px',
        width: '60px',
        borderRadius: '50%'
    },
    mainMenuButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background .3s'
    },
    navSlider: {
        '& .slick-list': {
            width: '98%',
            margin: '0 auto'
        },
        '& .slick-track': {
            '& .slick-slide:first-of-type button': {
                background: 'linear-gradient(#04b9fb, #017dfa)'
            },
        },
        '& .slick-slide': {
            boxSizing: 'border-box',
            padding: '7px'
        },
        '& .slick-disabled': {
            display: 'none !important'
        },
        '& .slick-arrow': {
            width: '23px',
            height: '38px'
        },
        '& .slick-next': {
            backgroundImage: 'url(' + btnNext + ')',
            '&:before': {
                display: 'none'
            }
        },
        '& .slick-prev': {
            backgroundImage: 'url(' + btnPrev + ')',
            '&:before': {
                display: 'none'
            }
        }
    },
    pageBody: {
        // display: 'flex',
        // flexWrap: 'wrap',
        backgroundImage: 'linear-gradient(#424762, #1e2130)',
        borderRadius: '32px',
        width: '1720px',
        height: '545px',
        padding: '0 165px'
    },
    slickCircle: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'210px',
        height: '210px',
        margin: '1% .6% 0',
        backgroundRepeat: 'no-repeat',
        transition: 'transform .3s',
        '&:hover': {
            transform: 'scale(1.08)'
        },
        '&.green': {
            backgroundImage: 'url(' + circleGreen + ')',
        },
        '&.red': {
            backgroundImage: 'url(' + circleRed + ')',
        }
    },
    slickLink: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
        boxSizing: 'border-box',
        borderRadius: '50%',
        '& div:first-of-type': {
            fontSize: '52px',
            fontWeight: '700',
            color: '#fff'
        },
        '& div:last-of-type': {
            fontSize: '22px',
            fontWeight: '400',
            color: '#202231',
            letterSpacing: '-2.08px',
            textAlign: 'center'
        }
    },
    managementOrder: {
        display: 'flex',
        justifyContent: 'center',
        height: '66px',
        width: '100%',
        marginTop: '1px',
        backgroundImage: 'url(' + orderBackground + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        fontSize: '28px',
        lineHeight: '66px',
        color: '#fff',
        '& strong': {
            color: '#00adef',
            fontWeight: '700',
            margin: '0 10px'
        }
    },
    dashSlider: {
        '& .slick-list': {
            padding: '1px 0 20px 0',
            marginTop: '8px',
        },
        '--arrow_offset': '-240px',
        '& .slick-arrow': {
            top: '42%',
            width: '50px',
            height: '111px'
        },
        '& .slick-next': {
            backgroundImage: 'url(' + arrowNext + ')',
            right: 'var(--arrow_offset)',
            '&:before': {
                display: 'none'
            }
        },
        '& .slick-prev': {
            backgroundImage: 'url(' + arrowPrev + ')',
            left: 'var(--arrow_offset)',
            '&:before': {
                display: 'none'
            }
        }  
    },
    dashboardSlide: {
        display: 'flex !important',
        flexWrap: 'wrap'
    },
    gageWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '147px',
        backgroundImage: 'url(' + gageImg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    lowerDashboard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '8px 20px',
    },
    gageArrow: {
        position: 'relative',
        width: '69px',
        height: '123px',
        bottom: '-27px',
        '& div': {
            position: 'absolute',
            width: 'inherit',
            height: 'inherit',
            backgroundRepeat: 'no-repeat',
        },
    },
    needleImg: {
        position: 'absolute',
        backgroundImage: 'url(' + needleImg + ')',
        backgroundPosition: 'center',
        transformOrigin: '35px 87px'
    },
    gageState: {
        backgroundImage: 'url(' + gageState + ')',
        backgroundPosition: 'center 58px', 
    },
    boxWrap: {
        height: '180px',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
    },
    footBox: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #1e2132',
        background: '#1e2132',
        color: '#fff',
        marginLeft: '7px !important',
        overflow: 'hidden',
        '&.boxUp': {
            height: '120px'
        },
        '&.boxDown': {
            height: '50px',
            borderRadius: '8px'
        },
        '&:nth-of-type(2) .rightBox div:first-of-type div:last-of-type': {
            color: '#fdcb05'
        }
    },
    footLink: {
        width: '100%',
        lineHeight: '43px',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '500',
        background: '#3a5298',
        letterSpacing: '-1.08px'
    },
    bottomBox: {
        display: 'flex',
        width: '100%',
        height: '77px',
        '&.leftBox': {
            justifyContent: 'space-around',
            '& div': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& *': {
                    margin: '0 5px'
                },
                '& strong': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50px',
                    height: '50px',
                    fontSize: '30px',
                    fontWeight: '500',
                    background: '#556478',
                    borderRadius: '50%',
                }
            },
            '& div:first-of-type strong': {
                color: '#fdcb05',
            },
            '& div:last-of-type strong': {
                color: '#00adef',
            }
        },
        '&.rightBox': {
            display: 'flex',
            '& div': {
                width: '100%',
                color: '#e7e7e9',
                boxSizing: 'content-box',
                textAlign: 'center',
                '& div:first-of-type': {
                    backgroundColor: '#4d5867',
                    borderTop: '1px solid #1e2132',
                    borderLeft: '1px solid #1e2132',
                    lineHeight: '29px',
                },
                '& div:last-of-type': {
                        borderRight: '1px solid #556478',
                        lineHeight: '46px',
                    '& strong': {
                        fontSize: '30px',
                        fontWeight: '500',
                        marginRight: '3px'
                    },
                }
            },
            '& div:last-of-type div:last-of-type': {
                border: '0'
            }
        }
    },
    footDate: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        '& .dateBox': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            color: '#d5d5d8'
        }
    },
    dayNums: {
        display: 'flex',
        marginLeft: '15px',
        '& div': {
            width: '19px',
        }
    },
    timeNums: {
        display: 'flex',
        color: '#FBA325',
        marginLeft: '7px',
        '& div': {
            display: 'flex',
            marginLeft: '4px',
            padding: '4px 8px',
            background: 'linear-gradient(0deg, rgba(0,0,0,1) 40%, rgba(98,98,98,1) 100%)',
            borderRadius: '4px'
        },
        '& span': {
            fontSize: '32px',
            height: '32px',
            padding: '0px 2px 0px 6px',
            textAlign: 'center',
            lineHeight: '23px',
        }
    },
}));

const UserButton = styled(ButtonUnstyled)`
    background: transparent url(${userIcon});
    &:hover {
        background-image: url(${userIconHover});
    }
`;

const LogButton = styled(ButtonUnstyled)`
    background: transparent url(${logIcon});
    &:hover {
        background-image: url(${logIconHover});
    }
`;

const SettingsButton = styled(ButtonUnstyled)`
    background: transparent url(${setIcon});
    &:hover {
        background-image: url(${setIconHover});
    }
`;

const AdminButton = styled(ButtonUnstyled)`
    background: transparent url(${adminIcon});
    &:hover {
        background-image: url(${adminIconHover});
    }
`;

const ChartButton = styled(ButtonUnstyled)`
    background: transparent url(${chartIcon});
    background-repeat: no-repeat;
    position: absolute;
    top: -15px;
    left: -245px;
    width: 80px;
    height: 72px;
    border: none;
    cursor: pointer;
    transition: transform .2s;
    &:hover {
        transform: scale(1.08);
    }
`;

const MainNavButton = styled(ButtonUnstyled)`
    width: 100%;
    height: 46px;
    font-weight: 200;
    color: #fff;
    font-size: 20px;
    letter-spacing: -2.08px;
    border-radius: 6px;
    background: #3a5298;
    border: none;
    cursor: pointer;
    &:hover {
        background-image: linear-gradient(#04b9fb, #017dfa);
    }   
`;

const headerSlider = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1
}

const dashboardSlider = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
}


const Dashboard = () => {
    const classes = useStyles();

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };
    
    return (
        <WideLayout>

            <Grid className={classes.dashboardWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                                <UserButton className={classes.mainMenuButton}></UserButton>
                                <FormControl sx={{width: 180}}>
                                    <Select
                                    className={classes.selectMenu}
                                    value={num}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{'aria-label': 'Without label'}}
                                    >
                                        <MenuItem value="">one</MenuItem>
                                        <MenuItem value={2}>two</MenuItem>
                                        <MenuItem value={3}>three</MenuItem>
                                        <MenuItem value={4}>four</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{width: 150, marginLeft: '8px'}}>
                                    <Select
                                    className={classes.selectMenu}
                                    value={num}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{'aria-label': 'Without label'}}
                                    >
                                        <MenuItem value="">one</MenuItem>
                                        <MenuItem value={2}>two</MenuItem>
                                        <MenuItem value={3}>three</MenuItem>
                                        <MenuItem value={4}>four</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.rightMenu}>
                                <div className={classes.userInformation}>
                                    <div>admin1 / <span>홍길동 안전보건팀장</span></div>
                                    <div>계약기간 : 22.07.01 ~ 23.06.31</div>
                                </div>
                                <LogButton className={classes.mainMenuButton}></LogButton>
                                <SettingsButton className={classes.mainMenuButton}></SettingsButton>
                            </div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            <AdminButton className={classes.mainMenuButton}></AdminButton>
                            <div className={classes.weatherSection}>
                                <span>    
                                    <img src={weatherIcon} alt="weather icon" />
                                </span>
                                <span>18.0</span>
                                <span>서울시 구로구 구로동</span>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid className={classes.headerWorkplace} item xs={12} sx={{marginTop: '-45px'}}>
                        <div className={classes.adminField + ' ' + classes.adminFieldLeft}>
                            <div className={classes.adminFieldText}>안전보건목표</div>
                            <div className={classes.adminFieldText}>안전사고 무재해 2배수 달성!</div>
                        </div>
                        <div className={classes.adminLogo}>
                            <img src={adminLogo} alt="admin logo" />
                        </div>
                        <div className={classes.adminField + ' ' + classes.adminFieldRight}>
                            <div className={classes.adminFieldText}>경영방침</div>
                            <div className={classes.adminFieldText}>신뢰받는 세계 NO1. 사업장 구축</div>
                        </div>
                    </Grid>
                    <Grid className={classes.headerNavigation} item xs={5.8}>
                        <ChartButton></ChartButton>
                        <div className={classes.navSlider}>
                            <Slider {...headerSlider}>
                                <div><MainNavButton>전체사업장</MainNavButton></div>
                                <div><MainNavButton>여수사업장</MainNavButton></div>
                                <div><MainNavButton>울산사업장</MainNavButton></div>
                                <div><MainNavButton>서산사업장</MainNavButton></div>
                                <div><MainNavButton>인천사업장</MainNavButton></div>
                                <div><MainNavButton>광주사업장</MainNavButton></div>
                                <div><MainNavButton>인천사업장</MainNavButton></div>
                                <div><MainNavButton>대전사업장</MainNavButton></div>
                            </Slider>
                        </div>
                    </Grid>

                </Grid>
                <Grid className={classes.pageBody} item xs={10.7}>
                    <div className={classes.managementOrder}>
                        관리차수<strong>12</strong>차 :<strong>22.01.01 ~ 22.04.30</strong> 
                    </div>
                    <Slider className={classes.dashSlider} {...dashboardSlider}>
                        <div className={classes.dashboardSlide}>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' green'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                        </div>

                        <div className={classes.dashboardSlide}>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>
                            <div className={classes.slickCircle + ' red'}>
                                <Link className={classes.slickLink} href="#" underline="none">
                                    <div><strong>100</strong>%</div>
                                    <div>안전보건 목표 및 경영방침</div>
                                </Link>
                            </div>  
                        </div>
                    </Slider>
                </Grid>
                <Grid className={classes.lowerDashboard} container item xs={12}>

                    <Grid className={classes.gageWrap} item xs={2}>
                        <div className={classes.gageArrow}>
                            <div className={classes.needleImg} style={{transform: 'rotate(25deg)'}}></div>
                            <div className={classes.gageState}></div>
                        </div>
                    </Grid>

                    <Grid className={classes.boxWrap} item xs={10}>
                        
                        <Grid container item xs={12}>
                            <Grid className={classes.footBox + ' boxUp'} item xs={3.7}>
                                <Link className={classes.footLink} href="#" underline="none">대표이사 개선조치</Link>
                                <div className={classes.bottomBox + ' leftBox'}>
                                    <div>
                                        <div>지시</div>
                                        <strong>3</strong>
                                        <div>건</div>
                                    </div>
                                    <div>
                                        <div>진행</div>
                                        <strong>1</strong>
                                        <div>건</div>
                                    </div>
                                    <div>
                                        <div>완료</div>
                                        <strong>12</strong>
                                        <div>건</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid className={classes.footBox + ' boxUp'} item xs={5}>
                                <div className={classes.footLink} href="#" underline="none">산업재해 누적 집계</div>
                                <div className={classes.bottomBox + ' rightBox'}>
                                    <div>
                                        <div>사망</div>
                                        <div><strong>0</strong>건</div>
                                    </div>
                                    <div>
                                        <div>추락</div>
                                        <div><strong>1</strong>건</div>
                                    </div>
                                    <div>
                                        <div>화재</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                    <div>
                                        <div>충돌</div>
                                        <div><strong>2</strong>건</div>
                                    </div>
                                    <div>
                                        <div>전기</div>
                                        <div><strong>3</strong>건</div>
                                    </div>
                                    <div>
                                        <div>고소</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                    <div>
                                        <div>급성독성</div>
                                        <div><strong>6</strong>건</div>
                                    </div>
                                    <div>
                                        <div>끼임</div>
                                        <div><strong>12</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid className={classes.footBox + ' boxUp'} item xs={3}>
                                <div className={classes.footLink} href="#" underline="none">11/27(화) - 안전작업허가 공사내역</div>
                                <div className={classes.bottomBox + ' rightBox'}>
                                    <div>
                                        <div>고소</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                    <div>
                                        <div>화학물</div>
                                        <div><strong>1</strong>건</div>
                                    </div>
                                    <div>
                                        <div>밀폐</div>
                                        <div><strong>2</strong>건</div>
                                    </div>
                                    <div>
                                        <div>굴착</div>
                                        <div><strong>3</strong>건</div>
                                    </div>
                                    <div>
                                        <div>기타</div>
                                        <div><strong>4</strong>건</div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} sx={{marginBottom: '3px'}}>
                            <Grid className={classes.footBox + ' boxDown'} item xs={8.75}></Grid>
                            <Grid className={classes.footBox + ' boxDown ' + classes.footDate} item xs={3}>
                                <div className={classes.footDay + ' dateBox'}>
                                    <div>DAY</div>
                                    <div className={classes.dayNums}>
                                        <div><img src={numThree} alt="number three" /></div>
                                        <div><img src={numTwo} alt="number two" /></div>
                                        <div><img src={numFour} alt="number four" /></div>
                                        <div><img src={numFive} alt="number five" /></div>
                                    </div>
                                </div>
                                <div className={classes.footTime + ' dateBox'}>
                                    <div>TIME</div>
                                    <div className={classes.timeNums}>
                                        <div><img src={numTwo} alt="number two" /></div>
                                        <div><img src={numOne} alt="number one" /></div>
                                        <span>:</span>
                                        <div><img src={numThree} alt="number three" /></div>
                                        <div><img src={numNine} alt="number nine" /></div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                                  
                    </Grid>
                
                </Grid>

            </Grid>

        </WideLayout>
    );
};

export default Dashboard;
