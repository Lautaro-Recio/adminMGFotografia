export default function SignOut(props) {
    const {SignOutGoogle} = {...props}
  return (
  
      <button className='flex justify-center space-x-2 items-center w-18 h-4 bg-[#222222a6]  border-2 border-[#222222a6] text-gray-400 p-6 rounded-lg hover:bg-borderGray transition-all' onClick={()=>SignOutGoogle()}>
          <ion-icon size="large" name="logo-google"></ion-icon>
          <p className='text-black text-xl '>SignOut </p>
      </button>
  )
}