import React, { useState } from 'react'
import { sujay, profile, mayank, saurabh, sujal, aman, shaswat, aakash, mohit, devashish, priyanshu, rudra, akshat, aryan, ashutosh, pranjal, ankit, anshuman } from '../images/team'
import Image, { StaticImageData } from 'next/image'
import { twitter, linkedin, github } from '../images/icons';
import NavMenu from '@/components/NavMenu';
import { useRouter } from 'next/router';


interface TeamMember {
    name: string;
    image: StaticImageData;
    year: string;
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
    category: string;
}

const teamDetails: TeamMember[] = [
    {
        name: 'Sujay Kumar',
        image: sujay,
        year: "3'rd year ECE",
        linkedin: 'https://www.linkedin.com/in/kumarsujay03/',
        github: 'https://github.com/kumar_sujay03',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/Kumarsujay03',
        category: 'Web Lead',
    },
    {
        name: 'Mayank Chaturvedy',
        image: mayank,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/mayank-chaturvedy/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Saurabh Singh',
        image: saurabh,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Akash Kumar',
        image: aakash,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Shashwat Gupta',
        image: shaswat,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Aman Patel',
        image: aman,
        year: "3'rd year ECE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Sujal Sharma',
        image: sujal,
        year: "3'rd year ECE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Devansh Saini',
        image: devashish,
        year: "3'rd year EE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Mohit Verma',
        image: mohit,
        year: "3'rd year EE",
        linkedin: 'https://www.linkedin.com/in/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Priyanshu Jingar',
        image: priyanshu,
        year: "3'rd year ME",
        linkedin: 'https://www.linkedin.com/in/priyanshu-jingar-286b3a236?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/Priyanshu020713?t=yuq2WXewqqhgAHQKpBrqyw&s=08',
        instagram: 'https://www.instagram.com/',
        category: 'Core Lead',
    },
    {
        name: 'Akshat Sengar',
        image: akshat,
        year: "3'rd year ECE",
        linkedin: 'https://linkedin.com/in/theakshatsengar',
        github: 'https://youtube.com/theakshatsengar',
        twitter: 'https://twitter.com/theakshatsengar',
        instagram: 'https://www.instagram.com/',
        category: 'Event Lead',
    },
    {
        name: 'Ankit Parida',
        image: ankit,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/ankit-parida-525021242/',
        github: 'https://github.com/Ankit6989',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Event Lead',
    },
    {
        name: 'Ashutosh Kumar',
        image: ashutosh,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/ashutosh-kumar-4b1a65297/',
        github: 'https://github.com/akvishvabandhu207',
        twitter: 'https://x.com/Ashutoshku13778?t=MVnyjfFXPSUNmSG2XXi4HQ&s=09',
        instagram: 'https://www.instagram.com/',
        category: 'Event Lead',
    },
    {
        name: 'Anshuman Rath',
        image: anshuman,
        year: "3'rd year CSE",
        linkedin: 'http://www.linkedin.com/in/anshuman-rath-23aa64235',
        github: 'http://github.com/javarath',
        twitter: 'http://twitter.com/AnshumanRath14',
        instagram: 'https://www.instagram.com/',
        category: 'Event Lead',
    },
    {
        name: 'Ariyan Mahakur',
        image: aryan,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/ariyan-mahakur-28a156229/',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Event Lead',
    },
    {
        name: 'Pranjal Mani Dwivedi',
        image: pranjal,
        year: "3'rd year CSE",
        linkedin: 'http://www.linkedin.com/in/pranjal-mani-dwivedi',
        github: 'https://github.com/Pranjalmani',
        twitter: 'https://twitter.com/MrPrjld1',
        instagram: 'https://www.instagram.com/',
        category: 'Event Lead',
    },
    {
        name: 'Rudra Prakash Pandey',
        image: rudra,
        year: "3'rd year CSE",
        linkedin: 'https://www.linkedin.com/in/rudraprakashpandey',
        github: 'https://github.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        category: 'Finance Lead',
    },
];

const Ourteam = () => {
    const router = useRouter();
    const showNav = router.query.showNav;

    // Group team members by category
    const teamByCategory: Record<string, TeamMember[]> = teamDetails.reduce((acc, member) => {
        if (!acc[member.category]) {
            acc[member.category] = [];
        }
        acc[member.category].push(member);
        return acc;
    }, {} as Record<string, TeamMember[]>);

    const [activeCategory, setActiveCategory] = useState<string>(Object.keys(teamByCategory)[0]);

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
                        {teamByCategory[activeCategory].map((item) => (
                            <div key={item.name} className="w-[300px] px-6 py-6 text-center bg-slate-200 rounded-lg lg:mt-0 xl:px-10">
                                <div className="space-y-4 xl:space-y-6">
                                    <Image className="mx-auto rounded-full h-36 w-36" src={item.image.src} alt="author avatar" width={20} height={30} />
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