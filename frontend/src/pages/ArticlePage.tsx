import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ArticleDetail from '../components/ArticleDetail';
import { Article } from '../types/articleType';
import { readArticle } from '../actions/articleAction';


const ArticlePage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const articleId = useParams().articleId;
    const articleState = useSelector((state: RootState) => state.article);
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { session, loggedIn } = useSelector((state: RootState) => state.login);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }

        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                await dispatch(readArticle(articleId!, session.accessToken));
            } catch (error) {
                console.error('Error loading data:', error);
                setError('Error loading data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setArticle(articleState.selectedArticle || undefined);
    }, [articleState.selectedArticle]);


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
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <>
                            {article && (
                                <Col>
                                    <ArticleDetail article={article} />
                                </Col>
                            )}
                            <Row>
                                <Col>
                                    <BottomBar />
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ArticlePage;