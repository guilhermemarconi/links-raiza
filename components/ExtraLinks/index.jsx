import ExtraLink from '@/components/ExtraLink';

function ExtraLinks({ links }) {
  if (!links?.length) return null;

  return (
    <section aria-label="Links extras" className="my-6">
      <ul className="m-0 list-none p-0">
        {links.map(({ thumbnail, title, url }, index) => (
          <ExtraLink
            key={`${url ?? title}-${index}`}
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
