import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { WideLayout } from '../../layouts/Wide';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { selectBaselineId, selectWorkplaceId, setBaselineId } from '../../slices/selections/MainSelection';
import { useLoginMutation } from '../../hooks/api/LoginManagement/LoginManagement';
import { useLocalStorage } from '../../hooks/misc/LocalStorage';
import { useGetBaselineMutation } from '../../hooks/api/MainManagement/MainManagement';

import logoLogin from '../../assets/images/logo_login.png';
import checkIcon from '../../assets/images/ic_chk2.png';
import checkIconOn from '../../assets/images/ic_chk2_on.png';
import welcomeImg from '../../assets/images/img_first.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import useUserURLRedirect from '../../hooks/core/UserURLRedirect/UserURLRedirect';
import { useUserToken } from '../../hooks/core/UserToken';
import { useStyles } from './useStyles';
import { RoleService } from '../../services/core/User';

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
    const [getBaseline] = useGetBaselineMutation();
    const navigate = useNavigate();

    const [userToken] = useUserToken();
    const localStorage = useLocalStorage();
    const [login] = useLoginMutation();
    const getPath = useUserURLRedirect();
    const [welcomePopupShow, setWelcomePopupShow] = useState(false);

    const handleWelcomeScreenPopup = (currentUser) => {
        if (!localStorage.getItem(`loggedIn${currentUser}`)) {
            setWelcomePopupShow(true);
            localStorage.setItem(`loggedIn${currentUser}`, currentUser);
        }
    }

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
            userToken.setItem(jwtToken);

            handleWelcomeScreenPopup(values.id.value);

            const userLoggedInRoleCd = userToken.getUserRoleCd();
            const redirectPath = getPath(userLoggedInRoleCd);

            if (userLoggedInRoleCd !== RoleService.ROLE_CODE_ADMIN) {
                const defaultBaselineResponse = await getBaseline({});
                console.log(defaultBaselineResponse);
                const defaultBaselineId = defaultBaselineResponse.data?.RET_DATA?.baselineId;
                dispatch(setBaselineId(defaultBaselineId));
                localStorage.setDefaultBaselineId(defaultBaselineId);
            }
            console.log(redirectPath);
            navigate(redirectPath);

        } else {
            //TODO: This message has to be replaced with dialog.
            alert('Credentials are wrong. Please try again.');
        }


    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 13) {
                // event.preventDefault()
                handleLogin();
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [values])

    return (
        <WideLayout>
            <div className={classes.pageWrap}>
                <div className={welcomePopupShow ? classes.welcomePopup : classes.welcomePopupClose}>
                    <div>
                        <img src={welcomeImg} alt="welcome" />
                        <ClosePopupButton2 onClick={() => setWelcomePopupShow(false)}></ClosePopupButton2>
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
