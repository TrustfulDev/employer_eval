// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check"
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

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcw6_wlAAAAABHtchZ3G6Sa7AtPtc8xVlhlUCnX'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

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

export const createReview = async (review) => {
  await addDoc(collection(db, 'review'), {
    payRating: review.payRating,
    difficultyRating: review.difficultyRating,
    enjoymentRating: review.enjoymentRating,
    flexibilityRating: review.flexibilityRating,
    lifeWorkRating: review.lifeWorkRating,
    cultureRating: review.cultureRating,
    diversityRating: review.diversityRating,
    comments: review.comments,
    employerID: review.employerId,
    userID: review.userId,
  })
}

export const createBookmark = async (employerId) => {
  await addDoc(collection(db, 'bookmarks'), {
    userID: auth.currentUser.uid,
    employerID: employerId,
  })
}