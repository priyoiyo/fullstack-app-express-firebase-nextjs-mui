require("dotenv").config();
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("firebase/auth");

const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../firebaseService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyDd6PW5Dnk-jX0Wok5ZOQvo7RhhXdqH8FY",
  authDomain: "ebuddy-93cfa.firebaseapp.com",
  projectId: "ebuddy-93cfa",
  storageBucket: "ebuddy-93cfa.appspot.com",
  messagingSenderId: "693298253209",
  appId: "1:693298253209:web:2170c24fe09e965dbcd708",
  measurementId: "G-0GQDTQFSS3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore();

module.exports = {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin,
  db,
};
