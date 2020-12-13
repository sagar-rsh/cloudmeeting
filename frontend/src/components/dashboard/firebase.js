import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBqUGmkpDlokdZ9554om476oIJwQxrPCE8",
    authDomain: "cloud-meet.firebaseapp.com",
    projectId: "cloud-meet",
    storageBucket: "cloud-meet.appspot.com",
    messagingSenderId: "265598425759",
    appId: "1:265598425759:web:277a2fbd85f3d692b0a0aa"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db

