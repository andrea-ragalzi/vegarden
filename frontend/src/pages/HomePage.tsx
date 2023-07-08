import { useEffect } from 'react';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { Container, Row, Col } from 'react-bootstrap';
import { fecthTrendArticles } from '../actions/articleAction';

const HomePage = () => {
    const dispatch = store.dispatch;
    const accessToken = useSelector((state: RootState) => state.login.session.accessToken);
    const { trendArticles, loading, error } = useSelector((state: RootState) => state.article);
    useEffect(() => {
        dispatch(fecthTrendArticles(accessToken));
        console.log(trendArticles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Row className='row row-cols-1 justify-content-center align-items-center gx-0 mx-0 px-0 py-5'>
                <Col className='mb-4'>
                    <TopBar />
                </Col>
                <Col>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        error ? (
                            <p>{error}</p>
                        ) : (
                            <Feed articles={trendArticles} />
                        )
                    )}
                </Col>
                <Col>
                    <BottomBar />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
