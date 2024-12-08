import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUUVSPKFsqsFk7Qy4Ne5exeMbGSa1lsv8",
  authDomain: "waffle-50751.firebaseapp.com",
  projectId: "waffle-50751",
  storageBucket: "waffle-50751.firebasestorage.app",
  messagingSenderId: "716277527740",
  appId: "1:716277527740:web:07a2dbf08dd81b56ba0cb9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

//EXPORTA AS FUNÇÕES CRIADAS ACIMA
export { signInWithRedirect, auth, provider, getRedirectResult, GoogleAuthProvider, signInWithPopup }