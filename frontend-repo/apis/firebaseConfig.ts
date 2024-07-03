import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDd6PW5Dnk-jX0Wok5ZOQvo7RhhXdqH8FY",
    authDomain: "ebuddy-93cfa.firebaseapp.com",
    projectId: "ebuddy-93cfa",
    storageBucket: "ebuddy-93cfa.appspot.com",
    messagingSenderId: "693298253209",
    appId: "1:693298253209:web:2170c24fe09e965dbcd708",
    measurementId: "G-0GQDTQFSS3",
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
