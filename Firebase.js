import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage";
import {  arrayUnion, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc,} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
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
export const auth = getAuth()
auth.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()


//Esta funcion sirve para subir imgs, recibe un archivo y el nombre de la foto
export const uploadFile = async (file) => {
    if(file !== "undefined"){
      const storageRef = ref(storage, file.name)
      await uploadBytes(storageRef, file)
      //getDownloadURL retorna la url que utilizara la img en el storage para verse
      const url = await getDownloadURL(storageRef)
      return url
    }
}


export const uploadData = async (book,data, boolean,order) =>{
  const myRef = doc(db,"books",book)
  await getDoc(myRef).then(docSnap=>{
      if (docSnap.exists()) {
        updateDoc(myRef, {
          book: arrayUnion({img:data})         
        });
      } else {
        if(boolean){

          setDoc(myRef,{parraf:data,header:"",presentation1:"",presentation2:"",book:[],order})
        } else{
          setDoc(myRef,{book:[],order})

        }
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

