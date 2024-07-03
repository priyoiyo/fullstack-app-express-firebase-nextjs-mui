const { db } = require("../config/firebaseConfig");

export const getUserProfile = async (uid: string) => {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return {
        location: '',
        phoneNumber: '',
        photoProfileUrl: '',
      }
    }
    return userDoc.data();
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const updateUserProfile = async (uid: string, userProfile: any) => {
  await db.collection('users').doc(uid).set(userProfile, { merge: true });
  return userProfile;
};