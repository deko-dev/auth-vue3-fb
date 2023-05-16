import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFMkEbT6dnfDVay97e4LrI2h3fSZhNRpY",
    authDomain: "vue3-fb-a0620.firebaseapp.com",
    projectId: "vue3-fb-a0620",
    storageBucket: "vue3-fb-a0620.appspot.com",
    messagingSenderId: "394219438557",
    appId: "1:394219438557:web:d3ba4491e9e67d30627634"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth( app );


export { app, auth }