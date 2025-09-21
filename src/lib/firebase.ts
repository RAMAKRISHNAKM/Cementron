import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: "studio-6723026020-34387",
  appId: "1:261660964740:web:855d69abf6dbc86eae0fd1",
  storageBucket: "studio-6723026020-34387.appspot.com",
  apiKey: "AIzaSyD36p40drG91kVRh6IIAKX1r3n_Z0T8Xhs",
  authDomain: "studio-6723026020-34387.firebaseapp.com",
  messagingSenderId: "261660964740",
  measurementId: ""
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
