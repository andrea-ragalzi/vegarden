import { FormEvent, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootState, store, } from '../store/store';
import { fetchLogin } from '../actions/loginAction';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchZenyte } from '../actions/zenyteAction';

const LoginPage = () => {
    const dispatch = store.dispatch;
    const login = useSelector((state: RootState) => state.login);
    const zenyte = useSelector((state: RootState) => state.zenyte);
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
        dispatch(fetchLogin(formValues.username, formValues.password));
    };

    useEffect(() => {
        if (login.loggedIn) {
            dispatch(fetchZenyte(login.session.username, login.session.accessToken));
            console.log(zenyte);
            location.assign('/home');

        }
    }, [login.loggedIn]);


    return (
        <Container fluid className='mt-5'>
            <Row className='mb-3'>
                <Col xs={{ span: 12, order: 0 }} md={{ span: 6, order: 1 }} className='mb-3'>
                    <h1 className='text-primary mb-2'>Welcome</h1>
                    <h2 className='text-secondary small mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut dicta sequi omnis sint, impedit voluptatum aspernatur nobis officiis corporis placeat laboriosam nisi dolorum optio veritatis explicabo aperiam eius in?</h2>
                    <Form onSubmit={handleSubmit} className='mb-2'>
                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                            <Form.Control
                                type="text"
                                name="username"  // Add name attribute
                                placeholder="username"
                                value={formValues.username}  // Set value from state
                                onChange={handleChange}  // Handle changes
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className='mb-3'>
                            <Form.Control
                                type="password"
                                name="password"  // Add name attribute
                                placeholder="Password"
                                value={formValues.password}  // Set value from state
                                onChange={handleChange}  // Handle changes
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit" onClick={() => handleSubmit}>
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
