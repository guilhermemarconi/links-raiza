import { RichText } from 'prismic-reactjs';

import * as S from './styles';

function ProfileDescription({ content }) {
  return (
    <S.Wrapper>
      <RichText render={content} />
    </S.Wrapper>
  );
}

export default ProfileDescription;
