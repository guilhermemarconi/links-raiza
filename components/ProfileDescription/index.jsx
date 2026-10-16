import { PrismicRichText } from '@prismicio/react';

import './styles.css';

function ProfileDescription({ content }) {
  return (
    <div className="description">
      <PrismicRichText field={content} />
    </div>
  );
}

export default ProfileDescription;
