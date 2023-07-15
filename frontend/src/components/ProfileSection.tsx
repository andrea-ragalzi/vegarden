import { Row, Col, Image, Button } from 'react-bootstrap';
import { Profile } from '../types/profileType';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProfileSection = ({ profile, blogSize }: { profile: Profile, blogSize: number }) => {
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;
    const [avatarImageURL, setAvatarImageURL] = useState<string | undefined>(undefined);

    const fetchAvatarImage = async (filename: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/uploads/avatar_images/${filename}`);
            if (response.ok) {
                const imageBlob = await response.blob();
                const imageURL = URL.createObjectURL(imageBlob);
                setAvatarImageURL(imageURL);
                console.log(imageURL);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getFileNameFromBlobURL = (blobURL: string) => {
            const splitURL = blobURL.split('/');
            return splitURL[splitURL.length - 1];
        };
        const loadData = async () => {
            if (profile.avatarImageURL && currentRoute !== '/edit-profile') {
                await fetchAvatarImage(getFileNameFromBlobURL(profile.avatarImageURL));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className='justify-content-center gx-0 mx-2 justify-content-center align-items-center text-black mt-4 mt-md-0'>
                <Col xs={6} md={{ span: 2, order: 0 }}>
                    {currentRoute === '/edit-profile' ?
                        <Image className='rounded-circle mb-1 avatar' src={profile?.avatarImage ? URL.createObjectURL(profile?.avatarImage) : "https://picsum.photos/120/120"} alt="Avatar"></Image>
                        :
                        <Image className='rounded-circle mb-1 avatar' src={avatarImageURL ? avatarImageURL : "https://picsum.photos/120/120"} alt="Avatar"></Image>
                    }
                    <p className='mb-0 ms-2'>{profile?.firstname + ' ' + profile?.lastname}</p>
                    <p className='mb-0 ms-2'>@{profile?.owner.username}</p>
                    <p className='ms-2'>{profile?.pronouns}</p>
                </Col>
                <Col xs={4} md={{ span: 2, order: 2 }}>
                    <p>{blogSize} Article</p>
                    <p>123 Zenyter</p>
                    <p>126 Zenyted</p>
                    <Button className={currentRoute === '/edit-profile' ? 'disabled' : 'primary'} onClick={() => navigate('/edit-profile')}>
                        Edit
                    </Button>
                </Col>
                <Col xs={12} md={{ span: 8, order: 1 }}>
                    <p>{profile?.bio}</p>
                </Col>
            </Row>
        </>
    );
}

export default ProfileSection;
