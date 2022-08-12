import React from 'react'
import { useNavigate } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';

import radioIcon from '../../../../../../../../assets/images/ic_radio.png';
import radioIconOn from '../../../../../../../../assets/images/ic_radio_on.png';

import checkIcon from '../../../../../../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../../../../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../../../../../../assets/images/prw_photo.jpg';
import noImg from '../../../../../../../../assets/images/ic_no_image.png';

const useStyles = makeStyles(() => ({
    pageWrap: {
        '& >div[class*=box]': {
            display: 'flex',
            borderRadius: '6px',
            background: '#fff',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgb(189 203 203 / 50%)'
        }
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
    },
    boxReception: {
        display: 'flex',
        marginBottom: '16px !important',
        height: '160px',
        '& [class*=boxRow]:first-of-type [class*=rowInfo]:first-of-type': {
            width: '160px',
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]': {
            width: '306px'
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]:last-of-type': {
            width: 'auto'
        },
        '& [class*=boxRow]:last-of-type [class*=rowInfo]': {
            width: '100%',
        },
        '& [class*=boxContent] [class*=boxRow]:first-of-type]': {
            height: '60px'
        }
    },
    boxTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100px',
        background: '#8098c9',
        borderRight: '1px solid #fff',
        color: '#fff',
        fontSize: '17px',
        fontWeight: '500',
        '& span': {
            width: '100%',
            textAlign: 'center'
        }
    },
    boxContent: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'calc(100% - 100px)',
        '& [class*=boxRow]:first-of-type': {
            '& [class*=rowContent]': {
                borderTop: 'none'
            },
            '& [class*=rowTitle]': {
                borderTop: 'none'
            }
        },
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        '& [class*=rowTitle]': {
            borderBottom: 'none'
        }
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100%',
        background: '#bdcbe9',
        borderTop: '1px solid #fff',
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }
    },
    rowContent: {
        height: '100%',
        width: 'calc(100% - 100px)',
        borderTop: '1px solid #d5dae2',
        display: 'flex',
        '& >div[class=*row]': {
            height: '100%'
        },
    },
    rowInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        boxSizing: 'border-box',
    },
    boxRegistration: {
        '& [class*=boxRow]': {
            height: '100px',
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& [class*=boxRow] [class*=rowContent] [class*=rowInfo]': {
            width: '100%'
        },
        '& [class*=boxRow]:last-of-type [class*=rowContent]': {
            display: 'flex',
            '& >div': {
                width: '50%',
                borderLeft: '1px solid #d5dae2',
                '& >div': {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    borderBottom: '1px solid #d5dae2',
                    minHeight: '40px',
                    maxHeight: '640px',
                    height: '100%',
                    padding: '10px',
                    '&:first-of-type': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#eff2f6',
                        fontWeight: '500',
                        height: '50px',
                        padding: '0'
                    },
                    '& .Mui-disabled input': {
                        '-webkit-text-fill-color': '#333'
                    }
                }
            }
        }
    },
    searchRadio: {
        '& [role=radiogroup]': {
            flexWrap: 'nowrap',
        },
        '& [class*=body1]': {
            fontSize: '16px'
        },
        '& input': {
            cursor: 'default'
        },
        '& label': {
            marginRight: '10px'
        }
    },
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            height: '49px !important',
            fontSize: '16px'
        }
    },
    selectMenu: {
        height: '38px',
        overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    footerButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px !important',
        '& button': {
            marginLeft: '10px'
        }
    },
    imgPreview: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            padding: '20px 20px 10px 20px',
        }
    }

}));

const UploadButton = styled(ButtonUnstyled)`
    width: 140px;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #6e7884;
    background: #e8ebf4;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #d2dcf3;
    }
`;

const BlueButton = styled(ButtonUnstyled)`
    border: none;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    border-radius: 5px;
    background: #018de7;
    color: #fff;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #0355b0;
    }
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
    color: inherit;
    cursor: pointer;
    transition: background.2s;
    &:hover {
        background: #d2dcf3;
}
`;

const Registration = () => {
    const classes = useStyles();
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate("/dashboard/employee/order-for-improvement-and-correction-under-related-law/list")
    }

    return (
        <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
            <Grid item xs={12} className={classes.listTitle}>
                <Typography variant="headline2" component="div" gutterBottom>
                    관계법령에 따른 개선.시정 명령에 따른 조치 현황
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.boxReception}>
                <div className={classes.boxTitle}>
                    <span>개선.조치</span>
                    <span>접수</span>
                </div>
                <div className={classes.boxContent}>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>접수일자</div>
                        <div className={classes.rowContent}>
                            <div className={classes.rowInfo}>2022.06.01</div>
                            <div className={classes.rowTitle}>접수자</div>
                            <div className={classes.rowInfo}>[홍xx] / 방제센터 사고접수부</div>
                            <div className={classes.rowTitle}>접수형태</div>
                            <div className={classes.rowInfo}>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value="공문"
                                            label="공문"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="radio icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="현장점검"
                                            label="현장점검"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="radio icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="신고"
                                            label="신고"
                                            control={
                                                <Radio
                                                    icon={<img src={radioIcon} alt="radio icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={classes.rowTitle}>명령구분</div>
                            <div className={classes.rowInfo}>
                                <FormControl className={classes.searchRadio}>
                                    <RadioGroup row>
                                        <FormControlLabel
                                            value="고용노동부"
                                            label="고용노동부"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="소방청(소)"
                                            label="소방청(소)"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="환경부(청)"
                                            label="환경부(청)"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="자체점검"
                                            label="자체점검"
                                            control={
                                                <Checkbox
                                                    icon={<img src={checkIcon} alt="check icon" />}
                                                    checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>
                            <span>개선.조치 </span>
                            <span>지적내용</span>
                        </div>
                        <div className={classes.rowContent}>
                            <div className={classes.rowInfo}>
                                <TextField
                                    className={classes.textArea}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    defaultValue="작업 감독자 미배치로 인한 지적"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} className={classes.boxRegistration}>
                <div className={classes.boxTitle}>
                    <span>개선.조치 </span>
                    <span>대응내역</span>
                </div>
                <div className={classes.boxContent}>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>지적원인</div>
                        <div className={classes.rowContent}>
                            <div className={classes.rowInfo}>
                                <TextField
                                    className={classes.textArea}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    defaultValue="담당자 퇴사로 이한 작업 감독자 미배치로 인한 지적"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>
                            <span>재발방지 </span>
                            <span>대책</span>
                        </div>
                        <div className={classes.rowContent}>
                            <div className={classes.rowInfo}>
                                <TextField
                                    className={classes.textArea}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    defaultValue="건물 신축 공사장에서 안전 난간 설치함. 
                                        정상적으로 작동하는지 정기적으로 관리하며 근로자들이 안전수칙으로 일을 진행하는지 관리감독함."
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>이행실적</div>
                        <div className={classes.rowContent}>
                            <div>
                                <div>조치 전</div>
                                <div>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value="20220607사고등록 전 사진.jpg"
                                        sx={{ width: 610 }}
                                        className={classes.selectMenu}
                                        disabled
                                    />
                                    <UploadButton>찾아보기</UploadButton>
                                    <div className={classes.imgPreview}>
                                        <img src={imgPrev} alt="uploaded image" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>조치 후</div>
                                <div>
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value="이미지를 등록하세요 (gif, jpg, png 파일허용)"
                                        sx={{ width: 610 }}
                                        className={classes.selectMenu}
                                        disabled
                                    />
                                    <UploadButton>찾아보기</UploadButton>
                                    <div className={classes.imgPreview}>
                                        <img src={noImg} alt="no image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} className={classes.footerButtons}>
                <BlueButton className={'button-correction'}>수정</BlueButton>
                <BlueButton className={'button-registration'}>등록</BlueButton>
                <WhiteButton className={'button-cancellation'} onClick={() => handleRedirect()}>취소</WhiteButton>
                <WhiteButton className={'button-delete'}>삭제</WhiteButton>
                <WhiteButton className={'button-list'} onClick={() => handleRedirect()}>목록</WhiteButton>
            </Grid>
        </Grid>
    );
};

export default Registration;