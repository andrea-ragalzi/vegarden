import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createArticle } from "../actions/articleAction";
import { RootState, store } from "../store/store";
import { Article } from "../types/articleType";
import { useNavigate } from "react-router-dom";
import { readBlog } from "../actions/blogAction";
import ArticleDetail from "./ArticleDetail";

const ArticleMaker = () => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const { zenyte } = useSelector((state: RootState) => state.zenyte);
    const { session } = useSelector((state: RootState) => state.login);
    const blog = useSelector((state: RootState) => state.blog.blog);
    const formData = new FormData();
    const article: Article = {
        id: 0,
        title: title,
        coverImage: coverImage,
        description: description,
        body: body,
        createdAt: '',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        blog: blog!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        author: zenyte!,
        collaborators: []
    };

    useEffect(() => {
        formData.append("title", title);
        formData.append("description", description);
        formData.append("body", body);
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }
    }, [title, body, description, coverImage]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCoverImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const loadData = async () => {
            if (title && description && body) {
                await dispatch(createArticle(formData, session.accessToken));
                navigate("/zenhub/me");
            }
        }
        loadData();
    };

    return (
        <Row className='justify-content-center text-black mt-4 mt-md-0'>
            <Col xs={12} className='mt-5 px-5'>
                <h1 className="mb-3 text-center text-secondary">Write Article</h1>
                <Form onSubmit={handleSubmit} className="text-center text-dark">
                    <Form.Group controlId="formTitle" className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter title"
                            rows={2}
                            maxLength={80}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            placeholder="Enter description"
                            maxLength={180}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="my-input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBody" className="mb-3">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="Enter body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="my-input"
                        />
                    </Form.Group>

                    <Button variant="secondary" size="lg" type="submit" className="w-100">
                        Publish
                    </Button>
                </Form>
            </Col>
            {(article.title || article.body || article.coverImage) && (
                <Col xs={12} className="mt-5">
                    <ArticleDetail article={article} />
                </Col>
            )}
        </Row>
    );
};

export default ArticleMaker;
