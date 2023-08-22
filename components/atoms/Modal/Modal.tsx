import Icon from '@atoms/Icon/Icon';
import Portal from '@atoms/Portal/Portal';
import IconSizeEnum from '@models/enums/IconSizeEnum';
import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import bodyScrollLock from 'utilities/helpers/bodyScrollLock';

export interface IModal {
  readonly callback?: () => void;
  readonly contentClasses?: string;
  readonly crossClasses?: string;
  readonly isOpen: boolean;
  readonly modalClasses?: string;
  readonly setIsOpen: (param: boolean) => void;
  readonly showCloseButton?: boolean;
  readonly isCloseButtonFixed?: boolean;
  readonly closeButtonIconSize?: IconSizeEnum | number | string;
  readonly shouldCloseOnClickOutsideContent?: boolean;
}

const Modal = ({
  callback,
  children,
  contentClasses,
  crossClasses = 'text-white',
  isOpen,
  modalClasses,
  setIsOpen,
  showCloseButton = true,
  isCloseButtonFixed = true,
  closeButtonIconSize = IconSizeEnum.md,
  shouldCloseOnClickOutsideContent = false,
}: PropsWithChildren<IModal>) => {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      bodyScrollLock(true);
    }

    return () => {
      bodyScrollLock(false);
    };
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    callback?.();
  }, [callback, setIsOpen]);

  useEffect(() => {
    const keyboardClose = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && isOpen === true) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', keyboardClose);

    return () => {
      window.removeEventListener('keydown', keyboardClose);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handleClickOutsideContent = (ev: Event) => {
      if (
        isOpen &&
        shouldCloseOnClickOutsideContent &&
        !contentRef.current?.contains(ev.target as HTMLElement)
      ) {
        close();
      }
    };

    window.addEventListener('click', handleClickOutsideContent, true);

    return () => {
      window.removeEventListener('click', handleClickOutsideContent, true);
    };
  }, [close, isOpen, shouldCloseOnClickOutsideContent]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal key="portal" mountId="modal-root">
      <FocusTrap
        focusTrapOptions={{
          preventScroll: true,
          fallbackFocus: '#initialFocus',
        }}
      >
        <motion.div
          animate={{ opacity: 1 }}
          className="relative z-max h-auto inset-0"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98],
          }}
        >
          <section className="fixed inset-0 z-100 text-white bg-black-100/50">
            <div className="flex h-full w-full no-scrollbar">
              <div
                className={clsx(
                  modalClasses,
                  'container h-full w-full overflow-y-auto no-scrollbar'
                )}
              >
                <div
                  className={clsx(contentClasses, 'relative py-20 text-left')}
                >
                  {showCloseButton && (
                    <button
                      tabIndex={0}
                      onClick={close}
                      className={clsx(
                        'top-0 right-0 z-100 mt-4 mr-4 flex cursor-pointer flex-col items-center',
                        isCloseButtonFixed ? 'fixed' : 'absolute'
                      )}
                    >
                      <span className="p-4">
                        <Icon
                          name="close"
                          className={crossClasses}
                          size={closeButtonIconSize}
                        />
                      </span>
                    </button>
                  )}
                  {children}
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </FocusTrap>
    </Portal>
  );
};

export default Modal;
