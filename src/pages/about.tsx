import React from 'react';
import { image4, image15, image10 } from '../images/gallery';
import Image from 'next/image';
import yit from '../images/yit.jpg';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';

const About = () => {
  const router = useRouter();

  return (
    <div>
      {router.query.showNav && <NavMenu />}
      <div className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] text-white">
        <div className="container mx-auto">
          <div className="md:px-12 xl:px-6">
            <div className="relative">
              <div className="lg:w-2/3 md:text-center mx-auto">
                <h1 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl">About<span className="text-primary text-[#EACD69]"> Us.</span></h1>
              </div>
            </div>
          </div>
          <div className="-mx-4 mt-10 flex flex-wrap items-center justify-between">
            <div className="w-full px-4 lg:w-6/12">
              <div className="-mx-3 flex items-center sm:-mx-4">
                <div className="relative z-10 my-4 h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter">
                  <Image
                    src={yit}
                    alt=""
                    className="h-[350px] rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <p className="text-body-color text-justify mb-8 text-base">
                  In the year 2000 Faculty of Engineering & Technology was established with an aim of imparting technical education in the spiritual surroundings of the Gurukula System. Keeping in mind the importance of technocrats with strong moral character, superior knowledge, and devotion to the nation. FET is one of the richest faculty of Gurukula Kangri (Deemed to be University), with a huge number of books in the library, well-equipped electronics electrical and mechanical laboratories, latest software, and computers in computer labs. Football field, Tennis court, Volleyball court, Basketball arena, and open gym for the students with athletic interests.
                </p>
              </div>
            </div>
          </div>
          <div className="md:px-12 xl:px-6">
            <div className="relative pt-36 ">
              <div className="lg:w-2/3 md:text-center mx-auto">
                <h1 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl">About<span className="text-primary text-[#EACD69]"> Jnanagni.</span></h1>
              </div>
            </div>
          </div>
          <div className="-mx-4 mt-10 flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <p className="text-body-color mb-8 text-justify text-base">
                  Jnanagni 2023, the annual techno-cultural fest of Gurukul Kangri (Deemed to be) University, Haridwar, continues to be a testament to the institution's rich history, spanning over a century. This national-level event is a grand celebration of innovation and creativity, featuring a plethora of competitive competitions and entertaining events that ignite the enthusiasm of participants and spectators alike. With its deep-rooted tradition and modern approach, Jnanagni 2023 promises to be a vibrant and unforgettable experience, uniting talent and passion in the picturesque city of Haridwar.
                </p>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="-mx-3 flex items-center sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <Image
                      src={image15}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <Image
                      src={image4}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <Image
                      src={image10}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
