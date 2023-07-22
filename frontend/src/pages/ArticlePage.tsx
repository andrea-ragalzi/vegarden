import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import ArticleDetail from '../components/ArticleDetail';
import { Article } from '../types/articleType';
import { deleteArticle, readArticle } from '../actions/articleAction';
import { PencilOutline, TrashOutline } from 'react-ionicons';
import { Modal } from 'react-bootstrap';


const ArticlePage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const articleId = useParams().articleId;
    const { selectedArticle } = useSelector((state: RootState) => state.article);
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { session, loggedIn } = useSelector((state: RootState) => state.login);

    useEffect(() => {

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
        setArticle(selectedArticle || undefined);
    }, [selectedArticle]);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);


    return (
        <Container fluid className='vh-100'>
            <Row className='justify-content-center'>
                <Col md={1} xl={3}>
                    <SidebarLeft />
                </Col>
                <Col xs={12} md={11} xl={9} className='bg-light d-flex justify-content-center align-items-center'>
                    <Row className='mb-5'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Row className='mt-5 pt-3 mt-md-3 justify-content-center align-items-center'>
                        <Col className='p-0'>
                            {loading ? (
                                <div className='d-flex justify-content-center align-items-center'>
                                    <Spinner animation="border" variant='primary' />
                                </div>
                            ) : error ? (
                                <div>Error: {error}</div>
                            ) : (
                                <>
                                    {article && (
                                        <ArticleDetail article={article} />
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col xs={12}>
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticlePage;