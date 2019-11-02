import * as firebase from "firebase";
import config from "./firebaseConfig";



const firebaseConfig = {
    apiKey: config.APIkEY,
    authDomain: config.AUTHDOMAIN,
    databaseURL: config.DATABASEURL,
    projectId: config.PROJECTID,
    storageBucket: config.STORAGEBUCKET,
    messagingSenderId: config.MESSAGINGSENDINGID,
    appId: config.APPID
};
// Initialize Firebase



const firebaseLooper = (snapshot) => {

    let data = [];
    snapshot.forEach(childSnapshot => {

        data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    return data;


}

//get user

const getUser = (id) => {

    return firebase.database().ref(`users/${id}`).once("value").then(snapshot => {

        return ({ id, ...snapshot.val() });
    })
}
firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.database();
export { firebase, firebaseDB, firebaseLooper, getUser }