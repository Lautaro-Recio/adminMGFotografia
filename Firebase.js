import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage";
import {  arrayUnion, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc,} from "firebase/firestore";
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
export const uploadFile = async (file) => {
    console.log(file)
    const storageRef = ref(storage, file.name)
    await uploadBytes(storageRef, file).then(snapshot => console.log(snapshot) )
  
    //getDownloadURL retorna la url que utilizara la img en el storage para verse
    const url = await getDownloadURL(storageRef)
    return url
}

/* AGREGAR REACT HOT TOAST A LA APLICACION */

export const uploadData = async (book,img) =>{
  console.log("book,img")
  const myRef = doc(db,"books",book)
  await getDoc(myRef).then(docSnap=>{
      if (docSnap.exists()) {
        updateDoc(myRef, {
          book: arrayUnion({img})         
        });
      } else {
        setDoc(myRef,{book:[]})
      }
    })
}

export const deleteImage = async (img,book,array) =>{
  const imgEncontrada = array.filter(element => element.img.result != img)
  const myRef = doc(db,"books",book)
  await updateDoc(myRef, {
    book: imgEncontrada         
  });

}
export const deleteBook = async (book) =>{

  await deleteDoc(doc(db,"books",book))
}
/* 
1-Funcionalidad para que pueda eliminar imgs o books
  1A-Funcion para que cuando toque el signo mas le figure a que book sumar la foto
2-Mejorar la estetica
  */