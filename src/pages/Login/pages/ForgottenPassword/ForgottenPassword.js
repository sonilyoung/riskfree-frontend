import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { WideLayout } from '../../../../layouts/Wide';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import alertIcon from '../../../../assets/images/ic_refer.png';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';

const useStyles = makeStyles(() => ({
    pageWrap: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const ForgottenPassword = () => {
    const classes = useStyles();

    return (
        <WideLayout>
            <div className={classes.pageWrap}>
                <Routes>
                    <Route path="step-1" element={<StepOne />} />
                    <Route path="step-2/:userId" element={<StepTwo />} />
                </Routes>
            </div>
        </WideLayout>
    );
};

export default ForgottenPassword;
