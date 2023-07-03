import ArticlePreview from "./ArticlePreview";
import { Row, Col } from "react-bootstrap";

const Feed = () => {
    return (
        <>
            <Row className="row row-cols-1 p-0">
                <Col className="px-0 py-2">
                    <ArticlePreview />
                </Col>
                <Col className="px-0 py-2">
                    <ArticlePreview />
                </Col>
            </Row>
        </>
    );
}

export default Feed;