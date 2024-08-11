import ProfilePicture from '../ProfilePicture';
import ProfileDescription from '../ProfileDescription';
import * as S from './styles';

function Profile({ profile_image, description }) {
  if (!profile_image && !description) return null;

  return (
    <S.Wrapper>
      {profile_image ? (
        <ProfilePicture src={profile_image.url} alt={profile_image.alt} />
      ) : null}

      {description ? <ProfileDescription content={description} /> : null}
    </S.Wrapper>
  );
}

export default Profile;
