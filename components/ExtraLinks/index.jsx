import ExtraLink from '@/components/ExtraLink';
import { isExtraRenderable } from '@/lib/content';

function ExtraLinks({ links }) {
  const items = (links ?? []).filter(isExtraRenderable);
  if (!items.length) return null;

  // Only items with a destination are measured, so only they consume a position.
  let position = 0;

  return (
    <section aria-label="Links extras" className="my-6">
      <ul className="m-0 list-none p-0">
        {items.map(({ thumbnail, title, url }, index) => (
          <ExtraLink
            key={`${url ?? title}-${index}`}
            position={url ? ++position : undefined}
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
