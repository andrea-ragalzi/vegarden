import { Row, Col, Button } from 'react-bootstrap';
import { HomeOutline, ChatbubbleOutline, AddOutline, SearchOutline } from 'react-ionicons'
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
    const navigate = useNavigate();
    return (
        <Row className='fixed-bottom row row-cols-4 g-0 justify-content-between bg-primary d-md-none bottom-bar'>
            <Col className='d-flex justify-content-center'>
                <HomeOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => navigate('/home')}
                />
            </Col>
            <Col className='d-flex justify-content-center'>
                <SearchOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => alert('Work progress!')}
                />
            </Col>
            <Col className='d-flex justify-content-center'>
                <AddOutline
                    color={'#000000'}
                    height="35px"
                    width={'35px'}
                    onClick={() => navigate('/article-create')}
                />
            </Col>
            <Col className='d-flex justify-content-center'>
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

export default BottomBar;
