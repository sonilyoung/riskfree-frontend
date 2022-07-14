import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { WideLayout } from '../../layouts/Wide';

const Registration = () => {
    return (
        <WideLayout>
            <TextField id="first-name" hiddenLabel placeholder="First Name" variant="outlined" />
            <TextField id="last-name" hiddenLabel placeholder="Lirst Name" variant="outlined" />
            <Button variant="contained">Contained</Button>
        </WideLayout>
    );
};

export default Registration;
