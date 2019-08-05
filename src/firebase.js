import * as firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAiUpSvKCH92PnpKeFq6q9tIFcnpTFI4mQ",
    authDomain: "instagram-clone-4adab.firebaseapp.com",
    databaseURL: "https://instagram-clone-4adab.firebaseio.com",
    projectId: "instagram-clone-4adab",
    storageBucket: "instagram-clone-4adab.appspot.com",
    messagingSenderId: "324128873126",
    appId: "1:324128873126:web:e5aad9b7e22505cd"
};
// Initialize Firebase


const firebaseLooper = (snapshot) => {

    let data = [];
    snapshot.forEach(childSnapshot => {

        data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    return data;


}


firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.database();
export { firebase, firebaseDB, firebaseLooper }