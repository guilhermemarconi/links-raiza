import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

import * as S from './styles';

function ProfileDescription({ content }) {
  return (
    <S.Wrapper>
      <RichText render={content} />
    </S.Wrapper>
  );
}

ProfileDescription.propTypes = {
  content: PropTypes.array,
};

export default ProfileDescription;
