import PropTypes from 'prop-types';

import * as S from './styles';

function ProfilePicture({ src, alt }) {
  return <S.Image src={src} width={100} height={100} alt={alt} />;
}

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ProfilePicture.defaultProps = {
  alt: '',
};

export default ProfilePicture;
