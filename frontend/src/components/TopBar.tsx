import { Row, Col, Button } from 'react-bootstrap';
import { PersonCircleOutline, FilterOutline, NotificationsOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <Row className='fixed-top row row-cols-2 g-0 px-4 justify-content-between align-items-center d-md-none top-bar'>
            <Col className='d-flex'>
                <Link to="/zenhub/me">
                    <PersonCircleOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                    />
                </Link>
                <Link to="/home">
                    <span className="vegarden-text text-black ms-1">Vegarden</span>
                </Link>
            </Col>
            <Col className='d-flex justify-content-end'>
                <div className='me-3'>
                    <FilterOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Hi!')}
                    />
                </div>
                <div>
                    <NotificationsOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Hi!')}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default TopBar;
