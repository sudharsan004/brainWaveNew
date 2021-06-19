  
import firebase from 'firebase/app';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAx43h4pge6M71n-JiyEyv9IsxGglUkO2Y",
    authDomain: "face-guess-2e0a6.firebaseapp.com",
    projectId: "face-guess-2e0a6",
    storageBucket: "face-guess-2e0a6.appspot.com",
    messagingSenderId: "906987871333",
    appId: "1:906987871333:web:aac7bd16b552acec15ba8c",
    measurementId: "G-7CDSNBYRTV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;