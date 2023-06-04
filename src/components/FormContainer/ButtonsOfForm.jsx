export default function ButtonsOfForm(props) {
    const {handleSubmit,reset} = {...props}
  return (
    <div className="flex justify-around items-center my-4">
      <button
        className="border-2 border-borderGrayp-2 p-2 hover:bg-Gray transitio-all duration-500 rounded-md w-32"
        onClick={(e) => handleSubmit(e)}
      >
        Subir cambios
      </button>
      <button
        className="border-2 border-borderGrayp-2 p-2 hover:bg-Gray transitio-all duration-500 rounded-md w-32"
        onClick={(e) => reset(e)}
      >
        Reset
      </button>
    </div>
  );
}
