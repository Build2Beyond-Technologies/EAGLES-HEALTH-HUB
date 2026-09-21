export const pagePaths = {
  home: '/',
  about: '/about_us',
  'lifestyle-medicine': '/lifestyle-medicine',
  'free-community': '/free-community',
  'premium-membership': '/premium-membership',
  programs: '/programs',
  'book-consultation': '/book-consultation',
  'speaking-engagements': '/speaking-engagements',
  'medical-supplies': '/medical-supplies',
  blog: '/blog',
  'contact-faq': '/contact-faq',
  admin: '/admin',
};

export function pageFromPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/about' || path === '/about-us') return 'about';
  return Object.keys(pagePaths).find(page => pagePaths[page] === path) ?? null;
}

// Preserve browser behaviour for new tabs, downloads and modified clicks.
export function followPageLink(event, navigate, page) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate(page);
}
