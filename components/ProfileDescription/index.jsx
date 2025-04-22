import { RichText } from 'prismic-reactjs';

function ProfileDescription({ content }) {
  return (
    <div>
      <RichText render={content} />
    </div>
  );
}

export default ProfileDescription;
