import { Col, Row, Image, Button } from "react-bootstrap";
import { Article } from "../types/articleType";
import { BookmarkOutline, ChatbubblesOutline, FlowerOutline, ShareSocialOutline } from "react-ionicons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ArticleDetail = ({ article }: { article: Article }) => {
    const navigate = useNavigate();
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const currentRoute = useLocation().pathname;
    const [coverImageURL, setCoverImageURL] = useState<string | undefined>(undefined);

    const fetchCoverImage = async (filename: string) => {
        console.log(filename);
        try {
            const response = await fetch(`http://localhost:8080/api/uploads/cover_images/${filename}`);
            if (response.ok) {
                const imageBlob = await response.blob();
                const imageURL = URL.createObjectURL(imageBlob);
                setCoverImageURL(imageURL);
                console.log(imageURL);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getFileNameFromBlobURL = (blobURL: string) => {
            const splitURL = blobURL.split('/');
            return splitURL[splitURL.length - 1];
        };
        if (!loggedIn) {
            navigate('/');
        }
        if (currentRoute !== "/article-create") {
            fetchCoverImage(getFileNameFromBlobURL(article.coverImageURL!));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article, loggedIn]);

    return (
        <>
            <Row className='row-cols-1 justify-content-center align-items-center article-detail text-center'>
                {article && (
                    <>
                        <Col>
                            <h1>{article?.title}</h1>
                        </Col>
                        <Col>
                            <p>{article?.createdAt}</p>
                        </Col>
                        {article?.coverImageURL && (
                            <Col>
                                <Image
                                    className="cover"
                                    src={coverImageURL}
                                    alt={article.title}
                                />
                            </Col>
                        )}
                        {article?.coverImage && currentRoute === "/article-create" && (
                            <Col>
                                <Image
                                    className="cover"
                                    src={URL.createObjectURL(article.coverImage)}
                                    alt={article.title}
                                />
                            </Col>
                        )}
                        <Col>
                            <p className="body">{article?.body}</p>
                        </Col>
                        <Col>
                            <p>{article?.collaborators.map((collaborator) => collaborator.username).join(", ")}</p>
                        </Col>
                    </>
                )}
            </Row>
            {currentRoute !== "/article-create" && (
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
            )}
        </>
    );
}

export default ArticleDetail;