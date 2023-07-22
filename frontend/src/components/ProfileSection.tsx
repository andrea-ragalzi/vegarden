import { Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { Profile } from '../types/profileType';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { PencilOutline } from 'react-ionicons';

const ProfileSection = ({ profile, blogSize }: { profile: Profile, blogSize: number }) => {
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;
    const username = useParams().username;
    const [avatarImageURL, setAvatarImageURL] = useState<string | undefined>('');
    const [loading, setLoading] = useState(true);
    const { session } = useSelector((state: RootState) => state.login);

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
                if (profile.avatarImageURL && currentRoute !== '/edit-profile') {
                    await fetchAvatarImage(getFileNameFromBlobURL(profile.avatarImageURL));
                }
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
                        {currentRoute === '/edit-profile' && profile?.avatarImageURL ?
                            <Image className='avatar' src={profile?.avatarImage ? URL.createObjectURL(profile?.avatarImage) : "https://picsum.photos/120/120"} alt="Avatar"></Image>
                            :
                            <Image className='avatar' src={avatarImageURL} alt="Avatar"></Image>
                        }
                        <p>{profile?.firstname + ' ' + profile?.lastname}</p>
                        <p>@{profile?.owner.username}</p>
                        <p>{profile?.pronouns}</p>
                    </Col>
                    <Col xs={4} className='d-flex flex-column justify-content-evenly align-items-center numbers' /* lg={{ span: 2, order: 2 }} */>
                        <p className='ms-3'>{blogSize} Article</p>
                        <p>123 Zenyter</p>
                        <p>126 Zenyted</p>
                        {(username === 'me' || username === session.username) && (
                            <Button className={currentRoute === '/edit-profile' ? 'disabled' : 'primary'} onClick={() => navigate('/edit-profile')}>
                                <PencilOutline
                                    color={'#ffffff'}
                                    height="35px"
                                    width={'35px'}
                                    onClick={() => { navigate(`/edit-article`) }}
                                />
                            </Button>
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
