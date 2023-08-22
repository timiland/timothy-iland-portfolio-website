import IAsset from '@models/IAsset';
import ISiteConfig from '@models/ISiteConfig';
import ContactForm from '@organisms/ContactForm/ContactForm';
import { useConfig } from '@stores/configProvider';
import { SbBlokData, storyblokEditable } from '@storyblok/react';

interface IContactFormSection extends SbBlokData {
  readonly primaryImage: IAsset;
  readonly secondaryImage: IAsset;
}

const ContactFormSection = ({ blok }: { blok: IContactFormSection }) => {
  const { primaryImage, secondaryImage } = blok;
  const { contactForm } = useConfig() as ISiteConfig;

  return (
    <section
      className="w-full component-padding"
      {...storyblokEditable(contactForm)}
    >
      <ContactForm
        blok={contactForm}
        primaryImage={primaryImage}
        secondaryImage={secondaryImage}
      />
    </section>
  );
};

export default ContactFormSection;
