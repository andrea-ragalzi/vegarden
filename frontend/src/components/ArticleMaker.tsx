import { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createArticle } from "../actions/articleAction";
import { RootState, store } from "../store/store";
import { Article } from "../types/articleType";
import { useNavigate } from "react-router-dom";

const ArticleMaker = () => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const accessToken = useSelector((state: RootState) => state.login.session.accessToken);
    const blog = useSelector((state: RootState) => state.blog.blog);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCoverImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
 
        console.log('Posting article');
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("body", body);
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }
        const article: Article = {
            id: 0,
            title: title,
            description: description,
            body: body,
            createdAt: '',
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            blog: blog!,
            collaborators: []
        };
        dispatch(createArticle(accessToken, article));
        navigate("/zenhub/me");
    };

    return (
        <>
            <h1 className="mb-3 text-center text-secondary">Write Article</h1>
            <Form onSubmit={handleSubmit} className="text-center text-dark">
                <Form.Group controlId="formTitle" className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
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
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="my-input"
                    />
                </Form.Group>

                <Form.Group controlId="formBody" className="mb-3">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="my-input"
                    />
                </Form.Group>

                <Button variant="info" size="lg" type="submit" className="w-100 mb-2">
                    Preview
                </Button>

                <Button variant="secondary" size="lg" type="submit" className="w-100">
                    Publish
                </Button>
            </Form>
        </>
    );
};

export default ArticleMaker;
