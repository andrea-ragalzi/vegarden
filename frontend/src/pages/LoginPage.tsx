import { FormEvent, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootState, resetStoreAction, store } from '../store/store';
import loginFetch from '../actions/loginAction';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { readZenyte } from '../actions/zenyteAction';
import welcomeImage from '../assets/login.jpg';
import { readZBlog, readZProfile } from '../actions/zenHubAction';
import { readFollowedArticles, readTrendArticles } from '../actions/articleAction';

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
        const loadZenyte = async () => {
            await dispatch(
                readZenyte(login.session.username, login.session.accessToken));
            await dispatch(readTrendArticles(login.session.accessToken));
            await dispatch(readFollowedArticles(login.session.username, login.session.accessToken));
        }
        const loadZenHub = async () => {
            await dispatch(
                readZProfile(login.session.username, login.session.accessToken));
            await dispatch(readZBlog(login.session.username, login.session.accessToken));
        }
        if (login.loggedIn) {
            loadZenyte();
            loadZenHub();
            navigate('/home')
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
        <Container fluid className='p-3 mb-md-5 mt-md-0'>
            <Row className='mb-3 align-items-md-center vh-100'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mt-4 px-5'>
                    <h1 className='text-primary mb-2 display-1'>Vegarden</h1>
                    <h1 className='text-secondary small mb-3 display-6'>Join Vegarden, the Vegan-Themed Social Blogging Network.</h1>
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
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 0 }}>
                    <div className='d-flex justify-content-center'>
                        <Image src={welcomeImage} alt="Placeholder" fluid />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;

