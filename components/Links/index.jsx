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
          thumbnail={thumbnail}
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
      thumbnail: PropTypes.exact({
        url: PropTypes.string,
        alt: PropTypes.string,
        copyright: PropTypes.string,
        dimensions: PropTypes.exact({
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
  linksColorText: '#fff',
  linksColorBackground: '#222',
};

export default Links;
