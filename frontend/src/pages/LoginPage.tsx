import { FormEvent, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootState, resetStoreAction, store } from '../store/store';
import loginFetch from '../actions/loginAction';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { readMyZenyte } from '../actions/zenyteAction';

const LoginPage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const login = useSelector((state: RootState) => state.login);
    const zenyte = useSelector((state: RootState) => state.zenyte);
    const formRef = useRef<HTMLFormElement>(null);
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const loadData = async () => {
            await dispatch(loginFetch(formValues.username, formValues.password));
        }
        e.preventDefault();
        loadData();
    };

    useEffect(() => {
        if (zenyte.my.id) {
            navigate('/home');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zenyte]);

    useEffect(() => {
        const loadMyZenyte = async () => {
            await dispatch(
                readMyZenyte(login.session.username, login.session.accessToken));
        }
        if (login.loggedIn) {
            loadMyZenyte();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);

    useEffect(() => {
        dispatch(resetStoreAction);
        if (formRef.current) {
            formRef.current.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid className='mt-5 p-3 mb-md-5 mt-md-0'>
            <Row className='mb-3 align-items-md-center vh-100'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mb-3'>
                    <h1 className='text-primary mb-2'>Welcome</h1>
                    <h2 className='text-secondary small mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut dicta sequi omnis sint, impedit voluptatum aspernatur nobis officiis corporis placeat laboriosam nisi dolorum optio veritatis explicabo aperiam eius in?</h2>
                    {login.loading ? (
                        <div>
                            <Spinner variant='primary' animation='border' />
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit} className='mb-2'>
                            <Form.Group controlId="formBasicEmail" className='mb-3'>
                                <Form.Control
                                    type="text"
                                    name="username"  // Add name attribute
                                    placeholder="Username"
                                    value={formValues.username}  // Set value from state
                                    onChange={handleChange}  // Handle changes
                                    className='my-input'
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className='mb-3'>
                                <Form.Control
                                    type="password"
                                    name="password"  // Add name attribute
                                    placeholder="Password"
                                    value={formValues.password}  // Set value from state
                                    onChange={handleChange}  // Handle changes
                                    className='my-input'
                                />
                            </Form.Group>
                            {login.error && (
                                <p className='text-danger text-center'>{login.error}</p>
                            )}
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    )
                    }
                    <div className='d-flex justify-content-center'>
                        <p>Don't have an account? <Link to="/register" className='text-secondary'>Register</Link></p>
                    </div>
                </Col>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 0 }} className='d-flex justify-content-center'>
                    <Image src="https://picsum.photos/600/600" alt="Placeholder" fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;

