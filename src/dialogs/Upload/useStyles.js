import { makeStyles } from '@mui/styles';
import searchIcon from '../../assets/images/ic_search.png';

const useStyles = makeStyles(() => ({
    uploadPopup: {
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px 40px 0px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        // display: 'none !important',
        '& >span': {
            width: '20%',
            height: '20px',
            borderBottom: '1px solid #bdcbe9',
            transform: 'translateY(-5px)',
            '&:nth-of-type(2)': {
                width: '60%',
                border: 'none',
                padding: '0 10px',
                boxSizing: 'border-box',
                textAlign: 'center',
                transform: 'unset',
            }
        },
        '& >button': {
            position: 'absolute',
            top: '0px',
            right: '-65px'
        }
    },
    popupClose: {
        display: 'none !important',
    },
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: '10px',
        '& label:first-of-type': {
            marginLeft: '10px',
        },
        '& $popupTextField:not($zeroOpacity):last-of-type': {
            top: '-55px',
            left: '-35px',
            height: '40px',
            width: '250px',
            background: '#fff',
            '& >div': {
                background: 'transparent',
            },
            '& input': {

            },
            '& fieldset': {
                margin: '0 !important',
            }
        },
        '& $zeroOpacity': {
            overflow: 'hidden'
        },
        '& button': {
            position: 'relative',
            top: '-45px',
        },
    },
    uploadInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50%',
        '& >*': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '& img': {
            width: '30px',
            height: '30px',
        }
    },
    popupTextField: {
        width: '100%',
        marginBottom: '10px !important',
        height: '45px',
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            padding: '10px',
            '&::-webkit-file-upload-button': {
                top: '0px',
                left: '270px',
                position: 'absolute',
                width: '45px',
                height: '45px',
                color: '#fff',
                fontSize: '20px',
                letterSpacing: '-1.08px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background .2s',
                fontSize: '0px',
                color: 'transparent',
                userSelect: 'none',
                background: '#00adef url(' + searchIcon + ') no-repeat 50% 50%',
                '&:hover': {
                    background: '#3a5298 url(' + searchIcon + ') no-repeat 50% 50%',
                }
            },
        },
        '& fieldset': {
            marginRight: '70px',
        },
    },
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
    popupOverlayClose: {
        display: 'none'
    },
    zeroOpacity: {
        opacity: 1,
    }
}))

export { useStyles };