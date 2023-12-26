import React, { useEffect, createContext, useContext, useState ,useCallback} from "react";
import { auth, firestore } from "../../../Firebase/firebase"; // Fix the import
import { doc, getDoc } from "firebase/firestore";

// Create our context with the imported createContext from React
const AuthContext = createContext();

// Create a provider for our context
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      // Fix the path to 'auth'
      if (authUser) {
        // User is signed in
        console.log("Authenticated user:", authUser);
        setAuthenticatedUser(authUser);
      } else {
        // No user is signed in
        console.log("No user signed in.");
        setUser(null); // Set the user state to null when no user is signed in
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const getCurrentUserFromFirestore = useCallback(async () => {
    // setLoading(true);
    try {
      // Get the current user's UID
      const uid = auth.currentUser.uid;

      // Reference to the user document in Firestore
      const userDocRef = doc(firestore, "users", uid);

      // Get the user document from Firestore
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData;
      } else {
        console.log("User document does not exist in Firestore.");
        return null;
      }
    } catch (error) {
      console.error("Error getting user data from Firestore:", error);
      throw error;
    }
  }, []); 


  const fetchData = useCallback(async () => {
    try {
      const userData = await getCurrentUserFromFirestore();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [getCurrentUserFromFirestore, setUser]);

  useEffect(() => {
    if (authenticatedUser) {
      console.log(true);
      fetchData();
    } else {
      console.log(false);
    }
  }, [authenticatedUser, fetchData]);

  const payload = {
    user,
    setUser,
    fetchData,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

// Creating a custom hook for the context
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// export { fetchData };