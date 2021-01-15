import PropTypes from 'prop-types';

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

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
        copyright: PropTypes.string,
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
    })
  ),
  linksColorText: PropTypes.string,
  linksColorBackground: PropTypes.string,
};

Links.defaultProps = {
  links: [],
};

export default Links;
