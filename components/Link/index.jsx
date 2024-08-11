import * as S from './styles';

function Link({
  title,
  url,
  thumbnailUrl,
  thumbnailAlt,
  thumbnailWidth,
  thumbnailHeight,
  colorText,
  colorBackground,
}) {
  if (!title && !url) return null;

  return (
    <S.Wrapper>
      <S.Anchor
        href={url}
        $hasthumb={!!thumbnailUrl}
        target="_blank"
        rel="noopener noreferrer"
        $colorText={colorText}
        $colorBackground={colorBackground}
      >
        {thumbnailUrl ? (
          <S.Thumb
            src={thumbnailUrl}
            alt={thumbnailAlt}
            width={thumbnailWidth}
            height={thumbnailHeight}
          />
        ) : null}

        {title}
      </S.Anchor>
    </S.Wrapper>
  );
}

export default Link;
