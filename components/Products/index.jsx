function Products({ products }) {
  const items = (products ?? []).filter((product) => product.url);
  if (!items.length) return null;

  return (
    <section aria-label="Produtos" className="my-8">
      <ul className="m-0 flex list-none flex-col gap-5 p-0">
        {items.map(({ image, description, url }, index) => (
          <li key={index}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl bg-surface"
            >
              <img
                src={image?.url}
                alt={description ?? ''}
                width={image?.dimensions?.width}
                height={image?.dimensions?.height}
                loading="lazy"
                className="block h-auto w-full"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Products;
