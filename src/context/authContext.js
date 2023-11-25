// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as databaseRef, get } from 'firebase/database';
import { app } from '../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app); // Get the auth instance

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = databaseRef(getDatabase(), `users/${authUser.uid}`);
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

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
