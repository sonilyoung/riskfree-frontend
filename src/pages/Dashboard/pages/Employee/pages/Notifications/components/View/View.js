import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { DefaultLayout } from '../../../../../../../../layouts/Default';
import { useNoticesViewMutation, useNoticesDeleteMutation } from '../../../../../../../../hooks/api/NoticesManagement/NoticesManagement';


const useStyles = makeStyles(() => ({
    pageWrap: {

    },
    boxTable: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '6px',
        marginTop: '10px !important',
        overflow: 'hidden',
        boxShadow: '0 0 12px rgb(189 203 203 / 50%)',
        background: '#fff'
    },
    boxRow: {
        display: 'flex',
        width: '100%',
        height: '60px',
        '&:nth-last-of-type(2)': {
            height: '460px',
            borderBottom: 'none',
            '& span': {
                width: '100%'
            }
        },
        '&:nth-of-type(2) [class*=rowInfo]': {
            padding: '0',
            width: 'calc(100% - 200px)'
        },
    },
    rowTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        background: '#bdcbe9',
        borderBottom: '1px solid #fff',
        fontSize: '17px',
        fontWeight: '500',
        '&:last-of-type': {
            borderBottom: 'none'
        }
    },
    rowInfo: {
        width: 'calc(100% - 220px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '0 10px',
        borderBottom: '1px solid #d5dae2',
    },
    infoContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '245px'
    },
    infoTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '100%',
        background: '#bdcbe9'
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

}));

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

const View = (props) => {
    const classes = useStyles();
    const { id } = useParams()

    const [noticesView] = useNoticesViewMutation()
    const [noticesDelete] = useNoticesDeleteMutation()
    const [notice, setNotice] = useState()



    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate("/dashboard/director/notifications/list")
    }

    const handleFetch = () => {
        noticesView({
            "noticeId": id
        })
            .then((response) => setNotice(response))
    }

    useEffect(() => {
        handleFetch()
    }, [])

    const handleDelete = () => {
        noticesDelete({
            "noticeId": id
        })
            .then(() => navigate("/dashboard/director/notifications/list"))
    }

    return (
        <DefaultLayout>
            <Grid className={classes.pageWrap} container rowSpacing={0} columnSpacing={0}>
                <Grid item xs={12} className={classes.listTitle}>
                    <Typography variant="headline2" component="div" gutterBottom>
                        공지사항
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.boxTable}>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>제목</div>
                        <div className={classes.rowInfo}>
                            {notice && notice.data.RET_DATA.title}
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>중요공지여부</div>
                        <div className={classes.rowInfo}>
                            <div className={classes.infoContent}>{notice?.data.RET_DATA.importCd === "001" ? "Normal" : "Important"}</div>
                            <div className={classes.infoTitle}>작성자</div>

                            <div className={classes.infoContent}>{notice?.data.RET_DATA.insertName}</div>
                            <div className={classes.infoTitle}>작성일</div>

                            <div className={classes.infoContent}>{notice?.data.RET_DATA.insertDate}</div>
                            <div className={classes.infoTitle}>조회수</div>

                            <div className={classes.infoContent}>{notice?.data.RET_DATA.viewCnt}</div>
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>내용</div>
                        <div className={classes.rowInfo}>
                            {/* <span>
                            중대재해처벌법이 시행된 지 반년이 채 안 돼 대폭 손질될 전망이다. 정부는 지난 16일 오는 7월부터 중대재해처벌법 시행령을 추진하겠다고 발표했다. 중대재해처벌법 개정은 윤석열 대통령의 공약이기도 하다. 시행령에는 ▷경영책임자 의무 명확화 ▷중대재해 감축 로드맵 마련 ▷현장애로 및 법리적 문제점 등에 대한 개선방안 마련 내용 등이 담겼다.
                        </span>
                        <span>
                            중대재해법 개정안은 국회에 이미 발의된 상태다. 지난 17일 박대출 국민의힘 의원이 대표발의한 개정안은 CEO가 사고 예방을 위한 안전 보건 확보 조치를 했다면 처벌 형량을 감경할 수 있게 하는 내용을 골자로 한다. 이는 경영책임자 의무를 명확히 함으로써 법적 불확실성을 해소시키고자 하는 데 따른 것이다.
                        </span>
                        <span>
                            중대재해처벌법은 올해 1월27일에 시행된 법으로 기업의 안전보건조치를 강화하고 안전 관련 투자를 확대해 중대산업재해 예방, 종사자의 생명·신체를 보호하는 것을 목적으로 한다. 중대산업재해란 업무와 관계되는 건설물, 설비 혹은 작업 또는 업무로 인해 발생하는 종사자의 사망, 부상, 질병이 발생하는 것을 말한다. ‘사망자 1명 이상’, ‘6개월 이상 치료가 필요한 부상자 2명 이상’, ‘직업성 질병이 1년 이내 3명 이상 발생한 재해’가 중대산업재해에 해당된다.
                        </span>
                        <span>
                            기업은 안전보건확보의무가 있어 ‘재해예방에 필요한 인력·예산·점검 등 안전관리체계 구축’, ‘재해 발생 시 재발방지 대책 수립’, ‘중앙행정기관·지방자치단체가 관계법령에 따라 개선, 시정 등을 명한 사항’, ‘안전·보건 관계 법령에 따른 의무이행에 필요한 관리’를 이행해야한다.
                        </span>
                        <span>
                            이를 위반해 중대산업재해가 발생할 경우 사망에 대해선 ‘1년 이상의 징역 또는 10억 원 이하의 벌금’, 부상·질병에 대해서는 7년 이하의 징역 또는 1억 원 이하의 벌금‘이 경영책임자에게 부과된다. 중대재해처벌법은 현재 상시근로자 ’50인 이상인 사업 또는 사업장‘, ’건설업의 경우 공시금액 50억 원 이상인 공사’ 가 대상이다. 50인 미만인 사업 또는 사업장은 2024년1월27일부터 시행되며, 상시근로자 5인 미만인 사업 또는 사업장은 처벌 대상에서 제외된다.
                        </span> */}
                            {notice?.data.RET_DATA.content}
                        </div>
                    </div>
                    <div className={classes.boxRow}>
                        <div className={classes.rowTitle}>첨부파일</div>
                        <div className={classes.rowInfo}>
                            {`${notice?.data.RET_DATA.originalFilename}${notice?.data.RET_DATA.filePath}`}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.footerButtons}>
                    <BlueButton className={'button-correction'} onClick={() => navigate(`/dashboard/director/notifications/update/${notice?.data.RET_DATA.noticeId}`)}>수정</BlueButton>
                    <WhiteButton className={'button-delete'} onClick={handleDelete}>삭제</WhiteButton>
                    <WhiteButton className={'button-list'} onClick={() => handleRedirect()}>목록</WhiteButton>
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

export default View;
