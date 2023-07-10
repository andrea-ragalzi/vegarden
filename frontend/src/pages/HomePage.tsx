import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { readTrendArticles } from '../actions/articleAction';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Article } from '../types/articleType';

const HomePage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const article = useSelector((state: RootState) => state.article);

    useEffect(() => {
        const loadData = async () => {
            await dispatch(readTrendArticles(session.accessToken));
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
        <Container fluid className='vh-100'>
            <Row>
                <Col xs={1}>
                    <Sidebar />
                </Col>
                <Col xs={11}>
                    <Row className='mb-5'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Col className='d-flex justify-content-center align-items-center'>
                        {article.loading ? (
                            <Spinner variant='primary' animation='border' />
                        ) : (
                            article.error ? (
                                <p>{article.error}</p>
                            ) : (
                                <Feed articles={article.trendArticles || []} />
                            )
                        )}
                    </Col>
                    <Row>
                        <Col>
                            <BottomBar />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

export default HomePage;
