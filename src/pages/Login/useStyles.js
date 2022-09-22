import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    pageWrap: {
        display: 'flex',
        justifyContent: 'center',
        background: '#fff',
        height: '100vh',
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
        color: "black",
        '&:visited': {
            color: '#0000'
        },
        '&:hover': {
            textDecoration: "underline"
        }
    },
    welcomePopup: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: '1000',
        '& >div': {
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '-80px',
                right: '0'
            }
        }
    },
    welcomePopupClose: {
        display: 'none !important',
    }
}));

export { useStyles };