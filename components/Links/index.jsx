import Link from '../Link';
import * as S from './styles';

function Links({ links, linksColorText, linksColorBackground }) {
  if (!links || !links.length) return null;

  return (
    <S.Wrapper>
      {links.map(({ thumbnail, title, url }, index) => (
        <Link
          key={index}
          thumbnailUrl={thumbnail?.url}
          thumbnailAlt={thumbnail?.alt}
          thumbnailWidth={thumbnail?.dimensions?.width}
          thumbnailHeight={thumbnail?.dimensions?.height}
          title={title}
          url={url}
          colorText={linksColorText}
          colorBackground={linksColorBackground}
        />
      ))}
    </S.Wrapper>
  );
}

export default Links;
