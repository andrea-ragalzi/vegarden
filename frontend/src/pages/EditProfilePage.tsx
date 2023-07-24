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
import EditProfile from '../components/EditProfile';

const EditProfilePage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
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

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await dispatch(readZProfile(session.username!, session.accessToken));
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await dispatch(readZBlog(session.username!, session.accessToken));
        }
        setLoadingPage(true);
        loadData();
        setShowMyblog(true);
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
            <Row className='justify-content-center m-0 p-0'>
                <Col md={1} lg={1} xl={3}>
                    <SidebarLeft />
                </Col>
                <Col xs={12} md={11} lg={8} xl={6} className='bg-light d-flex justify-content-center align-items-center'>
                    <Row className='mb-5'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    <Row className='mt-3 mt-md-0 justify-content-center align-items-center mb-5 pb-5'>
                        <Col className='p-0'>
                            {loadingPage ? (
                                <Row className='mt-3 mb-5 pb-3'>
                                    <Col>
                                        <Spinner animation="border" variant='danger' />
                                    </Col>
                                </Row>
                            ) : (
                                <>
                                    <Row className='mt-3 mt-md-0'>
                                        <Col>
                                            {profile ?
                                                <EditProfile />
                                                : (
                                                    <Spinner animation="border" variant='primary' />
                                                )
                                            }
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
            </Row>
        </Container >
    );
}

export default EditProfilePage;
