// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app); 

    const handleUserInteraction = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutUser, 5 * 60 * 1000); 
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleUserInteraction();
      }
    };

    const logoutUser = () => {
      // Perform logout actions
      signOut(auth).then(() => {
        // Redirect to logout page or do other cleanup
        console.log('User logged out due to inactivity');
      });
    };

    // Set up event listeners for user interaction
    document.addEventListener('mousemove', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userData = { /* retrieve user data as needed */ };

        setUser({
          uid: authUser.uid,
          name: userData.name,
          email: authUser.email,
          phone: userData.phone,
          registration: userData.registrationNumber,
          isAdmin: userData.isAdmin || false,
          isCore: userData.isCore || false,
          isVerified: userData.isVerified || false,
        });

        // Set up initial auto logout timer
        logoutTimer = setTimeout(logoutUser, 5 * 60 * 1000); // 5 minutes
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
      // Remove event listeners when component unmounts
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Clear the auto logout timer when component unmounts
      clearTimeout(logoutTimer);
    };
  }, []);

  let logoutTimer;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
