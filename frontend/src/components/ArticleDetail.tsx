import { Col, Row, Image, Button, Spinner } from "react-bootstrap";
import { Article } from "../types/articleType";
import { BookmarkOutline, ChatbubblesOutline, FlowerOutline, RoseOutline, ShareSocialOutline } from "react-ionicons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { addArticleReaction, deleteArticleReaction, getArticleReaction } from "../actions/articleReactionAction";
import { ArticleReaction } from "../types/articleReactionType";
import { Zenyte } from "../types/zenyteType";
import classNames from 'classnames';
import { addArticleSaved, deleteArticleSaved, getArticleSaved } from "../actions/articleSavedAction";
import { ArticleSaved } from "../types/articleSavedType";

const ArticleDetail = ({ article }: { article: Article }) => {
    const dispatch = store.dispatch;
    const { session } = useSelector((state: RootState) => state.login);
    const currentRoute = useLocation().pathname;
    const [coverImageURL, setCoverImageURL] = useState<string | undefined>(undefined);
    const zenyte = useSelector((state: RootState) => state.zenyte.zenyte) as Zenyte;
    const articleReactionState = useSelector((state: RootState) => state.articleReaction);
    const articleSavedState = useSelector((state: RootState) => state.articleSaved);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const articleReaction: ArticleReaction = {
        article: article,
        author: zenyte
    }
    const articleSaved: ArticleSaved = {
        article: article,
        author: zenyte
    }

    const handleReaction = async () => {
        setLoadingLike(true);
        if (liked) {
            await dispatch(deleteArticleReaction(articleReaction, session.accessToken));
            setLiked(false);
        } else {
            await dispatch(addArticleReaction(articleReaction, session.accessToken));
            setLiked(true);
        }
        await dispatch(getArticleReaction(articleReaction, session.accessToken));
        setLoadingLike(false);
    }

    const handleSave = async () => {
        setLoadingSave(true);
        if (saved) {
            await dispatch(deleteArticleSaved(articleSaved, session.accessToken));
            setSaved(false);
        } else {
            await dispatch(addArticleSaved(articleSaved, session.accessToken));
            setSaved(true);
        }
        await dispatch(getArticleSaved(articleSaved, session.accessToken));
        setLoadingSave(false);
    }

    const fetchCoverImage = async (filename: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/uploads/cover_images/${filename}`);
            if (response.ok) {
                const imageBlob = await response.blob();
                const imageURL = URL.createObjectURL(imageBlob);
                setCoverImageURL(imageURL);
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

        const loadData = async () => {
            if (currentRoute !== "/article-create" && article.coverImageURL) {
                await fetchCoverImage(getFileNameFromBlobURL(article.coverImageURL));
            }
            await dispatch(getArticleReaction(articleReaction, session.accessToken));
            await dispatch(getArticleSaved(articleSaved, session.accessToken));
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLiked(articleReactionState.exists ? articleReactionState.exists : false);
    }, [articleReactionState.exists]);

    useEffect(() => {
        setSaved(articleSavedState.exists ? articleSavedState.exists : false);
    }, [articleSavedState.exists]);


    return (
        <>
            <Row className='row-cols-1 justify-content-center align-items-center article-detail text-center'>
                <Col>
                    <h1>{article?.title}</h1>
                </Col>
                <Col>
                    <p>{article?.createdAt}</p>
                </Col>
                {article?.coverImage && (currentRoute === "/article-create" || currentRoute === "/edit-article") ? (
                    <Col>
                        <Image
                            className="cover"
                            src={URL.createObjectURL(article.coverImage)}
                            alt={article.title}
                        />
                    </Col>
                ) : (
                    <Col>
                        {coverImageURL ? (
                            <Image
                                className="cover"
                                src={coverImageURL}
                                alt={article.title}
                            />
                        ) : (
                            <Spinner variant="primary" animation="border" />
                        )}
                    </Col>
                )
                }
                <Col>
                    <p className="body">{article?.body}</p>
                </Col>
                <Col>
                    <p>{article?.collaborators.map((collaborator) => collaborator.username).join(", ")}</p>
                </Col>
            </Row>
            {currentRoute !== "/article-create" && (
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <Button className={classNames('reaction', { 'liked': liked })} disabled={loadingLike} onClick={handleReaction}>
                            <RoseOutline
                                height="35px"
                                width={'35px'}
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
                        <Button className={classNames('reaction', { 'liked': saved })} onClick={handleSave} disabled={loadingSave}>
                            <BookmarkOutline
                                color={'#000000'}
                                height="35px"
                                width={'35px'}
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