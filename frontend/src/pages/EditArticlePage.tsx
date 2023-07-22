import { Container, Row, Col } from "react-bootstrap";
import BottomBar from "../components/BottomBar";
import SidebarLeft from "../components/SidebarLeft";
import TopBar from "../components/TopBar";
import EditArticle from "../components/EditArticle";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditArticlePage = () => {
    const navigate = useNavigate();
    const { loggedIn } = useSelector((state: RootState) => state.login);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);


    return (
        <Container fluid className='vh-100'>
            <Row className='justify-content-center'>
                <Col md={1} xl={3}>
                    <SidebarLeft />
                </Col>
                <Col xs={12} md={11} xl={9}>
                    <Row className='mb-3 mb-md-0'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Row className='mt-md-0 justify-content-center align-items-center'>
                        <Col className='mb-5 mb-md-5'>
                            <EditArticle />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} className="mt-5 mt-md-0">
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default EditArticlePage;