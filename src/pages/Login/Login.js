import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { WideLayout } from '../../layouts/Wide';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { selectUser, setUser } from '../../slices/User';
import { useLoginMutation } from '../../hooks/api/LoginManagement/LoginManagement';
import { UserTokenService } from '../../services/core/User';

import { makeStyles } from '@mui/styles';
import logoLogin from '../../assets/images/logo_login.png';
import checkIcon from '../../assets/images/ic_chk2.png';
import checkIconOn from '../../assets/images/ic_chk2_on.png';
import welcomeImg from '../../assets/images/img_first.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

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
    },
    linkBtn: {
        textDecoration: "none",
        color: "black",
        '&:visited': {
            color: '#0000'
        },
        '&:hover': {
            textDecoration: "underline"
        }
    },
    welcomePopup: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: '1000',
        display: 'none !important',
        '& >div': {
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '-80px',
                right: '0'
            }
        }
    }
}));

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    padding: 0;
    background: url(${popupClose2}) no-repeat center;
    border: none;
    cursor: pointer;
    transition: background .2s; 
`;

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        id: {
            value: '',
            error: 'Invalid id'
        },
        password: {
            value: '',
            error: ''
        },
    });
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: { ...values[prop], value: event.target.value }
        });
    };

    const handleLogin = async () => {
        const userLoginResponse = await login({
            loginId: values.id.value,
            loginPw: values.password.value
        });
        if (userLoginResponse.data.RET_CODE === '0000') {
            const jwtToken = userLoginResponse.data.RET_DATA.accessToken;
            UserTokenService.setItem(jwtToken);
            dispatch(setUser({
                id: 1,
                fistName: 'Milivoje',
                lastName: 'Vujadinovic'
            }));
            navigate('/dashboard/director');
        } else {
            //TODO: This message has to be replaced with dialog.
            alert('Credentials are wrong. Please try again.');
        }
    }

    //const user = useSelector(selectUser);
    //console.log(user);

    return (
        <WideLayout>
            <div className={classes.pageWrap}>
                <div className={classes.welcomePopup}>
                    <div>
                        <img src={welcomeImg} alt="welcome" />
                        <ClosePopupButton2></ClosePopupButton2>
                    </div>
                </div>
                <div className={classes.loginWrap}>
                    <div className={classes.loginLogo}>
                        <img src={logoLogin} alt="login logo" />
                    </div>
                    <div className={classes.loginInput}>
                        <TextField id="id" onChange={handleChange("id")} placeholder="아이디" variant="outlined" />
                        <TextField id="pawwword" type="password" onChange={handleChange("password")} placeholder="비밀번호" variant="outlined" />
                    </div>
                    <div className={classes.loginOptions}>
                        <FormControlLabel
                            label="아이디저장"
                            control={
                                <Checkbox
                                    icon={<img src={checkIcon} alt="check icon" />}
                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                />
                            }
                        />
                        <Link to={"/forgotten-password/step-1"} className={classes.linkBtn} underline="hover">비밀번호 찾기 / 재설정</Link>
                    </div>
                    <Button variant="contained" onClick={handleLogin}>로그인</Button>
                </div>
            </div>
        </WideLayout>
    );
};

export default Login;
