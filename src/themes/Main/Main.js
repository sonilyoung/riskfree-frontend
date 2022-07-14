import { createTheme } from '@mui/material/styles';

const main = createTheme({
    typography: {
        fontFamily: ['pretendard', '맑은 고딕','Malgun Gothic', 'AppleGothic', 'sans-serif'].join(','),
        headline1: {
            fontWeight: '500',
            fontSize: '100px',
            lineHeight: '112px',
            letterSpacing: '-0.08px'
        },
        button: {
            height: '60px',
            fontSize: '20px',
            letterSpacing: '-0.08px',
            backgroundColor: '#018de7',
            borderRadius: '6px',
        },
    },
    palette: {
        primary: {
            main: '#018de7',
            dark: '#0355b0'
        }
    },
    // components: {
    //     MuiButton: {
    //         styleOverrides: {
    //             root: {
    //                 borderRadius: 6,
    //             },
    //         }, 
    //     },
    //     MuiOutlinedInput: {
    //         styleOverrides: {
    //             root: {
    //                 borderRadius: 6,
    //             }
    //         }
    //     },
    // },
    // shape: {
    //     borderRadius: 12
    // }
});

export default main;
