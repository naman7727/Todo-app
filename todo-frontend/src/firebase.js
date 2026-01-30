import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1UmRpSMTCjIWv-gtI6MolcJ8DVDRaNFY",
  authDomain: "todo-app-bc853.firebaseapp.com",
  projectId: "todo-app-bc853",
 
  appId: "1:543676399988:web:1e48093170fb647484ac21",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
