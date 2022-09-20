import { createTheme } from '@mui/material/styles';
import '../../assets/fonts/Pretendard-Regular.otf';

const main = createTheme({
    typography: {
        fontFamily: ['pretendard', '맑은 고딕', 'Malgun Gothic', 'AppleGothic', 'sans-serif'].join(','),
        button: {
            height: 60,
            fontSize: 20,
            backgroundColor: '#018de7',
            borderRadius: 6,
        },
        headline1: {
            fontWeight: '400',
            fontSize: '40px',
            letterSpacing: '-1.08px'
        },
        headline2: {
            fontWeight: '500',
            fontSize: '28px',
            letterSpacing: '-1.08px'
        },
        body1: {
            fontWeight: '400',
            fontSize: '22px',
            lineHeight: '30px',
            letterSpacing: '-1.08px',
            wordBreak: 'keep-all'
        },
        body2: {
            fontWeight: '400',
            fontSize: '16px',
            letterSpacing: '-1.08px'
        },
    },
    palette: {
        primary: {
            main: '#018de7',
            dark: '#0355b0'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 905,
            lg: 1240,
            xl: 1440
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: 'none'
                },
            }, 
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontSize: 17,
                    // '& textarea[id=outlined-multiline-static]': {
                    //     '&::-webkit-scrollbar': {
                    //         width: '6px',
                    //         height: '6px',
                    //         border: '6px solid #1e2132'
                    //     },
                    //     '&::-webkit-scrollbar-track': {
                    //         background: '#1e2132',
                    //         borderRadius: '0px',
                    //         boxShadow: 'inset 0 0 4px rgb(0 0 0 / 20%)'
                    //     },
                    //     '&::-webkit-scrollbar-thumb': {
                    //         height: '50px',
                    //         width: '6px',
                    //         background: '#3f4d72',
                    //         borderRadius: '8px',
                    //         boxShadow: 'inset 0px 10px 0px 0px #1e2132, inset 0px -10px 0px 0px #1e2132'
                    //     },
                    // }
                    // '& input[type=date]': {
                    //     display: 'flex',
                    //     alignItems: 'center'
                    // },
                    // '& input[type=date]::-webkit-datetime-edit': {
                    //     color: 'transparent',
                    //     position: 'relative',
                    // },
                    // '& input[type=date]::-webkit-datetime-edit-year-field': {
                    //     position: 'absolute !important',
                    //     color: '#000',
                    //     padding: '2px',
                    //     left: '0px',
                    // },
                    // '& input[type=date]::-webkit-datetime-edit-month-field': {
                    //     position: 'absolute !important',
                    //     color: '#000',
                    //     padding: '2px',
                    //     left: '40px',
                    // },
                    // '& input[type=date]::-webkit-datetime-edit-day-field': {
                    //     position: 'absolute !important',
                    //     color: '#000',
                    //     padding: '2px',
                    //     right: '0px',
                    // },
                },
                input: {
                    '&::placeholder': {
                        opacity: 1,
                      },
                },
                
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        // textDecoration: 'underline'
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
                    marginLeft: 0
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
        MuiStepper: {
            styleOverrides: {
                root: {
                    width: '100%',
                    odisplay: 'flex',
                    justifyContent: 'flex-end'
                }
            }
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontSize: 20,
                    letterSpacing: '-1.08px',
                    color: '#666',
                },
                // '&.Mui-active': {
                //     color: '#018de7'
                // },
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    width: '34px',
                    height: '34px'
                }
            }
        },
        MuiStepIcon: {
            styleOverrides: {
                text: {
                    fontSize: '16px',
                    transform: 'translateY(-1px)'
                }
            }
        },
        MuiStepConnector: {
            styleOverrides: {
                root: {
                    display: 'none'
                }
            }  
        },
        MuiGrid: {
            styleOverrides: {
                root: {
                    width: 'auto',
                    marginLeft: 0,
                    marginTop: 0
                },
                // item: {
                //     display: 'flex',
                //     justifyContent: 'flex-end',
                //     alignItems: 'center'
                // }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    padding: 0
                },
                message: {
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#333',
                    letterSpacing: '-1.08px',
                    lineHeight: '20px',
                    padding: 0
                },
                icon: {
                    padding: 0,
                    marginRight: 8,
                    width: 18,
                    height: 18
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: '0px'
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '17px'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    top: '2px'
                }
            }
        },
    },
});

export default main;
