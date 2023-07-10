import { Col, Row, Image, Button } from "react-bootstrap";
import { getArticle } from "../actions/articleAction";
import { Article } from "../types/articleType";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { AddOutline, BookmarkOutline, ChatbubbleOutline, ChatbubblesOutline, ChatbubblesSharp, FlowerOutline, HomeOutline, SearchOutline, ShareOutline, ShareSocialOutline } from "react-ionicons";

const ArticleDetail = ({ article }: { article: Article }) => {
    return (
        <>
            <Row className='row-cols-1 justify-content-center align-items-center article-detail text-center'>
                <Col>
                    <h1>{article?.title}</h1>
                </Col>
                <Col>
                    <p>{article?.createdAt}</p>
                </Col>
                <Col>
                    <Image src={article?.coverImage || "https://picsum.photos/300/300"} alt={article?.title} />
                </Col>
                <Col>
                    <p>{article?.body}</p>
                </Col>
                <Col>
                    <p>{article?.collaborators.map((collaborator) => collaborator.username).join(", ")}</p>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Button className="reaction">
                        <FlowerOutline
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Work progress!')}
                        />
                    </Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                <Button className="reaction">
                        <ChatbubblesOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Work progress!')}
                        />
                    </Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                <Button className="reaction">
                        <BookmarkOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Work in progress!')}
                        />
                    </Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                <Button className="reaction">
                        <ShareSocialOutline
                            height="35px"
                            width={'35px'}
                            onClick={() => alert('Work in progress!')}
                        />
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default ArticleDetail;