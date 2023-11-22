import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Auth,
    UserCredential,
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    getAuth,
} from 'firebase/auth';
import {
    Database,
    ref as databaseRef,
    set as databaseSet,
    get,
    getDatabase,
} from 'firebase/database';
import { app } from '../../firebase';
import { useAuth } from '@/context/authContext';
import Container from '@/components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth: Auth = getAuth(app);

export default function Login() {
    type UserType = {
        id: string;
        name: string;
    };

    const database: Database = getDatabase(app);
    const { user } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loginData, setLoginData] = useState<{ user: UserType } | null>(null);
    const [loginError, setLoginError] = useState<null | string>(null);
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [signUpError, setSignUpError] = useState<null | string>(null);

    const validateEmail = (value: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validatePhoneNumber = (value: string): boolean =>
        /^\d{10}$/.test(value);

    const validatePassword = (value: string): boolean =>
        /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value);

    const handleFirebaseError = (error: any) => {

        let errorMessage = 'An error occurred. Please try again.';

        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'User not found. Please check your credentials.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Email is already in use. Please use a different email.';
                break;
            default:
                errorMessage =
                    error.code === 'auth/invalid-login-credentials'
                        ? 'Invalid login credentials. Please check your email and password.'
                        : error.message;
                break;
        }

        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    };

    const handleFirebaseLogin = async () => {
        try {
            setLoginLoading(true);
            const response: UserCredential = await signInWithEmailAndPasswordFirebase(
                auth,
                email,
                password
            );

            // Check if the user has the "isAdmin" key in the database
            const userRef = databaseRef(
                database,
                `users/${response.user.uid}`
            );
            const userSnapshot = await get(userRef);
            const isAdmin = userSnapshot.val()?.isAdmin;

            // Redirect based on the isAdmin key
            if (isAdmin) {
                router.replace('/adminDashboard');
            } else {
                router.replace('/dashboard');
            }
        } catch (error: any) {
            handleFirebaseError(error);
            // Set login error
            setLoginError(error.message); // Or handle it in a way that suits your application
        } finally {
            setLoginLoading(false);
        }
    };

    const handleFirebaseSignUp = async () => {
        try {
            setSignUpLoading(true);
            const response: UserCredential = await createUserWithEmailAndPasswordFirebase(
                auth,
                email,
                password
            );

            // Extract user information from the UserCredential
            const user: UserType = {
                id: response.user.uid,
                name,
                // Add other properties as needed
            };

            await databaseSet(
                databaseRef(database, `users/${response.user.uid}`),
                {
                    name,
                    email,
                    phone,
                }
            );

            console.log('Signed up successfully', response);
            router.replace('/dashboard');
            setLoginData({ user });
        } catch (error: any) {
            handleFirebaseError(error);
            setSignUpError(error.message);
        } finally {
            setSignUpLoading(false);
        }
    };

    const toggleSection = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (isSignUp) {
            // Validation for signup
            if (
                !validateEmail(email) ||
                !validatePhoneNumber(phone) ||
                !validatePassword(password) ||
                password !== confirmPassword
            ) {
                // Validation failed
                return;
            }

            // Call Firebase sign-up function
            await handleFirebaseSignUp();
        } else {
            // Call Firebase login function
            await handleFirebaseLogin();
        }
    };

    useEffect(() => {
        // Handle successful sign up
        if (loginData?.user) {
            // Example: Redirect to the dashboard or show a success message
            //('/Dashboard');
            console.log('Successfully signed up:', loginData);
        }
    }, [loginData, router]);

    return (
        <Container>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl text-white font-bold sm:text-3xl">
                        {isSignUp ? 'Sign Up' : 'Login'} to book your ticket
                    </h1>
                    <p className="mt-4 text-gray-500">
                        Please use your GKV Email if available
                    </p>
                </div>
                <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    {isSignUp && (
                        <>
                            <div>
                                <label className="sr-only">Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="sr-only">Phone</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${validatePhoneNumber(phone)
                                                ? 'border-green-500'
                                                : 'border-red-500'
                                            }`}
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {!validatePhoneNumber(phone) && phone && (
                                        <p className="text-red-500 mt-2">
                                            Please enter a valid 10-digit phone number
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        <label className="sr-only">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${validateEmail(email) ? 'border-green-500' : 'border-red-500'
                                    }`}
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {isSignUp && !validateEmail(email) && email && (
                                <p className="text-red-500 mt-2">
                                    Please enter a valid email address
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="sr-only">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${validatePassword(password)
                                        ? 'border-green-500'
                                        : 'border-red-500'
                                    }`}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isSignUp && !validatePassword(password) && password && (
                                <p className="text-red-500 mt-2">
                                    Password must be at least 6 characters long and include a
                                    number
                                </p>
                            )}
                            {loginError && (
                                <p className="text-red-500 mt-2">
                                    {(loginError as any)?.data?.message}
                                </p>
                            )}
                            {signUpError && (
                                <p className="text-red-500 mt-2">
                                    {(signUpError as any)?.data?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {isSignUp && (
                        <div>
                            <label className="sr-only">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${confirmPassword === password
                                            ? 'border-green-500'
                                            : 'border-red-500'
                                        }`}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {confirmPassword !== password && confirmPassword && (
                                    <p className="text-red-500 mt-2">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center">
                        <button
                            onClick={handleSubmit}
                            className="inline-block mt-5 w-full hover:text-lightGreen dark:hover:text-emerald-500 rounded-lg bg-[#EACD69] px-5 py-3 text-sm font-bold text-black"
                        >
                            {isSignUp
                                ? signUpLoading
                                    ? 'Signing Up...'
                                    : 'Sign Up'
                                : loginLoading
                                    ? 'Logging In...'
                                    : 'Login'}
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={toggleSection}
                            className="text-gray-500 hover:underline focus:outline-none"
                        >
                            {isSignUp
                                ? 'Already have an account? Sign In'
                                : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </Container>
    );
}
