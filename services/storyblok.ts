import { getStoryblokApi, ISbResult, ISbStoryParams } from '@storyblok/react';

import { ParsedUrlQuery } from 'querystring';

export const getStories = async ({
  params,
  // preview,
}: {
  params: ParsedUrlQuery | undefined;
  // preview: boolean;
}): Promise<ISbResult> => {
  const relations: string[] = ['projectFeature.project'];

  const slug = params?.slug ? (params.slug as string[]).join('/') : 'home';

  const sbParams: ISbStoryParams = {
    version: 'published',
    resolve_links: 'story',
    resolve_relations: relations.join(','),
  };

  // if (preview) {
  //   sbParams.version = 'draft';
  //   sbParams.cv = Date.now();
  // }

  const storyblokApi = getStoryblokApi();
  const response = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return response;
};

export const getPaths = async (): Promise<{ params: { slug: string[] } }[]> => {
  const sbParams: ISbStoryParams = {
    version: 'published',
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/links/', sbParams);

  const paths: { params: { slug: string[] } }[] = [];

  Object.keys(data.links).forEach((linkKey: any) => {
    if (
      // data.links[linkKey].is_folder ||
      data.links[linkKey].slug.startsWith('globalcomponents/') ||
      data.links[linkKey].slug.startsWith('site-config')
    ) {
      return;
    }

    const { path } = data.links[linkKey];

    const splitSlug = path === '/' ? [] : path?.split('/');

    paths.push({ params: { slug: splitSlug } });
  });

  return paths;
};
