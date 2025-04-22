import ProfilePicture from '@/components/ProfilePicture';
import ProfileDescription from '@/components/ProfileDescription';

function Profile({ profile_image, title, description }) {
  if (!profile_image && !description) return null;

  return (
    <section aria-label="Perfil" className="[&>p]:my-4 [& strong]:font-bold [& em]:italic">
      {profile_image ? (
        <ProfilePicture src={profile_image.url} alt={profile_image.alt} />
      ) : null}

      {!!title && <h1 className="mb-6 font-bold text-6xl">{title}</h1>}

      {description ? <ProfileDescription content={description} /> : null}
    </section>
  );
}

export default Profile;
