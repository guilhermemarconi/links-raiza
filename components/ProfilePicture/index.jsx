import * as S from './styles';

function ProfilePicture({ src, alt }) {
  return <S.Image src={src} width={100} height={100} alt={alt} />;
}

export default ProfilePicture;
