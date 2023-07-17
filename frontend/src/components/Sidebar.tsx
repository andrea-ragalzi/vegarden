import { Row, Col } from 'react-bootstrap';
import { HomeOutline, ChatbubbleOutline, AddOutline, SearchOutline, PersonCircleOutline, NotificationsOutline, FilterOutline } from 'react-ionicons'
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const Sidebar = () => {
    const navigate = useNavigate();
    const { session } = useSelector((state: RootState) => state.login);

    return (
        <Row className='row row-cols-1 d-none d-md-block justify-content-center align-items-center vh-100 side-bar' style={{ position: 'fixed', left: 0 }}>
            <Col>
                <Link to="/home">
                    <span className="vegarden-text">V</span>
                </Link>
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
                <ChatbubbleOutline
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
                <NavLink to={'/zenhub/me'} className='vegarden-text'>
                    <span>Z</span>
                </NavLink>
            </Col>
        </Row>
    );
}

export default Sidebar;
