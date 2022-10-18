import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import { makeStyles } from '@mui/styles';

import searchIcon from '../../../../../../../assets/images/ic_search.png';
import pageFirst from '../../../../../../../assets/images/btn_first.png';
import pageLast from '../../../../../../../assets/images/btn_last.png';
import pageNext from '../../../../../../../assets/images/btn_nxt.png';
import pagePrev from '../../../../../../../assets/images/btn_pre.png';
import icoFile from '../../../../../../../assets/images/ic_file.png';


import { useNoticesSelectMutation } from '../../../../../../../hooks/api/NoticesManagement/NoticesManagement';
import { selectBaselineId, selectWorkplaceId, setBaselineId } from '../../../../../../../slices/selections/MainSelection';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const useStyles = makeStyles(() => ({
    pageWrap: {
        padding: '15px'
    },
    listTitle: {
        height: '33px',
        marginBottom: '20px !important',
        color: '#111',
    },
    searchBox: {
        display: 'flex',
        height: '80px',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgb(189 203 203 / 10%)',
        marginBottom: '28px !important',
        background: '#fff'
    },
    searchInfo: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        paddingRight: '10px',
        '& >div': {
            display: 'flex',
            alignItems: 'center',
            '& >div:last-of-type': {
                marginLeft: '10px'
            }
        }
    },
    searchButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    dataTable: {
        maxHeight: '560px',
        borderRadius: '5px',
        boxShadow: '0 0 12px rgb(0 0 0 / 10%)',
        marginBottom: '40px !important',
        background: '#fff',
        overflow: 'hidden'
    },
    tableHead: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: '50px',
        color: '#333333',
        '& $tableRow': {
            background: '#bdcbe9',
            borderRight: '1px solid #fff',
            fontSize: '16px',
            fontWeight: '500',
            '&:last-of-type': {
                borderRight: '0'
            }
        }
    },
    tableBody: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: '50px',
        transition: 'background .2s',
        '& $tableRow': {
            background: 'transparent',
            borderRight: '1px solid #bdcbe9',
            borderBottom: '1px solid #bdcbe9',
            '&:last-of-type': {
                borderRight: '0',
            },
        },
        '&:last-of-type $tableRow': {
            borderBottom: '0'
        },
        '&:hover': {
            background: '#eff2f9'
        }
    },
    tableRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        minWidth: '150px',
        boxSizing: 'border-box',
        padding: '13px 12px',
        color: '#333333',
        '&:first-of-type': {
            minWidth: '90px'
        },
        '&:nth-of-type(2)': {
            width: '100%',
            justifyContent: 'flex-start'
        },
        '& a': {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordWrap: 'break-word',
            overflow: 'hidden',
        }
    },
    pagingBox: {
        position: 'relative',
        height: '40px',
        color: '#333333',
        '& .MuiPagination-root': {
            display: 'flex',
            justifyContent: 'center'
        },
        '& >div:first-of-type': {
            position: 'absolute',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            top: '0',
            left: '0',
            '& strong': {
                color: '#018de7'
            }
        },
        '& >div:last-of-type': {
            position: 'absolute',
            top: '0',
            right: '0'
        },
        '& .MuiPagination-ul button': {
            width: '40px',
            height: '40px',
            margin: '0',
            borderRadius: '0',
            fontSize: '14px',
            color: '#666',
            '&:hover': {
                background: 'transparent'
            },
            '&.Mui-selected': {
                background: '#6e7884',
                color: '#fff',
                cursor: 'default',
            },
            '&[aria-label$=page]': {
                '& svg': {
                    display: 'none'
                }
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=first]': {
                background: 'url(' + pageFirst + ')',
                marginRight: '-1px'
            },
            '&[class*=MuiPaginationItem-firstLast][aria-label*=last]': {
                background: 'url(' + pageLast + ')',
                marginLeft: '-1px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=next]': {
                background: 'url(' + pageNext + ')',
                marginLeft: '8px'
            },
            '&[class*=MuiPaginationItem-previousNext][aria-label*=previous]': {
                background: 'url(' + pagePrev + ')',
                marginRight: '8px'
            }
        }
    },
    selectMenu: {
        height: '40px',
        // overflow: 'hidden',
        '& div': {
            height: 'inherit',
        }
    },
    slideLabelHot: {
        width: '34px',
        height: '18px',
        lineHeight: '18px',
        marginRight: '10px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '12px',
        background: '#fd4b05',
        borderRadius: '2px',
        fontWeight: '500'
    },
    slideLabelN: {
        width: '16px',
        height: '16px',
        lineHeight: '16px',
        marginLeft: '10px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '12px',
        background: '#179c80',
        borderRadius: '2px',
        border: '1px solid #0b876d',
    },
    linkBtn: {
        textDecoration: "none",
        color: "black",
        '&:visited': {
            color: 'black'
        }
    },
    fileIconImg: {
        cursor: 'pointer'
    }
}));

const SearchButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #3f4c72;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:before {
        content: "";
        position: relative;
        top: -1px;
        display: inline-block;
        width: 17px;
        height: 17px;
        vertical-align: middle;
        margin-right: 4px;
        background-image: url(${searchIcon});;
    }
    &:hover {
        background: #192b5e;
    }
`;

const RegisterButton = styled(ButtonUnstyled)`
    width: 100px;
    height: 40px;
    background: #018de7;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background .2s;
    cursor: pointer;
    &:hover {
        background: #0355b0;
    }
`;

function List(props) {
    const [noticesSelect] = useNoticesSelectMutation()
    const [noticesList, setNoticesList] = useState()
    const [noticesForCount, setNoticesForCount] = useState()
    const classes = useStyles();
    const navigate = useNavigate()
    const [select, setSelect] = useState("all");
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    const currentWorkplaceId = useSelector(selectWorkplaceId);

    const HOT = "001"

    const handleSelect = (event) => {
        setSelect(event.target.value);
    };

    // 등록페이지 호출
    const handleRedirect = () => {
        props.onCallback("Registration");
    }

    // 상세페이지 호출
    const handelView = (noticeId) => {
        props.onDoubleClickView(noticeId);
    }

    const handleFetchList = async () => {
        const response = await noticesSelect({
            "col": select,
            "countPerPage": 10,
            "pageNum": page,
            "param": query,
            "workplaceId": currentWorkplaceId
        })
        setNoticesList(response?.data?.RET_DATA)
    }
    const handleSearch = () => {
        handleFetchList()
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handleFetchListForCount = async () => {
        const response = await noticesSelect({
            "col": "all",
            "countPerPage": null,
            "pageNum": null,
            "param": null,
            "workplaceId": currentWorkplaceId
        })
        setNoticesForCount(response)
    }

    const handleFileDownload = (fileId) => {
        window.location = `${BASE_URL}/file/fileDown?atchFileId=${fileId}&fileSn=1`;
    }

    useEffect(() => {
        handleFetchList()
    }, [page])

    useEffect(() => {
        handleFetchListForCount()
    }, [])

    return (
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        공지사항
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.searchBox}>
                    <div className={classes.searchInfo}>
                        <div>
                            <Select
                                sx={{ width: 200 }}
                                className={classes.selectMenu}
                                value={select}
                                onChange={handleSelect}
                                displayEmpty
                                defaultValue={select}
                            >
                                <MenuItem value={"all"}>전체</MenuItem>
                                <MenuItem value={"title"}>제목</MenuItem>
                                <MenuItem value={"name"}>작성자</MenuItem>
                            </Select>
                            <TextField
                                id="standard-basic"
                                variant="outlined"
                                placeholder="검색어를 입력하세요."
                                sx={{ width: 370 }}
                                className={classes.selectMenu}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.searchButtons}>
                        <SearchButton onClick={handleSearch}>조회</SearchButton>
                        <RegisterButton sx={{ marginLeft: '10px' }} onClick={() => handleRedirect()}>등록</RegisterButton>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.dataTable}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>No</div>
                        <div className={classes.tableRow}>제목</div>
                        <div className={classes.tableRow}>첨부파일</div>
                        <div className={classes.tableRow}>작성자</div>
                        <div className={classes.tableRow}>작성일</div>
                        <div className={classes.tableRow}>조회수</div>
                    </div>
                    <>
                        {!!noticesList && !!noticesList?.length && noticesList?.map((notice, index) =>
                        (
                            <div className={classes.tableBody} onDoubleClick={() => handelView(notice.noticeId)}>
                                <div className={classes.tableRow}>{index + 1}</div>
                                <div className={classes.tableRow}>
                                    {notice.importCd === HOT && <span className={classes.slideLabelHot}>HOT</span>}
                                    {notice.title}
                                </div>
                                <div className={classes.tableRow}>
                                    {!!notice?.attachId && <img src={icoFile} className={classes.fileIconImg} alt="file icon" onClick={() => handleFileDownload(notice.attachId)} />}
                                </div>
                                <div className={classes.tableRow}>{notice.insertName}</div>
                                <div className={classes.tableRow}>{notice.insertDate}</div>
                                <div className={classes.tableRow}>{notice.viewCnt}</div>
                            </div>
                        )
                        )}
                    </>
                </Grid>
                <Grid item xs={12} className={classes.pagingBox}>
                    <div>총 게시글&nbsp;<strong>{noticesList && noticesList[0]?.totalCount}</strong>&nbsp;건</div>
                    <Stack spacing={2}>
                        {!!noticesForCount?.data?.RET_DATA && <Pagination count={!!noticesForCount?.data?.RET_DATA && (Math.floor(noticesForCount?.data?.RET_DATA[0]?.totalCount / 10))} boundaryCount={3} shape="rounded" page={page} onChange={handlePageChange} showFirstButton showLastButton />}
                    </Stack>
                </Grid>
            </Grid >
    )
}
export default List;