import Card from 'react-bootstrap/Card';
import { Row, Col, Image, Button, Spinner } from 'react-bootstrap/';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookmarkOutline } from 'react-ionicons';
import { Article } from "../types/articleType";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { readProfile } from '../actions/profileAction';
import { Profile } from '../types/profileType';

const ArticleDescription = ({ article }: { article: Article }) => {
    const dispatch = store.dispatch;
    const { session } = useSelector((state: RootState) => state.login);
    const profileState = useSelector((state: RootState) => state.profile);
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const [avatarImageURL, setAvatarImageURL] = useState<string | undefined>(undefined);
    const [coverImageURL, setCoverImageURL] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const getFileNameFromBlobURL = (blobURL: string) => {
        const splitURL = blobURL.split('/');
        return splitURL[splitURL.length - 1];
    };

    const fetchCoverImage = async (filename: string) => {
        console.log(filename);
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

    const fetchAvatarImage = async (filename: string) => {
        console.log(filename);
        try {
            const response = await fetch(`http://localhost:8080/api/uploads/avatar_images/${filename}`);
            if (response.ok) {
                const imageBlob = await response.blob();
                const imageURL = URL.createObjectURL(imageBlob);
                setAvatarImageURL(imageURL);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            if (article?.author) {
                console.log("Username:", article.author.username);
                await dispatch(readProfile(article.author.username, session.accessToken));
            }

            if (article?.coverImageURL) {
                fetchCoverImage(getFileNameFromBlobURL(article.coverImageURL));
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (profileState.profile?.owner.username === article.author.username) {
            setProfile(profileState.profile);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileState.profile?.owner.username]);

    useEffect(() => {
        if(profile?.owner.username === article.author.username) {
            fetchAvatarImage(getFileNameFromBlobURL(profile.avatarImageURL!));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    return (
        <Card className='articlePreview'>
            <Row className="justify-content-center align-items-center px-2 mb-1">
                <Col xs={2}>
                    {avatarImageURL ? (
                        <Link to={`/zenhub/${article.author.username}`}>
                            <Image className='rounded-circle avatar-mini' src={avatarImageURL} alt="A"></Image>
                        </Link>
                    ) : (
                        <Spinner variant='primary' />
                    )}
                </Col>
                <Col xs={8}>
                    <Card.Header className='border-0 bg-white'>{article.title}</Card.Header>
                </Col>
                <Col xs={2}>
                    <BookmarkOutline
                        color={'#000000'}
                        height={'25px'}
                        width={'25px'}
                        onClick={() => alert('Hi!')}
                    />
                </Col>
            </Row>
            <Card.Img className='rounded-0' src={coverImageURL} />
            <Card.Body>
                <Card.Text>
                    {article.description}
                </Card.Text>
                <NavLink to={`/article/${article.id}`}>
                    <Button variant="link" className='read-more'>Read Article</Button>
                </NavLink>
            </Card.Body>
        </Card>
    );
}

export default ArticleDescription;
