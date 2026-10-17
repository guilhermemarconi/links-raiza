import Image from 'next/image';

import ExternalLink from '@/components/ExternalLink';

function ExtraLink({ title, url, thumbnailUrl, thumbnailWidth, thumbnailHeight }) {
  if (!title && !url) return null;

  return (
    <li className="block my-5">
      <ExternalLink
        href={url}
        className="@container/link flex items-center p-4 font-bold rounded-lg bg-accent text-on-accent"
      >
        <span className="flex-1 pr-4">{title}</span>

        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt=""
            width={thumbnailWidth}
            height={thumbnailHeight}
            sizes="64px"
            className="hidden size-16 rounded-md object-cover @min-[200px]:block"
            role="presentation"
          />
        ) : null}
      </ExternalLink>
    </li>
  );
}

export default ExtraLink;
