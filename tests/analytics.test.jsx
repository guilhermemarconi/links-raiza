import { fireEvent, render, screen } from '@testing-library/react';
import posthog from 'posthog-js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Analytics from '@/components/Analytics';
import Page from '@/app/page';
import { getAllData } from '@/services/prismic';

import { fixtures, linkDoc, product, productsDoc, socialDoc } from './fixtures';

vi.mock('@/prismicio', () => ({ createClient: () => ({}) }));
vi.mock('@/services/prismic', () => ({ getAllData: vi.fn() }));
vi.mock('posthog-js', () => ({
  default: { init: vi.fn(), capture: vi.fn(), identify: vi.fn() },
}));

const configure = () => {
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN', 'phc_test');
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_HOST', 'https://eu.i.posthog.com');
};

// The root layout mounts <Analytics /> next to the page.
const renderPage = async (data = fixtures()) => {
  getAllData.mockResolvedValue(data);
  render(
    <>
      <Analytics />
      {await Page()}
    </>,
  );
};

const middleClick = (element) =>
  fireEvent(element, new MouseEvent('auxclick', { bubbles: true, button: 1 }));

const rightClick = (element) =>
  fireEvent(element, new MouseEvent('auxclick', { bubbles: true, button: 2 }));

const withEverything = () =>
  fixtures({
    products: [
      productsDoc([
        product('Oculto', null),
        product('COLUNA', 'https://coluna.test'),
        product('PILAR', 'https://pilar.test'),
      ]),
    ],
    social_links: [
      socialDoc([
        { network: 'YouTube', url: null },
        { network: 'Instagram', url: 'https://instagram.com/x' },
        { network: 'TikTok', url: 'https://tiktok.com/x' },
      ]),
    ],
    link: [
      linkDoc([
        { title: null, url: null, thumbnail: {} },
        { title: 'Podcast', url: 'https://podcast.test', thumbnail: {} },
        { title: 'Blog', url: 'https://blog.test', thumbnail: {} },
      ]),
    ],
  });

describe('Destination click measurement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    configure();
  });
  afterEach(() => vi.unstubAllEnvs());

  it('emits a product Destination click with description and position', async () => {
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('link', { name: 'Descrição PILAR' }));
    expect(posthog.capture).toHaveBeenCalledExactlyOnceWith('destination_clicked', {
      kind: 'product',
      name: 'Descrição PILAR',
      position: 2,
    });
  });

  it('emits a social Destination click with network and position', async () => {
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('link', { name: 'TikTok' }));
    expect(posthog.capture).toHaveBeenCalledExactlyOnceWith('destination_clicked', {
      kind: 'social',
      name: 'TikTok',
      position: 2,
    });
  });

  it('emits an extra Destination click with title and position', async () => {
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('link', { name: 'Blog' }));
    expect(posthog.capture).toHaveBeenCalledExactlyOnceWith('destination_clicked', {
      kind: 'extra',
      name: 'Blog',
      position: 2,
    });
  });

  it('counts the first rendered item as position 1, ignoring hidden ones', async () => {
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('link', { name: 'Descrição COLUNA' }));
    fireEvent.click(screen.getByRole('link', { name: 'Instagram' }));
    fireEvent.click(screen.getByRole('link', { name: 'Podcast' }));
    expect(posthog.capture.mock.calls.map(([, p]) => p.position)).toEqual([1, 1, 1]);
  });

  it('emits on a click inside the link, not only on the anchor', async () => {
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('img', { name: 'Descrição COLUNA' }));
    expect(posthog.capture).toHaveBeenCalledWith(
      'destination_clicked',
      expect.objectContaining({ kind: 'product', name: 'Descrição COLUNA' }),
    );
  });

  it('emits on middle-button click too', async () => {
    await renderPage(withEverything());
    middleClick(screen.getByRole('link', { name: 'Podcast' }));
    expect(posthog.capture).toHaveBeenCalledExactlyOnceWith('destination_clicked', {
      kind: 'extra',
      name: 'Podcast',
      position: 1,
    });
  });

  it('does not count right-button clicks', async () => {
    await renderPage(withEverything());
    rightClick(screen.getByRole('link', { name: 'Podcast' }));
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it('emits nothing when clicking something that is not a measured link', async () => {
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('heading', { level: 1 }));
    fireEvent.click(screen.getByRole('img', { name: 'Foto de Raíza' }));
    middleClick(document.body);
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it('keeps destinations unaltered', async () => {
    await renderPage(withEverything());
    const card = screen.getByRole('link', { name: 'Descrição PILAR' });
    expect(card).toHaveAttribute('href', 'https://pilar.test');
    expect(card).toHaveAttribute('target', '_blank');
    expect(card).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('stops listening when unmounted', async () => {
    const analytics = render(<Analytics />);
    const link = document.createElement('a');
    link.dataset.posthogDestinationKind = 'extra';
    document.body.append(link);
    analytics.unmount();
    fireEvent.click(link);
    expect(posthog.capture).not.toHaveBeenCalled();
    link.remove();
  });

  it('does not surface an error when capturing fails', async () => {
    posthog.capture.mockImplementationOnce(() => {
      throw new Error('boom');
    });
    const errors = [];
    const onError = (event) => {
      event.preventDefault();
      errors.push(event.error);
    };
    window.addEventListener('error', onError);
    try {
      await renderPage(withEverything());
      fireEvent.click(screen.getByRole('link', { name: 'Blog' }));
    } finally {
      window.removeEventListener('error', onError);
    }
    expect(posthog.capture).toHaveBeenCalledOnce();
    expect(errors).toEqual([]);
  });

  it('keeps the page and links working when posthog.init throws', async () => {
    posthog.init.mockImplementationOnce(() => {
      throw new Error('blocked');
    });
    await renderPage(withEverything());
    const link = screen.getByRole('link', { name: 'Blog' });
    expect(link).toHaveAttribute('href', 'https://blog.test');
    fireEvent.click(link);
    middleClick(link);
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it('does not render or count a Social link with an unknown network', async () => {
    const data = withEverything();
    data.social_links = [
      socialDoc([
        { network: 'Orkut', url: 'https://orkut.test' },
        { network: 'Instagram', url: 'https://instagram.com/x' },
      ]),
    ];
    await renderPage(data);
    expect(screen.queryByRole('link', { name: 'Orkut' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Instagram' }));
    expect(posthog.capture).toHaveBeenCalledExactlyOnceWith('destination_clicked', {
      kind: 'social',
      name: 'Instagram',
      position: 1,
    });
  });

  it('does not count an Extra link without URL nor let it shift positions', async () => {
    const data = withEverything();
    data.link = [
      linkDoc([
        { title: 'Sem destino', url: null, thumbnail: {} },
        { title: 'Podcast', url: 'https://podcast.test', thumbnail: {} },
      ]),
    ];
    await renderPage(data);
    fireEvent.click(screen.getByText('Sem destino'));
    expect(posthog.capture).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('link', { name: 'Podcast' }));
    expect(posthog.capture).toHaveBeenCalledExactlyOnceWith('destination_clicked', {
      kind: 'extra',
      name: 'Podcast',
      position: 1,
    });
  });

  it('initialises cookieless, without autocapture, replay or identify', async () => {
    await renderPage(withEverything());
    expect(posthog.init).toHaveBeenCalledExactlyOnceWith(
      'phc_test',
      expect.objectContaining({
        api_host: 'https://eu.i.posthog.com',
        persistence: 'memory',
        autocapture: false,
        disable_session_recording: true,
        person_profiles: 'identified_only',
      }),
    );
    expect(posthog.init.mock.calls[0][1].capture_pageview).not.toBe(false);
    expect(posthog.init.mock.calls[0][1]).not.toHaveProperty('capture_exceptions');
    expect(posthog.identify).not.toHaveBeenCalled();
  });

  it.each([
    ['token', 'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN'],
    ['host', 'NEXT_PUBLIC_POSTHOG_HOST'],
  ])('does nothing when the %s is missing', async (_, variable) => {
    vi.stubEnv(variable, '');
    await renderPage(withEverything());
    fireEvent.click(screen.getByRole('link', { name: 'Blog' }));
    middleClick(screen.getByRole('link', { name: 'Blog' }));
    expect(posthog.init).not.toHaveBeenCalled();
    expect(posthog.capture).not.toHaveBeenCalled();
  });
});
