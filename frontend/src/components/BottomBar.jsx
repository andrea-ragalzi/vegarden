import { Container, Row, Col, Button } from 'react-bootstrap';

const BottomBar = () => {
    return (
        <Container className="fixed-bottom bg-light m-0">
            <Row className='row row-cols-4 g-0 justify-content-around'>
                <Col className='d-flex justify-content-center'>
                    <Button variant="primary">Button 1</Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Button variant="secondary">Button 2</Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Button variant="success">Button 3</Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Button variant="danger">Button 4</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default BottomBar;
