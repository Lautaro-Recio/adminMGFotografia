import { useEffect, useState } from "react"
import {uploadFile, db,uploadData} from "../../../Firebase"
import { collection, getDocs } from "firebase/firestore"
import Module from "../../components/module/Module"
import logo from "../../assets/logo.png"
import NewBook from "../module/NewBook"
import SignOut from "../SignIn/SignOut"

export default function FormContainer(props) {
  const {SignOutGoogle} = {...props}

  const [File, setFile] = useState("")
  const [BooksOnDB, setBooksOnDB] = useState([])
  const [BooksOnUpload, setBooksOnUpload] = useState("")
  const [addNewBook, setAddNewBook] = useState(false)


  const getData = async () =>{
    const dbCollection = await getDocs(collection(db,"books"))
    try{
        const booksOnFirebase = []
        dbCollection.forEach((doc) => {
            const book = {bookName:doc.id, imgs:doc.data()}
            booksOnFirebase.push(book)
        });
        setBooksOnDB(booksOnFirebase)
    } catch(error){
        console.error(error)
    }
  }

  const reset = (e)=>{
    e.preventDefault()
    setFile()
    setBooksOnUpload()
    setAddNewBook()
  }
  useEffect(() => {
    getData()
  }, [])

  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const result = File && await uploadFile(File)
      const img = {
        result,
        name:"Hola"
      }

      !File && await uploadData(BooksOnUpload)
      File && await uploadData(BooksOnUpload,img)
      await getData()
      reset(e)
    } catch (error){
      console.error(error)
      alert("fallo al subir, intente mas tarde")
    }   
  }
  
  return (
    <>
    <div className="text-white bg-formGray border-[1px] rounded-xl p-4  border-borderGray m-2 h-full">
      <div className="flex justify-around items-center ">
        <img className="w-26 h-20 mx-4" src={logo} alt="" />
        <SignOut SignOutGoogle={SignOutGoogle}/>
      </div>
        <h4 className="text-xl text-white">Formulario subida de imagenes</h4>
      <form className="block " >
        <div className=" my-4 p-2 rounded-md ">
          <h4 className="text-white ml-6 text-xl">Selecciona un book</h4>  
          {BooksOnDB.length > 0 && 
            <Module BooksOnDB={BooksOnDB} getData={getData} setFile={setFile} setBooksOnUpload={setBooksOnUpload} />
          }
          <NewBook BooksOnUpload={BooksOnUpload} addNewBook={addNewBook} setAddNewBook={setAddNewBook} setBooksOnUpload={setBooksOnUpload}/>
        </div>
      
        <div className="flex justify-around items-center my-4">
          <button className="border-2 border-borderGrayp-2 p-2 hover:bg-Gray transitio-all duration-500 rounded-md w-20" onClick={(e)=>handleSubmit(e)}>Upload</button>
          <button className="border-2 border-borderGrayp-2 p-2 hover:bg-Gray transitio-all duration-500 rounded-md w-20" onClick={(e)=>reset(e)}>Reset</button>
        </div>
      </form>


    </div>

    


    </>

  )
}