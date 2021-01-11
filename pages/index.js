import PropTypes from 'prop-types';

import { GlobalStyle } from '../styles/globalStyles';
import Profile from '../components/Profile';
import Links from '../components/Links';

import { query } from '../services/graphql';

function Home({ profile, links }) {
  return (
    <>
      <GlobalStyle />
      <Profile {...profile} />
      <Links links={links} />
    </>
  );
}

Home.propTypes = {
  profile: PropTypes.object,
  links: PropTypes.array,
};

export default Home;

export async function getStaticProps() {
  try {
    const content = await query(`
      {
        allProfiles {
          edges {
            node {
              profile_image
              description
            }
          }
        }
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
    `);

    return {
      props: {
        profile: content.data.allProfiles.edges[0].node,
        links: content.data.allLinks.edges[0].node.links,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
