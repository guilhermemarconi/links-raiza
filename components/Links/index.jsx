import Link from '@/components/Link';

function Links({ links, linksColorText, linksColorBackground }) {
  if (!links || !links.length) return null;

  return (
    <ul className="my-6 p-0 list-none">
      {links.map(({ thumbnail, title, url }, index) => (
        <Link
          key={index}
          thumbnailUrl={thumbnail?.url}
          thumbnailWidth={thumbnail?.dimensions?.width}
          thumbnailHeight={thumbnail?.dimensions?.height}
          title={title}
          url={url}
          colorText={linksColorText}
          colorBackground={linksColorBackground}
        />
      ))}
    </ul>
  );
}

export default Links;
