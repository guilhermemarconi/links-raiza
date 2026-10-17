import ExtraLink from '@/components/ExtraLink';

// An Extra link with neither title nor URL is registered but never shown.
const isRenderable = ({ title, url }) => title || url;

function ExtraLinks({ links }) {
  const items = (links ?? []).filter(isRenderable);
  if (!items.length) return null;

  return (
    <section aria-label="Links extras" className="my-6">
      <ul className="m-0 list-none p-0">
        {items.map(({ thumbnail, title, url }, index) => (
          <ExtraLink
            key={`${url ?? title}-${index}`}
            position={index + 1}
            thumbnailUrl={thumbnail?.url}
            thumbnailWidth={thumbnail?.dimensions?.width}
            thumbnailHeight={thumbnail?.dimensions?.height}
            title={title}
            url={url}
          />
        ))}
      </ul>
    </section>
  );
}

export default ExtraLinks;
