import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import { PersonCircleOutline, FilterOutline, NotificationsOutline, MenuOutline, FunnelOutline } from 'react-ionicons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TopBar = () => {
    const isZenHub = useLocation().pathname.includes('/zenhub');
    const navigate = useNavigate();

    return (
        <Row className='fixed-top row row-cols-2 g-0 px-4 justify-content-between align-items-center d-md-none top-bar'>
            <Col className='d-flex justify-content-between'>
                {isZenHub ? (
                    <Dropdown >
                        <Dropdown.Toggle variant="transparent" id="menu-dropdown">
                            <MenuOutline color={'#000000'} height="35px" width={'35px'} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='bg-transparent'>
                            <Dropdown.Item onClick={() => navigate('/')} className='text-dark'>Logout</Dropdown.Item>
                            <Dropdown.Item onClick={() => alert('Hi!')} className='text-dark'>Settings</Dropdown.Item>
                            <Dropdown.Item onClick={() => alert('Hi!')} className='text-dark'>About</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Link to="/zenhub/me">
                        <span className='vegarden-text'>Z</span>
                    </Link>
                )}
                <Link to="/home">
                    <span className="vegarden-text text-black ms-1">V</span>
                </Link>
            </Col>
            <Col className='d-flex justify-content-end'>
                <div className='me-3'>
                    <FunnelOutline color={'#000000'} height="35px" width={'35px'} onClick={() => alert('Hi!')} />
                </div>
                <div>
                    <NotificationsOutline color={'#000000'} height="35px" width={'35px'} onClick={() => alert('Hi!')} />
                </div>
            </Col>
        </Row>
    );
}

export default TopBar;
