import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    return (
        <Container fluid>
            <Row className='row row-cols-1 justify-content-center align-items-center gx-0 mx-0 px-0 py-5'>
                <Col className='mb-4'>
                    <TopBar />
                </Col>
                <Col>
                    <Feed />
                </Col>
                <Col>
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;