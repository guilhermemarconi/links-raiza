import { RichText } from 'prismic-reactjs';

import './styles.css';

function ProfileDescription({ content }) {
  return (
    <div className="description">
      <RichText render={content} />
    </div>
  );
}

export default ProfileDescription;
