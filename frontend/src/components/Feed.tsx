import { useSelector } from "react-redux";
import ArticlePreview from "./ArticlePreview";
import { Row, Col } from "react-bootstrap";
import { Article } from "../types/articleType";

const Feed = ({articles}: {articles: Article[]}) => {
    return (
        <>
            <Row className="row row-cols-1 p-0">
                {articles?.length ? (
                    articles.map((article) => (
                        <Col className="px-0 py-2" key={article.id}>
                            <ArticlePreview article={article} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">There is nothing blooming here</Col>
                )}
            </Row>
        </>
    );
}

export default Feed;
