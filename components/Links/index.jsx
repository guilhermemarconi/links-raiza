import React, { useState, useEffect } from 'react';

import { query } from '../../services/graphql';
import Link from '../Link';
import * as S from './styles';

function Links() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    query(`
      {
        allLinks {
          edges {
            node {
              links {
                thumbnail
                title
                url
              }
            }
          }
        }
      }
    `)
      .then((content) => {
        try {
          setLinks(content.data.allLinks.edges[0].node.links || []);
        } catch (error) {
          console.error(error);
        }
      })
      .catch(console.error);
  }, []);

  if (!links || !links.length) return null;

  return (
    <S.Wrapper>
      {links.map(({ thumbnail, title, url }, index) => (
        <Link key={index} thumbnail={thumbnail} title={title} url={url} />
      ))}
    </S.Wrapper>
  );
}

export default Links;
