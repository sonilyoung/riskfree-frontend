import React from 'react';
import { useStyles } from './useStyles';

function Overlay({ children, show, transparent=false }) {
    const classes = useStyles();

    return (
        <div className={show ? (transparent ? classes.popupOverlayTransparent : classes.popupOverlay) : classes.popupOverlayClose}>    
            { children }
        </div>
    );


}

export default Overlay;