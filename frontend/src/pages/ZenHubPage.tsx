import { Container, Row, Col, Spinner } from 'react-bootstrap';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import ProfileSection from '../components/ProfileSection';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMyProfile, fetchSelectedProfile } from '../actions/profileAction';
import { RootState, store } from '../store/store';
import { useSelector } from 'react-redux';
import { fetchBlog } from '../actions/blogAction';
import Sidebar from '../components/Sidebar';
import { Blog } from '../types/blogType';
import { Profile } from '../types/profileType';

const ZenHubPage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const profileState = useSelector((state: RootState) => state.profile);
    const blogState = useSelector((state: RootState) => state.blog);
    const username = useParams().username?.replace(/-/g, '.');
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog | undefined>(undefined);
    const [profile, setProfile] = useState<Profile | undefined>(undefined);


    useEffect(() => {
        const loadData = async () => {
            try {
                if (username === 'me') {
                    await dispatch(fetchMyProfile(session.username, session.accessToken));
                    await dispatch(fetchBlog(session.username, session.accessToken));
                    setProfile(profileState.myProfile);
                    setBlog(blogState.myBlog);
                } else {
                    await dispatch(fetchSelectedProfile(username!, session.accessToken));
                    await dispatch(fetchBlog(username!, session.accessToken));
                    setProfile(profileState.selectedProfile);
                    setBlog(blogState.selectedBlog);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        if (loggedIn) {
            loadData();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid className='vh-100'>
            <Row>
                <Col xs={1}>
                    <Sidebar />
                </Col>
                <Col xs={11}>
                    <Row className='mb-5'>
                        <Col>
                            <TopBar />
                        </Col>
                    </Row>
                    {loading ? (
                        <Row>
                            <Col>
                                <Spinner variant='primary' animation='border' className='m-auto' />
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row>
                                <Col>
                                    <ProfileSection profile={profile!} blogSize={blog?.articles?.length || 0} />
                                </Col>
                            </Row>
                            {username === 'me' && (
                                <Row>
                                    <Col className='d-flex justify-content-evenly mb-2'>
                                        <NavLink className='text-decoration-none' to="/zenhub">My Blog</NavLink>
                                        <NavLink className='text-decoration-none' to="/zenhub">Saved</NavLink>
                                    </Col>
                                </Row>
                            )}
                        </>
                    )}
                    <Row>
                        <Col className='text-center'>
                            <h2 className='text-secondary mb-2'>{blog?.title}</h2>
                            <Feed articles={blog?.articles || []} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BottomBar />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ZenHubPage;
