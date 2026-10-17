import Link from '@/components/Link';

function Links({ links }) {
  const items = (links ?? []).filter(({ url }) => url);
  if (!items.length) return null;

  return (
    <section aria-label="Outros links" className="my-6">
      <ul className="m-0 list-none p-0">
        {items.map(({ thumbnail, title, url }, index) => (
          <Link
            key={index}
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

export default Links;
