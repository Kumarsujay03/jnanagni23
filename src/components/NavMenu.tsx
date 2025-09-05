// NavMenu.tsx

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import NextLink from 'next/link';
import MobileMenu from './MobileMenu';
import NavItem from './NavItem';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuth } from '@/context/authContext';

const defaultNavItems = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About Us',
  },
  {
    href: '/events',
    text: 'Event',
  },
  {
    href: '/gallery',
    text: 'Gallery',
  },
  {
    href: '/ourteam',
    text: 'Our Team',
  },
  {
    href: '/sponsors',
    text: 'Sponsors',
  },
];

const NavMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Set email state based on user data
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Create a local copy of navItems
  const [navItems, setNavItems] = useState([...defaultNavItems]);

  useEffect(() => {
    // Update localNavItems based on user login status
    setNavItems((prevNavItems) => {
      const dashboardItem = { href: user && user.isAdmin ? '/adminDashboard' : '/dashboard', text: 'Dashboard' };
      // If user is logged in and the dashboard item doesn't exist, add it
      if (user && !prevNavItems.find((item) => item.text === dashboardItem.text)) {
        return [...prevNavItems, dashboardItem];
      }

      // If user is not logged in and the dashboard item exists, remove it
      if (!user) {
        return prevNavItems.filter((item) => item.text !== dashboardItem.text);
      }

      // No changes needed
      return prevNavItems;
    });
  }, [user]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='text-white'>
      <div className='flex items-center justify-between max-w-6xl lg:max-w-[72rem] xl:max-w-6xl px-4 py-6 mx-auto sm:px-6'>
        <div className='flex justify-start lg:w-0 transition whitespace-nowrap hover:transition duration-300 text-2xl font-bold cursor-pointer '>
          <span className='sr-only'>Logo</span>
          <NextLink href='/' passHref>
            <span className=' opacity-100 hover:text-lightGreen dark:hover:text-lightGreen '>JÑĀNĀGNI</span>
          </NextLink>
        </div>
        <div className='-my-2 -mr-2 lg:hidden' onClick={handleClick}>
          <MobileMenu onClick={handleClick} />
        </div>
        <nav className='hidden space-x-6 text-lg justify-center lg:flex'>
          {navItems.map(({ href, text }, index) => (
            <NavItem key={index} href={href} text={text} showNav={text !== 'Home'} />
          ))}
          <>
            {email ? (
              <button
                onClick={handleLogout}
                className='hover:text-lightGreen dark:hover:text-emerald-500 bg-[#EACD69] hover:text-white text-black font-bold py-2 px-4 rounded-full text-center'
              >
                Logout
              </button>
            ) : (
              <NextLink href='/login'>
                <p className='hover:text-lightGreen dark:hover:text-emerald-500 bg-[#EACD69] hover:text-white text-black font-bold py-2 px-4 rounded-full text-center'>
                  Login
                </p>
              </NextLink>
            )}
          </>
        </nav>
      </div>
      {/* Mobile Menu Dialog */}
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} className='fixed inset-0 z-50 lg:hidden'>
          <Dialog.Overlay className='fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80' />
          <div className='fixed w-full max-w-xs p-6 text-base font-semibold text-gray-900 bg-white rounded-lg shadow-lg top-4 right-4 dark:bg-gray-800 dark:text-gray-400 dark:highlight-white/5'>
            <button
              onClick={handleClose}
              className='absolute flex items-center justify-center w-8 h-8 text-gray-500 top-5 right-5 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
            >
              <span className='sr-only'>Close navigation</span>
              <svg viewBox='0 0 10 10' className='w-2.5 h-2.5 overflow-visible' aria-hidden='true'>
                <path
                  d='M0 0L10 10M10 0L0 10'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                ></path>
              </svg>
            </button>
            <ul className='space-y-6'>
              {navItems.map(({ href, text }, index) => (
                <li key={index}>
                  <NextLink href={{ pathname: href, query: { showNav: text !== 'Home' ? 'true' : 'false' } }}>
                    <p className='hover:text-lightGreen dark:hover:text-emerald-500'>
                      {text}
                    </p>
                  </NextLink>
                </li>
              ))}

              {/* Include the login/logout button here */}
              <li>
                {email ? (
                  <button
                    onClick={handleLogout}
                    className='hover:text-lightGreen dark:hover:text-emerald-500 bg-[#EACD69] hover:text-white text-black font-bold py-2 px-4 rounded-full text-center'
                  >
                    Logout
                  </button>
                ) : (
                  <NextLink href='/login'>
                    <p className='hover:text-lightGreen dark:hover:text-emerald-500 bg-[#EACD69] hover:text-white text-black font-bold py-2 px-4 rounded-full text-center'>
                      Login
                    </p>
                  </NextLink>
                )}
              </li>
            </ul>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default NavMenu;