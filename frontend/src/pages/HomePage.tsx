import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { readFollowedArticles, readTrendArticles } from '../actions/articleAction';
import { useNavigate } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import { Article } from '../types/articleType';

const HomePage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const article = useSelector((state: RootState) => state.article);
    const [isTrendArticles, setIsTrendArticles] = useState(true);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const loadData = async () => {
            if (isTrendArticles) {
                await dispatch(readTrendArticles(session.accessToken));
                setArticles(article.trendArticles);
            }
            else {
                await dispatch(readFollowedArticles(session.username, session.accessToken));
                setArticles(article.followedArticles);
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTrendArticles]);

    useEffect(() => {
        const loadData = async () => {
            await dispatch(readTrendArticles(session.accessToken));
            setArticles(article.trendArticles);
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
        <Container fluid className='vh-100 p-0'>
            <Row className='justify-content-center m-0 p-0'>
                <Col md={1} lg={1} xl={3}>
                    <SidebarLeft />
                </Col>
                <Col xs={12} md={11} lg={8} xl={6} className='bg-light d-flex justify-content-center align-items-center'>
                    <Row className='mb-5'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Row className='mt-5 pt-3 mt-md-3 justify-content-center align-items-center'>
                        <Col className='p-0'>
                            <div className='d-flex justify-content-evenly'>
                                <Button className='nav-button' onClick={() => setIsTrendArticles(true)} >Trend</Button>
                                <Button className='nav-button' onClick={() => setIsTrendArticles(false)} >Zenyted</Button>
                            </div>
                            {article.loading ? (
                                <Spinner variant='primary' animation='border' />
                            ) : (
                                article.error ? (
                                    <p>{article.error}</p>
                                ) : (
                                    <Feed articles={articles} />
                                )
                            )}
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col xs={12}>
                            <BottomBar />
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className='ps-5'>
                    <SidebarRight />
                </Col>
            </Row>
        </Container >
    );
}

export default HomePage;
