import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import ProfileSection from '../components/ProfileSection';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readProfile } from '../actions/profileAction';
import { RootState, store } from '../store/store';
import { useSelector } from 'react-redux';
import { readBlog } from '../actions/blogAction';
import Sidebar from '../components/Sidebar';
import { readSavedArticles } from '../actions/articleAction';

const ZenHubPage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const username = useParams().username?.replace(/-/g, '.');
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const { profile } = useSelector((state: RootState) => state.profile);
    const { blog } = useSelector((state: RootState) => state.blog);
    const { savedArticles } = useSelector((state: RootState) => state.article);
    const [showMyblog, setShowMyblog] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (username === 'me') {
                dispatch(readProfile(session.username, session.accessToken));
            } else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                dispatch(readProfile(username!, session.accessToken));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMyblog]);

    useEffect(() => {
        const loadData = async () => {
            if (username === 'me') {
                await dispatch(readBlog(session.username, session.accessToken));
                await dispatch(readSavedArticles(session.username, session.accessToken));
                await dispatch(readProfile(session.username, session.accessToken));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readBlog(username!, session.accessToken));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readProfile(username!, session.accessToken));
            }
        }
        loadData();
        setShowMyblog(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    useEffect(() => {
        const loadData = async () => {
            if (username === 'me') {
                await dispatch(readBlog(session.username, session.accessToken));
                await dispatch(readSavedArticles(session.username, session.accessToken));
                await dispatch(readProfile(session.username, session.accessToken));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readBlog(username!, session.accessToken));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await dispatch(readProfile(username!, session.accessToken));
            }
        }
        loadData();
        setShowMyblog(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
        <Container fluid className='vh-100 m-0 p-0'>
            <Row className='justify-content-center'>
                <Col xs={1}>
                    <Sidebar />
                </Col>
                <Col xs={11}>
                    <Row className='mb-5 mb-md-4'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
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
                            <Col className='d-flex justify-content-evenly mb-2'>
                                <Button className='text-decoration-none' onClick={() => setShowMyblog(true)} >My Blog</Button>
                                <Button className='text-decoration-none' onClick={() => setShowMyblog(false)} >Saved</Button>
                            </Col>
                        </Row>
                    )}
                    < Row >
                        {
                            blog?.articles?.length ? (
                                <Col className='text-center'>
                                    <h2 className='text-secondary mb-2'>{showMyblog ? blog?.title : 'Saved Articles'}</h2>
                                    <Feed articles={showMyblog ? blog?.articles || [] : savedArticles || []} />
                                </Col>
                            ) :
                                (
                                    <Spinner variant='primary' />
                                )
                        }
                    </Row>
                    <Row>
                        <Col>
                            <BottomBar />
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    );
}

export default ZenHubPage;
