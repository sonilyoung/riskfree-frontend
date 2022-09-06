import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { WideLayout } from '../../../../../layouts/Wide';
import { useNavigate } from 'react-router-dom';
import { usePasswordResetMutation } from '../../../../../hooks/api/LoginManagement/LoginManagement';


const useStyles = makeStyles(() => ({
    pageWrap: {
        display: 'flex',
        justifyContent: 'center',
    },
    stepWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '140px',
        width: '620px',
        padding: '40px'
    },
    loginInput: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '140px',
        marginBottom: '50px'
    },
    preInputText: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: '0 !important'
    },
    activeStep: {
        '& .MuiStepLabel-label.Mui-active': {
            color: '#018de7'
        }
    }
}));

const StepOne = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    const [passwordReset] = usePasswordResetMutation();

    const [values, setValues] = useState({
        loginId: {
            value: "",
            error: "",
        },
        companyName: {
            value: "",
            error: "",
        },
        registNo: {
            value: "",
            error: "",
        },
        managerName: {
            value: "",
            error: "",
        },
    });

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: { ...values[prop], value: event.target.value },
        });
    };


    const handleLoginStepOne = async () => {
        const response = await passwordReset({
            loginId: values.loginId.value,
            companyName: values.companyName.value,
            managerName: values.managerName.value,
            registNo: values.registNo.value
        });

        if (response.data.RET_CODE === '0000') {
            // 
            navigate(`/forgotten-password/step-2/${response.data.RET_DATA}`);
        } else {
            //TODO: This message has to be replaced with dialog.
            alert('Credentials are wrong. Please try again.');
        }
    };

    return (
        <div className={classes.stepWrap + ' step1'}>
            <Typography sx={{ textAlign: 'center' }} variant="headline1" component="div" gutterBottom>
                비밀번호가 기억나지 않으세요?
            </Typography>
            <Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>
                가입 시 등록된 정보를 입력한 후 비밀번호를 초기화합니다. 초기화 후 반듯이 비밀번호를 재설정하신 후 이용하시기 바랍니다.
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                    <Stepper sx={{ mb: 4, mt: 4 }} nonLinear activeStep={0} className={classes.activeStep}>
                        <Step>
                            <StepLabel>정보입력</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>비밀번호 재설정</StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid className={classes.preInputText} item xs={3}>
                    <Typography variant="body1" gutterBottom>아이디</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField id="standard-basic" onChange={handleChange("loginId")} placeholder="아이디를 입력해 주세요" variant="outlined" />
                </Grid>
                <Grid className={classes.preInputText} item xs={3}>
                    <Typography variant="body1" gutterBottom>회사명</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField id="standard-basic" onChange={handleChange("companyName")} placeholder="회사명을 입력해 주세요" variant="outlined" />
                </Grid>
                <Grid className={classes.preInputText} item xs={3}>
                    <Typography variant="body1" gutterBottom>사업자 등록번호</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField id="standard-basic" onChange={handleChange("registNo")} placeholder="숫자 10자리를 입력해주세요" variant="outlined" />
                </Grid>
                <Grid className={classes.preInputText} item xs={3}>
                    <Typography variant="body1" gutterBottom>담당자명</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField id="standard-basic" onChange={handleChange("managerName")} placeholder="담당자명을 입력해 주세요" variant="outlined" />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                    <Button sx={{ width: '100%', mt: 4 }} onClick={handleLoginStepOne} variant="contained">비밀번호 재설정</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default StepOne