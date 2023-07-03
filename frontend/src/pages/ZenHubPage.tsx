import { Container, Row, Col } from 'react-bootstrap';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import Profile from '../components/Profile';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const ZenHubPage = () => {
    return (
        <Container>
            <Row className='row row-cols-1 justify-content-center align-items-center gx-0 mx-0 px-0 py-5'>
                <Col className='mb-4'>
                    <TopBar />
                </Col>
                <Col>
                    <Profile />
                </Col>
                <Col className='d-flex justify-content-evenly'>
                    <NavLink to="/zenhub">Writing</NavLink>
                    <NavLink to="/zenhub">Zenyted</NavLink>
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

export default ZenHubPage;