import { Row, Col } from "react-bootstrap";
import { Article } from "../types/articleType";
import ArticlePreview from "./ArticlePreview";

const Feed = ({ articles }: { articles: Article[] }) => {

    return (
        <>
            <Row className="row row-cols-1 m-0 justify-content-center mt-md-0 px-0">
                {articles?.length ? (
                    [...articles].map((article) => (
                        <Col key={article.id} className="d-flex justify-content-center p-0">
                            <ArticlePreview article={article} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-dark text-center mt-5">
                        <h1 className="text-secondary">There is nothing blooming here</h1>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default Feed;
