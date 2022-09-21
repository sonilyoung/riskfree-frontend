import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    popupOverlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: '1',
        display: 'block',
    },
    popupOverlayTransparent: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0)',
        zIndex: '1',
        display: 'block',
    },
    popupOverlayClose: {
        display: 'none'
    }
}))

export { useStyles };