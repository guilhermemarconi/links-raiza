import ExternalLink from '@/components/ExternalLink';
import { hasUrl } from '@/lib/content';

// A card needs a destination, its image (the pitch) and a description (its only accessible name).
const isRenderable = (product) => hasUrl(product) && product.image?.url && product.description;

function Products({ products }) {
  const items = (products ?? []).filter(isRenderable);
  if (!items.length) return null;

  return (
    <section aria-label="Produtos" className="my-8">
      <ul className="m-0 flex list-none flex-col gap-5 p-0">
        {items.map(({ image, description, url }, index) => (
          <li key={`${url}-${index}`}>
            <ExternalLink href={url} className="block overflow-hidden rounded-xl bg-surface">
              <img
                src={image.url}
                alt={description}
                width={image.dimensions?.width}
                height={image.dimensions?.height}
                loading="lazy"
                className="block h-auto w-full"
              />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Products;
