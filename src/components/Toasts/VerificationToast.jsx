import { toast } from "react-hot-toast"
import {deleteImage} from "../../../Firebase"


/* TERMINAR DE CONFIGURAR LA TOAST */
export default function VerificationToast (props) {
  const {t,getData, result, book, array} = {...props}
  
  const deleteImgFunction  = async (e,img,book,array,option,id)=>{
    e.preventDefault()
      console.log(option)
      if(option){
        deleteImage(img,book,array)
        getData()
      }
      toast.dismiss(id)
  }
  
  return(

    <>{
      
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
      >
        <div className='text-3xl text-red-500 block text-center items-center p-4 w-full'>
          <ion-icon name="help-outline"></ion-icon>
          <div className=' text-black justify-between items-center'>
            <p className='text-xl mb-2'>¿Deseas eliminar esta imagen?</p>
            <div className='flex justify-around items-center'>
              <button className='text-sm border-2 border-red-500 p-2 rounded-md w-14' onClick={(e)=>deleteImgFunction(e,result,book,array,true,t.id)}>Si</button>
              <button className='text-sm border-2 border-red-500 p-2 rounded-md w-14' onClick={(e)=>deleteImgFunction(e,result,book,array,false,t.id)}>No</button>
            </div>

          </div>
        </div>

        
      </div> 
  }</>
  )
}


