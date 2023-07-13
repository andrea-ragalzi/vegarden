import { Row, Col, Button } from 'react-bootstrap';
import { HomeOutline, ChatbubbleOutline, AddOutline, SearchOutline, PersonCircleOutline, NotificationsOutline, FilterOutline } from 'react-ionicons'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Row className='row row-cols-1 d-none d-md-block justify-content-center align-items-center vh-100 side-bar' style={{ position: 'fixed', left: 0 }}>
            <Col>
                <Link to="/home">
                    <span className="vegarden-text">V</span>
                </Link>
            </Col>
            <Col>
                <NavLink to="/zenhub/me">
                    <PersonCircleOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                    />
                </NavLink>
            </Col>
            <Col>
                <FilterOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => alert('Hi!')}
                />
            </Col>
            <Col>
                <NotificationsOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => alert('Hi!')}
                />
            </Col>
            <Col>
                <HomeOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => navigate('/home')}
                />
            </Col>
            <Col>
                <SearchOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => alert('Work in progress!')}
                />
            </Col>
            <Col>
                <AddOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => navigate('/article-create')}
                />
            </Col>
            <Col>
                <ChatbubbleOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => alert('Work in progress!')}
                />
            </Col>
        </Row>
    );
}

export default Sidebar;
