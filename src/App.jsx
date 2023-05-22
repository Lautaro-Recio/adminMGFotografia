import { useEffect, useState } from "react"
import {uploadFile, db,uploadData} from "../Firebase"
import { collection, getDocs } from "firebase/firestore"
import Module from "./components/module/Module"
export default function App() {
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
      getData()
    } catch (error){
      console.error(error)
      alert("fallo al subir, intente mas tarde")
    }   
  }
  

  return (
    <div className="text-white bg-pink-300 border-[1px] rounded-xl p-4  border-pink-200 m-2">
      <h4 className="text-xl text-white">Formulario subida de imgs</h4>
      <form className="block " >
        <div className=" my-4 p-2 rounded-md ">
          <h4 className="text-white">Selecciona</h4>  
          {BooksOnDB.length > 0 && 
            <Module BooksOnDB={BooksOnDB} getData={getData} setFile={setFile} setBooksOnUpload={setBooksOnUpload} />
          }
          <div className="flex">
            <p>Quieres agregar un nuvevo book?</p>
            <input disabled={BooksOnUpload && true} className="ml-2 text-black" type="checkbox" name="" value="" onClick={()=>setAddNewBook(true)} id="" />
          </div>

          {addNewBook &&
            <label htmlFor="">
               Agregar nuevo Book
              <input className="rounded-md ml-2" type="text" onChange={e => {setBooksOnUpload(e.target.value)}}/>
            </label>
          }
        </div>
      
        <div className="flex justify-around items-center my-4">
          <button className="border-2 border-pink-200 p-2 rounded-md w-20" onClick={(e)=>handleSubmit(e)}>Upload</button>
          <button className="border-2 border-pink-200 p-2 rounded-md w-20">Reset</button>
        </div>
      </form>


    </div>
  )
}