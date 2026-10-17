import ExternalLink from '@/components/ExternalLink';
import { withUrl } from '@/lib/content';

import { ICONS } from './icons';

function SocialLinks({ links }) {
  const items = withUrl(links).filter(({ network }) => ICONS[network]);
  if (!items.length) return null;

  return (
    <section aria-label="Redes sociais" className="my-6">
      <ul className="m-0 flex list-none justify-center gap-4 p-0">
        {items.map(({ network, url }, index) => (
          <li key={`${network}-${url}-${index}`}>
            <ExternalLink
              href={url}
              aria-label={network}
              className="flex size-11 items-center justify-center rounded-full bg-accent text-on-accent"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                {ICONS[network]}
              </svg>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SocialLinks;
