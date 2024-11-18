import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyC_1-ajFKNlfBANEVfFfqmtCj8C2jmfXuI",
    authDomain: "applibreria-8ab65.firebaseapp.com",
    projectId: "applibreria-8ab65",
    storageBucket: "applibreria-8ab65.firebasestorage.app",
    messagingSenderId: "586065140492",
    appId: "1:586065140492:web:0611d99a65a2d707ddc729"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const appFirebase = initializeApp(firebaseConfig);

export { appFirebase, firebase };
