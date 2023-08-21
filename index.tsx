import Head from 'next/head';
import Link from 'next/link';

const Page = () => {
  // eslint-disable-next-line no-param-reassign
  // story = useStoryblokState(story);

  return (
    <div className="w-screen">
      <Head>
        <title>Timothy Iland</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative z-10 pt-[250px]">
        <Link href="/">
          <h1 className="text-black">YOOO</h1>
        </Link>
      </div>
    </div>
  );
};

export default Page;
