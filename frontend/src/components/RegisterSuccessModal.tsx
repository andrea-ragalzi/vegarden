import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface SuccessModalProps {
    show: boolean;
}

const RegisterSuccessModal = ({ show }: SuccessModalProps) => {
    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Registration successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Now you are a Zenyte!
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary'>
                    <Link to="/">Go to Login</Link>
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegisterSuccessModal;
