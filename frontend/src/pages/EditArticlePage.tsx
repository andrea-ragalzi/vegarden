import { Container, Row, Col } from "react-bootstrap";
import BottomBar from "../components/BottomBar";
import Sidebar from "../components/Sidebar";
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
                <Col xs={1}>
                    <Sidebar />
                </Col>
                <Col xs={11}>
                    <TopBar />
                </Col>
                <Col xs={12} md={11} className='mx-5 mb-5 mb-md-5'>
                    <EditArticle />
                </Col>
                <Col xs={12} className="mt-5 mt-md-0">
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default EditArticlePage;