import { Row, Col } from "react-bootstrap";
import { Article } from "../types/articleType";
import ArticleDescription from "./ArticleDescription";

const Feed = ({articles}: {articles: Article[]}) => {
    return (
        <>
            <Row className="row row-cols-1 justify-content-center align-items-center">
                {articles?.length ? (
                    [...articles].reverse().map((article) => (
                        <Col xs={12} sm={6} lg={4} xl={3} className="px-0 px-sm-2 py-2" key={article.id}>
                            <ArticleDescription article={article} />
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
