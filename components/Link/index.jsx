function Link({
  title,
  url,
  thumbnailUrl,
  thumbnailWidth,
  thumbnailHeight,
  colorText,
  colorBackground,
}) {
  if (!title && !url) return null;

  return (
    <li className="block my-5">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="@container/link flex items-center p-4 font-bold rounded-lg bg-foreground text-background"
      >
        <span className="flex-1 pr-4">
          {title}
        </span>

        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            width={thumbnailWidth}
            height={thumbnailHeight}
            className="hidden size-16 rounded-md @min-[200px]:block"
            role="presentation"
          />
        ) : null}
      </a>
    </li>
  );
}

export default Link;
