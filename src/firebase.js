// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "employer-eval.firebaseapp.com",
  projectId: "employer-eval",
  storageBucket: "employer-eval.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const createUser = async (user, userInfo) => {
  await addDoc(collection(db, 'user'), {
    uid: user,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    bookmark: null
  });
}

export const createEmployer = async (employer) => {
  await addDoc(collection(db, 'employer'), {
    employerName: employer.employerName,
    streetAddress: employer.streetAddress,
    city: employer.city,
    state: employer.state,
    zipCode: employer.zipCode,
    rating: employer.rating
  })
}