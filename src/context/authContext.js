// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref as databaseRef, get } from 'firebase/database';
import { app } from '../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastActivity, setLastActivity] = useState(new Date());

  useEffect(() => {
    const auth = getAuth(app);
    const userDatabaseRef = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = databaseRef(userDatabaseRef, `users/${authUser.uid}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();

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
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    const handleUserActivity = () => {
      setLastActivity(new Date());
    };

    const checkAutoLogout = () => {
      const currentTime = new Date();
      const inactiveDuration = currentTime - lastActivity;

      // Set the auto-logout duration (5 minutes)
      const autoLogoutDuration = 1 * 60 * 1000;

      if (inactiveDuration > autoLogoutDuration) {
        // Perform logout action when inactive for more than 5 minutes
        signOut(auth);
      }
    };

    const handleBeforeUnload = () => {
      // Trigger the last activity update before unloading
      handleUserActivity();

      // Check for auto-logout one last time
      checkAutoLogout();
    };

    // Attach event listeners for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Check auto-logout every minute
    const checkAutoLogoutInterval = setInterval(checkAutoLogout, 60 * 1000);

    // Cleanup
    return () => {
      clearInterval(checkAutoLogoutInterval);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubscribe();
    };
  }, [lastActivity]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};