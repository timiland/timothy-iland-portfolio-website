import { storyblokEditable } from '@storyblok/react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from 'framer-motion';
import { useState } from 'react';
import Button from '@atoms/Button/Button';
import ILink from '@models/ILink';
import ColouredLogo from '@atoms/ColouredLogo/ColouredLogo';
import ColoursEnum from '@models/enums/ColoursEnum';
import isLink from 'utilities/helpers/isLink';
import FocusTrap from 'focus-trap-react';
import { INavBar } from '@models/INavBar';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import Modal from '@atoms/Modal/Modal';
import ContactForm from '@organisms/ContactForm/ContactForm';
import { useConfig } from '@stores/configProvider';
import ISiteConfig from '@models/ISiteConfig';
import Link from 'next/link';

const dropdownVariants: Variants = {
  hidden: {
    y: '-100%',
  },
  show: {
    y: '0%',
  },
};

const NavBarDesktop = ({ linkArray, contactCta }: INavBar) => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [atTop, setTopOfPage] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setTopOfPage(latest === 0);
  });

  const { contactForm } = useConfig() as ISiteConfig;

  const activeLinks = (linkArray[activeDropdownIndex]?.links || []) as ILink[];

  return (
    <motion.div className="pointer-events-auto flex justify-between px-10 items-center shadow-bold relative z-10 bg-black border-b-2 py-3 border-yellow text-white">
      <motion.div
        initial={{ width: '220px' }}
        animate={
          atTop && !isContactModalOpen ? { width: '230px' } : { width: '160px' }
        }
        transition={{
          duration: 0.4,
          ease: [0, 0, 0.32, 1],
        }}
      >
        <Link href="/" passHref>
          <ColouredLogo className="w-full h-full" colour={ColoursEnum.White} />
        </Link>
      </motion.div>
      <ol className="flex gap-8 h-full w-full items-center justify-end">
        {!!linkArray?.length &&
          linkArray.map((linkItem, index: number) =>
            isLink(linkItem) ? (
              <li {...storyblokEditable(linkItem)} key={linkItem.title}>
                <Button
                  style_={ButtonStyleEnum.Basic}
                  href={linkItem.url.cached_url}
                >
                  {linkItem.title}
                </Button>
              </li>
            ) : (
              <li {...storyblokEditable(linkItem)}>
                <Button
                  iconName="sort-desc"
                  iconFlip={activeDropdownIndex === index}
                  style_={ButtonStyleEnum.Basic}
                  onClick={() => {
                    // currently on this tab & dropdown open
                    if (activeDropdownIndex === index && showDropdown) {
                      setShowDropdown(false);
                      setActiveDropdownIndex(-1);
                    }
                    if (activeDropdownIndex !== index && !showDropdown) {
                      setShowDropdown(false);
                      setActiveDropdownIndex(index);
                    }
                    // not on this tab & dropdown open
                    if (activeDropdownIndex !== index && showDropdown) {
                      setActiveDropdownIndex(index);
                    } else {
                      setShowDropdown(!showDropdown);
                    }
                  }}
                >
                  {linkItem.title}
                </Button>
              </li>
            )
          )}
        {contactCta && (
          <Button
            onClick={() => setIsContactModalOpen(!isContactModalOpen)}
            style_={ButtonStyleEnum.Outline}
          >
            {contactCta}
          </Button>
        )}
      </ol>
      {isContactModalOpen && (
        <Modal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen}>
          <ContactForm blok={contactForm} setIsOpen={setIsContactModalOpen} />
        </Modal>
      )}
      <div className="absolute top-full left-0 w-full h-screen pointer-events-none overflow-hidden">
        <AnimatePresence>
          {showDropdown && (
            <FocusTrap
              focusTrapOptions={{
                preventScroll: true,
                allowOutsideClick: true,
              }}
            >
              <motion.ol
                variants={dropdownVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                transition={{
                  duration: 0.3,
                  ease: 'linear',
                }}
                className="bg-green-550 pointer-events-auto w-full flex justify-end items-center p-8 gap-8 shadow-bold border-b-2 border-yellow"
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setShowDropdown(false);
                  }
                }}
              >
                {!!activeLinks?.length &&
                  activeLinks.map((link: ILink, index) => (
                    <motion.li
                      key={link.title}
                      initial={{
                        opacity: 0,
                        translateY: -20,
                      }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        duration: 0.75,
                        ease: 'easeOut',
                        delay: 0.25 + index * 0.4,
                      }}
                    >
                      <Link
                        className="hover:underline underline-offset-4"
                        target={link.target}
                        href={link?.url?.url || `/${link.url.cached_url}`}
                        as={`/${link.url.cached_url}`}
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
              </motion.ol>
            </FocusTrap>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NavBarDesktop;
