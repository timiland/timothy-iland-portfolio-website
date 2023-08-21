import { AnimatePresence, motion, Variants } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import isLink from 'utilities/helpers/isLink';
import { INavBar } from '@models/INavBar';
import Link from 'next/link';
import Icon from '@atoms/Icon/Icon';
import IconSizeEnum from '@models/enums/IconSizeEnum';
import ColouredLogo from '@atoms/ColouredLogo/ColouredLogo';
import ColoursEnum from '@models/enums/ColoursEnum';
import clsx from 'clsx';

const dropdownVariants: Variants = {
  hidden: {
    y: '-100%',
  },
  show: {
    y: '0%',
  },
};

const NavBarMobile = ({ linkArray }: INavBar) => {
  const [isOpen, setIsOpen] = useState(false);

  const [expandedIndex, setExpandedIndex] = useState<number | null>();

  return (
    <div className="h-full relative flex flex-col pointer-events-auto">
      <div className="container shadow-xl flex relative z-10 bg-black text-white justify-between items-center py-4 border-b-2 border-yellow">
        <ColouredLogo
          className="w-[140px]"
          colour={ColoursEnum.Yellow}
          outlineColour={ColoursEnum.Black}
        />
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
            className="text-black overflow-scroll flex flex-col border-b border-yellow"
          >
            {linkArray.map((linkItem, index) =>
              isLink(linkItem) ? (
                <li
                  {...storyblokEditable(linkItem)}
                  key={linkItem.title}
                  className="text-left p-4 bg-green-500 text-white"
                >
                  <Link href={linkItem.url.url} target={linkItem.url.target}>
                    {linkItem.title}
                  </Link>
                </li>
              ) : (
                <>
                  <motion.button
                    className="relative z-10 text-left p-4 bg-green-500 text-white"
                    // initial={false}
                    // animate={{ backgroundColor: isOpen ? '#FF0088' : '#0055FF' }}
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
                        className="flex flex-col bg-yellow overflow-hidden pl-2"
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
                              className="p-4 text-black"
                            >
                              <Link
                                key={secondTierItem.title}
                                href={secondTierItem.url.url}
                                target={secondTierItem.url.target}
                                className="small-copy"
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBarMobile;
