import { useState } from "react"
import { Toaster, toast }  from "react-hot-toast"

import VerificationToast from "../Toasts/VerificationToast"
import VerificationOfBook from "../Toasts/VerificationOfBook"
export default function Module(props) {
    const {BooksOnDB,getData,setFile,setBooksOnUpload} = {...props}
    const [classOfPics, setClassOfPics] = useState("opacity-0 hidden")
    const [WhoMod, setWhoMod] = useState("")

    const openModule = (e,nameOfBook)=>{
        e.preventDefault()
        setClassOfPics("opacity-100 flex duration-[2500ms] transition-all mx-2 ")
        setWhoMod(nameOfBook)
    }
    const closeModule = (e)=>{
        e.preventDefault()
        setClassOfPics("opacity-0 hidden")
        setWhoMod("")
    }
    
    const setImageAndBook = (img,book)=>{
        setFile(img)
        setBooksOnUpload(book)
        
          
        
    }

   

    /* Terminar la integracion de react hot toast */

  return (
    <>


    
    {BooksOnDB.map(book =>{
        return(

            <div className={`block my-2 rounded-md items-center px-2 border-2 border-pink-100 origin-top duration-700 transition-all ${WhoMod == book.bookName ? "h-60":"h-16"}`} key={book.bookName}>
              <div className="flex items-center justify-between my-2 mx-4">
                <div className="flex">
                    <h3 className="text-white mr-2 text-2xl" >{book.bookName}</h3>
                    {WhoMod === book.bookName ?(
                            <button onClick={(e)=>closeModule(e)} className="flex justify-center items-center w-10 h-10  text-3xl hover:bg-pink-100 rounded-full hover:text-pink-300 transition-all"><ion-icon name="close-outline" ></ion-icon></button>
                        ):(
                            <button onClick={(e)=>openModule(e,book.bookName)} className="flex justify-center items-center w-10 text-3xl h-10 p-2  hover:border-pink-100 hover:bg-pink-100 rounded-full hover:text-pink-300 transition-all"><ion-icon name="chevron-down-outline" ></ion-icon>
                        </button>
                    )
                    }  
                </div>
                <button className="text-3xl justify-center items-center flex hover:text-red-500 transition mx-4 group hover:bg-pink-100 p-2 rounded-md  cursor-default"><ion-icon aria-hidden = "favorte" name="trash-outline"></ion-icon><p className=" cursor-pointer text-sm opacity-0 group-hover:opacity-100 mx-2 " onClick={(e)=>{e.preventDefault() ,toast.custom((t) => (<VerificationOfBook book={book.bookName} getData={getData} t={t}  />)) } } >Borrar book</p></button>
              </div>

              
             
              {WhoMod == book.bookName &&
                <>
                  <div className={WhoMod == book.bookName ? classOfPics: "opacity-0 h-0"}> 
                    { book.imgs.book.map( img =>{
                      return(
                        /* Hacer animacion fade in para las imagenes */
                        <div className={`relative mx-2 transition-all duration-700  ${WhoMod == book.bookName ? "opacity-100":"opacity-0"} `} key={img.img.result}>
                          <img className="w-40 h-40 rounded-md mx-2 border-2 border-pink-100 " src={img.img.result} alt={img.result} />
                              <button onClick={(e)=>{e.preventDefault(),toast.custom((t) => (<VerificationToast result={img.img.result} book={book.bookName} array={book.imgs.book} getData={getData} t={t}  />)) } } className="w-40 h-40 rounded-md mx-2  absolute opacity-0 top-0 left-0 flex justify-center items-center text-5xl duration-500 transition-all hover:bg-[#ff00007d] hover:opacity-100"><ion-icon name="trash-outline"></ion-icon> </button>
                        </div>
                    )})}            
                        <div  className={classOfPics} onClick={()=>{document.querySelector(`#${book.bookName.split(' ').join('')}` ).click()}}>
                          <input type="file" id={book.bookName.split(' ').join('')} accept="image/*" onChange={(e) => {setImageAndBook(e.target.files[0],book.bookName)}} className="w-20 h-20 rounded-md opacity-0"  />
                          <p className={`text-6xl  rounded-md mb-2 w-40 h-40 t-12 flex justify-center items-center border-dashed border-2 bg-pink-300 border-pink-100 absolute hover:bg-[#ffffff42]  duration-700 transition-all cursor-pointer`}>+</p>
                        </div>                           
                    </div>
                    </>
              }
            </div>
          )
        })
    }
    <Toaster/>
    </>
  )
}
