import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { WideLayout } from '../../layouts/Wide';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { selectUser, setUser } from '../../slices/User';
import { useLoginMutation } from '../../hooks/api/LoginManagement/LoginManagement';
import { useUserViewMutation } from '../../hooks/api/UserManagement/UserManagement';
import { useNoticesSelectMutation } from '../../hooks/api/NoticesManagment/NoticesManagement';
import { useSubscribersSelectMutation } from '../../hooks/api/SubscribersManagement/SubscribersManagement';

import { makeStyles } from '@mui/styles';
import logoLogin from '../../assets/images/logo_login.png';
import checkIcon from '../../assets/images/ic_chk2.png';
import checkIconOn from '../../assets/images/ic_chk2_on.png';

const useStyles = makeStyles(() => ({
    pageWrap: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '1900px !important',
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
        '&:visited': {
            color: '#0000'
        },
        '&:hover': {
            textDecoration: "underline"
        }
    }
}));

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [userView, { isLoading: isUserViewLoading }] = useUserViewMutation();

    const [subscribersSelect] = useSubscribersSelectMutation()


    const handleLogin = async () => {
        const loginResponse = await login({
            loginId: "AAA222",
            loginPw: "test"
        });
        const jwtToken = loginResponse.data.RET_DATA.accessToken;
        localStorage.setItem('userToken', jwtToken)
        const userViewResponse = await userView();
        console.log(userViewResponse);
    }

    const handleView = async () => {
        const noticesViewResponse = await subscribersSelect({})
        console.log(noticesViewResponse)
    }

    //console.log(isLoginLoading);
    //console.log(isUserViewLoading);

    useEffect(() => {
        dispatch(setUser({
            id: 1,
            fistName: 'Milivoje',
            lastName: 'Vujadinovic2'
        }));
    }, []);

    const user = useSelector(selectUser);
    //console.log(user);

    return (
        <WideLayout>
            <div className={classes.pageWrap}>
                <div className={classes.loginWrap}>
                    <div className={classes.loginLogo}>
                        <img src={logoLogin} alt="login logo" />
                    </div>
                    <div className={classes.loginInput}>
                        <TextField id="standard-basic" placeholder="아이디" variant="outlined" />
                        <TextField id="standard-basic" placeholder="비밀번호" variant="outlined" />
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
                    <Button variant="contained" onClick={() => {
                        handleLogin()
                        handleView()
                    }}>로그인</Button>
                </div>
            </div>
        </WideLayout>
    );
};

export default Login;
