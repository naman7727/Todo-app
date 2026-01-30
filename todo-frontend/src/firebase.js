import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1UmRpSMTC",//demo
  authDomain: "todo-app-3.firebaseapp.com",//demo
  projectId: "todo-app-3", //demo
  appId: "1:546399988:web:", // demo
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

