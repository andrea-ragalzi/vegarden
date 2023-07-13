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
    const { session, loggedIn } = useSelector((state: RootState) => state.login);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        const loadData = async () => {
            try {
                await dispatch(readArticle(articleId!, session.accessToken,));
                setArticle(articleState.selectedArticle || undefined);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article !== undefined]);

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
                </Col>
            </Row>
        </Container >
    );
}

export default ArticlePage;