import Profile from '@/components/Profile';
import SocialLinks from '@/components/SocialLinks';
import Products from '@/components/Products';
import Links from '@/components/Links';

import { getAllData } from '@/services/prismic';
import { createClient } from '@/prismicio';

const DEFAULT_TITLE = 'Raíza Souto | Links';
const DEFAULT_DESCRIPTION = 'Aqui você encontra todos os links para estarmos sempre juntos!';

const getData = async () => getAllData(createClient());

export async function generateMetadata() {
  const profile = (await getData()).profile?.[0]?.data;
  const title = profile?.meta_title || DEFAULT_TITLE;
  const description = profile?.meta_description || DEFAULT_DESCRIPTION;
  const shareImage = profile?.meta_image?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(shareImage ? { images: [{ url: shareImage }] } : {}),
    },
  };
}

export default async function Page() {
  const { profile, products, social_links, link } = await getData();

  return (
    <>
      <Profile {...profile?.[0]?.data} />
      <SocialLinks links={social_links?.[0]?.data.social_links} />
      <Products products={products?.[0]?.data.products} />
      <Links links={link?.[0]?.data.links} />
    </>
  );
}
