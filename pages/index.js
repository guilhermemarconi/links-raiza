import PropTypes from 'prop-types';
import Head from 'next/head';

import { GlobalStyle } from '../styles/globalStyles';
import Profile from '../components/Profile';
import Links from '../components/Links';

import { query } from '../services/graphql';

function Home({ profile, links, layout }) {
  return (
    <>
      <Head>
        <title>Raíza Souto | Links</title>
        <meta
          name="description"
          content="Aqui você encontra todos os links para estarmos sempre juntos!"
        />
      </Head>
      <GlobalStyle
        backgroundImage={layout.page_background_image?.url}
        backgroundColor={layout.page_background_color}
      />
      <Profile {...profile} />
      <Links
        links={links}
        linksColorText={layout.links_color_text}
        linksColorBackground={layout.links_color_background}
      />
    </>
  );
}

Home.propTypes = {
  profile: PropTypes.object,
  links: PropTypes.array,
  layout: PropTypes.object,
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
        allLayouts {
          edges {
            node {
              page_background_image
              page_background_color
              links_color_background
              links_color_text
            }
          }
        }
      }
    `);

    return {
      props: {
        profile: content.data.allProfiles.edges[0].node,
        links: content.data.allLinks.edges[0].node.links,
        layout: content.data.allLayouts.edges[0].node,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
