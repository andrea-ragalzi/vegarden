import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { useNavigate } from "react-router-dom";
import ArticleDetail from "./ArticleDetail";
import { updateArticle } from "../actions/articleAction";
import { readZBlog } from "../actions/zenHubAction";

const EditArticle = () => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const formData = new FormData();
    const { selectedArticle } = useSelector((state: RootState) => state.article);
    const [article, setArticle] = useState(null || selectedArticle);
    const { session } = useSelector((state: RootState) => state.login);

    useEffect(() => {
        formData.append("title", article?.title || "");
        formData.append("description", article?.description || "");
        formData.append("body", article?.body || "");
        if (article?.coverImage) {
            formData.append("coverImage", article?.coverImage);
        }
    }, [article?.title, article?.description, article?.body, article?.coverImage]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setArticle({ ...article!, coverImage: e.target.files[0] });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const loadData = async () => {
            if (article?.title && article?.description && article?.body) {
                await dispatch(updateArticle(article, formData, session.accessToken));
                await dispatch(readZBlog(article.author.username, session.accessToken));
            }
        }
        loadData();
        navigate("/zenhub/me");
    };

    return (
        <Row className='justify-content-center text-black mt-4 mt-md-0'>
            <Col xs={12} className='mt-5 px-5'>
                <h1 className="mb-3 text-center text-secondary">Edit Article</h1>
                <Form onSubmit={handleSubmit} className="text-center text-dark">
                    <Form.Group controlId="fofrmTitle" className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter title"
                            rows={2}
                            maxLength={80}
                            value={article?.title}
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
                            rows={5}
                            maxLength={180}
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
                <Col xs={12} className="mt-5 p-0">
                    <ArticleDetail article={article} />
                </Col>
            )}
        </Row>
    );
};

export default EditArticle;
