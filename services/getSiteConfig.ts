import { ISbStoriesParams, ISbStoryData } from 'storyblok-js-client';
import { getStoryblokApi } from '@storyblok/react';
import ISiteConfig from '@models/ISiteConfig';

const getSiteConfig = async (): Promise<ISiteConfig> => {
  const sbParams = {
    version: 'draft', // or 'published'
    content_type: 'siteConfig',
    resolve_relations:
      'siteConfig.navBar,siteConfig.footer,siteConfig.contactForm',
  } as ISbStoriesParams;

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories`, sbParams);
  const content = data.stories.map((story: ISbStoryData) => story.content);

  const siteConfig = content[0];

  const labels = siteConfig.labels?.reduce((result, labelBlok) => {
    // eslint-disable-next-line no-param-reassign
    result[labelBlok.key] = labelBlok.text;
    return result as Record<string, string>;
  }, {});

  const navBar = siteConfig.navBar.content;

  const footer = siteConfig.footer.content;

  const contactForm = siteConfig.contactForm.content;

  return { navBar, footer, contactForm, labels };
};

export default getSiteConfig;
