import { useState, FormEvent, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import registerFecth, { registerReset } from "../actions/registerAction";
import { store, RootState } from "../store/store";
import RegisterErrorModal from "./RegisterErrorModal";
import RegisterSuccessModal from "./RegisterSuccessModal";

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const register = useSelector((state: RootState) => state.register);
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: ''
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: ''
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleCloseModal = () => {
        setError(false); // reimposta register.error a false
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const minLength = 3;
        const fieldErrors = {
            username: formValues.username.length < minLength ? 'Username is too short' : '',
            email: formValues.email.length < minLength ? 'Email is too short' : '',
            password: formValues.password.length < minLength ? 'Password is too short' : '',
            confirmPassword: formValues.confirmPassword.length < minLength ? 'Confirm password is too short' : '',
            firstname: formValues.firstname.length < minLength ? 'Firstname is too short' : '',
            lastname: formValues.lastname.length < minLength ? 'Lastname is too short' : ''
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid email address'
            }));
            return;
        }

        if (formValues.password !== formValues.confirmPassword) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords do not match'
            }));
            return;
        }

        setFormErrors(fieldErrors);

        if (Object.values(fieldErrors).some((error) => error !== '')) {
            return;
        }

        const zenyteData = {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            firstname: formValues.firstname,
            lastname: formValues.lastname
        }

        dispatch(registerFecth(zenyteData));
    };

    useEffect(() => {
        if (register.registered && !register.loading && !register.error) {
            setSuccess(true);
            setLoading(false);
            setError(false);
            dispatch(registerReset());
            // navigate('/');
            return;
        }
        if (register.registered && !register.loading && register.error) {
            setSuccess(false);
            setLoading(true);
            setError(false);
            return;
        }
        if (!register.registered && !register.loading && register.error) {
            setSuccess(false);
            setLoading(false);
            setError(true);
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register.registered, register.loading, register.error]);

    return (
        <>
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
                    {formErrors.username && <p className="text-danger ms-1">{formErrors.username}</p>}
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className='mb-3'>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                        className='my-input'
                    />
                    {formErrors.email && <p className="text-danger ms-1">{formErrors.email}</p>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className='mb-3'>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleChange}
                        className='my-input'
                    />
                    {formErrors.password && <p className="text-danger ms-1">{formErrors.password}</p>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className='mb-3'>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        className='my-input'
                    />
                    {formErrors.confirmPassword && <p className="text-danger ms-1">{formErrors.confirmPassword}</p>}
                </Form.Group>
                <Form.Group controlId="formBasicFirstname" className='mb-3'>
                    <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="Firstname"
                        value={formValues.firstname}
                        onChange={handleChange}
                        className='my-input'
                    />
                    {formErrors.firstname && <p className="text-danger ms-1">{formErrors.firstname}</p>}
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className='mb-4'>
                    <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        value={formValues.lastname}
                        onChange={handleChange}
                        className='my-input'
                    />
                    {formErrors.lastname && <p className="text-danger ms-1">{formErrors.lastname}</p>}
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
            {error && <RegisterErrorModal show={true} message={register.error || 'Something went wrong'} onClose={handleCloseModal} />}
            {loading && <Spinner animation="grow" />}
            {success && <RegisterSuccessModal show={true} />}
        </>
    )
};

export default RegisterForm;