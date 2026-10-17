import Image from 'next/image';

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
            <ExternalLink
              href={url}
              data-posthog-destination-kind="product"
              data-posthog-destination-name={description}
              data-posthog-destination-position={index + 1}
              className="block overflow-hidden rounded-xl bg-surface"
            >
              <Image
                src={image.url}
                alt={description}
                width={image.dimensions?.width}
                height={image.dimensions?.height}
                sizes="(min-width: 700px) 700px, 100vw"
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
