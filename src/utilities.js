import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from './components/context/AuthContext/AuthContext';

const Utilities = () => {
  const { user } = useAuthContext();

  const getCurrentUserFromFirestore = async () => {
    const db = getFirestore();

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          return userDocSnapshot.data();
        } else {
          console.error('User document does not exist in Firestore');
          return null;
        }
      } catch (error) {
        console.error('Error fetching user from Firestore:', error);
        return null;
      }
    } else {
      console.error('No user is logged in');
      return null;
    }
  };

  return {
    getCurrentUserFromFirestore,
  };
};

export default Utilities;
