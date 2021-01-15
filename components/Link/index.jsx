import PropTypes from 'prop-types';

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
        hasthumb={!!thumbnailUrl}
        target="_blank"
        rel="noopener noreferrer"
        colorText={colorText}
        colorBackground={colorBackground}
      >
        {thumbnailUrl ? (
          <S.Thumb
            src={thumbnailUrl}
            alt={thumbnailAlt || ''}
            width={thumbnailWidth}
            height={thumbnailHeight}
          />
        ) : null}

        {title}
      </S.Anchor>
    </S.Wrapper>
  );
}

Link.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string,
  thumbnailAlt: PropTypes.string,
  thumbnailWidth: PropTypes.number,
  thumbnailHeight: PropTypes.number,
  colorText: PropTypes.string.isRequired,
  colorBackground: PropTypes.string.isRequired,
};

Link.defaultProps = {
  colorText: '#fff',
  colorBackground: '#222',
};

export default Link;
