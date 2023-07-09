import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import RegisterErrorModal from '../components/RegisterErrorModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';

const RegisterPage = () => {
    return (
        <Container fluid className='mt-5 p-3 mb-md-5 mt-md-0'>
            <Row className='mb-3 align-items-md-center vh-100'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mb-3'>
                    <h1 className='text-primary mb-2'>Welcome</h1>
                    <h2 className='text-secondary small mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut dicta sequi omnis sint, impedit voluptatum aspernatur nobis officiis corporis placeat laboriosam nisi dolorum optio veritatis explicabo aperiam eius in?</h2>
                    <RegisterForm />
                    <div className='d-flex justify-content-end'>
                        <p>Do you already have an account? <Link to="/" className='text-secondary'>Login</Link></p>
                    </div>
                </Col>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 0 }}>
                    <Image src="https://picsum.photos/600/600" alt="Placeholder" fluid />
                </Col>
            </Row>
            {/* {error && (
                <RegisterErrorModal show={true} message={register.error || 'Something went wrong'} onClose={handleCloseErrorModal} />
            )} */}
        </Container>
    );
}

export default RegisterPage;
