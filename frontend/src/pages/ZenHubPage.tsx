import { Container, Row, Col } from 'react-bootstrap';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import Profile from '../components/ProfileSection';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMyProfile, fetchSelectedProfile } from '../actions/profileAction';
import { RootState, store } from '../store/store';
import { useSelector } from 'react-redux';
import { fetchBlog } from '../actions/blogAction';

const ZenHubPage = () => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const { session, loggedIn } = useSelector((state: RootState) => state.login);
    const blog = useSelector((state: RootState) => state.blog.myBlog);
    const username = useParams().username?.replace(/-/g, '.');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loggedIn) {
            return;
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (username === 'me') {
                    await dispatch(fetchMyProfile(session.username, session.accessToken));
                    await dispatch(fetchBlog(session.username, session.accessToken));
                } else {
                    await dispatch(fetchSelectedProfile(username!, session.accessToken));
                    await dispatch(fetchBlog(username!, session.accessToken));
                }
                // Imposta lo stato di caricamento su false quando i dati sono pronti
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                // Imposta lo stato di caricamento su false in caso di errore
                setLoading(false);
            }
        };
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row className='row row-cols-1 justify-content-center align-items-center gx-0 mx-0 px-0 py-5'>
                <Col className='mb-4'>
                    <TopBar />
                </Col>
                {loading ? (
                    <Col className='text-center'>
                        <p>Loading...</p>
                    </Col>
                ) : (
                    <>
                        <Col>
                            <Profile username={username || 'me'} />
                        </Col>
                        {username === 'me' && (
                            <Col className='d-flex justify-content-evenly mb-2'>
                                <NavLink className='text-decoration-none' to="/zenhub">My Blog</NavLink>
                                <NavLink className='text-decoration-none' to="/zenhub">Saved</NavLink>
                            </Col>
                        )}
                        <Col className='d-flex justify-content-center'>
                            <h2 className='text-secondary mb-2'>{blog?.title}</h2>
                        </Col>
                        <Col>
                            <Feed articles={blog?.articles || []} />
                        </Col>
                    </>
                )}
                <Col>
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default ZenHubPage;

