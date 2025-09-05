import { Auth, UserCredential, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, getAuth, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase } from 'firebase/auth';
import { Database, ref as databaseRef, set as databaseSet, getDatabase } from 'firebase/database';
import { app, auth } from '../../firebase';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CheckoutSessionArgs {
    // Define any arguments that the checkout_session endpoint expects
}

const onSuccess = (data: { request: { query: string }; data: unknown }) => {
    console.log('onSuccess', data);
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://yensplah-payment-backend.onrender.com',
    }),
    endpoints: (builder) => ({
        // ... other endpoints ...

        // login: builder.mutation({
        //     query: (credentials: { email: string; password: string }) => {
        //         // Use Firebase signInWithEmailAndPassword here
        //     //     return auth.s(credentials.email, credentials.password)
        //     //         .then((userCredential) => {
        //     //             const user = userCredential.user;
        //     //             return { data: user };
        //     //         })
        //     //         .catch((error) => {
        //     //             return { error };
        //     //         });
        //     // },
        // }),

        // signUp: builder.mutation({
        //     query: (userData: {
        //         name: string;
        //         email: string;
        //         phone: string;
        //         password: string;
        //         confirmPassword: string;
        //     }) => {
        //         // Use Firebase createUserWithEmailAndPassword here
        //         return auth.createUserWithEmailAndPassword(userData.email, userData.password)
        //             .then((userCredential) => {
        //                 const user = userCredential.user;
        //                 return { data: user };
        //             })
        //             .catch((error) => {
        //                 return { error };
        //             });
        //     },
        // }),
    }),
});

// export const {
//     useLoginMutation,
//     useSignUpMutation,
// } = apiSlice;
