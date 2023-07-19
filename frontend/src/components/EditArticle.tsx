import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createArticle } from "../actions/articleAction";
import { RootState, store } from "../store/store";
import { Article } from "../types/articleType";
import { useNavigate } from "react-router-dom";
import { readBlog } from "../actions/blogAction";
import ArticleDetail from "./ArticleDetail";

const EditArticle = () => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const { session } = useSelector((state: RootState) => state.login);
    const formData = new FormData();
    const { selectedArticle } = useSelector((state: RootState) => state.article);
    const [article, setArticle] = useState(null || selectedArticle);

    useEffect(() => {
        formData.append("title", article?.title || "");
        formData.append("description", article?.description || "");
        formData.append("body", article?.body || "");
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }
    }, [article?.title, article?.description, article?.body, coverImage]);

    useEffect(() => {
        setArticle(selectedArticle || null);
    }, [selectedArticle]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCoverImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const loadData = async () => {
            if (article?.title && article?.description && article?.body) {
                /* await dispatch(createArticle(formData, session.accessToken));
                await dispatch(readBlog(session.username, session.accessToken)); */
                navigate("/zenhub/me");
            }
        }
        loadData();
    };

    return (
        <Row className='justify-content-center mx-5 text-black mt-4'>
            <Col xs={12} md={{ span: 6, order: 1 }} className='mt-5'>
                <h1 className="mb-3 text-center text-secondary">Edit Article</h1>
                <Form onSubmit={handleSubmit} className="text-center text-dark">
                    <Form.Group controlId="formTitle" className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            defaultValue={article?.title}
                            onChange={(e) => setArticle(
                                { ...article!, title: e.target.value })}
                            className="my-input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formCoverImage" className="mb-2">
                        <Form.Label>Cover Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="my-input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Enter description"
                            defaultValue={article?.description}
                            onChange={(e) => setArticle(
                                { ...article!, description: e.target.value })}
                            className="my-input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBody" className="mb-3">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="Enter body"
                            defaultValue={article?.body}
                            onChange={(e) => setArticle(
                                { ...article!, body: e.target.value })}
                            className="my-input"
                        />
                    </Form.Group>

                    <Button variant="secondary" size="lg" type="submit" className="w-100">
                        Publish
                    </Button>
                </Form>
            </Col>
            {article && (
                <Col xs={12} md={{ span: 6, order: 0 }} className="mt-5">
                    <ArticleDetail article={article} />
                </Col>
            )}
        </Row>
    );
};

export default EditArticle;
