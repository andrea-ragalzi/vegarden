import Card from 'react-bootstrap/Card';
import { Row, Col, Image, Button } from 'react-bootstrap/';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookmarkOutline } from 'react-ionicons';
import { Article } from "../types/articleType";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ArticleDescription = ({ article }: { article: Article }) => {
    const navigate = useNavigate();
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
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
        if (article.coverImageURL) {
            fetchCoverImage(getFileNameFromBlobURL(article.coverImageURL));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article, loggedIn]);

    return (
        <Card className='articlePreview'>
            <Row className="justify-content-center align-items-center px-2 mb-1">
                <Col xs={2}>
                    <Link to={`/zenhub/${article.blog?.owner.username}`}>
                        <Image className='rounded-circle' src="https://picsum.photos/30/30" alt="Avatar"></Image>
                    </Link>
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
