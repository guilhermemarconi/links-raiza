import PropTypes from 'prop-types';

import Link from '../Link';
import * as S from './styles';

function Links({ links }) {
  if (!links || !links.length) return null;

  return (
    <S.Wrapper>
      {links.map(({ thumbnail, title, url }, index) => (
        <Link key={index} thumbnail={thumbnail} title={title} url={url} />
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
};

Links.defaultProps = {
  links: [],
};

export default Links;
