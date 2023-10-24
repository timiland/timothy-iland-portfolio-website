import BackgroundLogo from '@atoms/BackgroundLogo/BackgroundLogo';
import ColouredLogo from '@atoms/ColouredLogo/ColouredLogo';
import ColoursEnum from '@models/enums/ColoursEnum';
import { INavBar } from '@models/INavBar';
import ISiteConfig from '@models/ISiteConfig';
import Footer, { IFooter } from '@organisms/Footer/Footer';
import NavBar from '@organisms/Navbar/NavBar';
import getSiteConfig from '@services/getSiteConfig';
import { getPaths, getStories } from '@services/storyblok';
import { ConfigProvider } from '@stores/configProvider';
import { StoryblokComponent, ISbStoryData } from '@storyblok/react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

const Page = ({
  config,
  story,
}: {
  config: ISiteConfig;
  story: ISbStoryData;
}) => {
  const { navBar, footer } = config ?? {};

  if (!story?.content) {
    return (
      <div className="h-screen px-5 w-full flex items-center flex-col gap-12 justify-center">
        <Link href="/" className="w-full xl:w-1/2">
          <ColouredLogo
            className="drop-shadow-black_sm xl:drop-shadow-black_lg -translate-x-3 xl:-translate-x-12"
            colour={ColoursEnum.Yellow}
          />
        </Link>
        <h5 className="text-yellow drop-shadow-black_sm">
          404 : Page Not Found
        </h5>
      </div>
    );
  }

  return (
    <div>
      <Head>
        {/* <!-- Google Tag Manager --> */}
        <Script>
          {`
        
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MZCDTRBS');

          `}
        </Script>
        {/* <!-- End Google Tag Manager --> */}
        <title>
          {story.content.pageTitle ||
            'Timothy Iland - Custom Websites & Graphics'}
        </title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          name="description"
          content={
            story.content.metaDescription || 'Custom Websites, Graphics & more'
          }
        />
      </Head>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-31R2T0F9DJ"
      />

      <Script>
        {`

          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-31R2T0F9DJ');
        
        `}
      </Script>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          title="google noscript"
          src="https://www.googletagmanager.com/ns.html?id=GTM-MZCDTRBS"
          height="0"
          width="0"
          className="hidden invisible"
        />
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
      <ConfigProvider config={config}>
        {navBar && <NavBar blok={navBar as INavBar} />}
        <BackgroundLogo colour={ColoursEnum.Black} />
        <div className="relative z-10 pt-44 xl:pt-52">
          {story?.content && <StoryblokComponent blok={story?.content} />}
        </div>
        <Footer blok={footer as IFooter} />
        <div className="fixed top-0 z-20" id="modal-root" />
      </ConfigProvider>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
}: GetStaticPropsContext) => {
  const { data } = await getStories({ params });

  if (!data?.story) {
    return {
      notFound: true,
      revalidate: 3600,
    };
  }

  const config = await getSiteConfig();

  return {
    props: {
      config,
      preview: !!preview,
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
};

export default Page;
