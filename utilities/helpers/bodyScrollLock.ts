const bodyScrollLock = (isScrollLocked: boolean) => {
  const documentElementScroll =
    document.documentElement.style.getPropertyValue('--scroll-y');
  const cacheLocator = documentElementScroll || `${window.scrollY}px`;

  if (!documentElementScroll) {
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty(
        '--scroll-y',
        `${window.scrollY}px`
      );
    });
  }

  if (isScrollLocked) {
    const scrollY = cacheLocator;
    const { body } = document;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
  } else {
    const { body } = document;
    body.style.position = '';
    const scrollY = body.style.top || cacheLocator;
    body.style.top = '';
    window.scrollTo(0, Math.abs(parseInt(scrollY || '0', 10)));
  }
};

export default bodyScrollLock;
