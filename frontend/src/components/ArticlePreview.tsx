import Card from 'react-bootstrap/Card';
import { Row, Col, Image, Button } from 'react-bootstrap/';
import { NavLink } from 'react-router-dom';
import { BookmarkOutline } from 'react-ionicons';

const ArticlePreview = () => {
    return (
        <Card className='articlePreview'>
            <Row className="justify-content-center align-items-center px-2 mb-1">
                <Col xs={2}>
                    <Image className='rounded-circle' src="https://picsum.photos/30/30" alt="Avatar"></Image>
                </Col>
                <Col xs={8}>
                    <Card.Header className='border-0 bg-white'>Article Title</Card.Header>
                </Col>
                <Col xs={2}>
                    <BookmarkOutline
                        color={'#000000'}
                        height={'25px'}
                        width={'25px'}
                        onClick={() => alert('Hi!')}
                    />
                </Col>
            </Row>
            <Card.Img className='rounded-0' src="https://picsum.photos/300/300" />
            <Card.Body>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <NavLink to="/home">
                    <Button variant="link" className='text-success'>Read Article</Button>
                </NavLink>
            </Card.Body>
        </Card>
    );
}

export default ArticlePreview;
