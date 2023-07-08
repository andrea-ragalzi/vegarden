import { Modal, Button } from 'react-bootstrap';

interface ErrorModalProps {
    show: boolean;
    message: string;
    onClose: () => void;
}

const RegisterErrorModal = ({ show, message, onClose }: ErrorModalProps) => {
    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Error during registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegisterErrorModal;
