import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../../Firebase"
import logo from "../../assets/logo.png"
export default function SignInWithGoogle(props) {
    const {setUserTrue} = {...props}

    const SignWhitGoogle = () =>{
        signInWithPopup(auth,googleProvider)
        const { email } = auth.currentUser
        if (email === import.meta.env.VITE_REACT_APP_EMAIL){
            setUserTrue(true)
        }
        
    }

  return (
    <div className="items-center bg-[#a8a8a8a6] justify-center grid border-2  border-menuGray p-4 rounded-md">
      
      <img src={logo} className="h-[65%] border-2 rounded-[100%] border-menuGray p-8 m-8" alt="Logo mg" />
        
      <button className='flex justify-center space-x-2 items-center w-full h-10 bg-[#222222a6]  border-2 border-[#222222a6] text-gray-400 p-6 rounded-lg' onClick={SignWhitGoogle}>
          <ion-icon size="large" name="logo-google"></ion-icon>
          <p className='text-black text-xl '>SigIn With Google</p>
      </button>
    </div>
  )
}