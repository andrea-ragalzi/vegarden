import { Container, Row, Col, Button } from 'react-bootstrap';
import { HomeOutline, ChatbubbleOutline, AddOutline, SearchOutline } from 'react-ionicons'
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
    const navigate = useNavigate();
    return (
        <Row className='fixed-bottom row row-cols-4 g-0 p-0 justify-content-between bg-primary'>
            <Col className='d-flex justify-content-center'>
                <Button>
                    <HomeOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => navigate('/home')}
                    />
                </Button>
            </Col>
            <Col className='d-flex justify-content-center'>
                <Button>
                    <SearchOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => alert('Work progress!')}
                    />
                </Button>
            </Col>
            <Col className='d-flex justify-content-center'>
                <Button>
                    <AddOutline
                        color={'#000000'}
                        height="35px"
                        width={'35px'}
                        onClick={() => navigate('/article-create')}
                    />
                </Button>
            </Col>
            <Col className='d-flex justify-content-center'>
                <Button>
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

export default BottomBar;
