import { FormEvent, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useLoginInput } from './../hooks/useLoginInput';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleInputChange = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    return (
        <Container fluid className='mt-5'>
            <Row className='mb-3'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mb-3'>
                    <h1 className='text-primary mb-2'>Welcome</h1>
                    <h2 className='text-secondary small mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut dicta sequi omnis sint, impedit voluptatum aspernatur nobis officiis corporis placeat laboriosam nisi dolorum optio veritatis explicabo aperiam eius in?</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername" className='mb-3'>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                ref={usernameRef}
                                onChange={() => handleInputChange(emailRef)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                ref={emailRef}
                                onChange={() => handleInputChange(passwordRef)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className='mb-3'>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                ref={passwordRef}
                                onChange={() => handleInputChange(confirmPasswordRef)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className='mb-3'>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                ref={confirmPasswordRef}
                                onChange={() => handleInputChange(firstnameRef)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicFirstname" className='mb-3'>
                            <Form.Control
                                type="text"
                                placeholder="Firstname"
                                ref={firstnameRef}
                                onChange={() => handleInputChange(lastnameRef)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                            <Form.Control
                                type="text"
                                placeholder="Lastname"
                                ref={lastnameRef}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" className='text-white'>
                                Register
                            </Button>
                        </div>
                    </Form>
                    <p>Do you already have an account? <Link to="/" className='text-secondary'>Login</Link></p>
                </Col>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 0 }}>
                    <Image src="https://picsum.photos/600/600" alt="Placeholder" fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;
