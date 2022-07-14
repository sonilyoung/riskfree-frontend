import React from 'react';
import { WideLayout } from '../../layouts/Wide';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { makeStyles } from '@mui/styles';

import logoLogin from '../../logo_login.png';

const useStyles = makeStyles(() => ({
    pageWrap: {
        display: 'flex',
        justifyContent: 'center'
    },
    loginWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '140px',
        width: '460px',
        height: '470px', 
    },
    loginLogo: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '46px'
    },
    loginInput: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '140px'
    },
    loginOptions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0 20px 0'
    }
}));

const Login = () => {
    const classes = useStyles();

    return (
        <WideLayout>
            <div className={classes.pageWrap}>
                <div className={classes.loginWrap}>
                    <div className={classes.loginLogo}>
                        <img src={logoLogin} alt="logo" />
                    </div>
                    <div className={classes.loginInput}>
                        <TextField id="standard-basic" placeholder="아이디" variant="outlined" />
                        <TextField id="standard-basic" label="비밀번호" variant="outlined" />
                    </div>
                    <div className={classes.loginOptions}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="아이디저장" />
                        <Link href="#">비밀번호 찾기 / 재설정</Link>
                    </div>
                    <Button variant="contained">로그인</Button>
                </div>
            </div>
        </WideLayout>
    );
};

export default Login;
