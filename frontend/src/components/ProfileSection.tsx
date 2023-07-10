import { Row, Col, Image } from 'react-bootstrap';
import { Profile } from '../types/profileType';

const ProfileSection = ({ profile, blogSize }: { profile: Profile, blogSize: number }) => {
    return (
        <>
            <Row className='justify-content-center gx-0 mx-2 text-black'>
                <Col xs={8}>
                    <Image className='rounded-circle mb-1' src="https://picsum.photos/120/120" alt="Avatar"></Image>
                    <p className='mb-0 ms-2'>{profile?.firstname + ' ' + profile?.lastname}</p>
                    <p className='mb-0 ms-2'>@{profile?.owner.username}</p>
                    <p className='ms-2'>{profile?.pronouns}</p>
                </Col>
                <Col xs={4} className='mt-4'>
                    <p>{blogSize} Article</p>
                    <p>123 Zenyter</p>
                    <p>126 Zenyted</p>
                </Col>
            </Row>
            <Row className='text-black'>
                <Col>
                    <p>{profile?.bio}</p>
                </Col>
            </Row>
        </>
    );
}

export default ProfileSection;
