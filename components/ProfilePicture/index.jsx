function ProfilePicture({ src, alt }) {
  return (
    <img
      src={src}
      width={100}
      height={100}
      alt={alt}
      className="block size-[100px] mx-auto rounded-full"
    />
  );
}

export default ProfilePicture;
