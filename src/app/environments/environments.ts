// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 export const environments = {
  firebaseConfig : {
    apiKey: "AIzaSyASC7tauoW06BQ-QzfeVcd8qZoiwu4D94s",
    authDomain: "lotrwiki-angular.firebaseapp.com",
    databaseURL: "https://lotrwiki-angular-default-rtdb.firebaseio.com",
    projectId: "lotrwiki-angular",
    storageBucket: "lotrwiki-angular.appspot.com",
    messagingSenderId: "330315673795",
    appId: "1:330315673795:web:893a019b987a1961eeb276"
  }
 }
 

// Initialize Firebase
const app = initializeApp(environments.firebaseConfig);