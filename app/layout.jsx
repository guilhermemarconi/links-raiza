import { EB_Garamond } from 'next/font/google';
import localFont from 'next/font/local';
import { PrismicPreview } from '@prismicio/next';

import prismicConfig from '@/prismic.config.json';
import './globals.css';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const sofiaPro = localFont({
  src: [
    { path: './fonts/SofiaPro-Light.woff', weight: '300', style: 'normal' },
    { path: './fonts/SofiaPro-Regular.woff', weight: '400', style: 'normal' },
    { path: './fonts/SofiaPro-Medium.woff', weight: '500', style: 'normal' },
    { path: './fonts/SofiaPro-Bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${ebGaramond.variable} ${sofiaPro.variable}`}>
      <body className="antialiased">
        {children}
        <PrismicPreview repositoryName={prismicConfig.repositoryName} />
      </body>
    </html>
  );
}
