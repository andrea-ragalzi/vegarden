import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import welcomeImage from '../assets/login.jpg';

const RegisterPage = () => {
    return (
        <Container fluid className='mt-5 p-3 mb-md-5 mt-md-0'>
            <Row className='mb-3 mx-md-5 align-items-md-center vh-100'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mb-3'>
                <h1 className='text-primary mb-2 display-1'>Vegarden</h1>
                    <h1 className='text-secondary small mb-3 display-6'>Join Vegarden, the Vegan-Themed Social Blogging Network.</h1>
                    <RegisterForm />
                    <div className='d-flex justify-content-center'>
                        <p>Do you already have an account? <Link to="/" className='text-secondary'>Login</Link></p>
                    </div>
                </Col>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 0 }}>
                    <div className='d-flex justify-content-center'>
                        <Image src={welcomeImage} alt="Placeholder" fluid />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;
