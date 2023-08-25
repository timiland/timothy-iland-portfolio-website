import ISiteConfig from '@models/ISiteConfig';
import ContactForm from '@organisms/ContactForm/ContactForm';
import { useConfig } from '@stores/configProvider';
import { storyblokEditable } from '@storyblok/react';

const ContactFormSection = () => {
  const { contactForm } = useConfig() as ISiteConfig;

  return (
    <section
      className="w-full component-padding"
      {...storyblokEditable(contactForm)}
    >
      <ContactForm blok={contactForm} />
    </section>
  );
};

export default ContactFormSection;
