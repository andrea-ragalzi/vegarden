import { Row, Col, Container } from 'react-bootstrap';
import { HomeOutline, AddOutline, SearchOutline, PersonCircleOutline, NotificationsOutline, FilterOutline, PaperPlaneOutline } from 'react-ionicons';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const SidebarLeft = () => {
    const navigate = useNavigate();

    return (
        <Row className='row-cols-1 d-none d-md-block vh-100 side-bar-left'>
            <Col className='d-flex justify-content-center align-items-center mx-0'>
                <Link to="/home">
                    <span className="vegarden-text d-none d-xl-block text-center">Vegarden</span>
                    <span className="vegarden-text d-xl-none text-center">V</span>
                </Link>
            </Col>
            <Col className='d-flex align-items-center mx-0'>
                <Link to="/home" className='w-100'>
                    <div className="d-flex justify-content-center justify-content-xl-start align-items-center ms-xl-3">
                        <HomeOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                            onClick={() => navigate('/home')}
                        />
                        <span className="text-black d-none d-xl-block ms-3">Home</span>
                    </div>
                </Link>
            </Col>
            <Col>
                <Link to="/home" className='w-100'>
                    <div className="d-flex justify-content-center justify-content-xl-start align-items-center ms-xl-3">
                        <NotificationsOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Hi!')}
                        />
                        <span className="text-black d-none d-xl-block ms-3">Notifications</span>
                    </div>
                </Link>
            </Col>
            <Col>
                <Link to="/home" className='w-100'>
                    <div className="d-flex justify-content-center justify-content-xl-start align-items-center ms-xl-3">
                        <PaperPlaneOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Work in progress!')}
                        />
                        <span className="text-black d-none d-xl-block ms-3">Chat</span>
                    </div>
                </Link>
            </Col>
            <Col>
                <Link to="/article-create" className='w-100'>
                    <div className="d-flex justify-content-center justify-content-xl-start align-items-center ms-xl-3">
                        <AddOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                        />
                        <span className="text-black d-none d-xl-block ms-3">Write</span>
                    </div>
                </Link>
            </Col>
            <Col>
                <Col className='d-flex justify-content-start align-self-center mx-0'>
                    <Link to="/zenhub/me">
                        <span className="vegarden-text d-none d-xl-block text-center">ZenHub</span>
                        <span className="vegarden-text d-xl-none text-center">Z</span>
                    </Link>
                </Col>
            </Col>
        </Row >
    );
}

export default SidebarLeft;