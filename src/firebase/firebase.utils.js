import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBC3B0ZpX7WmuX0XgeNffVs7biJEU7hegg",
    authDomain: "kawaii-warrior.firebaseapp.com",
    databaseURL: "https://kawaii-warrior.firebaseio.com",
    projectId: "kawaii-warrior",
    storageBucket: "kawaii-warrior.appspot.com",
    messagingSenderId: "955175811748",
    appId: "1:955175811748:web:ff660f0e63d110a1088431",
    measurementId: "G-CSGFEN1X64"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;