import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import {
  image1,
  image2,
  image4,
  image3,
  image5,
  image6,
  image8,
  image9,
  image12,
  image15,
  image14,
  image7,
  image16,
  image17,
  image18,
  image21,
  image20,
  image19,
} from '../images/gallery';

const images = [
  { image: image1, className: '' },
  { image: image2, className: '' },
  { image: image4, className: 'tall' },
  { image: image3, className: 'wide' },
  { image: image5, className: '' },
  { image: image6, className: 'tall' },
  { image: image8, className: 'big' },
  { image: image9, className: '' },
  { image: image12, className: 'wide' },
  { image: image15, className: 'big' },
  { image: image14, className: 'tall' },
  { image: image7, className: '' },
  { image: image16, className: '' },
  { image: image17, className: '' },
  { image: image18, className: '' },
  { image: image21, className: 'wide' },
  { image: image20, className: '' },
  { image: image19, className: '' },
];

const Gallery = () => {
  const router = useRouter();
  let showNav = router.query.showNav;
  const [isShowNav, setIsShowNav] = useState(showNav === 'true');

  useEffect(() => {
    const handlePopstate = () => {
      setIsShowNav(false);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <>
      {isShowNav && <NavMenu />}
      <section className="p-10 md:p-20">
        <div className="md:px-12 xl:px-6">
          <div className="relative pt-36">
            <div className="lg:w-2/3 md:text-center mx-auto">
              <h1 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl">
                GLIMPSES OF <span className="text-primary text-green-700">JÑĀNĀGNI</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="grid-wrapper mt-10">
          {images.map((item, index) => (
            <div key={index} className={item.className}>
              <Image src={item.image} alt="" priority={true} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Gallery;
