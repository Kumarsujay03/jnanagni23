import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '@/context/authContext';

// Define the EventRegistration interface
interface EventRegistrationType {
    id: string;
    event_id: string;
    event_name: string;
    user_id: string;
    user_name: string;
    user_phone: string;
    user_email: string;
    verified: boolean;
    user_registeration: string;
}

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const [isShowNav, setIsShowNav] = useState(true);
    const [eventRegistrations, setEventRegistrations] = useState<EventRegistrationType[]>([]);
    const { user } = useAuth(); // Destructure the user object
    const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [participantDetails, setParticipantDetails] = useState<EventRegistrationType[]>([]);

    useEffect(() => {
        const handlePopstate = () => {
            setIsShowNav(true);
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        const fetchEventRegistrations = async () => {
            try {
                if (user) {
                    const userEventRegistrations = await getDocs(
                        query(collection(db, 'event_registration'), where('user_id', '==', user.uid))
                    );

                    const eventRegistrationsData: EventRegistrationType[] = userEventRegistrations.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            event_id: data.event_id,
                            event_name: data.event_name,
                            user_id: data.user_id,
                            user_name: data.user_name,
                            user_phone: data.user_phone,
                            user_email: data.user_email,
                            user_registeration: data.user_registrationNUm,
                            verified: data.verified || false,
                        };
                    });

                    setEventRegistrations(eventRegistrationsData);
                }
            } catch (error) {
                console.error('Error fetching event registrations:', error);
            }
        };

        fetchEventRegistrations();
    }, [user]);

    useEffect(() => {
        const fetchEventCounts = async () => {
            try {
                // Fetch all events
                const eventsCollection = collection(db, 'events');
                const eventsSnapshot = await getDocs(eventsCollection);

                const counts: Record<string, number> = {};

                // Loop through each event and fetch the count of registrations
                for (const eventDoc of eventsSnapshot.docs) {
                    const event = eventDoc.data();
                    const eventRegistrationSnapshot = await getDocs(
                        query(collection(db, 'event_registration'), where('event_id', '==', eventDoc.id))
                    );

                    counts[event.name] = eventRegistrationSnapshot.size;
                }

                setEventCounts(counts);
            } catch (error) {
                console.error('Error fetching event counts:', error);
            }
        };

        fetchEventCounts();
    }, []);

    const handleShowDetails = async (eventName: string) => {
        try {
            // Fetch participant details for the selected event
            const eventRegistrationSnapshot = await getDocs(
                query(collection(db, 'event_registration'), where('event_name', '==', eventName))
            );

            const details: EventRegistrationType[] = eventRegistrationSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    event_id: data.event_id,
                    event_name: data.event_name,
                    user_id: data.user_id,
                    user_name: data.user_name,
                    user_phone: data.user_phone,
                    user_email: data.user_email,
                    user_registeration: data.user_registrationNUm,
                    verified: data.verified || false,
                };
            });

            setSelectedEvent(eventName);
            setParticipantDetails(details);
        } catch (error) {
            console.error(`Error fetching details for ${eventName}:`, error);
        }
    };

    const handleVerify = async (participantId: string, newStatus: boolean) => {
        try {
            // Update the verification status in Firestore
            const participantDocRef = doc(db, 'event_registration', participantId);
            await updateDoc(participantDocRef, {
                verified: newStatus,
            });
    
            // Update the local state
            setParticipantDetails((prevDetails) =>
                prevDetails.map((participant) =>
                    participant.id === participantId ? { ...participant, verified: newStatus } : participant
                )
            );
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
    };

    return (
        <div>
            {isShowNav && <NavMenu />}

            <div className='bg-[#151515] pb-10'>
                <div className='md:px-12 xl:px-6'>
                    <div className='relative pt-36'>
                        <div className='lg:w-2/3 text-center mx-auto'>
                            <h1 className='text-white font-bold text-4xl md:text-6xl xl:text-7xl'>
                                Admin Dashboard<span className='text-primary text-green-700'>.</span>
                            </h1>
                        </div>
                    </div>

                    {/* Display the table */}
                    <div className='mx-auto px-2 py-2 lg:px-10 lg:pt-12'>
                        <div className='container justify-center lg:max-w-[1300px]'>
                            <table className='min-w-full'>
                                <thead>
                                    <tr>
                                        <th className='py-3 px-6 text-left text-white text-lg font-bold'>Event Name</th>
                                        <th className='py-3 px-6 text-left text-white text-lg font-bold'>Total Registrations</th>
                                        <th className='py-3 px-6 text-left text-white text-lg font-bold'>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Display rows for each event and its count */}
                                    {Object.entries(eventCounts).map(([eventName, count]) => (
                                        <tr key={eventName}>
                                            <td className='py-3 px-6 text-white'>{eventName}</td>
                                            <td className='py-3 px-6 text-white'>{count}</td>
                                            <td className='py-3 px-6 text-white'>
                                                <button
                                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                    onClick={() => handleShowDetails(eventName)}
                                                >
                                                    Show Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Display the sub-table for participant details */}
                            {selectedEvent && (
                                <div>
                                    <h2 className='text-white text-lg font-bold mt-4'>Participant Details for {selectedEvent}</h2>
                                    <table className='min-w-full mt-2'>
                                        <thead>
                                            <tr>
                                                <th className='py-3 px-6 text-left text-white text-lg font-bold'>Name</th>
                                                <th className='py-3 px-6 text-left text-white text-lg font-bold'>Email</th>
                                                <th className='py-3 px-6 text-left text-white text-lg font-bold'>Phone</th>
                                                <th className='py-3 px-6 text-left text-white text-lg font-bold'>Registration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {participantDetails.map((participant) => (
                                                <tr key={participant.id}>
                                                    <td className='py-3 px-6 text-white'>{participant.user_name}</td>
                                                    <td className='py-3 px-6 text-white'>{participant.user_email}</td>
                                                    <td className='py-3 px-6 text-white'>{participant.user_phone}</td>
                                                    <td className='py-3 px-6 text-white'>{participant.user_registeration}</td>
                                                    <button
                                                        className={`text-white ${participant.verified ? 'bg-green-700' : 'bg-red-700'
                                                            } hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                                                        onClick={() => handleVerify(participant.id, !participant.verified)}
                                                    >
                                                        {participant.verified ? 'Verified' : 'Unverified'}
                                                    </button>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
