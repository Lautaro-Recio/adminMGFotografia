import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage,ref,uploadBytes } from "firebase/storage";
import {  arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_RENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

//Esta funcion sirve para subir imgs, recibe un archivo y el nombre de la foto
export const uploadFile = async (file,nameOfPic) => {
    const storageRef = ref(storage,nameOfPic || "file")
    await uploadBytes(storageRef, file).then(snapshot => console.log(snapshot) )
    //getDownloadURL retorna la url que utilizara la img en el storage para verse
    const url = await getDownloadURL(storageRef)
    return url
}


export const uploadData = async (book,img) =>{
    const myRef = doc(db,"books",book)
    await getDoc(myRef).then(docSnap=>{
        if (docSnap.exists()) {
          updateDoc(myRef, {
            book: arrayUnion({img})         
          });
        } else {
          setDoc(myRef,{book:[]})
          updateDoc(myRef, {
            book: arrayUnion({img})
          });
        }
      })
}


/* 
1-Funcionalidad para que pueda eliminar imgs o books
  1A-Funcion para que cuando toque el signo mas le figure a que book sumar la foto
2-Mejorar la estetica
  */