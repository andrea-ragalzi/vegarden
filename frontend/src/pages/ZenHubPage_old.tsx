import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import ProfileSection from '../components/ProfileSection';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState, store } from '../store/store';
import { useSelector } from 'react-redux';
import SidebarLeft from '../components/SidebarLeft';
import { readZBlog, readZProfile, readZSavedArticles } from '../actions/zenHubAction';
import { Blog } from '../types/blogType';
import { Profile } from '../types/profileType';
import { Article } from '../types/articleType';
import SidebarRight from '../components/SidebarRight';

const ZenHubPage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const username = useParams().username?.replace(/-/g, '.');
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const { profile, blog, savedArticles }: { profile: Profile, blog: Blog, savedArticles: Article[] } = useSelector((state: RootState) => state.zenHub);
    const [showMyblog, setShowMyblog] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true);
    const [articles, setArticles] = useState<Article[]>([]);


    useEffect(() => {
        if (showMyblog) {
            setArticles(blog?.articles || []);
        } else {
            setArticles(savedArticles || []);
        }
    }, [showMyblog, blog, savedArticles]);

    useEffect(() => {
        const loadData = async () => {
            if (username === 'me') {
                await dispatch(readZProfile(session.username, session.accessToken));
                await dispatch(readZBlog(session.username, session.accessToken));
                await dispatch(readZSavedArticles(session.username, session.accessToken));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readZProfile(username!, session.accessToken));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readZBlog(username!, session.accessToken));
            }
        }
        setLoadingPage(true);
        loadData();
        setShowMyblog(true);
        setLoadingPage(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    useEffect(() => {
        const loadData = async () => {
            if (username === 'me') {
                await dispatch(readZProfile(session.username, session.accessToken));
                await dispatch(readZBlog(session.username, session.accessToken));
                await dispatch(readZSavedArticles(session.username, session.accessToken));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readZProfile(username!, session.accessToken));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readZBlog(username!, session.accessToken));
            }
        }
        setLoadingPage(true);
        loadData();
        setLoadingPage(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
        <Container fluid className='vh-100 p-0'>
            <Row className='justify-content-center'>
                <Col md={1} lg={1} xl={3}>
                    <SidebarLeft />
                </Col>
                <Col xs={12} md={11} lg={8} xl={6} className='bg-light d-flex justify-content-center align-items-center'>
                    <Row className='mb-5'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Row className='mt-md-0 justify-content-center align-items-center'>
                        <Col className='mb-5 mb-md-5'>
                            {loadingPage ? (
                                <Row className=''>
                                    <Col>
                                        <Spinner animation="border" variant='danger' />
                                    </Col>
                                </Row>
                            ) : (
                                <>
                                    <Row className='w-50 mt-3 justify-content-center'>
                                        <Col>
                                            {profile ?
                                                <ProfileSection profile={profile} blogSize={blog?.articles?.length || 0} />
                                                : (
                                                    <Spinner animation="border" variant='primary' />
                                                )
                                            }
                                        </Col>
                                    </Row>
                                    {(username === 'me' || username === session.username) && (
                                        <Row>
                                            <Col className='d-flex justify-content-evenly'>
                                                <Button className='nav-button' onClick={() => setShowMyblog(true)} >My Blog</Button>
                                                <Button className='nav-button' onClick={() => setShowMyblog(false)} >Saved</Button>
                                            </Col>
                                        </Row>
                                    )}
                                    <Row className='mt-5 mt-md-3 justify-content-center align-items-center'>
                                        <Col className='p-0'>
                                            <h2 className='text-secondary text-center m-0'>{showMyblog ? blog.title : 'Saved Articles'}</h2>
                                            <Feed articles={articles} />
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col xs={12}>
                            <BottomBar />
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className='ps-5'>
                    <SidebarRight />
                </Col>
            </Row>
        </Container >
    );
}

export default ZenHubPage;
