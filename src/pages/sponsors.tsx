import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavMenu from '@/components/NavMenu';
import { useRouter } from 'next/router';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../firebase';

interface EventType {
    id: string;
    image: string;
}

const Sponsors = () => {
    const router = useRouter();
    const showNav = router.query.showNav;
    const [sponsors, setSponsors] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const sponcersCollection = await getDocs(query(collection(db, 'sponcers')));
                const sponcerData: EventType[] = sponcersCollection.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        image: data.image || 'Default Image URL',
                    };
                });
                setSponsors(sponcerData);
            } catch (error) {
                console.error('Error fetching events from Firestore:', error);
            }
        };

        fetchSponsors();
    }, []);

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
                            {sponsors.map((sponsor) => (
                                <div key={sponsor.id} className='bg-slate-100 p-3 justify-center flex rounded-3xl m-4'>
                                    <div className="w-full h-auto overflow-hidden">
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