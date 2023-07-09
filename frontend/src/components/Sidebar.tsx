import { Row, Col, Button } from 'react-bootstrap';
import { HomeOutline, ChatbubbleOutline, AddOutline, SearchOutline, PersonCircleOutline, NotificationsOutline, FilterOutline } from 'react-ionicons'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Row className='row row-cols-1 d-none d-md-block vh-100 bg-primary' style={{ position: 'fixed', left: 0 }}>
            <Col className='d-flex flex-column justify-content-center align-items-center'>
                <Link to="/home">
                    <span className="vegarden-text text-black ms-3">V</span>
                </Link>
                <Button className="d-flex align-items-center">
                    <NavLink to="/zenhub/me">
                        <PersonCircleOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                        />
                    </NavLink>
                </Button>
                <Button>
                    <FilterOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Hi!')}
                    />
                </Button>
                <Button>
                    <NotificationsOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Hi!')}
                    />
                </Button>
                <Button className='my-2'>
                    <HomeOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => navigate('/home')}
                    />
                </Button>
                <Button className='my-2'>
                    <SearchOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Work in progress!')}
                    />
                </Button>
                <Button className='my-2'>
                    <AddOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => navigate('/article-create')}
                    />
                </Button>
                <Button className='my-2'>
                    <ChatbubbleOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Work in progress!')}
                    />
                </Button>
            </Col>
        </Row>
    );
}

export default Sidebar;
