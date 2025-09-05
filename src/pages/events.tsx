import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Footer from '@/components/Footer';

interface EventType {
  id: string;
  name: string;
  alias: string;
  image: string;
  aboutEvent: string;
  eventDetail: string[];
  rulebook: string;
  schedule: {
    day: string;
    venue: string;
    time: string;
  };
  // Add other properties or adjust as needed
}

const Events = ({ headerShown }: { headerShown: any }) => {
  const router = useRouter();
  let showNav = router.query.showNav;
  const [isShowNav, setIsShowNav] = useState(showNav === 'true');
  const [events, setEvents] = useState<EventType[]>([]);

  const showAllEvents = router.query.allEvents === 'true';

  useEffect(() => {
    const handlePopstate = () => {
      setIsShowNav(false);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  useEffect(() => {
    const getEventsFromFirestore = async () => {
      try {
        const eventsCollection = await getDocs(query(collection(db, 'events')));
        const eventsData: EventType[] = eventsCollection.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Add the document ID to the event data
            name: data.name || 'Default Name',
            alias: data.alias || 'Default Alias',
            image: data.image || 'Default Image URL',
            aboutEvent: data.aboutEvent || 'Default About Event',
            eventDetail: data.eventDetail || ['Default Event Detail'],
            rulebook: data.rulebook || 'Default Rulebook URL',
            schedule: {
              day: data.schedule?.day || 'Default Day',
              venue: data.schedule?.venue || 'Default Venue',
              time: data.schedule?.time || 'Default Time',
            },
          };
        });
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    };

    getEventsFromFirestore();
  }, []);

  useEffect(() => {
    const showNavQueryParam = router.query.showNav === 'true';
    setIsShowNav(showNavQueryParam);
  }, [router.query.showNav]);

  const shouldShowNavMenu = headerShown && isShowNav;
  const eventToShow = showAllEvents ? events : events.slice(0, 6);

  return (
    <>
      {isShowNav && <NavMenu />}
      <div className='bg-[#151515] pb-10'>
        <div className='md:px-12 xl:px-6'>
          <div className='relative pt-36'>
            <div className='lg:w-2/3 text-center mx-auto'>
              <h1 className='text-white font-bold text-4xl md:text-6xl xl:text-7xl'>
                Events<span className='text-primary text-green-700'>.</span>
              </h1>
            </div>
          </div>
          <div className='mx-auto px-2 py-2 lg:px-10 lg:pt-12'>
            <div className='container justify-center lg:max-w-[1300px]'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {eventToShow.map((event) => (
                  <Link key={event.id} href={{ pathname: `/event/${event.id}` }}>
                    <div className='bg-slate-100 p-3 rounded-3xl m-4 cursor-pointer'>
                      <div>
                        <Image
                          className='rounded-xl'
                          src={event?.image || ''}
                          width={500}
                          height={584}
                          alt={'article cover'}
                          style={{ objectFit: 'cover', objectPosition: 'center', width: 'auto', height: 'auto' }}
                          priority
                        />
                      </div>
                      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 pt-3 text-center '>
                        {event.name}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {!showAllEvents && (
            <Link href={{ pathname: '/events', query: { allEvents: true, showNav: true } }} className='lg:w-2/3 md:text-center mx-auto flex justify-center'>
              <button
                type='button'
                className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                More Events
              </button>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;