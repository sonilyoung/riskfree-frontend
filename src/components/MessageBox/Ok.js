import React from 'react';
import { useStyles } from './useStyles';

function Ok({ show, message, onConfirm }) {
    const classes = useStyles();

    return (
        <div>
            { message }
        </div>
    );

}

export default Ok;