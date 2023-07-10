import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Image, Button } from 'react-bootstrap/';
import { Link, NavLink } from 'react-router-dom';
import { BookmarkOutline } from 'react-ionicons';
import { Article } from "../types/articleType";

const ArticlePreview = ({ article }: { article: Article }) => {
    return (
        <Card className='articlePreview px-sm-2'>
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
            <Card.Img className='rounded-0' src="https://picsum.photos/120/120" />
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

export default ArticlePreview;
