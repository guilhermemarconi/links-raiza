import Image from 'next/image';

import ProfilePicture from '@/components/ProfilePicture';
import ProfileDescription from '@/components/ProfileDescription';
import { DEFAULT_NAME } from '@/lib/defaults';


function Profile({ profile_image, name, description }) {
  return (
    <section aria-label="Perfil" className="relative text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] opacity-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
      >
        <Image
          src="/fundacao-01.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {profile_image?.url ? (
        <ProfilePicture src={profile_image.url} alt={profile_image.alt ?? ''} />
      ) : null}

      <h1 className="mt-6 mb-4 font-heading font-semibold text-5xl">{name || DEFAULT_NAME}</h1>

      {description?.length ? <ProfileDescription content={description} /> : null}
    </section>
  );
}

export default Profile;
