import React from 'react';
import { DefaultLayout } from '../../layouts/Default';
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

import circleGreen from '../../assets/images/bg_circle_green.png';
import circleYellow from '../../assets/images/bg_circle_yellow.png';
import circleOrange from '../../assets/images/bg_circle_orange.png';
import circleRed from '../../assets/images/bg_circle_red.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const useStyles = makeStyles(() => ({
    dashboardWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center'
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
            transform: 'translate(20px, 15px)'
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
        borderRadius: '50%',
    },
    mainMenuButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        marginTop: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background .3s'
    },
    navSlickSlider: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 35px 0px 35px'
    },
    pageBody: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundImage: 'linear-gradient(#424762, #1e2130)',
        borderRadius: '32px',
        width: '1720px',
        height: '540px',
        padding: '1px 190px 25px 190px'
    },
    slickCircle: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'210px',
        height: '210px',
        margin: '1% .6% 0',
        backgroundImage: 'url(' + circleGreen + ')',
        backgroundRepeat: 'no-repeat',
        transition: 'transform .3s',
        '&:hover': {
            transform: 'scale(1.08)'
        },
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
        height: '66px',
        width: '100%',
        backgroundImage: 'url(' + orderBackground + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    }
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
    left: -230px;
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
    width: 164px;
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
    },
    &:first-of-type {
        background-image: linear-gradient(#04b9fb, #017dfa);
    }
`;

const Dashboard = () => {
    const classes = useStyles();

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };
    
    return (
        <DefaultLayout>

            <Grid className={classes.dashboardWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6}>
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
                    <Grid className={classes.headerNavigation} item xs={6}>
                        <ChartButton></ChartButton>
                        <div className={classes.navSlickSlider}>
                            <MainNavButton>전체사업장</MainNavButton>
                            <MainNavButton>여수사업장</MainNavButton>
                            <MainNavButton>울산사업장</MainNavButton>
                            <MainNavButton>서산사업장</MainNavButton>
                            <MainNavButton>인천사업장</MainNavButton>
                        </div>
                    </Grid>

                </Grid>

                <Grid className={classes.pageBody} item xs={11}>
                    <div className={classes.managementOrder}>

                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>
                    <div className={classes.slickCircle}>
                        <Link className={classes.slickLink} href="#" underline="none">
                            <div><strong>100</strong>%</div>
                            <div>안전보건 목표 및 경영방침</div>
                        </Link>
                    </div>

                </Grid>

            </Grid>

        </DefaultLayout>
    );
};

export default Dashboard;
