import React from 'react';
import { useStyles } from './useStyles';

function YesNo({ show, message, onConfirmYes,  onConfirmNo }) {
    const classes = useStyles();

    return (
        <div>
            { message }
        </div>
    );

}

export default YesNo;