import Profile from '@/components/Profile';
import SocialLinks from '@/components/SocialLinks';
import Products from '@/components/Products';
import ExtraLinks from '@/components/ExtraLinks';

import { firstData } from '@/lib/content';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/lib/defaults';
import { getData } from '@/lib/getData';

export async function generateMetadata() {
  const profile = firstData((await getData()).profile);
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
      <Profile {...firstData(profile)} />
      <SocialLinks links={firstData(social_links)?.social_links} />
      <Products products={firstData(products)?.products} />
      <ExtraLinks links={firstData(link)?.links} />
    </>
  );
}
