import type { AppProps } from 'next/app';

import {
  Layout,
  Overlay,
  OverlayContext,
  useOverlayImplementation,
} from '../components';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { dismiss, display, isOpen } = useOverlayImplementation();

  return (
    <OverlayContext.Provider value={{ dismiss, display, isOpen }}>
      <Layout>
        <Component {...pageProps} />
        <Overlay />
      </Layout>
    </OverlayContext.Provider>
  );
};

export default MyApp;
