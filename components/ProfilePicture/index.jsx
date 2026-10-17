import Image from 'next/image';

function ProfilePicture({ src, alt }) {
  return (
    <Image
      src={src}
      width={100}
      height={100}
      alt={alt}
      priority
      className="block size-[100px] mx-auto rounded-full object-cover"
    />
  );
}

export default ProfilePicture;
