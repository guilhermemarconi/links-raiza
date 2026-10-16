import { PrismicPreview } from '@prismicio/next';

import prismicConfig from '@/prismic.config.json';
import './globals.css';

export const metadata = {
  title: 'Raíza Souto | Links',
  description: 'Aqui você encontra todos os links para estarmos sempre juntos!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        <PrismicPreview repositoryName={prismicConfig.repositoryName} />
      </body>
    </html>
  );
}
