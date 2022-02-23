import Head from 'next/head';
import {
  About,
  Footer,
  Landing,
  Skills,
  Testimonial,
  Works,
} from '../components/sections';

const Home = () => {
  return (
    <>
      <Head>
        <title>Rein Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-primary">
        <Landing />
        <About />
        <Works />
        <Skills />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
};

export default Home;
