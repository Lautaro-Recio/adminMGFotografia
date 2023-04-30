import { useEffect, useState } from "react"
import {uploadFile, uploadData, db} from "../Firebase"
import { collection, getDocs } from "firebase/firestore"
import dropdown from "./assets/dropdown.png"
export default function App() {
  const [nameOfPic, setNameOfPic] = useState("")
  const [file, setFile] = useState(null)
  const [BooksOnDB, setBooksOnDB] = useState([])
  const [BooksOnUpload, setBooksOnUpload] = useState("")
  const [addNewBook, setAddNewBook] = useState(false)
  const [classOfModule, setClassOfModule] = useState("border-2  border-pink-100 gap-2 p-2 flex ")

  useEffect(() => {
    
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
    getData()
  }, [])
 
  const openModule = (e)=>{
    e.preventDefault()
    setClassOfModule("block gap-2 p-2 flex rounded-md transition ")
  }
  const closeModule = (e)=>{
    e.preventDefault()
    setClassOfModule("hidden")
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const result = await uploadFile(file,nameOfPic)
      const img = {
        result,
        nameOfPic,
      }
      uploadData(BooksOnUpload,img)
    } catch (error){
      console.error(error)
      alert("fallo al subir, intente mas tarde")
    }   
  }

  const uploadImage = (file,e) =>{
    setFile(file)
    setBooksOnUpload(e)

  }


  return (
    <div className="text-white bg-pink-300 border-[1px] rounded-xl p-4  border-pink-200 m-2">
      <h4 className="text-xl text-white">Formulario subida de imgs</h4>
      <form className="block " >

        

        <div className=" my-4 p-2 rounded-md ">
          <h4 className="text-white">Selecciona</h4>
          {BooksOnDB.length > 0 && BooksOnDB.map(book =>{
            return(

                <div className="block my-2 border-2 border-pink-100 rounded-md items-center px-2" key={book.bookName}>
                  <div className="flex  items-center mb-2 mx-4">
                    <h3 className="text-white mr-2 text-2xl" >{book.bookName}</h3>
                    {classOfModule === "hidden" ?(
                        <button onClick={(e)=>openModule(e)} className="w-10 h-10 p-2"><img src={dropdown} alt="dropdown" /></button>
                      ):(

                        <button onClick={(e)=>closeModule(e)} className="w-10 h-10  text-xl">X</button>
                      )
                    }  

                  </div>

                  <div className={classOfModule}>
                    {book.imgs.book.map(img=>{    
                      return(
                        <>
                          <img className="w-40 h-40 rounded-md "  key={img.img.result} src={img.img.result} alt={img.img.result} />
                        </>
                      )                
                        
                    })}
                    
                    <div className="flex " onClick={()=>{document.querySelector(`#${book.bookName.split(' ').join('')}` ).click()}}>
                      <input type="file" id={book.bookName.split(' ').join('')} accept="image/*" onChange={(e) => {uploadImage(e.target.files[0],book.bookName)}} className="w-20 h-20 rounded-md"  />
                      <p className="text-6xl rounded-md mb-2 w-40 h-40 t-12 flex justify-center items-center border-dashed border-2 bg-pink-300 border-pink-100 absolute cursor-pointer">+</p>
                    </div>
                    
                  </div>
                </div>
              )
            })
          }
          <div className="flex">
            <p>Quieres agregar un nuvevo book?</p>
            <input disabled={BooksOnUpload && true} className="ml-2" type="checkbox" name="" value="" onClick={()=>setAddNewBook(true)} id="" />
          </div>

          {addNewBook &&
            <label htmlFor="">
               Agregar nuevo Book
              <input className="rounded-md ml-2" type="text" onChange={e => {setBooksOnUpload(e.target.value)}}/>
            </label>
          }
        </div>
        
        <div className="my-2" >
          Nombre de foto
          <input className="rounded-md ml-2" type="text" onChange={e => {setNameOfPic(e.target.value)}}/>
        </div>
        

        <div className="flex justify-around items-center my-4">
          <button className="border-2 border-pink-200 p-2 rounded-md w-20" onClick={handleSubmit}>Upload</button>
          <button className="border-2 border-pink-200 p-2 rounded-md w-20">Reset</button>
        </div>
      </form>


    </div>
  )
}