import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    promptPopup: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '200px',
        borderRadius: '18px',
        border: '2px solid #018de7',
        background: 'white',
        color: '#333',
        overflow: 'hidden',
        zIndex: '6',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            '&:first-of-type': {
                fontSize: '20px',
                fontWeight: 'bold',
                paddingTop: '10px',
                '& img': {
                    padding: '4px',
                    borderRadius: '50%',
                    background: '#018de7',
                }
            },
            '&:last-of-type': {
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                '& button': {
                    width: '50%',
                    height: '100%',
                    border: 'none',
                    background: '#eeeff7',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: '.2s',
                    '&:last-of-type': {
                        borderLeft: '1px solid #fff',
                        background: '#018de7',
                        color: '#fff',
                        '&:hover': {
                            background: '#0355b0',
                            color: '#fff'
                        }
                    },
                    '&:hover': {
                        background: '#bdcbe9',
                        color: '#333',
                    }
                }
            },
        }
    },
    noticePopup: {
        // display: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '200px',
        borderRadius: '18px',
        border: '2px solid #018de7',
        background: 'white',
        color: '#333',
        overflow: 'hidden',
        zIndex: '6',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            '&:first-of-type': {
                fontSize: '20px',
                fontWeight: 'bold',
                paddingTop: '10px',
                '& img': {
                    padding: '4px',
                    borderRadius: '50%',
                    background: '#018de7',
                }
            },
            '&:last-of-type': {
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                '& button': {
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: '#018de7',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: '.2s',
                    '&:hover': {
                        background: '#0355b0',
                        color: '#fff'
                    }
                }
            },
        }
    },
    noticePopupClose: {
        display: 'none',
    }
}));

export { useStyles };