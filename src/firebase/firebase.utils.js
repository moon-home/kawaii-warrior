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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const { displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            });
            console.log('additionalData:', additionalData);
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;