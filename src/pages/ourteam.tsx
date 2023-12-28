import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { twitter, linkedin, github } from '../images/icons';
import NavMenu from '@/components/NavMenu';
import { useRouter } from 'next/router';
import Image from 'next/image';


interface TeamMember {
    name: string;
    image: string; // Change to string as Firestore stores URLs as strings
    year: string;
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
    category: string;
}

const Ourteam = () => {
    const router = useRouter();
    const showNav = router.query.showNav;

    const [teamDetails, setTeamDetails] = useState<TeamMember[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('');

    // Fetch data from Firestore
    const fetchTeamData = async () => {
        const db = getFirestore();
        const teamCollection = collection(db, 'team');
        const teamSnapshot = await getDocs(teamCollection);
        const teamData: TeamMember[] = [];

        teamSnapshot.forEach((doc) => {
            teamData.push(doc.data() as TeamMember);
        });

        setTeamDetails(teamData);

        // Set the default category as the first category in your data
        if (teamData.length > 0) {
            setActiveCategory(teamData[0].category);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, []);

    // Group team members by category
    const teamByCategory: Record<string, TeamMember[]> = teamDetails.reduce((acc, member) => {
        if (!acc[member.category]) {
            acc[member.category] = [];
        }
        acc[member.category].push(member);
        return acc;
    }, {} as Record<string, TeamMember[]>);

    const handleTabClick = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <>
            {showNav && <NavMenu />}
            <div className="flex justify-center">
                <div className="md:px-12 xl:px-6">
                    <div className="relative pt-36">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl">
                                OUR <span className="text-primary text-[#EACD69]">TEAM.</span>
                            </h1>
                        </div>
                    </div>

                    {/* Display tabs for each category */}
                    <div className="flex justify-center mt-8 space-x-4">
                        {Object.keys(teamByCategory).map((category) => (
                            <div
                                key={category}
                                onClick={() => handleTabClick(category)}
                                className={`text-white hover:bg-[#EACD69] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center ${category === activeCategory
                                    ? 'bg-[#EACD69]'
                                    : 'bg-green-700 dark:bg-green-600'
                                    }`}
                            >
                                {category}
                            </div>
                        ))}
                    </div>

                    {/* Display team members for the active category */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 m-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-10">
                        {teamByCategory[activeCategory]?.map((item) => (
                            <div key={item.name} className="w-[300px] px-6 py-6 text-center bg-slate-200 rounded-lg lg:mt-0 xl:px-10">
                                <div className="space-y-4 xl:space-y-6">
                                    <img className="mx-auto rounded-full h-36 w-36" src={item.image} alt="author avatar" />
                                    <div className="space-y-2">
                                        <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                                            <h1 className="text-black font-bold">{item.name}</h1>
                                            <p className="text-black">{item.year}</p>
                                            <div className="flex justify-center mt-5 space-x-5">
                                                <a href={item.twitter} target="_blank" rel="noopener noreferrer" className="inline-block text-white">
                                                    <span className="sr-only">Twitter</span>
                                                    <Image src={twitter} alt="twitter" width="20" />
                                                </a>
                                                <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400">
                                                    <span className="sr-only">GitHub</span>
                                                    <Image src={github} alt="github" width="20" />
                                                </a>
                                                <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <Image src={linkedin} alt="linkedin" width="20" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ourteam;