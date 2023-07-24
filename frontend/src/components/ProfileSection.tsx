import { Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { Profile } from '../types/profileType';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { PencilOutline, PersonAddOutline, PersonRemoveOutline } from 'react-ionicons';
import { Follower } from '../types/followerType';
import { createFollower, deleteFollower, readFollower } from '../actions/followerAction';
import { Zenyte } from '../types/zenyteType';
import classNames from 'classnames';
import defaultAvatarImage from '../assets/default_avatar.jpeg';

const ProfileSection = ({ profile, blogSize }: { profile: Profile, blogSize: number }) => {
    const dispatch = store.dispatch;
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;
    const username = useParams().username?.replace(/-/g, '.') as string;
    const [avatarImageURL, setAvatarImageURL] = useState<string | undefined>('');
    const [loading, setLoading] = useState(true);
    const { session } = useSelector((state: RootState) => state.login);
    const [loadingFollower, setLoadingFollower] = useState(false);
    const zenyte = useSelector((state: RootState) => state.zenyte.zenyte) as Zenyte;
    const [follower, setFollower] = useState<Follower>({ follower: zenyte, followed: zenyte });
    const [zenyted, setZenyted] = useState(false);
    const followerState = useSelector((state: RootState) => state.follower);
    const isEditProfileRoute = location.pathname === "/edit-profile";

    const readZenyted = async () => {
        try {
            let usernameToSearch = '';
            username === 'me' ? usernameToSearch = session.username : usernameToSearch = username;
            const response = await fetch(`http://localhost:8080/api/zenytes/${usernameToSearch}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFollower({ follower: zenyte, followed: data });
            } else {
                throw new Error("Failed reading zenyte");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred reading zenyte.");
            }
        }
    }

    const handleFollower = async () => {
        setLoadingFollower(true);
        if (zenyted) {
            await dispatch(deleteFollower(follower, session.accessToken));
            setZenyted(false);
        } else {
            await dispatch(createFollower(follower, session.accessToken));
            setZenyted(true);
        }
        await dispatch(readFollower(session.username, username || '', session.accessToken));
        setLoadingFollower(false);
    }

    useEffect(() => {
        setZenyted(followerState.exists ? followerState.exists : false);
    }, [followerState.exists]);

    const fetchAvatarImage = async (filename: string) => {
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
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            URL.revokeObjectURL(avatarImageURL!);
        };
    }, [avatarImageURL]);


    useEffect(() => {
        const getFileNameFromBlobURL = (blobURL: string) => {
            const splitURL = blobURL.split('/');
            return splitURL[splitURL.length - 1];
        };

        const loadData = async () => {
            if (profile !== null) {
                if (profile.avatarImageURL) {
                    await fetchAvatarImage(getFileNameFromBlobURL(profile.avatarImageURL));
                } else {
                    setAvatarImageURL(defaultAvatarImage);
                }
            }
            if (username !== 'me' && username !== undefined) {
                readZenyted();
                await dispatch(readFollower(session.username, username, session.accessToken));
            }
        }
        setLoading(true);
        loadData();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    if (loading) {
        return (
            <Row className='justify-content-center align-items-center'>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant='danger' />
                </Col>
            </Row>
        );
    } else {
        return (
            <>
                <Row className='w-100 justify-content-center align-items-center mt-md-0 profile'>
                    <Col xs={8} className='d-flex flex-column justify-content-between info' /* lg={{ span: 2, order: 0 }} */>
                        {isEditProfileRoute ?
                            <Image className='avatar' src={profile?.avatarImage ? URL.createObjectURL(profile.avatarImage) : avatarImageURL} alt="Avatar"></Image>
                            :
                            <Image className='avatar' src={avatarImageURL} alt="Avatar"></Image>
                        }
                        <p>{profile?.firstname + ' ' + profile?.lastname}</p>
                        <p>@{profile?.owner.username}</p>
                        <p>{profile?.pronouns}</p>
                    </Col>
                    <Col xs={4} className="d-flex flex-column justify-content-evenly align-items-center numbers">
                        <p>{blogSize} Article</p>
                        <p>{profile.followers} Zenyter</p>
                        <p>{profile.followeds} Zenyted</p>
                        {isEditProfileRoute ? (
                            <Button
                                className={classNames("v-button", { disable: isEditProfileRoute })}
                                onClick={() => navigate("/edit-profile")}
                                disabled={isEditProfileRoute}
                            >
                                <PencilOutline
                                    color={"#ffffff"}
                                    height="35px"
                                    width={"35px"}
                                />
                            </Button>
                        ) : (
                            (username === "me" || username === session.username) ? (
                                <Button
                                    className={classNames("v-button", { disable: isEditProfileRoute })}
                                    onClick={() => navigate("/edit-profile")}
                                    disabled={isEditProfileRoute}
                                >
                                    <PencilOutline
                                        color={"#ffffff"}
                                        height="35px"
                                        width={"35px"}
                                    />
                                </Button>
                            ) : (
                                zenyted ? (
                                    <Button
                                        className={classNames("v-button", { liked: zenyted })}
                                        onClick={handleFollower}
                                        disabled={loadingFollower}
                                    >
                                        <PersonRemoveOutline
                                            color={"#ffffff"}
                                            height="35px"
                                            width={"35px"}
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        className={classNames("v-button", { liked: zenyted })}
                                        onClick={handleFollower}
                                        disabled={loadingFollower}
                                    >
                                        <PersonAddOutline
                                            color={"#ffffff"}
                                            height="35px"
                                            width={"35px"}
                                        />
                                    </Button>
                                )
                            )
                        )}
                    </Col>
                    <Col xs={12} className='bio' /* lg={{ span: 8, order: 1 }} */>
                        <p>{profile?.bio}</p>
                    </Col>
                </Row>
            </>
        );
    }
}

export default ProfileSection;
