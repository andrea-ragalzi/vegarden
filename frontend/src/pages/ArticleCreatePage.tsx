import BottomBar from '../components/BottomBar';
import ArticleMaker from '../components/ArticleMaker';
import TopBar from '../components/TopBar';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import Sidebar from '../components/Sidebar';


const ArticleCreatePage = () => {
    const navigate = useNavigate();
    const { loggedIn } = useSelector((state: RootState) => state.login);

    useEffect(() => {
        if (loggedIn) {
            return;
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid className='vh-100'>
            <Row className='justify-content-center'>
                <Col xs={1}>
                    <Sidebar />
                </Col>
                <Col xs={11}>
                    <TopBar />
                </Col>
                <Col xs={12} md={11} className='mx-5'>
                    <ArticleMaker />
                </Col>
                <Col xs={1}>
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleCreatePage;
