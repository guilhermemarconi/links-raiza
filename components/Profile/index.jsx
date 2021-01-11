import React, { useState, useEffect } from 'react';

import { query } from '../../services/graphql';
import ProfilePicture from '../ProfilePicture';
import ProfileDescription from '../ProfileDescription';
import * as S from './styles';

function Profile() {
  const [data, setData] = useState({});

  useEffect(() => {
    query(`
      {
        allProfiles {
          edges {
            node {
              profile_image
              description
            }
          }
        }
      }
    `)
      .then((content) => {
        try {
          setData(content.data.allProfiles.edges[0].node);
        } catch (error) {
          console.error(error);
        }
      })
      .catch(console.error);
  }, []);

  if (!data || (!data.profile_image && !data.description)) return null;

  return (
    <S.Wrapper>
      {data.profile_image ? (
        <ProfilePicture
          src={data.profile_image.url}
          alt={data.profile_image.alt}
        />
      ) : null}

      {data.description ? (
        <ProfileDescription content={data.description} />
      ) : null}
    </S.Wrapper>
  );
}

export default Profile;
