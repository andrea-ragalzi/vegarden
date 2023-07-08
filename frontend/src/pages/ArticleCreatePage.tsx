import BottomBar from '../components/BottomBar';
import ArticleMaker from '../components/ArticleMaker';
import TopBar from '../components/TopBar';
import { Container, Row, Col } from 'react-bootstrap';


const ArticleCreatePage = () => {
    return (
        <Container fluid>
            <Row className='row row-cols-1 justify-content-center align-items-center gx-0 mx-0 px-0 py-5'>
                <Col className='mb-5'>
                    <TopBar />
                </Col>
                <Col>
                    <ArticleMaker />
                </Col>
                <Col>
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleCreatePage;
