import { AnimatePresence, motion, Variants } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import isLink from 'utilities/helpers/isLink';
import { INavBar } from '@models/INavBar';
import Link from 'next/link';
import Icon from '@atoms/Icon/Icon';
import IconSizeEnum from '@models/enums/IconSizeEnum';
import ColouredLogo from '@atoms/ColouredLogo/ColouredLogo';
import ColoursEnum from '@models/enums/ColoursEnum';
import clsx from 'clsx';
import Modal from '@atoms/Modal/Modal';
import ContactForm from '@organisms/ContactForm/ContactForm';
import ISiteConfig from '@models/ISiteConfig';
import { useConfig } from '@stores/configProvider';

const dropdownVariants: Variants = {
  hidden: {
    y: '-100%',
  },
  show: {
    y: '0%',
  },
};

const NavBarMobile = ({ linkArray, contactCta }: INavBar) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { contactForm } = useConfig() as ISiteConfig;

  const [expandedIndex, setExpandedIndex] = useState<number | null>();

  useEffect(() => {
    if (!isOpen) {
      setExpandedIndex(null);
    }
  }, [isOpen]);

  return (
    <nav className="h-full relative flex flex-col pointer-events-none">
      <div className="container shadow-xl flex relative z-10 bg-black pointer-events-auto text-white justify-between items-center py-4 border-b-2 border-yellow">
        <Link href="/" passHref>
          <ColouredLogo
            className="w-[140px]"
            colour={ColoursEnum.White}
            outlineColour={ColoursEnum.Black}
          />
        </Link>
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: 'linear',
            }}
            className="h-full bg-black absolute inset-0"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{
              duration: 0.3,
              ease: 'linear',
            }}
            className="text-black pointer-events-auto overflow-scroll flex flex-col border-b-2 border-yellow bg-green-500 py-2"
          >
            <>
              {linkArray.map((linkItem, index) =>
                isLink(linkItem) ? (
                  <li
                    {...storyblokEditable(linkItem)}
                    key={linkItem.title}
                    className="text-left p-8 py-6 text-white"
                  >
                    <Link href={linkItem.url.url} target={linkItem.url.target}>
                      {linkItem.title}
                    </Link>
                  </li>
                ) : (
                  <>
                    <motion.button
                      className="relative z-10 text-left p-8 py-6 text-white"
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                    >
                      {linkItem.title}
                      <Icon
                        name="sort-desc"
                        size={IconSizeEnum.md}
                        className={clsx(
                          expandedIndex === index && '-scale-y-100',
                          'ml-2 -translate-y-[2px] text-white'
                        )}
                      />
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {expandedIndex === index && (
                        <motion.ul
                          key={linkItem.title}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 1, height: 0 },
                          }}
                          transition={{
                            duration: 0.5,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                          className="flex flex-col bg-black border-yellow border-t-2 border-b-2 overflow-hidden pl-2"
                        >
                          {linkItem.links.map(
                            (secondTierItem, secondTierIndex) => (
                              <motion.li
                                key={secondTierItem.title}
                                initial={{
                                  opacity: 0,
                                  translateX: -20,
                                }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{
                                  duration: 0.75,
                                  // ease: 'easeOut',
                                  delay: 0.25 + secondTierIndex * 0.4,
                                }}
                                className="p-8 text-white last:pt-0"
                              >
                                <Link
                                  key={secondTierItem.title}
                                  href={secondTierItem.url.cached_url}
                                  target={secondTierItem.url.target}
                                  className="body"
                                >
                                  {secondTierItem.title}
                                </Link>
                              </motion.li>
                            )
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                )
              )}
              {contactCta && (
                <button
                  className="text-left p-8 py-6 body text-white"
                  onClick={() => setIsContactModalOpen(!isContactModalOpen)}
                >
                  {contactCta}
                </button>
              )}

              {isContactModalOpen && (
                <Modal
                  isOpen={isContactModalOpen}
                  setIsOpen={setIsContactModalOpen}
                >
                  <ContactForm
                    blok={contactForm}
                    setIsOpen={setIsContactModalOpen}
                  />
                </Modal>
              )}
            </>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBarMobile;
