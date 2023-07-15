import { Container, Row, Col } from "react-bootstrap";
import ArticleMaker from "../components/ArticleMaker";
import BottomBar from "../components/BottomBar";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import EditProfile from "../components/EditProfile";

const EditProfilePage = () => {
    return (
        <Container fluid className='vh-100'>
            <Row className='justify-content-center'>
                <Col xs={1}>
                    <Sidebar />
                </Col>
                <Col xs={11}>
                    <TopBar />
                </Col>
                <Col xs={12} md={11} className='mx-5 mb-5 mb-md-5'>
                    <EditProfile />
                </Col>
                <Col xs={12} className="mt-5 mt-md-0">
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default EditProfilePage;