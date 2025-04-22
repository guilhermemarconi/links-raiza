import { PrismicPreview } from '@prismicio/next';

import sliceMachine from '@/slicemachine.config.json'
import './globals.css';

export const metadata = {
  title: "Raíza Souto | Links",
  description: "Aqui você encontra todos os links para estarmos sempre juntos!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialised">
        {children}
        <PrismicPreview repositoryName={sliceMachine.repositoryName} />
      </body>
    </html>
  );
}

