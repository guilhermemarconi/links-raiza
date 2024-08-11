import Head from 'next/head';

import { PrismicPreview } from '@prismicio/next';

import { GlobalStyle } from '../styles/globalStyles';
import Profile from '../components/Profile';
import Links from '../components/Links';
import { getAllData } from '../services/prismic';
import { createClient } from '../prismicio';

function Home({ layout, links, profile }) {
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
      <PrismicPreview repositoryName='linksraiza' />
    </>
  );
}

export default Home;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })
  try {
    const { layout, link, profile } = await getAllData(client);
    return {
      props: {
        layout: layout[0].data,
        profile: profile[0].data,
        links: link[0].data.links,
      }
    }
  } catch (error) {
    console.error(error);
  }
}
