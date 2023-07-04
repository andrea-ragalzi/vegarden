import { FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useLoginInput } from './../hooks/useLoginInput';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const email = useLoginInput('');
    const password = useLoginInput('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email:', email.value);
        console.log('Password:', password.value);
    };

    return (
        <Container fluid className='mt-5'>
            <Row className='mb-3'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mb-3'>
                    <h1 className='text-primary mb-2'>Welcome</h1>
                    <h2 className='text-secondary small mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut dicta sequi omnis sint, impedit voluptatum aspernatur nobis officiis corporis placeat laboriosam nisi dolorum optio veritatis explicabo aperiam eius in?</h2>
                    <Form onSubmit={handleSubmit} className='mb-2'>
                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                            <Form.Control
                                type="email"
                                placeholder="Email/Zenyte"
                                value={email.value}
                                onChange={email.onChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className='mb-3'>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password.value}
                                onChange={password.onChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg">
                                Login
                            </Button>
                        </div>
                    </Form>
                    <p>Don't have an account? <Link to="/register" className='text-secondary'>Register</Link></p>
                </Col>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 0 }}>
                    <Image src="https://picsum.photos/600/600" alt="Placeholder" fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
