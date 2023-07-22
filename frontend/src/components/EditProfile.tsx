import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import { updateBlog } from "../actions/blogAction";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../actions/profileAction";
import { Blog } from "../types/blogType";
import { Profile } from "../types/profileType";

const EditProfile = () => {

    const pronounOptions = [
        { value: "he/him", label: "He/Him" },
        { value: "she/her", label: "She/Her" },
        { value: "they/them", label: "They/Them" },
        { value: "he/she", label: "He/She" },
        { value: "he/they", label: "He/They" },
        { value: "she/they", label: "She/They" },
        { value: "he/she/they", label: "He/She/They" },
        { value: "other", label: "Other" },
        { value: "", label: "Prefer not to say" },
    ];

    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [avatarImage, setAvatarImage] = useState<File | null>(null);
    const { session } = useSelector((state: RootState) => state.login);
    const formData = new FormData();
    const { profile, blog }: { profile: Profile, blog: Blog } = useSelector((state: RootState) => state.zenHub);
    const [tmpProfile, setTmpProfile] = useState(profile);
    const [tmpBlog, setTmpBlog] = useState(blog);

    useEffect(() => {
        formData.append("firstname", tmpProfile?.firstname || "");
        formData.append("middlename", tmpProfile?.middlename || "");
        formData.append("lastname", tmpProfile?.lastname || "");
        formData.append("pronouns", tmpProfile?.pronouns || "");
        formData.append("bio", tmpProfile?.bio || "");
        formData.append("location", tmpProfile?.location || "");
        if (avatarImage) {
            formData.append("avatarImage", avatarImage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tmpProfile?.firstname, tmpProfile?.middlename, tmpProfile?.lastname, tmpProfile?.bio, tmpProfile?.pronouns, tmpProfile?.avatarImage, tmpBlog?.title]);

    const handleAvatarImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatarImage(e.target.files[0]);
            setTmpProfile({ ...tmpProfile!, avatarImage: e.target.files[0] });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const loadData = async () => {
            if (tmpProfile?.firstname && tmpProfile?.lastname && tmpBlog?.title) {
                await dispatch(updateProfile(formData, session.username, session.accessToken));
                await dispatch(updateBlog(tmpBlog, session.username, session.accessToken));
                navigate("/zenhub/me");
            }
        }
        loadData();
    };

    return (
        <Row className='justify-content-center text-black mt-5'>
            <Col xs={12}>
                <ProfileSection  profile={tmpProfile!} blogSize={blog?.articles?.length ?? 0} />
                <h2 className='text-secondary text-center mt-3'>{tmpBlog?.title}</h2>
            </Col>
            <Col xs={12} md={{ span: 6, order: 1 }} className='mt-5'>
                <h1 className="mb-3 text-center text-secondary">Edit ZenHub</h1>
                <Form className="text-center text-dark mx-2" onSubmit={handleSubmit}>

                    <Form.Group controlId="formAvatarImage" className="mb-2">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            className="my-input"
                            onChange={handleAvatarImage}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="mb-2">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Firstname"
                            className="my-input"
                            defaultValue={tmpProfile?.firstname}
                            maxLength={20}
                            onChange={(e) => setTmpProfile({ ...tmpProfile!, firstname: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mb-2">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Lastname"
                            className="my-input"
                            defaultValue={tmpProfile?.lastname}
                            maxLength={20}
                            onChange={(e) => setTmpProfile({ ...tmpProfile!, lastname: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mb-2">
                        <Form.Label>Pronouns</Form.Label>
                        <Form.Select
                            className="my-input"
                            defaultValue={tmpProfile?.pronouns}
                            onChange={(e) => setTmpProfile({ ...tmpProfile!, pronouns: e.target.value })}
                        >
                            {pronounOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formBio" className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter bio"
                            className="my-input"
                            defaultValue={tmpProfile?.bio}
                            maxLength={200}
                            onChange={(e) => setTmpProfile({ ...tmpProfile!, bio: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBlogTitle" className="mb-3">
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter Blog Title"
                            className="my-input"
                            defaultValue={blog?.title}
                            maxLength={40}
                            onChange={(e) => setTmpBlog({ ...tmpBlog!, title: e.target.value })}
                        />
                    </Form.Group>

                    <Button variant="secondary" size="lg" type="submit" className="w-100">
                        Save
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default EditProfile;
