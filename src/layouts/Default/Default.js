import React from 'react';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import logo from '../../assets/images/logo.png';
import userIcon from '../../assets/images/btn_user.png';
import userIconHover from '../../assets/images/btn_user_ov.png';
import logIcon from '../../assets/images/btn_log.png';
import logIconHover from '../../assets/images/btn_log_ov.png';
import setIcon from '../../assets/images/btn_set.png';
import setIconHover from '../../assets/images/btn_set_ov.png';
import adminIcon from '../../assets/images/btn_admin.png';
import adminIconHover from '../../assets/images/btn_admin_ov.png';
import weatherIcon from '../../assets/images/weather_icon.png';
import backButton from '../../assets/images/btn_back.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const useStyles = makeStyles(() => ({
    bodyWrap: {
        backgroundColor: '#33374f',
        minWidth: '1900px !important',
        height: '100%',
    },
    headerWrap: {
        backgroundColor: '#33374f',
        justifyContent: 'center'
    },
    sectionWrap: {
        minHeight: 'calc(100vh - 94px)',
        marginLeft: '40px',
        boxSizing: 'border-box',
        padding: '37px 40px 40px',
        backgroundColor: '#eff2f9',
        borderRadius: '24px 0 0 0'
    },
    pageHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
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
        alignItems: 'center',
        padding: '12px 0px 14px'
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
        marginTop: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background .3s'
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

const BackButton = styled(ButtonUnstyled)`
    position: absolute;
    top: 130px;
    left: 6px;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent url(${backButton});
    cursor: pointer;
`;

const Default = ({ children }) => {
    const classes = useStyles();

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };
    return (
        <div className={classes.bodyWrap}>
            <Grid className={classes.headerWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                                <UserButton className={classes.mainMenuButton}></UserButton>
                                <FormControl sx={{ width: 180 }}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">one</MenuItem>
                                        <MenuItem value={2}>two</MenuItem>
                                        <MenuItem value={3}>three</MenuItem>
                                        <MenuItem value={4}>four</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: 150, marginLeft: '8px' }}>
                                    <Select
                                        className={classes.selectMenu}
                                        value={num}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
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

                </Grid>

            </Grid>
            <BackButton></BackButton>
            <div className={classes.sectionWrap}>
                {children}
            </div>
        </div>
    );
};

export default Default;