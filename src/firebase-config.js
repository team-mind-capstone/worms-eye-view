import {initializeApp} from "firebase/app"
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAIJjJthpmTBHfPElnfbClql6f1Owt7Zfg",
    authDomain: "wormseye-d1c52.firebaseapp.com",
    databaseURL: "https://wormseye-d1c52-default-rtdb.firebaseio.com",
    projectId: "wormseye-d1c52",
    storageBucket: "wormseye-d1c52.appspot.com",
    messagingSenderId: "1068806595819",
    appId: "1:1068806595819:web:cc8a3e73242c32d3094aae",
    measurementId: "G-HCEFKHCFP0"
  };

  const app=initializeApp(firebaseConfig)

  export const db=getFirestore(app)