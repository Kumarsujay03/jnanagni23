import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db, realtimeDb } from '../../firebase';
import { useAuth } from '@/context/authContext';
import { DataSnapshot, Database, DatabaseReference, get, ref, set, update } from 'firebase/database';

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
interface UserDetailsType {
    user_id: string;
    name: string;
    email: string;
    phone: number;
    registration: string;
    isVerified: boolean;
}

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const [isShowNav, setIsShowNav] = useState(true);
    const [eventRegistrations, setEventRegistrations] = useState<EventRegistrationType[]>([]);
    const { user } = useAuth();
    const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [participantDetails, setParticipantDetails] = useState<EventRegistrationType[]>([]);
    const [userDetails, setUserDetails] = useState<UserDetailsType[]>([]);



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
    const handleUserVerify = async (userId: string, currentStatus: boolean) => {
        try {
            // Update the verification status in the Realtime Database
            const userRef = rtdbRef(realtimeDb, `users/${userId}`);
            await update(userRef, { isVerified: !currentStatus });


            // Update the local state
            setUserDetails((prevDetails) =>
                prevDetails.map((user) =>
                    user.user_id === userId ? { ...user, isVerified: !currentStatus } : user
                )
            );

            // Optionally, you can show a success message or handle other UI updates
            console.log(`User ${userId} has been ${!currentStatus ? 'verified' : 'unverified'}`);
        } catch (error) {
            console.error('Error updating user verification status:', error);
            // Optionally, you can show an error message or handle other UI updates
        }
    };


    function rtdbRef(realtimeDb: Database, arg1: string): DatabaseReference {
        return ref(realtimeDb, arg1);
    }


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (user && user.isCore) {
                    const usersRef = rtdbRef(realtimeDb, 'users');
                    const usersSnapshot = await get(usersRef);

                    const userDetails: UserDetailsType[] = [];

                    usersSnapshot.forEach((userSnapshot: DataSnapshot) => {
                        const userData = userSnapshot.val();
                        userDetails.push({
                            user_id: userSnapshot.key || '',
                            name: userData.name,
                            email: userData.email,
                            phone: userData.phone,
                            registration: userData.registrationNumber,
                            isVerified: userData.isVerified || false,
                        });
                    });

                    setUserDetails(userDetails);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [user]);

    const sortedUserDetails = userDetails.sort((a, b) => {
        // Assuming isVerified is a boolean property
        if (a.isVerified && !b.isVerified) {
          return 1; // Move verified users to the end
        } else if (!a.isVerified && b.isVerified) {
          return -1; // Move unverified users to the beginning
        } else {
          return 0; // Leave the order unchanged for users with the same verification status
        }
      });
      


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
                            <div>
                                <h2 className='text-white text-lg font-bold mt-4'>Users Details for Verification</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='py-3 px-6 text-left text-white text-lg font-bold'>Name</th>
                                            <th className='py-3 px-6 text-left text-white text-lg font-bold'>Email</th>
                                            <th className='py-3 px-6 text-left text-white text-lg font-bold'>Phone</th>
                                            <th className='py-3 px-6 text-left text-white text-lg font-bold'>Registration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedUserDetails.map((user) => (
                                            <tr key={user.user_id}>
                                                <td className='py-3 px-6 text-white'>{user.name}</td>
                                                <td className='py-3 px-6 text-white'>{user.email}</td>
                                                <td className='py-3 px-6 text-white'>{user.phone}</td>
                                                <td className='py-3 px-6 text-white'>{user.registration}</td>
                                                <td className='py-3 px-6 text-white'>
                                                    <button
                                                        className={`text-white ${user.isVerified ? 'bg-green-700' : 'bg-red-700'}
        hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                                                        onClick={() => handleUserVerify(user.user_id, user.isVerified)}
                                                    >
                                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

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
                                                    <td className='py-3 px-6 text-white'>
                                                        <button
                                                            className={`text-white ${participant.verified ? 'bg-green-700' : 'bg-red-700'
                                                                } hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                                                            onClick={() => handleVerify(participant.id, !participant.verified)}
                                                        >
                                                            {participant.verified ? 'Verified' : 'Unverified'}
                                                        </button>
                                                    </td>
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
function rtdbRef(realtimeDb: Database, arg1: string) {
    throw new Error('Function not implemented.');
}

