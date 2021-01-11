import PropTypes from 'prop-types';

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

Profile.propTypes = {
  profile_image: PropTypes.exact({
    url: PropTypes.string,
    alt: PropTypes.string,
    copyright: PropTypes.string,
    dimensions: PropTypes.exact({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
  description: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.string,
      text: PropTypes.string,
      spans: PropTypes.array,
    })
  ),
};

export default Profile;
