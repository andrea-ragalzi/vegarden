import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col } from 'react-bootstrap';
import { fecthTrendArticles } from '../actions/articleAction';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Article } from '../types/articleType';

const HomePage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const trendArticlesState = useSelector((state: RootState) => state.article);
    const [trendArticles, setTrendArticles] = useState<Article[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const loadData = async () => {
            try {
                await dispatch(fecthTrendArticles(session.accessToken));
                setTrendArticles(trendArticlesState.trendArticles);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }
        if (loggedIn) {
            loadData();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <Col>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            error ? (
                                <p>{error}</p>
                            ) : (
                                <Feed articles={trendArticles || []} />
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
