import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

//import logo from '../../assets/images/logo.png';
import logo from '../../assets/images/logo_login.png';
import userIcon from '../../assets/images/btn_user.png';
import userIconHover from '../../assets/images/btn_user_ov.png';
import logIcon from '../../assets/images/btn_log.png';
import logIconHover from '../../assets/images/btn_log_ov.png';
import setIcon from '../../assets/images/btn_set.png';
import setIconHover from '../../assets/images/btn_set_ov.png';
import adminIcon from '../../assets/images/btn_admin.png';
import adminIconHover from '../../assets/images/btn_admin_ov.png';
import logoutIcon from '../../assets/images/logout_icon.png';
import weatherIcon from '../../assets/images/weather_icon.png';
import backButton from '../../assets/images/btn_back.png';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import fileExis from '../../assets/images/file_exis.png';
import fileNone from '../../assets/images/file_none.png';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { useGetEssentialDutyVersionMutation, useGetEssentialRateMutation, useGetBaselineListMutation, useGetBaselineMutation, useGetLoginInfoMutation, useGetCompanyInfoMutation, useGetDutyDetailListMutation, useGetWeatherMutation, useGetInspectiondocsMutation } from '../../hooks/api/MainManagement/MainManagement';
import { remove } from '../../services/core/User/Token';
import { useUserToken } from '../../hooks/core/UserToken';

import arrowDown from '../../assets/images/ic_down.png';

import '../../assets/fonts/Pretendard-Regular.otf';
import proba from '../../assets/fonts/Pretendard-Regular.otf';
import popupClose from '../../assets/images/btn_popClose.png';
import searchIcon from '../../assets/images/ic_search.png';
import popupClose2 from '../../assets/images/btn_popClose2.png';

import { useSelector, useDispatch } from 'react-redux';
import { selectBaselineId, setBaselineId } from '../../slices/selections/MainSelection';
import { useLocalStorage } from '../../hooks/misc/LocalStorage';

import LogoutIcon from '@mui/icons-material/Logout';
import { Overlay } from '../../components/Overlay';
import Okay from '../../components/MessageBox/Okay';
import { useFileUploadMutation } from '../../hooks/api/FileManagement/FIleManagement';
import { UploadDialog, UploadEmployeeDialog } from '../../dialogs/Upload';
import { useExcelUploadMutation } from '../../hooks/api/ExcelController/ExcelController';

import { ExitToApp } from '@mui/icons-material';

import { default as NotifiCenterList } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/List/List'
import { default as NotifiCenterRegistration } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/Registration/Registration'
import { default as NotifiCenterView } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/View/View'
import { default as NotifiCenterUpdate } from '../../pages/Dashboard/pages/SystemAdministrator/NotifiCenter/components/Update/Update'
import Loading from '../../pages/Loading';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const useStyles = makeStyles(() => ({
    bodyWrap: {
        backgroundColor: '#fff',
        minWidth: '1900px !important',
        height: '100%',
        fontFamily: proba,
    },
    headerWrap: {
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    sectionWrap: {
        minHeight: 'calc(100vh - 94px)',
        margin: '0 auto',
        // marginLeft: '20px',
        // marginRight: '20px',
        boxSizing: 'border-box',
        padding: '37px 40px 40px',
        backgroundColor: '#eff2f9',
        borderRadius: '24px 24px 0 0',
        width: '1875px',
    },
    pageHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    mainHeader: {
        display: 'flex',
        zIndex: 1,
        height: '95px',
    },
    mainLogo: {
        '& img': {
            transform: 'translate(20px, 10px)',
            width: "30%"
        }
    },
    mainMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0px 14px'
    },
    selectMenu: {
        height: '40px'
    },
    leftMenu: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    rightMenu: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#fff'
    },
    userInformation: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#333',
        marginRight: '20px',
        marginLeft: '10px',
        '& >div': {
            fontSize: '17px',
            '& span': {
                color: '#00adef',
                letterSpacing: '-1.08px'
            }
        },
    },
    mainAsside: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#d5d5d8',
        letterSpacing: '-1.08px',
        '& >button': {
            '&:first-of-type': {
                marginRight: '20px',
            },
            '&:last-of-type': {
                marginRight: '20px',
            }
        }
    },
    weatherSection: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
        '& span': {
            display: 'flex',
            marginLeft: '10px'
        },
        '& :nth-child(2)': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '5px',
            fontSize: '28px',
            color: '#fba325',
            fontWeight: '400'
        },
        '& :last-of-type': {
            letterSpacing: '-1.08px'
        }
    },
    circleButton: {
        height: '60px',
        width: '60px',
        borderRadius: '50%'
    },
    mainMenuButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        marginTop: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background .3s'
    },
    dropMenu: {
        '& .MuiOutlinedInput-root': {
            border: '1px solid #777b91',
            background: '#26283d',
            color: '#ddd',
            fontSize: '17px',
            '& svg': {
                color: '#ddd',
                display: 'none'
            },
        },
        '& .Mui-disabled': {
            color: '#ddd !important',
            '-webkit-text-fill-color': 'unset !important',
        }
    },
    headerPopup: {
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '397px',
        height: '280px',
        border: '2px solid #018de7',
        borderRadius: '5px',
        background: '#eeeff7',
        overflow: 'hidden',
        '&.user_popup': {
            top: '70px',
            left: '5px',
            height: '435px'
        },
        '&.user_popupClose': {
            display: "none"
        },
        '&.settings_popup': {
            top: '80px',
            left: '-195px'
        },
        '&.settings_popupClose': {
            display: "none"
        
        },
        '&.fileupload_popup': {
            backgroundColor: '#ffffff',
            width: '1024px',
            height: '550px',
            top: '80px',
            left: '-1024px'
        },
        '&.fileupload_popupClose': {
            display: "none"
        
        },
        '&.admincenter_popup': {
            width: '1024px',
            height: '700px',
            top: '80px',
            left: '-1024px'
        },
        '&.admincenter_popupClose': {
            display: "none"
        },
        '& $popupAccord': {
            background: 'transparent',
            boxShadow: 'none',
            '& .MuiButtonBase-root': {
                padding: '0',
            },
            '& .MuiAccordionDetails-root': {
                padding: '0',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                '& >span': {
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#018de7'
                },
                '& $popupTextField': {
                    marginBottom: '0 !important'
                }
            },
            '& p': {
                fontSize: '16px'
            },
            '& +span': {
                margin: '0',
                padding: '0'
            }
        },
        '& $popupLink': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#333',
            width: '100%',
            padding: '16px 0',
            boxSizing: 'border-box',
            borderBottom: '1px solid #c1c6d0',
        },
        '& .MuiAlert-message': {
            fontSize: '14px',
            letterSpacing: '-1.6px',
            overflow: 'visible'
        }
    },
    headerPopList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        '& >span': {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            borderTop: '1px solid #c1c6d0',
            marginTop: '9px',
            paddingTop: '19px',
            '& >span': {
                position: 'absolute',
                top: '-15px',
                background: '#eeeff7',
                padding: '0 10px',
                fontWeight: '700'
            }
        }
    },
    headerPopFooter: {
        position: 'absolute',
        bottom: '0px',
        height: '52px',
        width: '100%'
    },
    settingPopup: {

    },
    popupTextField: {
        marginBottom: '10px !important',
        overflow: 'hidden',
        height: '40px',
        borderRadius: ' 46px',
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& >div': {
            background: '#fff',
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            background: '#eff2f9',
        }
    },
    userTab: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '30px',
        '& >div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    userImage: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '4px solid #fff',
        overflow: 'hidden',
        background: '#C3C4C9',
        marginBottom: '20px',
        boxShadow: '1px 2px 8px -2px rgb(0 0 0 / 40%)',
        '& img': {
            width: '100%',
            height: '100%'
        }
    },
    userName: {
        width: '100%',
        marginBottom: '10px',
        fontWeight: '700'
    },
    userInfo: {
        width: '100%'
    },
    uploadPopup: {
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '400px',
        height: '400px',
        background: '#fff',
        borderRadius: '30px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        color: 'black',
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
    buttonCenter: {
        width: '100%',
        justifyContent: 'center',
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
    uploadSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& button:first-of-type': {
            marginLeft: '10px'
        }
    },
    popHeader: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '54px',
        paddingLeft: '20px',
        backgroundImage: 'linear-gradient(#0943c3, #0481d8)',
        color: '#fff',
        fontSize: '20px',
        '& button': {
            position: 'absolute',
            right: '0px',
            marginRight: '20px'
        }
    },
    popList: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    PopListItem: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '46px',
        background: '#1e2132',
        color: '#fff',
        fontSize: '17px',
        letterSpacing: '-1.08px',
        paddingLeft: '24px',
        borderBottom: '1px solid #4d5867',
        cursor: 'pointer',
        '&:last-of-type': {
            borderBottom: 'none'
        },
        '&.active': {
            background: '#2e3b65',
            color: '#5fdefe'
        }
    },
    preFootPop: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '& >div': {
            '&:first-of-type': {
                width: '194px',
                marginRight: '10px',
                border: '1px solid #bbbdc0',
                borderRadius: '5px',
                background: '#fff',
                boxSizing: 'border-box',
                padding: '10px'
            },
            '&:last-of-type': {
                width: '145px',
                '& button': {
                    marginBottom: '10px'
                },
            }
        }
    },
    popupAccord: {
        width: '350px',
        '& .MuiAccordionDetails-root': {

        },
    },
    popupLink: {
        '& >img': {
            transform: 'rotate(-90deg)'
        }
    },
    popupPrompt: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        border: '1px solid #bbbdc0',
        background: '#fff',
        borderRadius: '5px',
        marginTop: '20px',
        marginBottom: '25px',
        width: '100%',
        height: '130px',
        '& >div': {
            width: '75%',
            textAlign: 'center',
            marginBottom: '10px'
        },
        '& button': {
            marginLeft: '10px'
        }
    },
    listLink: {
        display: 'flex',
        alignItems: 'center',
        color: '#333333',
        textDecoration: "none"
    },
    listLinkClicked: {
        display: 'flex',
        alignItems: 'center',
        color: '#333333',
        textDecoration: "none",
        backgroundColor: "#d5ddf0"
    },
    selectMenuDate: {
        height: '40px',
        '& div': {
            height: 'inherit',
            background: '#fff',
        },
        '& input': {
            paddingLeft: '10px',
        },
        '& legend': {
            width: '0'
        },
        '& button': {
            paddingLeft: '0',
        }
    },
    pageOverlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vw',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: '1',
        display: 'none',
    },
    pageContent: {
        display: 'flex',
        height: '430px',
        padding: '5px',
        
        background: '#ffffff',
        '& >.MuiGrid-root': {
            height: '100%'
        }
    },
    listTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        lineHeight: '50px',
        fontSize: '17px',
        fontWeight: '500',
        color: '#ffffff',
        background: '#9cb1de',
        '& strong': {
            color: '#00adef'
        }

    },
    menuList: {
        width: '100%',
        overflow: 'hidden auto',
        padding: '0',
        margin: '0',
        listStyle: 'none',
        color: '#333333',
        letterSpacing: '-1.08px',
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
            wordBreak: 'keep-all',
            lineHeight: '38px',
            '& p, & a': {
                width: 'calc(100% - 10px)',
                paddingLeft: '10px',
                margin: '0'
            },
        },
        '& .nestedList li': {
            padding: '0'
        },
        '&.secondList': {
            padding: '0px',
            boxSizing: 'border-box',
            '& li': {
                marginRight: '10px',
                //borderBottom: '1px solid #363c4c',
                '& a': {
                    //padding: '22px',
                    lineHeight: '38px',
                    width: '100%'
                },
                '&.activeLink': {
                    background: '#2e3b65'
                }
            },
        },
        '& .bulletList': {
            position: 'relative',
            paddingLeft: '10px',
            display: 'flex',
            alignItems: 'center',
            '&:before': {
                content: '""',
                position: 'absolute',
                left: '0',
                width: '4px',
                height: '4px',
                background: '#d4d4d6'
            }
        },
        '&.buttonList': {
            '& li': {
                paddingLeft: '20px',
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                height: '29px',
                '& span': {
                    fontSize: '16px',
                    marginLeft: '25px',
                    cursor: "pointer",
                    '&.green': {
                        color: '#22e004'
                    },
                    '&.orange': {
                        color: '#fe9c05'
                    },
                    '&.red': {
                        color: '#fc4b07'
                    },
                    '&.empty': {
                        width: "40px",
                        height: "20px"
                    },

                },
                '& >div': {
                    display: "flex",
                    alignItems: "center"
                }
            }
        },
        '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            border: '6px solid #1e2132'
        },
        '&::-webkit-scrollbar-track': {
            background: '#1e2132',
            borderRadius: '0px',
            boxShadow: 'inset 0 0 4px rgb(0 0 0 / 20%)'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '50px',
            width: '6px',
            background: '#3f4d72',
            borderRadius: '8px',
            boxShadow: 'inset 0px 10px 0px 0px #1e2132, inset 0px -10px 0px 0px #1e2132'
        },
    },
    contentList: {
        background: '#ffffff',
        height: '400px',
        border: '1px solid #1e2132',
        color: '#333333',
        overflow: 'hidden',
        '&.moreContent': {
            display: 'flex',
            border: '0px',
            '& $listTitle': {
                justifyContent: 'flex-start',
                borderRight: '1px solid #17191c'
            },
            '& :last-of-type $listTitle': {
                borderRight: 'none'
            },
            '& >div:first-of-type': {
                width: '80%'
            },
            '& >div:nth-of-type(2)': {
                width: '20%'
            }
        },
    },
}));

const UserButton = styled(ButtonUnstyled)`
    background: transparent url(${userIcon});
    &:hover {
        background-image: url(${userIconHover});
    }
`;

const AdminButton = styled(ButtonUnstyled)`
    background: transparent url(${adminIcon});
    &:hover {
        background-image: url(${adminIconHover});
    }
`;

const LogButton = styled(ButtonUnstyled)`
    background: transparent;
`;

const SettingsButton = styled(ButtonUnstyled)`
    background: transparent url(${setIcon});
    &:hover {
        background-image: url(${setIconHover});
    }
`;

const UploadImageButton = styled(ButtonUnstyled)`
    width: 145px;
    height: 34px;
    background: #3f4c72;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #192b5e;
    } 
`;

const BackButton = styled(ButtonUnstyled)`
    // position: absolute;
    // top: 130px;
    // left: 6px;
    margin-right: 40px;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent url(${backButton});
    cursor: pointer;
`;

const WhiteButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    border: 2px solid #018de7;
    background: #fff;
    color: #018de7;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

const ButtonClosePop = styled(ButtonUnstyled)`
    width: 24px;
    height: 24px;
    background: url(${popupClose}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
`;

const PopupFootButton = styled(ButtonUnstyled)`
    width: 100%;
    height: 100%;
    background: #018de7;
    color: #fff;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #0355b0;
    } 
`;

const PromptButtonBlue = styled(ButtonUnstyled)`
    width: 80px;
    height: 34px;
    background: #3f4c72;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #192b5e;
    } 
`;

const PromptButtonWhite = styled(ButtonUnstyled)`
    width: 80px;
    height: 34px;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #6e7884;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border: 1px solid #6e7884;
    transition: background .2s;
    &:hover {
        border-color: #222;
    } 
`;

const UnknownButton1 = styled(ButtonUnstyled)`
    width: 150px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 46px;
    background: #00adef;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298;
    }   
`;

const UnknownButton2 = styled(ButtonUnstyled)`
    width: 200px;
    height: 46px;
    color: #000;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 46px;
    background: #eff2f9;
    border: 2px solid #00adef;
    cursor: pointer;
    transition: border-color .2s;
    &:hover {
        border-color: #3a5298;
    }  
`;

const SearchButton = styled(ButtonUnstyled)`
    width: 46px;
    height: 46px;
    color: #fff;
    font-size: 20px;
    letter-spacing: -1.08px;
    border-radius: 50%;
    background: #00adef url(${searchIcon}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s;
    &:hover {
        background: #3a5298 url(${searchIcon}) no-repeat 50% 50%;
    }   
`;

const ClosePopupButton2 = styled(ButtonUnstyled)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url(${popupClose2}) no-repeat 50% 50%;
    border: none;
    cursor: pointer;
    transition: background .2s; 
`;

const FileButtonExis = styled(ButtonUnstyled)`
    width: 16px;
    height: 21px;
    background: url(${fileExis}) no-repeat 50% 50%;
    transition: background .3s;
    border: none;
    cursor: pointer;
`;

const FileButtonNone = styled(ButtonUnstyled)`
    width: 16px;
    height: 21px;
    background: url(${fileNone}) no-repeat 50% 50%;
    transition: background .3s;
    border: none;
    cursor: pointer;
`;

const DefaultLight = ({ children }) => {

    //console.log(notifiCenterPage)

    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [getLoginInfo] = useGetLoginInfoMutation();
    const [loginInfo, setLoginInfo] = useState({});
    const [userToken] = useUserToken();
    
    const userRoleCode = userToken.getUserRoleCd();
    const userWorkplaceId = userToken.getUserWorkplaceId();
    const [companyInfo, setCompanyInfo] = useState({});
    const companyId = userToken.getUserCompanyId();
    const [getCompanyInfo] = useGetCompanyInfoMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // 세팅팝업
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [fileUploadPopup, setFileUploadPopup] = useState(false);
    const [adminCenterPopup, setAdminCenterPopup] = useState(false);

    const [notifiCenterPage, setNotifiCenterPage] = useState("");
    

    const [SubEventExe, setSubEventExe] = useState(null)
    const [getBaselineList] = useGetBaselineListMutation() 
    const [getBaseline] = useGetBaselineMutation()
    const [baselineList, setBaselineList] = useState([])
    const [getInspectionsDocs] = useGetInspectiondocsMutation()
    const [inspectionsDocs, setInspectionsDocs] = useState([])

    const [clickedDuty, setClickedDuty] = useState(null)
    const [dutyDetailList, setDutyDetailList] = useState([])
    const [essentialRates, setEssentialRates] = useState([])
    const [baselineStart, setBaselineStart] = useState("")
    const currentBaselineId = useSelector(selectBaselineId);
    const [baselineIdForSelect, setBaselineIdForSelect] = useState(currentBaselineId)
    const [getEssentialRate] = useGetEssentialRateMutation()
    const [clickedEssentialRate, setClickedEssentialRate] = useState(1)
    const [clickedEssentialRateForClass, setClickedEssentialRateForClass] = useState("rate1")
    const [getDutyDetailList] = useGetDutyDetailListMutation()

    const [nId, setNId] = useState(1);

    const [okPopupShow, setOkPopupShow] = useState(false);
    const [okPopupMessage, setOkPopupMessage] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");

    const dispatch = useDispatch();
    const localStorage = useLocalStorage();
    const currentBaseline = useSelector(selectBaselineId);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [getWeather] = useGetWeatherMutation();
    const [weatherData, setWeatherData] = useState({});

    const [excelUpload] = useExcelUploadMutation();
    const [fileUpload] = useFileUploadMutation();

    const [dialogId, setDialogId] = useState("");
    
    const [excel, setExcel] = useState({
        "excelFileId": "",
    })

    const [labelObject, setLabelObject] = useState("");
    
    const [essentialDutyFileId, setEssentialDutyFileId] = useState(null);
    
    //로딩바추가
    const [loading, setLoading] = useState(true);
    
    const [getEssentialDutyVersion] = useGetEssentialDutyVersionMutation();
    const fetchEssentialDutyVerision = async () => {
        const response = await getEssentialDutyVersion()
        setEssentialDutyFileId(response?.data?.RET_DATA?.attachFileId)
    }

    // 안전보건관리체계의 구축 및 이행 항목 호출
    const fetchEssentialRates = async () => {
        const response = await getEssentialRate({
        })
        setEssentialRates(response?.data?.RET_DATA)
    }

    // 의무조치별 상세 점검 항목 호출
    const fetchDutyDetailList = async () => {
        const response = await getDutyDetailList({
            "groupId": clickedEssentialRate
        })
        
        setDutyDetailList(response?.data?.RET_DATA)
        setClickedDuty(!!(response.data.RET_DATA) && !!(response.data.RET_DATA) && response?.data?.RET_DATA[0]?.articleNo)

        if(response?.data?.RET_DATA?.length > 0){
            setSubEventExe(true)    
        }else{
            setSubEventExe(false)
        }        
    }    

    const fetchInspectionDocs = async () => {
        if (clickedDuty && setSubEventExe) {
            const response = await getInspectionsDocs({
                "articleNo": clickedDuty
            })
            setInspectionsDocs(response?.data?.RET_DATA)
        }else{
            setInspectionsDocs(null)
        }
    }

    const handleDialogOpen = (event) => {
        setSelectedFileName("");
        setOpenDialog(true);
        setDialogId(event.target.id);
        
        setLabelObject({
            ...labelObject,
            upperLabel: "안전작업허가서 양식 관리",
            middleLabel: "등록된 양식을 다운로드 합니다.",
        })
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    // 파일 업로드
    const handleDialogFileUpload = async () => {
        if((selectedFileName === "") || (selectedFileName === null)) {
            setOkPopupMessage("업로드할 파일을 선택하세요.");
            setOkPopupShow(true);   
        } else {
            let formData = new FormData();
            formData.append("excelFile", selectedFile)
            const response = await excelUpload(formData)
            if((response.data.RET_CODE === "0000") || (response.data.RET_CODE === "0201")){
                setExcel({ ...excel })
                setOkPopupMessage("'파일'을 등록 하였습니다.");
                setOkPopupShow(true);
                handleDialogClose();
                fetchEssentialDutyVerision();
            } else if(response.data.RET_CODE === '0433'){
                setOkPopupMessage("파일확장자 오류");
                setOkPopupShow(true);
            } else {
                setOkPopupMessage("업로드 양식에 오류가 있습니다.");
                setOkPopupShow(true);
            }
            setSelectedFileName("");
        }
    }

    async function handleDialogFileDownload() {
        const fileId = excel[dialogId]
        if (fileId || essentialDutyFileId) {
            window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId || essentialDutyFileId}&fileSn=1`;
        }
    }

    const handleDialogInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name)
    }


    const handleLoginInfo = async () => {
        const response = await getLoginInfo()
        setLoginInfo(response.data.RET_DATA)
    }

    const handleLogOut = () => {
        remove();
        navigate('/');
    }

    const handleRedirect = () => {
        navigate(-1)
    }

    const fetchCompanyInfo = async () => {
        const response = await getCompanyInfo({
            "companyId": companyId
        })
        setCompanyInfo(response.data.RET_DATA)
    }

    // 
    const fetchWeather = async () => {
        const response = await getWeather({
            "latitude": latitude,
            "longitude": longitude,
        })
        setWeatherData(response.data.RET_DATA)
    }

    const handelSetNoticeView = (Id) => {
        setNId(Id);
        setNotifiCenterPage("View");
    }

    const handelSetNoticeUpdate = (Id) => {
        setNId(Id);
        setNotifiCenterPage("Update");
    }

    const handelNotifiPopup = (popupType) => {
        setNotifiCenterPage(popupType);
        setAdminCenterPopup(true);
        setSettingsPopup(false);
    }

    useEffect(() => {
        if (currentBaseline === null) {
            dispatch(setBaselineId(localStorage.getDefaultBaselineId()));
        }
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
        fetchEssentialRates()
        handleLoginInfo()
        fetchCompanyInfo()
        fetchEssentialDutyVerision()
    }, [])

    useEffect(() => {
        fetchWeather()
        fetchEssentialDutyVerision()
    }, [loginInfo])

    useEffect(() => {
        setLoading(true);
        fetchInspectionDocs()
        setLoading(false);
    }, [clickedDuty])

    useEffect(() => {
        setLoading(true);
        fetchDutyDetailList()
        setLoading(false);
    }, [clickedEssentialRate])

    return (
        <div className={classes.bodyWrap}>
            <Grid className={classes.headerWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid className={classes.pageHeader} item xs={12}>

                    <Grid className={classes.mainHeader} item xs={12}>
                        <Grid className={classes.mainLogo} item xs={3}>
                            {/* <Link to={(loginInfo?.roleCd === "001" ? "/dashboard/director" : ) || (loginInfo?.roleCd === "002" ? "/dashboard/employee" : "#none")}> */}
                            <Link to={(loginInfo?.roleCd === "001") ? "/dashboard/director" : (loginInfo?.roleCd === "002") ? "/dashboard/employee" : (loginInfo?.roleCd === "003") ? "/dashboard/employee" : "/"}>
                                <img src={logo} alt="logo" />
                            </Link>
                        </Grid>
                        <Grid className={classes.mainMenu} item xs={6.3}>
                            <div className={classes.leftMenu}>
                            </div>
                            <div className={classes.rightMenu}></div>
                        </Grid>
                        <Grid className={classes.mainAsside} item xs={3}>
                            {/* 세팅 팝업 Start */}
                            {/* <SettingsButton className={classes.mainMenuButton} id={"excelFileId"} onClick={handleDialogOpen}></SettingsButton> */}
                            <SettingsButton className={classes.mainMenuButton} onClick={() => setSettingsPopup(true)}></SettingsButton>
                                <div className={settingsPopup ? (classes.headerPopup + ' settings_popup') : (classes.headerPopup + ' settings_popupClose')}>
                                    <div className={classes.popHeader}>
                                        <ButtonClosePop onClick={() => setSettingsPopup(false)}></ButtonClosePop>
                                    </div>
                                    <div className={classes.headerPopList}>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => 
                                            handleDialogOpen()
                                        }>안전보건관리체계의 구축 및 이행 항목 등록/업데이트<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => 
                                        { 
                                            setFileUploadPopup(true) 
                                            setSettingsPopup(false) 
                                        }
                                        }>안전보건관리체계의 구축 및 이행 서류 양식 등록<img src={arrowDown} alt="arrow down" /></Link>
                                        <Link className={classes.listLink + ' activeLink ' + classes.popupLink} to={"#none"} underline="none" onClick={() => 
                                            handelNotifiPopup("List")
                                        }>가입고객 통합 공지센터​<img src={arrowDown} alt="arrow down" /></Link>
                                    </div>
                                </div>
                                {/* 세팅 팝업 End */}
                                
                                {/* 파일 업로드 Start*/}
                                    <div className={fileUploadPopup ? (classes.headerPopup + ' fileupload_popup') : (classes.headerPopup + ' fileupload_popupClose')}>
                                        <div className={classes.popHeader}>
                                            <div>안전보건관리체계의 구축 및 이행 서류 양식 등록</div>
                                            <ButtonClosePop onClick={() => setFileUploadPopup(false)}></ButtonClosePop>
                                        </div>
                                        <Grid className={classes.pageContent} item container rowSpacing={0} columnSpacing={1}>
                                            <Grid item container xs={4.5} >
                                                <Grid item xs={12}>
                                                    <div className={classes.contentList}>
                                                        <div className={classes.listTitle}>안전보건관리체계의 구축 및 이행</div>
                                                        <ul className={classes.menuList + ' parentList'}>
                                                            <li>
                                                                <ul className={classes.menuList + ' nestedList'}>
                                                                {essentialRates && Object.entries(essentialRates).length > 0 && Object.keys(essentialRates)?.map(function (property) {
                                                                    if (property.includes("rate")) {
                                                                        return (
                                                                            <><li>
                                                                        <Link className={(clickedEssentialRateForClass == property ? classes.listLinkClicked : classes.listLink)} onClick={() => {
                                                                                    setClickedEssentialRateForClass(property)
                                                                                    setClickedEssentialRate(!!essentialRates[property].groupId && essentialRates[property].groupId)
                                                                                }} to={"#none"} underline="none">{!!essentialRates[property].title && essentialRates[property].title}</Link>
                                                                    </li></>
                                                                        )
                                                                    }
                                                                })}
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3.8}>
                                                <Grid item xs={12}>
                                                    <div className={classes.contentList}>
                                                        <div className={classes.listTitle}>의무조치별 상세 점검 항목</div>
                                                        <ul className={classes.menuList + ' secondList'}>
                                                        {dutyDetailList?.map((element) => {
                                                        return (
                                                            <li>
                                                                <Link className={clickedDuty !== element.articleNo ? classes.listLink : classes.listLinkClicked} to={"#none"} underline="none" onClick={() => setClickedDuty(element.articleNo)}>{element.detailedItems}</Link>
                                                            </li>
                                                            )
                                                        })}
                                                        </ul>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item container xs={3.7}>
                                                <Grid item xs={12}>
                                                    <div className={classes.contentList}>
                                                        <div className={classes.listTitle}>점검서류 등 목록</div>
                                                        <div className={classes.contentList + ' moreContent'}>
                                                            <div>
                                                                <ul className={classes.menuList}>
                                                                    <li><Link className={classes.listLinkClicked} to={"#none"} underline="none">test1</Link></li>
                                                                    <li><Link className={classes.listLink} to={"#none"} underline="none">test2</Link></li>
                                                                    <li><Link className={classes.listLink} to={"#none"} underline="none">test3</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <ul className={classes.menuList + ' buttonList'}>
                                                                    <li><div><FileButtonNone id="inspectionFile"></FileButtonNone></div></li>
                                                                    <li><div><FileButtonExis id="inspectionFile"></FileButtonExis></div></li>
                                                                    <li><div><FileButtonExis id="inspectionFile"></FileButtonExis></div></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.buttonCenter} container xs={12}>
                                                <WhiteButton className={'button-cancelation'} onClick={() => setFileUploadPopup(false)}>닫기</WhiteButton>
                                            </Grid>
                                        </Grid>                                        
                
                                    </div>
                                {/* 파일 업로드 End */}

                                {/* Admin Center Start */}
                                    <div className={adminCenterPopup ? (classes.headerPopup + ' admincenter_popup') : (classes.headerPopup + ' admincenter_popupClose')}>
                                        <div className={classes.popHeader}>
                                            <ButtonClosePop onClick={() => setAdminCenterPopup(false) }></ButtonClosePop>
                                        </ div>
                                        {
                                            notifiCenterPage === 'List' ?
                                                <NotifiCenterList notifiCenterPage="List" onDoubleClickView={handelSetNoticeView} onCallback={handelNotifiPopup}></NotifiCenterList>
                                            :
                                            notifiCenterPage === 'Registration' ?
                                                <NotifiCenterRegistration notifiCenterPage="Registration" onCallback={handelNotifiPopup}></NotifiCenterRegistration>
                                            :
                                            notifiCenterPage === 'View' ?
                                                <NotifiCenterView notifiCenterPage="View" nId={nId} onDoubleClickUpdate={handelSetNoticeUpdate} onCallback={handelNotifiPopup}></NotifiCenterView>
                                            :
                                            notifiCenterPage === 'Update' ?
                                                <NotifiCenterUpdate  notifiCenterPage="Update" nId={nId} onCallback={handelNotifiPopup}></NotifiCenterUpdate>
                                            : `${notifiCenterPage}`
                                        }
                                    </div>
                                {/* Admin Center End */}
                            <AdminButton className={classes.mainMenuButton}></AdminButton> 
                            <div className={classes.userInformation}>
                                <div>{loginInfo?.loginId} / <span>{loginInfo?.roleName}</span></div>
                            </div>
                            {/* <BackButton onClick={() => handleRedirect()}></BackButton> */}
                            <LogButton className={classes.mainMenuButton} onClick={handleLogOut}>
                                <LogoutIcon fontSize="large" sx={{ color: 'gray' }}></LogoutIcon>
                            </LogButton>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
            <UploadDialog
                open={openDialog}
                onClose={handleDialogClose}
                onInputChange={handleDialogInputChange}
                onUpload={handleDialogFileUpload}
                onDownload={handleDialogFileDownload}
                enableDownload={true}
                selectedFileName={selectedFileName}
            />

            <Overlay show={okPopupShow}>
                <Okay
                    show={okPopupShow}
                    message={okPopupMessage}
                    title="알림"
                    onConfirm={() => setOkPopupShow(false) } />
            </Overlay>
            {loading && <Loading/>}
            {/* <BackButton onClick={() => handleRedirect()}></BackButton> */}
            <div className={classes.pageOverlay}></div>
            <div className={classes.sectionWrap}>
                {children}
            </div>
        </div >
    );
};

export default DefaultLight;