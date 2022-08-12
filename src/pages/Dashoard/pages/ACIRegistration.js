import React from 'react';
import { DefaultLayout } from '../../../layouts/Default';

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

import radioIcon from '../../../assets/images/ic_radio.png';
import radioIconOn from '../../../assets/images/ic_radio_on.png';

import checkIcon from '../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../assets/images/ic_chk3_on.png';
import imgPrev from '../../../assets/images/prw_photo.jpg';
import noImg from '../../../assets/images/ic_no_image.png';

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
            height: '60px',
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
        minHeight: '60px',
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
            '&:nth-of-type(2)': {
                height: '60px'
            },
            '&:last-of-type': {
                height: 'auto'
            },
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]:first-of-type': {
            width: '160px',
        },
        '& [class*=boxRow]:first-of-type [class*=rowInfo]': {
            width: '306px'
        },
        '& [class*=boxRow]:first-of-type [class*=rowContent] [class*=rowInfo]:nth-of-type(3)': {
            width: '520px'
        },
        '& [class*=boxRow]:nth-of-type(3) [class*=rowContent] [class*=rowInfo]:first-of-type': {
            width: '100%'
        },
        '& [class*=boxRow]:nth-of-type(3) [class*=rowContent] [class*=rowInfo]:last-of-type': {
            paddingLeft: '0px'
        },
        '& [class*=boxRow]:nth-of-type(4) [class*=rowContent] [class*=rowInfo]': {
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
            fontSize: '16px',
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

const AccidentReportButton = styled(ButtonUnstyled)`
    width: 90px;
    height: 80px;
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

const ACIRegistration = () => {
    const classes = useStyles();

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        재해발생 및 방지대책 등 이행현황
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxReception}>
                    <div className={classes.boxTitle}>사고접수</div>
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
                                            value="전화"
                                            label="전화"
                                            control={
                                                <Radio 
                                                    icon={<img src={radioIcon} alt="radio icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="싸이렌"
                                            label="싸이렌"
                                            control={
                                                <Radio 
                                                    icon={<img src={radioIcon} alt="radio icon" />}
                                                    checkedIcon={<img src={radioIconOn} alt="radio icon on" />}
                                                />
                                            } 
                                        />
                                        <FormControlLabel
                                            value="안전순찰중"
                                            label="안전순찰중"
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
                                <div className={classes.rowTitle}>접수유형</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value="추락"
                                                label="추락"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="끼임"
                                                label="끼임"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="화재"
                                                label="화재"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="전기"
                                                label="전기"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="밀폐"
                                                label="밀폐"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="중량물"
                                                label="중량물"
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
                                <span>사고조치 </span>
                                <span>내용</span>
                            </div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        defaultValue="3층에서 2층으로 추락사고 발생하여 병원 이송함. "
                                    />                      
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxRegistration}>
                    <div className={classes.boxTitle}>사고접수</div>
                    <div className={classes.boxContent}>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생일자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        sx={{width: 140}}
                                        id="date"
                                        className={classes.selectMenu}
                                        type="date"
                                    />
                                </div>
                                <div className={classes.rowTitle}>사고유형</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value="추락"
                                                label="추락"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="끼임"
                                                label="끼임"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="화재"
                                                label="화재"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="전기"
                                                label="전기"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="밀폐"
                                                label="밀폐"
                                                control={
                                                    <Checkbox 
                                                        icon={<img src={checkIcon} alt="check icon" />}
                                                        checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="중량물"
                                                label="중량물"
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
                                <div className={classes.rowTitle}>사고등급</div>
                                <div className={classes.rowInfo}>
                                    <FormControl className={classes.searchRadio}>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value="1급"
                                                label="1급"
                                                control={
                                                    <Radio 
                                                        icon={<img src={radioIcon} alt="check icon" />}
                                                        checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="2급"
                                                label="2급"
                                                control={
                                                    <Radio 
                                                        icon={<img src={radioIcon} alt="check icon" />}
                                                        checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                            <FormControlLabel
                                                value="3급"
                                                label="3급"
                                                control={
                                                    <Radio 
                                                        icon={<img src={radioIcon} alt="check icon" />}
                                                        checkedIcon={<img src={radioIconOn} alt="check icon on" />}
                                                    />
                                                } 
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.rowTitle}>발생장소</div>
                                <div className={classes.rowInfo}>
                                    <TextField 
                                        id="standard-basic" 
                                        variant="outlined" 
                                        value="3층 중앙 계단"
                                        sx={{width: 200}}
                                        className={classes.selectMenu}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>현장책임자</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField 
                                        id="standard-basic" 
                                        variant="outlined" 
                                        value="홍길동"
                                        sx={{width: 140}}
                                        className={classes.selectMenu}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.boxRow}>
                            <div className={classes.rowTitle}>발생원인</div>
                            <div className={classes.rowContent}>
                                <div className={classes.rowInfo}>
                                    <TextField
                                        className={classes.textArea}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        defaultValue="건물 신축 공사장에서 승강기 설치를 하다 추락하여 지게차에 끼임"
                                    /> 
                                </div>
                                <div className={classes.rowInfo}>
                                    <AccidentReportButton  sx={{marginRight: '10px'}}>초기사고 보고서</AccidentReportButton>
                                    <AccidentReportButton>최종사고 보고서</AccidentReportButton>
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
                                        defaultValue="지게차 운전은 자격을 가진자가 자가운전가능하며 안전장치를 부착함. 
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
                                            sx={{width: 610}}
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
                                            sx={{width: 610}}
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
                    <WhiteButton className={'button-cancellation'}>취소</WhiteButton>
                    <WhiteButton className={'button-delete'}>삭제</WhiteButton>
                    <WhiteButton className={'button-list'}>목록</WhiteButton>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default ACIRegistration;
