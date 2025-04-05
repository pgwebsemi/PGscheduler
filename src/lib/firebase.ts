import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeNg7LfZ3FfjGH3IgnHdfWANDO5YN-9Aw",
  authDomain: "pgscheduler-96292.firebaseapp.com",
  projectId: "pgscheduler-96292",
  storageBucket: "pgscheduler-96292.firebasestorage.app",
  messagingSenderId: "185775930304",
  appId: "1:185775930304:web:998a980ec0a1394e0a6625",
  measurementId: "G-35BR605VCW"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }; 