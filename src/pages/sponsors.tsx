import React from 'react';
import Image from 'next/image';
import NavMenu from '@/components/NavMenu';
import { useRouter } from 'next/router';

interface SponsorType {
    id: number;
    image: string;
}

const Sponsors = () => {
    const router = useRouter();
    const showNav = router.query.showNav;

    // Replace these URLs with your actual sponsor image URLs
    const sponsorLinks: SponsorType[] = [
        { id: 1, image: 'https://res.cloudinary.com/dse70o2yh/image/upload/f_auto,q_auto/v1/sponcers/ou0xbv0dxfqe1xjp6em1' },
        { id: 2, image: 'https://res.cloudinary.com/dse70o2yh/image/upload/f_auto,q_auto/v1/sponcers/qhtpivouwxrug6dvo6gb' },
        { id: 3, image: 'https://res.cloudinary.com/dse70o2yh/image/upload/f_auto,q_auto/v1/sponcers/awlvdxrrpat8iyvfbizb' },
        { id: 4, image: 'https://res.cloudinary.com/dse70o2yh/image/upload/f_auto,q_auto/v1/sponcers/e0vkrrevl7qx2ehcavbw' },
        { id: 5, image: 'https://res.cloudinary.com/dse70o2yh/image/upload/f_auto,q_auto/v1/sponcers/u0ped33wd8x0tdbcrzhi' },
        { id: 6, image: 'https://res.cloudinary.com/dse70o2yh/image/upload/f_auto,q_auto/v1/sponcers/grl1mpin2qn0b7aobrcu' },
    ];

    return (
        <>
            {showNav && <NavMenu />}
            <div className='bg-[#151515] pb-10'>
                <div className="md:px-12 xl:px-6 ">
                    <div className="relative pt-36 ">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl">Sponsors<span className="text-primary text-green-700">.</span></h1>
                        </div>
                    </div>
                </div>
                <div className="mx-auto px-2 py-2 lg:px-10 lg:pt-12 ">
                    <div className="container justify-center lg:max-w-[1300px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sponsorLinks.map((sponsor) => (
                                <div key={sponsor.id} className='bg-slate-100 p-3 justify-center flex rounded-3xl m-4'>
                                    <div className="w-full h-auto overflow-hidden flex justify-center items-center">
                                        <Image
                                            className="w-full h-auto rounded-xl"
                                            src={sponsor.image}
                                            alt=""
                                            width={400}
                                            height={400}
                                            priority
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sponsors;