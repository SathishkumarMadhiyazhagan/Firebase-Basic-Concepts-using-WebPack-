// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, getFirestore, addDoc, deleteDoc, doc, onSnapshot, query, where, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1sfHwE8sn6Pq-EDBUZCG43fLBzqa6n4A",
  authDomain: "fir-project-with-react-1.firebaseapp.com",
  projectId: "fir-project-with-react-1",
  storageBucket: "fir-project-with-react-1.appspot.com",
  messagingSenderId: "228339229504",
  appId: "1:228339229504:web:950eff9dccfbbe95c1d0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


const colRef = collection(db, 'movies');
const queryRef = query(colRef, where('category', '==', 'Drama'), orderBy("createdAt"));

// const DocumentReference = doc(db, 'movies', "zq94SxiI86nCe6cr8zf5");
// onSnapshot(DocumentReference, (data) => {
//   console.log(data.data(), data.id);
// })

getDocs(colRef).then(data => {
  let movies = [];
  console.log(data.docs);
  data.docs.forEach(document => {
    console.log(document.data(), document.id);
    movies.push({...document.data(), id: document.id});
  })
  console.log(movies);
}).catch(e => {
  console.log(e)
})

// onSnapshot(colRef, (data) => {
//   let movies = [];
//   data.docs.forEach(document => {
//     console.log(document.data(), document.id);
//     movies.push({...document.data(), id: document.id});
//   })
//   console.log(movies);
// })

const addMovie = document.querySelector(".add");

addMovie.addEventListener("submit", event => {
  event.preventDefault();
  addDoc(colRef, {
    name: addMovie.name.value,
    description: addMovie.description.value,
    category: addMovie.category.value,
    createdAt: serverTimestamp(),
    updateAt: serverTimestamp()
  }).then(() => {
    addMovie.reset();
  }).catch(e => {
    console.log(e)
  })
});

const delectMovie = document.querySelector('.delete');

delectMovie.addEventListener('submit', (event) => {
  event.preventDefault();
  const documentReference = doc(db, "movies", delectMovie.id.value);
  deleteDoc(documentReference).then(() => {
    delectMovie.reset();
  }).catch(e => {
    console.log(e)
  });
}) 

const updateMovies = document.querySelector('.update');

updateMovies.addEventListener("submit", (event) => {
  event.preventDefault();
  let documentReference = doc(db, 'movies', updateMovies.id.value);
  updateDoc(documentReference, {
    name: updateMovies.name.value,
    description: updateMovies.description.value,
    category: updateMovies.category.value,
    updateAt: serverTimestamp(),
  }).then(() => {
    updateMovies.reset();
  }).catch(e => {
    console.log(e);
  })
})


const register = document.querySelector('.register');

register.addEventListener('submit', (event) => {
  event.preventDefault();
  
  createUserWithEmailAndPassword(auth, register.email.value, register.password.value).then((credential)=> {
    console.log(credential);
    logout.innerHTML = 'LogOut';
    register.reset();
  }).catch(e => {
    console.log(e);
  })
})


const login = document.querySelector('.login');

login.addEventListener('submit', (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, login.email.value, login.password.value).then((credential) => {
    console.log(credential);
    logout.innerHTML = 'LogOut';
    login.reset();
  }).catch(e => {
    console.log(e);
  });
})

const logout = document.querySelector('.logout');

logout.addEventListener('click', (event) => {
  signOut(auth).then(() => {
    logout.innerHTML = 'Login';
    console.log("User LogOut Success")
  }).catch(e => {
    console.log(e);
  });
})