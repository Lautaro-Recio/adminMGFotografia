export default function SignOut(props) {
    const {SignOutGoogle} = {...props}
  return (
  
      <button className='flex justify-center space-x-2 items-center w-18 h-4 bg-formGray  border-2 border-Gray text-Gray hover:text-formGray p-6 rounded-lg hover:bg-Gray transition-all' onClick={()=>SignOutGoogle()}>
          <ion-icon size="large" name="logo-google"></ion-icon>
          <p className=' text-xl'>SignOut </p>
      </button>
  )
}