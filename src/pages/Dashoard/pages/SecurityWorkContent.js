import React from 'react';
import { DefaultLayout } from '../../../layouts/Default';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import checkIcon from '../../../assets/images/ic_chk3.png';
import checkIconOn from '../../../assets/images/ic_chk3_on.png';

import fileIcon from '../../../assets/images/file_exis.png';
import icoUploaded from '../../../assets/images/ic_excel.png';

const useStyles = makeStyles(() => ({
    pageWrap: {
        display: 'flex',
        justifyContent: 'center'
    },
    boxTable: {
        marginTop: '40px !important',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff',
        '& *': {
            boxSizing: 'border-box',
            wordBreak: 'keep-all'
        }
    },
    tableHead: {
        width: '100%',
        background: '#bdcbe9',
        '& [class*=tableData]': {
            borderRight: '1px solid #fff',
        }
    },
    tableBody: {
        width: '100%',
        '& [class*=tableData]': {
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
        },
        '& [class*=tableData]:nth-of-type(-n + 2)': {
            justifyContent: 'center'
        },
        '& [class*=tableRow]': {
            transition: 'background .2s',
            '&:hover': {
                background: '#eff2f9'
            }
        }
    },
    tableRow: {
        display: 'flex',
        '&:last-of-type': {
            '& [class*=tableData]': {
                borderBottom: 'none'
            },
        },
    },
    tableData: {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: '13px 12px',
        '&:first-of-type': {
            width: '4%', 
        },
        '&:nth-of-type(2)': {
            width: '4%', 
        },
        '&:nth-of-type(3)': {
            width: '23%', 
        },
        '&:nth-of-type(4)': {
            width: '23%', 
        },
        '&:nth-of-type(5)': {
            width: '23%', 
        },
        '&:nth-of-type(6)': {
            width: '23%',
            borderRight: 'none' 
        },
    },
    headerButtons: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px !important',
        '& button': {
            marginRight: '10px'
        }
    },
    textAreaWrap: {
        width: '100%'
    },
    textArea: {
        '& .MuiOutlinedInput-root textarea': {
            fontSize: '16px'
        }
    },
    menuBox: {
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginTop: '40px !important',
        background: '#fff',
    },
    menuInfo: {
        display: 'flex',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            '&:not(&:first-of-type)': {
                marginLeft: '58px'
            }
        }
    },
    menuTitle: {
        minWidth: '65px',
        marginRight: '14px'
    },
    selectMenu: {
        height: '40px',
        '& div': {
            height: 'inherit',
        }
    },
    uploadBox: {
        maxWidth: '50% !important',
        border: '1px solid #bdcbe9',
    },
    uploadTable: {
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        border: '1px solid #bdcbe9',
        marginTop: '20px',
        '& [class*=tableData]': {
            boxSizing: 'border-box',
            justifyContent: 'flex-start !important',
            '&:first-of-type': {
                width: '70%', 
            },
            '&:nth-of-type(2)': {
                width: '15%', 
            },
            '&:nth-of-type(3)': {
                width: '15%',
                borderRight: 'none' 
            },
            '& [class*=fileIcon]': {
                marginRight: '10px'
            }
        }
    },
    fileUpload: {

    },
    uploadTitle: {
        position: 'relative',
        left: '-30px',
        width: '100%',
        padding: '0px 30px 10px 30px',
        borderBottom: '1px solid #bdcbe9',
        fontSize: '20px',
    },
    uploadBody: {
        '& >div:first-of-type': {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
        }
    },
    uploadButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '30px',
        position: 'relative',
        left: '-30px',
        width: '100%',
        padding: '30px 30px 10px 30px',
        borderTop: '1px solid #bdcbe9',
        '& button': {
            marginLeft: '10px'
        }
    },
    uploadInfo: {
        display: 'flex',
        position: 'relative',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            marginRight: '10px',
            borderRight: '1px solid #bdcbe9'
        },
        '& [class*=fileIcon]': {
            marginRight: '10px'
        },
        '& [class*=uploadStatus]': {
            marginLeft: '10px'
        },
        '& button': {
            position: 'absolute',
            right: '30px'
        }
    },
    fileIcon: {

    },
    uploadStatus: {

    }

}));

const MenuButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #3f4c72;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #192b5e;
    }
`;

const CloseButton = styled(ButtonUnstyled)`
    width: 20px;
    height: 20px;
    background: transparent;
    color: #000;
    border: none;
    font-size: 20px;
    transition: background .2s;
    cursor: pointer;
`;

const SecurityWorkContent = () => {
    const classes = useStyles();

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        List of contents of work on the approval of security work
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.headerButtons}>
                    <MenuButton className={'button-search'}>Search</MenuButton>
                    <MenuButton className={'button-upload'}>Upload</MenuButton>
                    <MenuButton className={'button-delete'}>Delete</MenuButton>
                    <MenuButton className={'button-download'}>Download</MenuButton>
                </Grid>
                <Grid item xs={12} className={classes.menuBox}>
                    <div className={classes.menuInfo}>
                        <div>
                            <div className={classes.menuTitle}>Factory</div>
                                <Select
                                    className={classes.selectMenu}
                                    sx={{width: 200}}
                                    value={num}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">All</MenuItem>
                                </Select>
                        </div>
                        <div>
                            <div className={classes.menuTitle}>Registration Date</div>
                                <TextField
                                    sx={{width: 200}}
                                    id="date"
                                    className={classes.selectMenu}
                                    type="date"
                                />
                        </div>
                        <div>
                            <div className={classes.menuTitle}>Registrant</div>
                            <TextField 
                                id="standard-basic" 
                                placeholder="" 
                                variant="outlined" 
                                sx={{width: 200}}
                                className={classes.selectMenu}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.boxRow}>
                        <div className={classes.tableHead}>
                            <div className={classes.tableRow}>
                        	    <div className={classes.tableData}></div>
                        	    <div className={classes.tableData}>No.</div>
                        	    <div className={classes.tableData}>Factory</div>
                        	    <div className={classes.tableData}>Registration Date</div>
                        	    <div className={classes.tableData}>Registrant</div>
                        	    <div className={classes.tableData}>Registration Info</div>
                            </div>
					    </div>
					    <div className={classes.tableBody}>
					        <div className={classes.tableRow}>
						        <div className={classes.tableData}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                icon={<img src={checkIcon} alt="check icon" />}
                                                checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                            />
                                        } 
                                    />
                                </div>
						        <div className={classes.tableData}>2</div>
						        <div className={classes.tableData}>Data</div>
						        <div className={classes.tableData}>2022-01-03 14:00</div>
						        <div className={classes.tableData}>Data</div>
						        <div className={classes.tableData}>Data</div>
					        </div>
					        <div className={classes.tableRow}>
						        <div className={classes.tableData}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                icon={<img src={checkIcon} alt="check icon" />}
                                                checkedIcon={<img src={checkIconOn} alt="check icon on" />}
                                            />
                                        } 
                                    />
                                </div>
						        <div className={classes.tableData}>1</div>
						        <div className={classes.tableData}>Data</div>
						        <div className={classes.tableData}>2022-01-02 14:00</div>
						        <div className={classes.tableData}>Data</div>
						        <div className={classes.tableData}>Data</div>
					        </div>
					    </div>
                    </div> 
                </Grid>
                <Grid item xs={12} className={classes.menuBox + ' ' + classes.uploadBox}>
                    <div className={classes.fileUpload}>
                        <div className={classes.uploadTitle}>Excel File Upload</div>
                        <div className={classes.uploadBody}>
                            <div>
                                <MenuButton className={'button-add'}>Add</MenuButton>
                            </div>
                            <div className={classes.uploadTable}> 
                                <div className={classes.tableHead}>
                                    <div className={classes.tableRow}>
                        	            <div className={classes.tableData}>File Name</div>
                        	            <div className={classes.tableData}>Details</div>
                        	            <div className={classes.tableData}>Size</div>
                                    </div>
					            </div>
					            <div className={classes.tableBody}>
					                <div className={classes.tableRow}>
						                <div className={classes.tableData}><img src={fileIcon} alt="file icon" className={classes.fileIcon} />file_name.ext</div>
						                <div className={classes.tableData}>Data</div>
						                <div className={classes.tableData}>999.99KB</div>
					                </div>
					                <div className={classes.tableRow}>
						                <div className={classes.tableData}><img src={fileIcon} alt="file icon" className={classes.fileIcon} />file_name.ext</div>
						                <div className={classes.tableData}>Data</div>
						                <div className={classes.tableData}>999.99KB</div>
					                </div>
					            </div>
                            </div>
                        </div>
                        <div className={classes.uploadButtons}>
                            <MenuButton className={'button-save'}>Save</MenuButton>
                            <MenuButton className={'button-cancel'}>Cancel</MenuButton>
                        </div>                        
                    </div>                      
                </Grid>
                <Grid item xs={12} className={classes.menuBox + ' ' + classes.uploadInfo}>
                    <div className={classes.finishedUpload}><img src={fileIcon} alt="file icon" className={classes.fileIcon} />file_name.ext<img src={icoUploaded} alt="file uploaded" className={classes.uploadStatus} /></div>
                    <div className={classes.activeUpload}><img src={fileIcon} alt="file icon" className={classes.fileIcon} />file_name.ext<img src={icoUploaded} alt="file uploaded" className={classes.uploadStatus} /></div>
                    <CloseButton>x</CloseButton>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default SecurityWorkContent;
