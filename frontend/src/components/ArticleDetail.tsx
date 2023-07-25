import { Col, Row, Image, Button, Spinner, Modal } from "react-bootstrap";
import { Article } from "../types/articleType";
import { BookmarkOutline, ChatbubblesOutline, FlowerOutline, PencilOutline, RoseOutline, ShareSocialOutline, TrashOutline } from "react-ionicons";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { addArticleReaction, deleteArticleReaction, getArticleReaction } from "../actions/articleReactionAction";
import { ArticleReaction } from "../types/articleReactionType";
import { Zenyte } from "../types/zenyteType";
import classNames from 'classnames';
import { addArticleSaved, deleteArticleSaved, getArticleSaved } from "../actions/articleSavedAction";
import { ArticleSaved } from "../types/articleSavedType";
import { deleteArticle } from "../actions/articleAction";
import defaultCoverImage from '../assets/default_cover.png';
import { readZSavedArticles } from "../actions/zenHubAction";
import { format } from 'date-fns';


const ArticleDetail = ({ article }: { article: Article }) => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const { session } = useSelector((state: RootState) => state.login);
    const currentRoute = useLocation().pathname;
    const [coverImageURL, setCoverImageURL] = useState<string | undefined>(undefined);
    const zenyte = useSelector((state: RootState) => state.zenyte.zenyte) as Zenyte;
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const articleReactionState = useSelector((state: RootState) => state.articleReaction);
    const { savedArticles }: { savedArticles: Article[] } = useSelector((state: RootState) => state.zenHub);

    const articleReaction: ArticleReaction = {
        article: article,
        author: zenyte
    }

    const articleSaved: ArticleSaved = {
        article: article,
        author: zenyte
    }

    const formatDateTime = (inputDateTime: string) => {
        const formattedDateTime = format(new Date(inputDateTime), 'yyyy-MM-dd HH:mm:ss');
        return formattedDateTime;
    }

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteArticle(article!, session.accessToken));
        setShowDeleteModal(false);
        navigate('/zenhub/me');
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleReaction = async () => {
        setLoadingLike(true);
        if (liked) {
            await dispatch(deleteArticleReaction(articleSaved, session.accessToken));
            setLiked(false);
        } else {
            await dispatch(addArticleReaction(articleSaved, session.accessToken));
            setLiked(true);
        }
        await dispatch(getArticleReaction(articleReaction, session.accessToken));
        setLoadingLike(false);
    }

    const handleSave: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setLoadingSave(true);
        if (savedArticles.some(savedArticle => savedArticle.id === article.id)) {
            await dispatch(deleteArticleSaved(articleSaved, session.accessToken));
            setSaved(false);
        } else {
            await dispatch(addArticleSaved(articleSaved, session.accessToken));
            setSaved(true);
        }
        await dispatch(getArticleSaved(articleSaved, session.accessToken));
        await dispatch(readZSavedArticles(session.username, session.accessToken));
        setLoadingSave(false);
    };

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
        setLiked(articleReactionState.exists ? true : false);
    }, [articleReactionState.exists]);

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
            if (savedArticles.some(savedArticle => savedArticle.id === article.id)) {
                setSaved(true);
            }
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className='row-cols-1 justify-content-center align-items-center article-detail'>
                <Col>
                    <Row>
                        <Col xs={{ span: 12, order: 1 }} >
                            <h1>{article?.title}</h1>
                        </Col>
                        <Col xs={{ span: 12, order: 0 }}>
                            {(currentRoute === `/article/${article.id}` && article?.author.username === session.username) && (
                                <div className='d-flex justify-content-end mb-3 px-4'>
                                    <Button variant="danger" className='v-button'>
                                        <TrashOutline
                                            color={'#ffffff'}
                                            height="35px"
                                            width={'35px'}
                                            onClick={handleDelete}
                                        />
                                    </Button>
                                    <Button variant="primary" className='v-button'>
                                        <PencilOutline
                                            color={'#ffffff'}
                                            height="35px"
                                            width={'35px'}
                                            style={{ marginLeft: '2px' }}
                                            onClick={() => { navigate(`/edit-article`) }}
                                        />
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Col>

                <Col className="mb-1 text-center">
                    {
                        article?.createdAt && (
                            <p>{formatDateTime(article?.createdAt)}</p>
                        )
                    }
                </Col>

                {article?.coverImage && (currentRoute === "/article-create" || currentRoute === "/edit-article") ? (
                    <Col className="d-flex justify-content-center">
                        <Image
                            className="cover"
                            src={URL.createObjectURL(article.coverImage)}
                            alt={article.title}
                        />
                    </Col>
                ) : (
                    <Col className="text-center">
                        {coverImageURL ? (
                            <Image
                                className="cover"
                                src={coverImageURL}
                                alt={article.title}
                            />
                        ) :
                            <Image
                                className="cover"
                                src={defaultCoverImage}
                                alt={article.title}
                            />
                        }
                    </Col>
                )}
                <Col className="px-5">
                    <p className="body">{article?.body}</p>
                </Col>
                <Col>
                    <p>{article?.collaborators.map((collaborator) => collaborator.username).join(", ")}</p>
                </Col>
            </Row>
            {currentRoute !== "/article-create" && currentRoute !== "/edit-article" && (
                <Row className="justify-content-evenly mx-1 mb-5">
                    <Col className='d-flex justify-content-center'>
                        <Button className={classNames('reaction', { 'liked': liked })} disabled={loadingLike} onClick={handleReaction}>
                            <RoseOutline
                                color={'#ffffff'}
                                height="35px"
                                width={'35px'}
                            />
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <Button className="reaction">
                            <ChatbubblesOutline
                                color={'#ffffff'}
                                height="35px"
                                width={'35px'}
                                onClick={() => alert('Work progress!')}
                            />
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <Button className={classNames('reaction', { 'liked': saved })} onClick={handleSave} disabled={loadingSave}>
                            <BookmarkOutline
                                color={'#ffffff'}
                                height="35px"
                                width={'35px'}
                            />
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <Button className="reaction">
                            <ShareSocialOutline
                                color={'#ffffff'}
                                height="35px"
                                width={'35px'}
                                onClick={() => alert('Work in progress!')}
                            />
                        </Button>
                    </Col>
                </Row>
            )}
            <Modal show={showDeleteModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the article?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ArticleDetail;