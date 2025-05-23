import Profile from '@/components/Profile';
import Links from '@/components/Links';

import { getAllData } from '@/services/prismic';
import { createClient } from '@/prismicio';

export default async function Page() {
  const client = createClient();
  const _allData = await getAllData(client);
  const links = _allData.link[0].data.links;
  const profile = _allData.profile[0].data;

  return (
    <>
      <Profile {...profile} />
      <Links
        links={links}
      />
    </>
  );
}
