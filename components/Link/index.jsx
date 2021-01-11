import PropTypes from 'prop-types';

import * as S from './styles';

function Link({ title, url, thumbnail }) {
  return (
    <S.Wrapper>
      <S.Anchor
        href={url}
        hasthumb={!!thumbnail}
        target="_blank"
        rel="noopener noreferrer"
      >
        {thumbnail ? (
          <S.Thumb src={thumbnail.url} alt={thumbnail.alt || ''} />
        ) : null}

        {title}
      </S.Anchor>
    </S.Wrapper>
  );
}

Link.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    copyright: PropTypes.string,
    dimensions: PropTypes.exact({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
};

export default Link;
