import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteArticle(article!, session.accessToken));
        setShowDeleteModal(false);
        navigate('/zenhub/me');
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

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
                        <div className='d-flex justify-content-center align-items-center'>
                            <Spinner animation="border" variant='primary' />
                        </div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <>
                            {
                                article?.author.username === session.username && (
                                    <Row>
                                        <Col xs={10} className='d-flex justify-content-end mt-3'>
                                            <TrashOutline
                                                color={'#000000'}
                                                height="35px"
                                                width={'35px'}
                                                onClick={handleDelete}
                                            />
                                        </Col>
                                        <Col xs={2} className='d-flex justify-content-end mt-3'>
                                            <PencilOutline
                                                color={'#000000'}
                                                height="35px"
                                                width={'35px'}
                                                style={{ marginLeft: '1em' }}
                                                onClick={() => { navigate(`/edit-article`) }}
                                            />
                                        </Col>
                                    </Row>
                                )
                            }
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
            <Modal show={showDeleteModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the article?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ArticlePage;