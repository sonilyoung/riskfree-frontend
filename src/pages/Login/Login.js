import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { WideLayout } from '../../layouts/Wide';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { setBaselineId, setIsClose } from '../../slices/selections/MainSelection';
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
import { Overlay } from '../../components/Overlay';
import Okey from '../../components/MessageBox/Okay';

// 아이디 저장 및 체크 
const LS_KEY_ID = "LS_KEY_ID";
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";

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
    const [redirectPath, setRedirectPath] = useState("");
    const [wrongCredentialsPopup, setWrongCredentialsPopup] = useState(false);
    const [wrongCredentialsPopupMessage, setWrongCredentialsPopupMessage] = useState("");
    const [wrongCredentialsPopupTitle] = useState("알림");
    const [saveIDFlag, setSaveIDFlag] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: { ...values[prop], value: event.target.value }
        });
    };

    const handleFirstLogin = () => {
        navigate(redirectPath);
        setWelcomePopupShow(false);
    }

    const handleLogin = async () => {
        const userLoginResponse = await login({
            loginId: values.id.value,
            loginPw: values.password.value
        });

        if (userLoginResponse.data.RET_CODE === '0000') {
            const jwtToken = userLoginResponse.data.RET_DATA.accessToken;
            userToken.setItem(jwtToken);

            const userLoggedInRoleCd = userToken.getUserRoleCd();
            const userRedirectPath = getPath(userLoggedInRoleCd);
            setRedirectPath(userRedirectPath);
            const userLoginCount = userToken.getUserLoginCount();

            if (userLoggedInRoleCd !== RoleService.ROLE_CODE_ADMIN) {
                const defaultBaselineResponse = await getBaseline({});
                const defaultBaselineId = defaultBaselineResponse.data?.RET_DATA?.baselineId;
                const defaultIsClose = defaultBaselineResponse.data?.RET_DATA?.isClose;
                dispatch(setBaselineId(defaultBaselineId));
                dispatch(setIsClose(defaultIsClose));
                localStorage.setDefaultBaselineId(defaultBaselineId);
                localStorage.setDefaultIsClose(defaultIsClose);
            }

            if (userLoginCount === '0') {
                setWelcomePopupShow(true);
            } else {
                setWelcomePopupShow(false);
                navigate(userRedirectPath);
            }

            if (true) {
                if (saveIDFlag) localStorage.setItem(LS_KEY_ID, values.id.value);
            } 
        } else {
            setWrongCredentialsPopupMessage("등록되지 않은 계정입니다.");
            setWrongCredentialsPopup(true);
        }
    }

    useEffect(() => {
        document.getElementById("id").focus()
        let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
        if (idFlag !== null) setSaveIDFlag(idFlag);
        if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");
        let data = localStorage.getItem(LS_KEY_ID);
        if (data !== null) setValues({...values, id: { ...values.id, value: data }
        });
    }, [])

    // Enter시 input으로 focus
    const handleNextInput = (e) => {
        if (e.key === "Enter") {
            document.getElementById("pawwword").focus();
        }
    };
    
    // Enter시 handleSubmit 호출
    const handleChangeSubmit = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    const handleSaveIDFlag = (e) => {
        if(e.target.checked === false){
            setValues({...values, id: { ...values.id, value: "" } })
        }
        localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
        setSaveIDFlag(!saveIDFlag);
    };

    return (
        <WideLayout>
            <div className={classes.pageWrap}>
                <div className={welcomePopupShow ? classes.welcomePopup : classes.welcomePopupClose}>
                    <div>
                        <img src={welcomeImg} alt="welcome" />
                        <ClosePopupButton2 onClick={() => handleFirstLogin(redirectPath)}></ClosePopupButton2>
                    </div>
                </div>
                <div className={classes.loginWrap}>
                    <div className={classes.loginLogo}>
                        <img src={logoLogin} alt="login logo" />
                    </div>
                    <div className={classes.loginInput}>
                        <TextField id="id" label="아이디" onChange={handleChange("id")} onKeyPress={handleNextInput} value={values.id.value}/>
                        <TextField id="pawwword" label="비밀번호" type="password" onChange={handleChange("password")} onKeyPress={handleChangeSubmit} variant="outlined" />
                    </div>
                    <div className={classes.loginOptions}>
                        <FormControlLabel
                            label="아이디저장"
                            control={
                                <Checkbox
                                    icon={<img src={checkIcon} alt="check icon" />}
                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                    name="saveId"
                                    id="saveId"
                                    checked={saveIDFlag}
                                    onChange={handleSaveIDFlag}
                                />
                            }
                        />
                        <Link to={"/forgotten-password/step-1"} className={classes.linkBtn} underline="hover">비밀번호 찾기 / 재설정</Link>
                    </div>
                    <Button variant="contained" onClick={() => handleLogin()}>로그인</Button>
                </div>
            </div>
            <Overlay show={wrongCredentialsPopup}>
                <Okey
                    show={wrongCredentialsPopup}
                    title={wrongCredentialsPopupTitle}
                    message={wrongCredentialsPopupMessage}
                    onConfirm={() => setWrongCredentialsPopup(false)} />
            </Overlay>
        </WideLayout>
    );
};
export default Login;