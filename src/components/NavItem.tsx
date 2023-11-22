// NavItem.tsx

import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NavItem = ({ href, text, showNav }: { href: any; text: string; showNav?: boolean }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={{ pathname: href, query: showNav ? { showNav: true } : undefined }}>
      <span
        className={`${
          isActive
            ? 'font-bold text-white py-1 border-b-2 border-teal-400 dark:border-teal-500'
            : 'font-normal text-gray-200 dark:text-gray-400'
        } hidden md:inline-block p-1 sm:px-4 sm:py-2 rounded-full hover:text-black hover:bg-gray-100 dark:hover:bg-midnight transition-all`}
      >
        {text}
      </span>
    </NextLink>
  );
};

export default NavItem;
