import { createTheme } from '@mui/material/styles';

const main = createTheme({
    typography: {
        fontFamily: ['pretendard', '맑은 고딕','Malgun Gothic', 'AppleGothic', 'sans-serif'].join(','),
        button: {
            height: 60,
            fontSize: 20,
            backgroundColor: '#018de7',
            borderRadius: 6,
        },
    },
    palette: {
        primary: {
            main: '#018de7',
            dark: '#0355b0'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                },
            }, 
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontSize: 20
                },
                input: {
                    '&::placeholder': {
                        opacity: 1
                      },
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        textDecoration: 'underline'
                    },
                    textDecoration: 'none',
                    color: 'inherit'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    margin: 0,
                    cursor: 'default'
                },
                label: {
                    marginLeft: 10
                },
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&:hover': {
                    backgroundColor: 'rgba(1, 141, 231, 0)'
                    },
                    cursor: 'default',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 16,
                    letterSpacing: '-0.08px',
                    color: '#333'
                }
            }
        },
        // MuiTouchRipple: {
        //     styleOverrides: {
        //         root: {
        //             opacity: '0'
        //         }
        //     }
        // },
    },
});

export default main;
