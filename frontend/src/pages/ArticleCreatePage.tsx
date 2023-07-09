import BottomBar from '../components/BottomBar';
import ArticleMaker from '../components/ArticleMaker';
import TopBar from '../components/TopBar';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';


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
        <Container fluid>
            <Row className='row row-cols-1 justify-content-center align-items-center gx-0 mx-0 px-0 py-5'>
                <Col className='mb-5'>
                    <TopBar />
                </Col>
                <Col md={8} xxl={6}>
                    <ArticleMaker />
                </Col>
                <Col >
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleCreatePage;
