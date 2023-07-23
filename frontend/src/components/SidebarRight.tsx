import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import { HomeOutline, SearchOutline, FilterOutline, NotificationsOutline, PaperPlaneOutline, AddOutline } from "react-ionicons";
import { Link, useNavigate } from "react-router-dom";
import { Zenyte } from "../types/zenyteType";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";


const SidebarRight = () => {
    const navigate = useNavigate();
    const [zenytes, setZenytes] = useState([]);
    const username = useSelector((state: RootState) => state.zenyte.zenyte?.username as string);

    async function getAllZenytes() {
        try {
            const response = await fetch('/api/zenytes');
            if (response.ok) {
                const data = await response.json();
                const shuffledZenytes = data.sort(() => Math.random() /* - username?.length || 0.5 */);
                setZenytes(shuffledZenytes);
            } else {
                throw new Error('Error during getting all zenytes');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllZenytes();
    }, []);

    return (
        <>
            <Row className='row-cols-1 side-bar-right'>
                <Col className="right-element search-bar">
                    <div className="d-flex justify-content-center">
                        <SearchOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Work in progress!')}
                        />
                        <Form>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </Form>
                    </div>
                </Col>
                <Col className="right-element suggested">
                    <p>Suggested Zenytes</p>
                    {zenytes.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </Col>
                <Col className="right-element footer">
                    <Row className="mb-4">
                        <Col className="d-flex flex-column">
                            <p>About</p>
                            <p>Help</p>
                        </Col>
                        <Col className="d-flex flex-column">
                            <p>Privacy</p>
                            <p>Terms</p>
                        </Col>
                        <Col className="d-flex flex-column">
                            <p>Privacy</p>
                            <p>Terms</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-column">
                            <p>© 2023 Vegarden</p>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </>
    )
};

export default SidebarRight;