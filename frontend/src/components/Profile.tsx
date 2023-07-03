import { Row, Col, Image } from 'react-bootstrap';

const Profile = () => {
    return (
        <>
            <Row className='justify-content-center gx-0 mx-2 text-black'>
                <Col xs={8}>
                    <Image className='rounded-circle mb-1' src="https://picsum.photos/120/120" alt="Avatar"></Image>
                    <p className='mb-0 ms-2'>Andrea Ragalzi</p>
                    <p className='mb-0 ms-2'>@andreaseperso</p>
                    <p className='ms-2'>He/Him</p>
                </Col>
                <Col xs={4} className='mt-4'>
                    <p>10 Article</p>
                    <p>123 Zenyter</p>
                    <p>126 Zenyted</p>
                </Col>
            </Row>
            <Row className='text-black'>
                <Col>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam eos rem veritatis, facere, officia expedita in suscipit eius minima corporis maxime cumque
                        quos deleniti quae et excepturi architecto tempore pariatur?</p>
                </Col>
            </Row>
        </>
    );
}

export default Profile;