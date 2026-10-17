import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Page, { generateMetadata } from '@/app/page';
import { getAllData } from '@/services/prismic';

import { fixtures, image, linkDoc, product, productsDoc, profileDoc, socialDoc } from './fixtures';

vi.mock('@/prismicio', () => ({ createClient: () => ({}) }));
vi.mock('@/services/prismic', () => ({ getAllData: vi.fn() }));

const renderPage = async (data = fixtures()) => {
  getAllData.mockResolvedValue(data);
  render(await Page());
};

describe('Bio page', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('Profile', () => {
    it('shows photo, name and description in that order', async () => {
      await renderPage();
      const profile = screen.getByRole('region', { name: 'Perfil' });

      const photo = within(profile).getByRole('img', { name: 'Foto de Raíza' });
      const name = within(profile).getByRole('heading', { level: 1, name: 'Raíza Souto' });
      const description = within(profile).getByText('Mentora de comunicação.');

      const follows = (a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING;
      expect(follows(photo, name)).toBeTruthy();
      expect(follows(name, description)).toBeTruthy();
    });

    it('defaults the name to Raíza Souto when empty', async () => {
      await renderPage(fixtures({ profile: [profileDoc({ name: null })] }));
      expect(screen.getByRole('heading', { level: 1, name: 'Raíza Souto' })).toBeInTheDocument();
    });

    it('renders the hero image as decorative', async () => {
      await renderPage();
      const hero = document.querySelector('img[src*="fundacao-01"]');
      expect(hero).not.toBeNull();
      expect(hero).toHaveAttribute('alt', '');
      expect(hero).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('metadata', () => {
    it('uses Prismic title, description and share image', async () => {
      getAllData.mockResolvedValue(
        fixtures({
          profile: [
            profileDoc({
              meta_title: 'Título X',
              meta_description: 'Descrição X',
              meta_image: image('https://img.test/share.jpg', 'x', 1200, 630),
            }),
          ],
        }),
      );
      const metadata = await generateMetadata();
      expect(metadata.title).toBe('Título X');
      expect(metadata.description).toBe('Descrição X');
      expect(metadata.openGraph.images[0].url).toBe('https://img.test/share.jpg');
    });

    it('falls back to the hard-coded title and description when empty', async () => {
      getAllData.mockResolvedValue(fixtures());
      const metadata = await generateMetadata();
      expect(metadata.title).toBe('Raíza Souto | Links');
      expect(metadata.description).toBe(
        'Aqui você encontra todos os links para estarmos sempre juntos!',
      );
    });
  });

  describe('Products', () => {
    const three = [
      product('COLUNA', 'https://raizasouto.com.br'),
      product('PILAR', 'https://wa.me/5511999999999?text=Ol%C3%A1%2C%20PILAR'),
      product('Work Session', 'https://wa.me/5511999999999?text=Work'),
    ];

    it('renders cards in editor order', async () => {
      await renderPage(fixtures({ products: [productsDoc(three)] }));
      const links = within(screen.getByRole('region', { name: 'Produtos' })).getAllByRole('link');
      expect(links.map((a) => a.getAttribute('href'))).toEqual(three.map((p) => p.url));
    });

    it('exposes the description as the card accessible name linking to its URL', async () => {
      await renderPage(fixtures({ products: [productsDoc(three)] }));
      const card = screen.getByRole('link', { name: 'Descrição COLUNA' });
      expect(card).toHaveAttribute('href', 'https://raizasouto.com.br');
      expect(within(card).getByRole('img', { name: 'Descrição COLUNA' })).toBeInTheDocument();
    });

    it('opens externally and safely', async () => {
      await renderPage(fixtures({ products: [productsDoc(three)] }));
      const card = screen.getByRole('link', { name: 'Descrição PILAR' });
      expect(card).toHaveAttribute('target', '_blank');
      expect(card).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });

    it('does not render a product without URL', async () => {
      const draft = product('Novo', null);
      await renderPage(fixtures({ products: [productsDoc([three[0], draft])] }));
      expect(screen.queryByRole('link', { name: 'Descrição Novo' })).not.toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Descrição COLUNA' })).toBeInTheDocument();
    });

    it('omits the section when no product is renderable', async () => {
      await renderPage(fixtures({ products: [productsDoc([product('Novo', null)])] }));
      expect(screen.queryByRole('region', { name: 'Produtos' })).not.toBeInTheDocument();
    });
  });

  describe('Social links', () => {
    it('renders a labelled link per network with a URL', async () => {
      await renderPage(
        fixtures({
          social_links: [
            socialDoc([
              { network: 'Instagram', url: 'https://instagram.com/raizasouto' },
              { network: 'YouTube', url: null },
              { network: 'TikTok', url: '' },
            ]),
          ],
        }),
      );
      const region = screen.getByRole('region', { name: 'Redes sociais' });
      const links = within(region).getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAccessibleName('Instagram');
      expect(links[0]).toHaveAttribute('href', 'https://instagram.com/raizasouto');
    });

    it('omits the section when no social link has a URL', async () => {
      await renderPage(
        fixtures({ social_links: [socialDoc([{ network: 'YouTube', url: null }])] }),
      );
      expect(screen.queryByRole('region', { name: 'Redes sociais' })).not.toBeInTheDocument();
    });
  });

  describe('Extra links', () => {
    it('renders title and optional thumbnail', async () => {
      await renderPage(
        fixtures({
          link: [
            linkDoc([
              {
                title: 'Podcast',
                url: 'https://podcast.test',
                thumbnail: image('https://img.test/p.jpg'),
              },
              { title: 'Blog', url: 'https://blog.test', thumbnail: {} },
            ]),
          ],
        }),
      );
      const region = screen.getByRole('region', { name: 'Outros links' });
      const podcast = within(region).getByRole('link', { name: 'Podcast' });
      const blog = within(region).getByRole('link', { name: 'Blog' });
      expect(podcast).toHaveAttribute('href', 'https://podcast.test');
      expect(podcast.querySelector('img')).not.toBeNull();
      expect(blog.querySelector('img')).toBeNull();
    });

    it('omits the section when there are no extra links', async () => {
      await renderPage();
      expect(screen.queryByRole('region', { name: 'Outros links' })).not.toBeInTheDocument();
    });
  });

  it('orders sections: profile, social links, products, extra links', async () => {
    await renderPage(
      fixtures({
        products: [productsDoc([product('COLUNA', 'https://raizasouto.com.br')])],
        social_links: [socialDoc([{ network: 'Instagram', url: 'https://instagram.com/x' }])],
        link: [linkDoc([{ title: 'Blog', url: 'https://blog.test', thumbnail: {} }])],
      }),
    );
    const names = screen.getAllByRole('region').map((r) => r.getAttribute('aria-label'));
    expect(names).toEqual(['Perfil', 'Redes sociais', 'Produtos', 'Outros links']);
  });
});
