import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import { HomeOutline, SearchOutline, FilterOutline, NotificationsOutline, PaperPlaneOutline, AddOutline } from "react-ionicons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, store } from "../store/store";
import { readAllZenytes } from "../actions/zenyteAction";
import { Zenyte } from "../types/zenyteType";

const SidebarRight = () => {
    const dispatch = store.dispatch;
    const allZenytes = useSelector((state: RootState) => state.zenyte.allZenytes);
    const session = useSelector((state: RootState) => state.login.session);
    const [suggested, setSuggested] = useState<Zenyte[]>([]);
    const [searchResults, setSearchResults] = useState<Zenyte[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const results = allZenytes?.filter(
            (zenyte) => zenyte.username.toLowerCase().startsWith(searchTerm)
        );
        setSearchResults(results || []);
        setIsSearching(searchTerm.length > 0);
        console.log(results);
    };

    useEffect(() => {
        const loadData = async () => {
            await dispatch(readAllZenytes(session.accessToken));
        };
        const randomSort = (array: Zenyte[]) => {
            const seed = session.username.length;
            return array.sort(() => seed - Math.random());
        };
        loadData();
        setSuggested(randomSort(allZenytes || []));
    }, []);

    return (
        <>
            <Row className='row-cols-1 side-bar-right'>
                <Col className="right-element search-bar">
                    <div className="d-flex justify-content-center">
                        <SearchOutline
                            color={'#000000'}
                            height="35px"
                            width={'35px'}
                        />
                        <Form>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                        </Form>
                    </div>
                </Col>
                {isSearching ? (
                    <Col className="right-element suggested">
                        {searchResults.length > 0 ? (
                            <>
                                <p>Search Results</p>
                                {searchResults.map((zenyte, index) => (
                                    <Link to={`/zenhub/${zenyte.username.replace(/\./g, '-')}`} key={index}>
                                        <p className="text-dark">{zenyte.username}</p>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <p>No results found</p>
                        )}
                    </Col>
                ) : (
                    <Col className="right-element suggested">
                        <p>Suggested Zenytes</p>
                        {suggested.map((zenyte, index) => (
                            zenyte.username !== session.username ? (
                                <Link to={`/zenhub/${zenyte.username.replace(/\./g, '-')}`} key={index}>
                                    <p className="text-dark">{zenyte.username}</p>
                                </Link>
                            ) : null
                        ))}
                    </Col>
                )}
                <Col className="right-element footer">
                    <Row className="mb-4">
                        <Col className="d-flex flex-column">
                            <p>About</p>
                            <p>Help</p>
                        </Col>
                        <Col className="d-flex flex-column">
                            <p>Privacy</p>
                            <p> Terms</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-column">
                            <p>© 2023 Vegarden</p>
                        </Col>
                    </Row>
                </Col >
            </Row >
        </>
    )
};

export default SidebarRight;
